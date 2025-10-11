"use client"
import { useState,useEffect } from "react";
import AuthStore from "@/store/AuthStore"
import { CiFilter } from "react-icons/ci";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import Status from "@/components/Badge"
import TodoForm from '@/components/TodoForm'
import TodoStore from "@/store/TodoStore";
import DateFormater from "@/utils/DateFormater";


export default function TodoList(){
    const {todos,deleteTodo,fetchTodos} = TodoStore();
    const [showform,setShowForm] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null)

    useEffect(() => {
        fetchTodos()
    },[])

    const handleDelete = async (id) => {
         if (confirm('Are you sure you want to delete this todo?')) {
            await deleteTodo(id)
        }
    }

    const handleEdit = (todo) => {
        setEditingTodo(todo)
        setShowForm(true)
    }

    return(
        <div className="p-5">
            <div className="flex justify-between items-center mt-5 ">
                <h1 className="text-xl font-semibold">All Todos</h1>
                <div className="space-x-5 flex items-center">
                    <button className="border border-black/12 flex justify-around items-center text-sm rounded px-4 py-2">
                        <CiFilter/>
                        Filter
                    </button>
                    <button 
                        onClick={() => setShowForm(prev => !prev)}
                        className="bg-green-600  px-2 py-2 text-white text-sm rounded "
                    >
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