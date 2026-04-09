import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import TodoList from './components/TodoList' // 之前的业务代码封装
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    // 检查当前是否有会话
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // 监听登录状态变化（登录、登出、密码修改等）
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return <Auth />
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={() => supabase.auth.signOut()}>
          <LogOut className="mr-2 h-4 w-4" /> 退出登录
        </Button>
      </div>
      <TodoList />
    </div>
  )
}