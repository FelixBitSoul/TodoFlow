import { useEffect, useState } from 'react'
import useTodoStore from '../store/useTodoStore'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Loader2, Plus } from "lucide-react"

export default function TodoList() {
  const [text, setText] = useState('')
  const { todos, loading, fetchTodos, addTodo, toggleTodo, deleteTodo } = useTodoStore()

  // 1. 初始化拉取数据
  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  // 2. 处理添加
  const handleAdd = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    await addTodo(text)
    setText('')
  }

  return (
    <div className="max-w-xl mx-auto space-y-8 py-8">
      {/* 头部输入区 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">我的任务</h2>
        <form onSubmit={handleAdd} className="flex gap-2">
          <Input
            placeholder="今天打算做什么？"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!text.trim()}>
            <Plus className="h-4 w-4 mr-1" /> 添加
          </Button>
        </form>
      </section>

      {/* 列表展示区 */}
      <section className="space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <p>正在同步云端数据...</p>
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-xl text-muted-foreground">
            暂无任务，开启高效的一天吧！
          </div>
        ) : (
          todos.map((todo) => (
            <Card key={todo.id} className="p-4 flex items-center justify-between group hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.is_completed}
                  onCheckedChange={() => toggleTodo(todo.id, todo.is_completed)}
                />
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`text-sm font-medium transition-all ${
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
                className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 transition-all"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </Card>
          ))
        )}
      </section>
    </div>
  )
}