import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

const TodoStore = create((set, get) => ({
  todos: [],
  loading: false,

  fetchTodos: async () => {
    set({ loading: true });
    const user = (await supabase.auth.getUser()).data.user;
    const { data } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id)
      .order("due_at", { ascending: true });
    set({ todos: data || [], loading: false });
  },

  addTodo: async (todo) => {
    const user = (await supabase.auth.getUser()).data.user;
    await supabase.from("todos").insert([{ ...todo, user_id: user.id }]);
    get().fetchTodos();
  },

  updateTodo: async (id, updates) => {
    await supabase.from("todos").update(updates).eq("id", id);
    get().fetchTodos();
  },

  deleteTodo: async (id) => {
    await supabase.from("todos").delete().eq("id", id);
    get().fetchTodos();
  },
}));

export default TodoStore;
