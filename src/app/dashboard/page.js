"use client"

import TodoStore from "@/store/TodoStore"
import { useEffect,useState } from "react"
import TodoForm from '@/components/TodoForm'
import { supabase } from "@/lib/supabaseClient"
import AuthStore from "@/store/AuthStore"
import { CiFilter } from "react-icons/ci";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import Status from "@/components/Badge"
import TotalTodos from "@/components/TotalTodos"
import DateFormater from "@/utils/DateFormater"
import { useRouter } from "next/navigation"



export default function Dashboard(){
    const router = useRouter()
     const {user}  = AuthStore()
    const {todos,fetchTodos,deleteTodo} = TodoStore();
    const [showform,setShowForm] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);
    
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
        const checkRole = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/");
                return;
            }

            const { data: profile } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

            // Redirect super_user away from regular dashboard
            if (profile?.role === "super_user") {
                router.push("/dashboard/admin");
            }
        };

        checkRole();
    }, [router]);


    useEffect(() => {
        fetchTodos()
        
    },[])


    const getLastUpdatedTime = () => {
        if (todos.length === 0) return 'No todos yet'
        
        // Find the most recently created todo
        const mostRecent = todos.reduce((latest, todo) => {
            if (!todo.due_at) return latest
            if (!latest.due_at) return todo
        
            const latestTime = new Date(latest.due_at)
            const todoTime = new Date(todo.due_at)
            return todoTime < latestTime ? todo : latest
        }, todos[0])
    
        return mostRecent.due_at ? DateFormater(mostRecent.due_at) : 'Unknown'
    }


    return (
        <div className="px-5 bg-gray-200 h-full">
            <div className="flex justify-between items-center pt-5">
                <h1 className="text-2xl font-semibold">Hello, {user?.user_metadata?.name }</h1>
                <p>
                    Last Login time :
                    <span>
                        {DateFormater(user.last_sign_in_at)}
                    </span> 
                </p>
            </div>

            <TotalTodos />
            <div className="bg-white px-5 rounded-lg py-2 mt-5">
            <div className="flex justify-between items-center ">
                <div>
                    <h1 className="text-xl font-semibold">All Todos</h1>
                    <p className="text-sm text-gray-300 font-semibold">Last Updated : {getLastUpdatedTime()}</p>
                </div>
                
                <div className="space-x-5 flex items-center">
                    <button className="border border-black/12 flex justify-around items-center text-sm rounded px-4 py-2">
                        <CiFilter className="text-green-300 font-bold text-lg"/>
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

            <table className="w-full  text-sm mt-5 rounded-lg ">
                <thead >
                    <tr className="text-left bg-gray-200 text-gray-500 ">
                        <th className="p-3">Todo</th>
                        <th className="p-3">Due Date</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id} className="border-b border-dashed border-gray-300  text-md font-semibold ">
                            <td className="p-3">
                                <div>
                                    <p>{todo.title}</p>
                                     <p className="text-sm text-gray-400">{todo.description}</p>
                                </div>
                            </td>
                            <td className="p-3">{DateFormater(todo.due_at)}</td>
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
            </div>
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