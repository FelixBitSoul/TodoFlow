import { create } from 'zustand'
import { supabase } from '../lib/supabase'

const useTodoStore = create((set) => ({
  todos: [],
  loading: false,

  fetchTodos: async () => {
    set({ loading: true })
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) set({ todos: data })
    set({ loading: false })
  },

  addTodo: async (text) => {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ text }]) // user_id 由 RLS 自动填充
      .select()
    if (!error && data) {
      set((state) => ({ todos: [data[0], ...state.todos] }))
    }
  },

  toggleTodo: async (id, is_completed) => {
    const { error } = await supabase
      .from('todos')
      .update({ is_completed: !is_completed })
      .eq('id', id)
    if (!error) {
      set((state) => ({
        todos: state.todos.map(t => t.id === id ? { ...t, is_completed: !is_completed } : t)
      }))
    }
  },

  deleteTodo: async (id) => {
    const { error } = await supabase.from('todos').delete().eq('id', id)
    if (!error) {
      set((state) => ({ todos: state.todos.filter(t => t.id !== id) }))
    }
  }
}))

export default useTodoStore