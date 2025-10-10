import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

const AuthStore = create((set) => ({
  user: null,
  role: "user",
  loading: true,

  fetchUser: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data?.user) return set({ user: null, role: "user", loading: false });

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    set({
      user: data.user,
      role: profile?.role || "user",
      loading: false,
    });
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, role: "user" });
  },
}));


export default AuthStore;