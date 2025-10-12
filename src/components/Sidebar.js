"use client"

import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { RiCalendarTodoLine } from "react-icons/ri";




export default function Sidebar({user,onClose}){
    
  const router = useRouter();

  return (
    <aside className="w-64 absolute left-0 top-0 bg-white shadow-md h-screen flex flex-col justify-between">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 flex justify-between  items-center">
            GREEDYGAME
            <span onClick={onClose}><MdOutlineKeyboardDoubleArrowLeft className="cursor-pointer "/></span>
        </h2>

        <div className="space-y-3 flex flex-col justify-center items-center">
          <button className="cursor-pointer flex items-center gap-2 p-2 hover:text-white hover:bg-green-400 hover:rounded-lg " 
            onClick={() => {user === 'user' ? router.push('/dashboard') : router.push('/dashboard/admin')}}>
            
            <span><TbLayoutDashboardFilled /></span>
            Dashboard
          </button>
          <button className="cursor-pointer flex items-center gap-5 hover:text-white hover:bg-green-400 hover:rounded-lg p-2" 
            onClick={() => {user === 'user' ? router.push('/dashboard') : router.push('/dashboard/admin')}}>            
            <span><RiCalendarTodoLine /></span>
            Calender
          </button>
          <button className="cursor-pointer flex items-center gap-4 hover:text-white hover:bg-green-400 hover:rounded-lg p-2" 
            onClick={() => router.push('/dashboard/todos')}>
            <span><TbLayoutDashboardFilled /></span>
            To Do List
          </button>
          
        </div>
      </div>
     
    </aside>
  );
}