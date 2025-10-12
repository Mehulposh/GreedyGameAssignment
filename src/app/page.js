"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"


export default function Login(){
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

   const handleLogin = async (e) => {
    e.preventDefault();
    const { error , data} = await supabase.auth.signInWithPassword({ email, password });
    
    
    if (error) {
      setError(error.message);
      return;
    };

    // Fetch profile to get role
    const user = data?.user;
    
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if(profileError){
      console.log("Error fetching profile",profileError);
      throw profileError
      
    }
  
    if (profile?.role === "super_user") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard");
    }
  };

   const googleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  return(
     <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center">
        <img src="/priscilla-du-preez-XkKCui44iM0-unsplash 1.png" alt="Login" className="w-full h-full" />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center gap-6">
        <div className="space-y-5 flex flex-col items-center">
        <h4 className="font-bold text-lg">GREEDYGAME</h4>
        <h1 className="font-semibold text-4xl">Welcome to GGTodo</h1>
        <p className="text-sm">To get started, please sign in</p>
        <button onClick={googleLogin} className="flex items-center justify-center gap-3 font-medium ring-1 ring-black/8 rounded-lg w-96 py-3">
          <img src='/google.png' alt="google login" className="size-5"/>
          Log in with Google
        </button>
        </div>
        <form 
          onSubmit={handleLogin}
          className="flex flex-col gap-5 w-96"
        >
          <label className="flex flex-col gap-2">
            <p>Email Address <span className="text-red-500">*</span></p>
            <input 
              type="email"
              placeholder="Enter your registered email"
              className="py-3 rounded-lg px-2 ring-1 ring-black/8"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label className="flex flex-col gap-2" >
            <p>Password <span className="text-red-500">*</span></p>
            <input 
              type="password"
              placeholder="Enter your password"
              className="py-3 rounded-lg px-2 ring-1 ring-black/8 w-full"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>

          <div className="flex justify-between items-center space-x-4">
            <div className="flex gap-2">
               <input type="checkbox" /> 
               <p className="text-sm">Remember me</p>
            </div>

            <p className="text-sm">Forgot Password</p>

          </div>

          <button 
            type="submit"
            className="bg-green-600 text-white py-3 rounded-lg text-sm">
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  )
}

