"use client"

import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";


export default function Sidebar({user,onClose}){
    const [role, setRole] = useState("user");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single();
      if (data) setRole(data.role);
    })();
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };


  return (
    <aside className="w-64 absolute left-0 top-0 bg-white shadow-md h-screen flex flex-col justify-between">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 flex justify-between  items-center">
            GREEDYGAME
            <span onClick={onClose}><MdOutlineKeyboardDoubleArrowLeft /></span>
        </h2>

        <nav className="space-y-3">
          <Link href="/dashboard">My Todos</Link>
          <Link href="/dashboard/profile">Profile</Link>
          {role === "superuser" && <Link href="/dashboard/admin/users">User Management</Link>}
        </nav>
      </div>
      <button onClick={logout} className="m-4 bg-red-500 text-white py-2 rounded">
        Logout
      </button>
    </aside>
  );
}