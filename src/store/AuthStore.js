import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

const AuthStore = create((set) => ({
  user: null,
  role: "user",
  loading: true,

  fetchUser: async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error || !data?.user) {
      return set({ user: null, role: "user", loading: false });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profileError) {
      // console.error("Error fetching profile:", profileError);
      // Still set the user even if profile fetch fails
      return set({
        user: data.user,
        role: "user", // fallback role
        loading: false,
      });
    }

    set({
      user: data.user,
      role: profile?.role || "user",
      loading: false,
    });
  } catch (err) {
    console.error("Error in fetchUser:", err);
    set({ user: null, role: "user", loading: false });
  }
},

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, role: "user" });
  },
}));


export default AuthStore;