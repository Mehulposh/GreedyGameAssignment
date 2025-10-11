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
    const [role, setRole] = useState("user");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single();
      if (data) setRole(data.role);
    })();
  }, [user]);

  


  return (
    <aside className="w-64 absolute left-0 top-0 bg-white shadow-md h-screen flex flex-col justify-between">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 flex justify-between  items-center">
            GREEDYGAME
            <span onClick={onClose}><MdOutlineKeyboardDoubleArrowLeft /></span>
        </h2>

        <nav className="space-y-3 flex flex-col justify-center items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span><TbLayoutDashboardFilled /></span>
            Dashboard
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2">
            <span><SlCalender /></span>
            Calender
          </Link>
          <Link href="/todos" className="flex items-center gap-2">
            <span><RiCalendarTodoLine /></span>
            To do List 
          </Link>
          {role === "superuser" && <Link href="/dashboard/admin/users">User Management</Link>}
        </nav>
      </div>
     
    </aside>
  );
}