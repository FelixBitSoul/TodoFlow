import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    setLoading(false)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-950">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>任务清单登录</CardTitle>
          <CardDescription>请输入你在 Supabase 创建的账号</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input type="email" placeholder="邮箱" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input type="password" placeholder="密码" value={password} onChange={e => setPassword(e.target.value)} required />
            <Button className="w-full" disabled={loading}>
              {loading ? "登录中..." : "登录"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}