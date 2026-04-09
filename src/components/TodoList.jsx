import { useEffect, useState } from 'react'
import useTodoStore from '../store/useTodoStore'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Loader2, Plus, Inbox } from "lucide-react"
// 1. 引入 Framer Motion
import { motion, AnimatePresence } from 'framer-motion'

// 定义动画变体 (Variants)
const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // 初始状态：透明，下方20px
  visible: { // 入场状态：不透明，回到原位
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  },
  exit: { // 退场状态：透明，向右滑出
    opacity: 0, 
    x: 50, 
    scale: 0.9,
    transition: { duration: 0.2 } 
  }
}

export default function TodoList() {
  const [text, setText] = useState('')
  const { todos, loading, fetchTodos, addTodo, toggleTodo, deleteTodo } = useTodoStore()

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    await addTodo(text)
    setText('')
  }

  return (
    <div className="max-w-xl mx-auto space-y-8 py-12 px-4">
      {/* 头部输入区 - 加个简单的淡入 */}
      <motion.section 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          我的任务清单
        </h2>
        <form onSubmit={handleAdd} className="flex gap-2">
          <Input
            placeholder="今天打算做什么？"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 shadow-sm"
          />
          <Button type="submit" disabled={!text.trim()} className="shrink-0">
            <Plus className="h-4 w-4 mr-1" /> 添加任务
          </Button>
        </form>
      </motion.section>

      {/* 列表展示区 */}
      <section className="space-y-3 relative min-h-[200px]">
        {loading && todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
            <p>正在同步云端数据...</p>
          </div>
        ) : todos.length === 0 ? (
          // 空状态动画
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 border-2 border-dashed rounded-2xl text-muted-foreground bg-muted/30 flex flex-col items-center gap-4"
          >
            <Inbox className="h-12 w-12 text-muted-foreground/60" />
            <div className="space-y-1">
              <p className="font-medium text-foreground">这就做完了？</p>
              <p className="text-sm">暂无待办任务，开启高效的一天吧！</p>
            </div>
          </motion.div>
        ) : (
          // 2. 使用 AnimatePresence 处理退场
          <AnimatePresence initial={false}>
            {todos.map((todo) => (
              // 3. 将 Card 替换为 motion.div，应用 layout 和 variants
              <motion.div
                key={todo.id}
                layout // 关键：开启布局动画
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.01 }} // Hover 时微微放大
                whileTap={{ scale: 0.99 }}  // 点击时微微缩小
                className="will-change-transform" // 性能优化
              >
                <Card className="p-4 flex items-center justify-between group hover:shadow-md transition-shadow border bg-card">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={`todo-${todo.id}`}
                      checked={todo.is_completed}
                      onCheckedChange={() => toggleTodo(todo.id, todo.is_completed)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className={`text-sm font-medium transition-all cursor-pointer ${
                        todo.is_completed ? "line-through text-muted-foreground opacity-60" : ""
                      }`}
                    >
                      {todo.text}
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 transition-all shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </section>
    </div>
  )
}