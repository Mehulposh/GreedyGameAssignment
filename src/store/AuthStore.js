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

    // ✅ Always fetch extended profile from `profiles` table
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

  refetchProfile: async () => {
    const { user } = get();
    if (!user?.id) return;

    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role, avatar_url") // add any fields you need
        .eq("id", user.id)
        .single();

      if (!error && profile) {
        set({
          role: profile.role || "user",
          // Note: we don't update `user` here, but you could extend `user` if needed
        });

        // Optional: update a separate `profile` field in store
      }
    } catch (err) {
      console.error("Failed to refetch profile", err);
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, role: "user" });
  },
}));


export default AuthStore;