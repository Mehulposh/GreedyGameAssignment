"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import { useRouter } from "next/navigation"
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import NotificationDrawer from "./NotificationDrawer";
import { supabase } from "@/lib/supabaseClient";
import Profile from "@/app/dashboard/profile/page";



export default function Header({user}){
    console.log('header',user);
    
    const router = useRouter();
    
    const [openNotification,setOpenNotification] = useState(false)
    const [oepnSidebar,setOpenSiderbar] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const [openProfilePage, setOpenProfilePage] = useState(false)

    const logout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };
    return(
    <>
        <nav className="relative flex justify-between items-center p-4 bg-white">
            <div className="w-1/3 flex gap-10 justify-between items-center">
                <h2 className="font-bold " onClick={() => setOpenSiderbar(prev => !prev)}>
                    GREEDYGAME
                </h2>
                <div className="bg-gray-200 px-1 w-full flex items-center gap-2 rounded-lg">
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

                <div className="flex items-center" onClick={() => setOpenProfile(prev => !prev)}>
                    {
                        user 
                        ? <img src={user.user_metadata.avatar_url} className="size-12 rounded-full" />
                        : <IoPersonSharp className="w-10 h-10 rounded-full"/>
                    }
                    <IoIosArrowDown />
                </div>
            </div>

            
        </nav>
        {openProfile && (
            <div>
                <div className="absolute right-15 top-10 flex flex-col items-start gap-4  bg-white py-4 px-6 rounded-xl w-50 text-sm ring-black/10">
                    <button onClick={() => setOpenProfilePage(true)} className="flex items-center gap-2">
                    <IoPersonSharp className="text-gray-500"/>
                    Profile
                    </button>
                
                    <button onClick={logout} className="flex items-center gap-2">
                        <IoIosLogOut className="text-gray-500" />
                        Logout
                    </button>
                </div>
            </div>
        )}
        {openProfilePage && <Profile />}
        {oepnSidebar && <Sidebar user={user}  onClose={()=> setOpenSiderbar(false)}/>}
        {openNotification && <NotificationDrawer onClose={() => setOpenNotification(false)} />}
    </>
    )
}