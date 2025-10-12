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

    //  Always fetch extended profile from `profiles` table
    const { data: profile } = await supabase
      .from("profiles")
      .select("name, role, avatar_url")
      .eq("id", data.user.id)
      .single();

    set({
      user: {
        ...data.user,
        // Override with DB values (more up-to-date)
        user_metadata: {
          ...data.user.user_metadata,
          name: profile?.name || data.user.user_metadata.name || "",
          role: profile?.role || data.user.user_metadata.role || "user",
          avatar_url: profile?.avatar_url || ""
        }
      },
      role: profile?.role || "user",
      loading: false
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