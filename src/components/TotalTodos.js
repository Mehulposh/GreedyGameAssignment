"use client"

import TodoStore from "@/store/TodoStore"
import { useEffect, useState } from "react";



export default function TotalTodos({profile}){
    const {todos} = TodoStore();
    const [allTodos,setAllTodos] = useState(0)
    const [completedTodos,setCompletedTodos] = useState(0)
    const [upCominTodos,setUpCominTodos] = useState(0)


    useEffect(() => {
        const total = todos.length;
        setAllTodos(total)

        const completed = todos.filter(todo => todo.completed).length
        setCompletedTodos(completed)

        const pending = todos.filter(todo => !todo.completed).length
        setUpCominTodos(pending)
    },[todos])

    return(
        <div className="flex items-center bg-white py-5 px-4 mt-5 gap-10 rounded-lg ">
            <div className="text-center flex flex-col gap-4">
                <p className={`font-semibold text-sm   mb-1 ${profile ? "text-gray-400" : ""}`}>
                    All Todos
                </p>
                <p className="text-2xl font-semibold ">{allTodos}</p>
            </div>
    
            <div className="w-px h-20 bg-gray-300"></div>
    
            <div className="text-center flex flex-col gap-4">
                <p className={`font-semibold text-sm  mb-1 ${profile ? "text-gray-400" : ""}`}>
                    Upcoming
                </p>
                <p className="text-2xl font-semibold ">{upCominTodos}</p>
            </div>
    
            <div className="w-px h-20 bg-gray-300"></div>
    
            <div className="text-center flex flex-col gap-4">
                <p className={`font-semibold text-sm   mb-1 ${profile ? "text-gray-400" : ""}`}>
                Completed
                </p>
                <p className="text-2xl font-semibold ">{completedTodos}</p>
            </div>
        </div>
    )
}