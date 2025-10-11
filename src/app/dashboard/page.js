"use client"

import TodoStore from "@/store/TodoStore"
import { useEffect,useState } from "react"
import TodoForm from '@/components/TodoForm'
import NotificationDrawer from '@/components/NotificationDrawer'
import AuthStore from "@/store/AuthStore"
import { CiFilter } from "react-icons/ci";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";



export default function Dashboard(){
     const {user}  = AuthStore()
    const {todos,fetchTodos,loading} = TodoStore();
    const [showform,setShowForm] = useState(false);
    
    console.log(user);
    
    useEffect(() => {
        fetchTodos()
    },[])

     const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    return (
        <div className="px-5 bg-gray-200 h-screen">
            <div className="flex justify-between items-center pt-5">
                <h1 className="text-2xl font-semibold">Hello, {user?.user_metadata?.name }</h1>
                <p>
                    Last Login time :
                    <span>
                        {formatDate(user.last_sign_in_at)}
                    </span> 
                </p>
            </div>
            <div className="flex justify-between items-center mt-5 ">
                <h1 className="text-xl font-semibold">All Todos</h1>
                <div className="space-x-5 flex items-center">
                    <button className="border border-black/12 flex justify-around items-center text-sm rounded px-4 py-2">
                        <CiFilter/>
                        Filter
                    </button>
                    <button className="bg-green-600  px-2 py-2 text-white text-sm rounded "><span> + </span>   Add Todo</button>
                </div>
            </div>

            <table className="w-full bg-white text-gray-400 text-sm mt-5 rounded shadow">
                <thead>
                    <tr className="text-left border-b">
                        <th className="p-3">Todo</th>
                        <th className="p-3">Due Date</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id} className="border-b">
                            <td className="p-3">{todo.title}</td>
                            <td className="p-3">{formatDate(todo.due_at)}</td>
                            <td className='p-3'>{todo.completed ? "Done" : "Pending"}</td>
                            <td className="p-3">
                                <div>
                                    <button>
                                        <BiEditAlt/>
                                    </button>
                                    <button>
                                        <MdDeleteForever/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}