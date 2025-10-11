"use client";
import { useState } from "react";
import useTodoStore from "@/store/TodoStore";
import { formatDistanceToNow } from "date-fns";
import { RiCloseLargeLine } from "react-icons/ri";

export default function NotificationDrawer({onClose}) {
  const { todos } = useTodoStore();
  
  const upcoming = todos.filter((t) => {
    const hoursDiff = (new Date(t.due_at) - new Date()) / (1000 * 60 * 60);
    return hoursDiff > 0 && hoursDiff <= 4;
  });

  return (
    <div className="relative">

      
        <div className="absolute right-0 top-0 h-screen w-90 bg-white border rounded shadow-lg p-4 z-10">
          <h3 className="text-lg font-semibold mb-2 flex justify-between items-center">
            All Notifiactions
            <span onClick={onClose}><RiCloseLargeLine /></span>    
          </h3>
          {upcoming.length === 0 && (
            <p className="text-sm text-gray-500">
              No upcoming todos
              
            </p>
          )}
          {upcoming.map((todo) => (
            <div key={todo.id} className="border-b py-2">
              <p className="font-semibold">{todo.title}</p>
              <p className="text-sm text-gray-600">
                Due {formatDistanceToNow(new Date(todo.due_at), { addSuffix: true })}
              </p>
            </div>
          ))}
        </div>
      
    </div>
  );
}
