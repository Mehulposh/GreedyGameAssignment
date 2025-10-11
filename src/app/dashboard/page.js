"use client"

import TodoStore from "@/store/TodoStore"
import { useEffect,useState } from "react"
import TodoForm from '@/components/TodoForm'
import NotificationDrawer from '@/components/NotificationDrawer'
import AuthStore from "@/store/AuthStore"
import { CiFilter } from "react-icons/ci";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import Status from "@/components/Badge"



export default function Dashboard(){
     const {user}  = AuthStore()
    const {todos,fetchTodos,updateTodo,deleteTodo} = TodoStore();
    const [showform,setShowForm] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null)

    console.log(user);
    console.log(todos);
    
    const handleDelete = async (id) => {
         if (confirm('Are you sure you want to delete this todo?')) {
            await deleteTodo(id)
        }
    }

    const handleEdit = (todo) => {
        setEditingTodo(todo)
        setShowForm(true)
    }
    
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
                    <button 
                        onClick={() => setShowForm(prev => !prev)}
                        className="bg-green-600  px-2 py-2 text-white text-sm rounded ">
                        <span> + </span> 
                        Add Todo
                    </button>
                </div>
            </div>

            <table className="w-full bg-white  text-sm mt-5 rounded shadow">
                <thead>
                    <tr className="text-left border-b text-gray-400">
                        <th className="p-3">Todo</th>
                        <th className="p-3">Due Date</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id} className="border-b text-md font-semibold ">
                            <td className="p-3">
                                <div>
                                    <p>{todo.title}</p>
                                     <p className="text-sm text-gray-400">{todo.description}</p>
                                </div>
                            </td>
                            <td className="p-3">{formatDate(todo.due_at)}</td>
                            <td className='p-3'><Status status={todo.completed}/></td>
                            <td className="p-3">
                                <div className="space-x-3">
                                    <button className="bg-purple-200 p-1 rounded text-purple-400" onClick={() => handleEdit(todo)}>
                                        <BiEditAlt/>
                                    </button>
                                    <button className="bg-red-200 p-1 rounded text-red-400" onClick={() => handleDelete(todo.id)}>
                                        <MdDeleteForever/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showform && 
                <TodoForm 
                    onClose={()=> {
                        setShowForm(false)
                        setEditingTodo(null)
                    }}
                    editingTodo={editingTodo}
                />
            }
        </div>
    )
}