"use client"

import { useEffect } from "react"
import Sidebar from '@/components/Sidebar'
import AuthStore from "@/store/AuthStore"
import { useRouter } from "next/navigation"

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

    return(
        <div>
            <Sidebar />
            <main>
                {children}
            </main>
        </div>
    )
}