"use client"

import TodoStore from "@/store/TodoStore"
import { useEffect,useState } from "react"
import TodoForm from '@/components/TodoForm'
import NotificationDrawer from '@/components/NotificationDrawer'

export default function Dashboard(){
    const {todos,fetchTodos,loading} = TodoStore();
    const [showform,setShowForm] = useState(false);

    useEffect(() => {
        fetchTodos()
    },[])

    return (
        <div>
            <div>
                <h1>My Todos</h1>
            </div>
        </div>
    )
}