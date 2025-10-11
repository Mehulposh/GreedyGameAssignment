"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import { useRouter } from "next/navigation"
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

import NotificationDrawer from "./NotificationDrawer";


export default function Header({user}){
    const router = useRouter();
    const [openNotification,setOpenNotification] = useState(false)
    const [oepnSidebar,setOpenSiderbar] = useState(false)

    return(
    <>
        <nav className="flex justify-between items-center p-4">
            <div className="flex gap-5 justify-evenly items-center">
                <h2 className="font-bold " onClick={() => setOpenSiderbar(prev => !prev)}>
                    GREEDYGAME
                </h2>
                <div className="bg-gray-200 px-1 flex items-center gap-2 rounded-lg">
                    <CiSearch />

                    <input 
                        className=" py-2 rounded-lg"
                        placeholder="Search"
                    
                    />
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <button onClick={() => setOpenNotification(prev => !prev)} >
                    <IoIosNotificationsOutline  className="w-7 h-7"/>
                </button>

                <img src='/next.svg' className="w-10 h-10"/>
            </div>

            
        </nav>
        {oepnSidebar && <Sidebar  onClose={()=> setOpenSiderbar(false)}/>}
        {openNotification && <NotificationDrawer onClose={() => setOpenNotification(false)} />}
    </>
    )
}