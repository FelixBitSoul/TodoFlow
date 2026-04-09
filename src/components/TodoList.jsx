import { useEffect, useState, useMemo } from 'react'
import useTodoStore from '../store/useTodoStore'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Trash2, 
  Loader2, 
  Plus, 
  Inbox, 
  CheckCircle2, 
  Circle, 
  ListTodo,
  Sparkles
} from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'

export default function TodoList() {
  const [text, setText] = useState('')
  const { todos, loading, fetchTodos, addTodo, toggleTodo, deleteTodo } = useTodoStore()

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  // 计算进度
  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter(t => t.is_completed).length
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)
    return { total, completed, percentage }
  }, [todos])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    await addTodo(text)
    setText('')
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-black py-12 px-4 transition-colors duration-500">
      <div className="max-w-xl mx-auto space-y-8">
        
        {/* Header Section: 标题与进度 */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-xl">
                <ListTodo className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                TodoFlow
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium bg-slate-200/50 dark:bg-slate-800/50 px-3 py-1 rounded-full text-slate-600 dark:text-slate-400">
              <Sparkles className="h-3 w-3 text-amber-500" />
              已完成 {stats.percentage}%
            </div>
          </div>

          {/* 进度条精装修 */}
          <div className="space-y-2">
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${stats.percentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.header>

        {/* Input Section: 悬浮卡片感 */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleAdd} className="flex gap-3 p-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50">
            <Input
              placeholder="添加一个新任务..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border-none focus-visible:ring-0 text-base placeholder:text-slate-400"
            />
            <Button type="submit" disabled={!text.trim()} className="rounded-xl px-6 shadow-lg shadow-primary/20 transition-all active:scale-95">
              <Plus className="h-5 w-5 mr-1" />
              添加
            </Button>
          </form>
        </motion.section>

        {/* List Section */}
        <section className="space-y-3 relative">
          {loading && todos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary/60" />
              <p className="text-sm font-medium animate-pulse">正在同步云端数据...</p>
            </div>
          ) : todos.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/20"
            >
              <div className="bg-slate-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Inbox className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-slate-900 dark:text-slate-100 font-semibold">所有事情都办完了</h3>
              <p className="text-slate-500 text-sm mt-1">享受你的自由时光吧！</p>
            </motion.div>
          ) : (
            <AnimatePresence initial={false} mode="popLayout">
              {todos.map((todo) => (
                <motion.div
                  key={todo.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
                >
                  <Card className={`group p-4 flex items-center justify-between border-slate-200/60 dark:border-slate-800/60 transition-all hover:shadow-md hover:border-primary/20 ${todo.is_completed ? 'bg-slate-50/50 dark:bg-slate-900/40' : 'bg-white dark:bg-slate-900'}`}>
                    <div className="flex items-center gap-4 flex-1">
                      <div 
                        className="cursor-pointer transition-transform active:scale-125"
                        onClick={() => toggleTodo(todo.id, todo.is_completed)}
                      >
                        {todo.is_completed ? (
                          <CheckCircle2 className="h-6 w-6 text-green-500 fill-green-500/10" />
                        ) : (
                          <Circle className="h-6 w-6 text-slate-300 dark:text-slate-600 hover:text-primary transition-colors" />
                        )}
                      </div>
                      <span className={`text-base font-medium transition-all duration-300 ${
                        todo.is_completed 
                        ? "line-through text-slate-400 opacity-60 italic" 
                        : "text-slate-700 dark:text-slate-200"
                      }`}>
                        {todo.text}
                      </span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-destructive hover:bg-destructive/10 transition-all rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </section>
        
        {/* Footer Info */}
        {!loading && todos.length > 0 && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs text-slate-400 font-medium"
          >
            提示：点击圆圈快速标记完成
          </motion.p>
        )}
      </div>
    </div>
  )
}