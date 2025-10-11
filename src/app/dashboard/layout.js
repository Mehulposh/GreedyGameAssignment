"use client"

import { useEffect } from "react"
import Sidebar from '@/components/Sidebar'
import AuthStore from "@/store/AuthStore"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"

export default function DashboardLayout({children}){
    const {user, fetchUser, loading} = AuthStore();
    const router = useRouter();

    useEffect(()=> {
        fetchUser();
    },[]);
    
    useEffect(() => {
        if(!loading && !user){
            router.push('/')
        }
    },[loading,user])

    if(loading) return <p>Loading...</p>

    if(!user) return null

    // console.log(user.email);                    // "mehulposhattiwar4995@gmail.com"
    // console.log(user.user_metadata.name);       // "Mehul"
    // console.log(user.user_metadata.role);       // "user"
    // console.log(user.id);  
    
    return(
        <div>
            <Header user = {user}/>
            <main>
                {children}
            </main>
        </div>
    )
}