import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // 1. 引入持久化中间件

// 2. 用 persist() 把原来的配置对象包裹起来
const useTodoStore = create(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text) => set((state) => ({
        todos: [...state.todos, { id: Date.now(), text, completed: false }]
      })),
      deleteTodo: (id) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      })),
      toggleTodo: (id) => set((state) => ({
        todos: state.todos.map(todo => 
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      })),
    }),
    {
      name: 'todo-storage', // 存储在 LocalStorage 中的 key 名称
    }
  )
)

export default useTodoStore;