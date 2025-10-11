"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"


export default function Login(){
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

   const handleSignup = async (e) => {
    e.preventDefault();
    const {error , data} = await supabase.auth.signUp({
        email,
        password,
        options: {data: {name, role: 'user'}},
    });

    if(error) setError(error.message)
    else router.push('/dashboard')
  };

   

  return(
     <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center">
        <img src="/priscilla-du-preez-XkKCui44iM0-unsplash 1.png" alt="Login" className="w-full h-full" />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center gap-6">
        <div className="space-y-5 flex flex-col items-center">
        <h4 className="font-bold text-lg">GREEDYGAME</h4>
        <h1 className="font-semibold text-4xl text-center w-96">
            You’re one click away from less busywork
        </h1>
        
        <button  className="flex items-center justify-center gap-3 font-medium ring-1 ring-black/8 rounded-lg w-96 py-3">
          <img src='/google.png' alt="google login" className="size-5"/>
          Log in with Google
        </button>
        </div>
        <form 
          onSubmit={handleSignup}
          className="flex flex-col gap-5 w-96"
        >
          <label className="flex flex-col gap-2">
            <p>Name <span className="text-red-500">*</span></p>
            <input 
              type="text"
              placeholder="Enter your name"
              className="py-3 rounded-lg px-2 ring-1 ring-black/8"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <label className="flex flex-col gap-2">
            <p>Email Address <span className="text-red-500">*</span></p>
            <input 
              type="email"
              placeholder="Enter your  email"
              className="py-3 rounded-lg px-2 ring-1 ring-black/8"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label className="flex flex-col gap-2" >
            <p>Password <span className="text-red-500">*</span></p>
            <input 
              type="password"
              placeholder="Minimum 8 Characters"
              className="py-3 rounded-lg px-2 ring-1 ring-black/8 w-full"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>

            <div className="flex items-center gap-1">
               <input type="checkbox" /> 
               <p className="text-sm">Agree to Terms of Service and Privacy Policy</p>
            </div>

          <button 
            type="submit"
            className="bg-green-600 text-white py-3 rounded-lg text-sm">
            Get Started
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  )
}

