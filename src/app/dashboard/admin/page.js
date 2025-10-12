"use client"

import { useState } from "react"
import Dashboard from "../page"
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { TbUsers } from "react-icons/tb";
import UserManagement from "@/components/UserMangement";

export default function AdminDashboard(){
    const [toDisplay, setToDisplay] = useState('dashboard');
    
    return(
        <div className="flex w-screen   h-screen">
            <div className="w-50  bg-gray-800 flex flex-col gap-10 py-4">
                <p className="text-white font-semibold p-2 flex justify-center items-center">GREEDYGAME</p>

                <div className="text-gray-300 flex flex-col items-center gap-5 ">
                    <button 
                        onClick={() => setToDisplay("dashboard")}
                        className="flex items-center justify-start font-md text-sm gap-2 py-3 px-4 w-2/3 rounded-lg hover:bg-slate-700 hover:text-emerald-400 transition-colors">
                        <TbLayoutDashboardFilled  />
                        Dashboard
                    </button>
                    <button
                        onClick={() => setToDisplay("users")}
                        className="flex items-center justify-start font-md text-sm gap-2 py-3 px-4 w-2/3 rounded-lg hover:bg-slate-700 hover:text-emerald-400 transition-colors">

                        <TbUsers/>
                        Users
                    </button>
                </div>
            </div>

            {toDisplay === "users" 
                ? (
                    <UserManagement />
                ) 
                : (
                    <div className="w-screen">
                        <Dashboard />
                    </div>
                )}
        </div>
    )
}