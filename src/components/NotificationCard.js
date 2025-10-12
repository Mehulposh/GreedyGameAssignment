"use client"

import DateFormater from "@/utils/DateFormater"
import Status from "./Badge"




export default function NotificationCard({todo}){
    return(
        <div className="ring-1 ring-black/8 rounded-lg space-y-3 p-4">
            <div className="flex justify-start items-center gap-4">
                <p className="font-semibold tex-md">{todo.title}</p>
                <Status status={todo.completed}/>
            </div>
            <p className="text-sm text-gray-400">{todo.description}</p>
            <p className="text-sm text-gray-400">{DateFormater(todo.due_at)}</p>
        </div>
    )
}