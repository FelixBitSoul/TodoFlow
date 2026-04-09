import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Github, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' | 'signup'

  // GitHub 登录逻辑
  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) alert(error.message);
  };

  // 邮箱登录/注册逻辑
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } =
      authMode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.message);
    } else if (authMode === "signup") {
      alert("注册成功！如果开启了邮箱验证，请检查邮件。");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-950 p-4">
      <Card className="w-full max-w-[400px] shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">任务清单</CardTitle>
          <CardDescription>
            {authMode === "login" ? "登入你的账号以同步任务" : "创建一个新账号"}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* 第三方登录区域 */}
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              onClick={handleGithubLogin}
              className="w-full"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub 快速登录
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                或者通过邮箱
              </span>
            </div>
          </div>

          {/* 邮箱表单区域 */}
          <form onSubmit={handleEmailAuth} className="space-y-3">
            <div className="space-y-1">
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Input
                type="password"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {authMode === "login" ? "登录" : "注册"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            variant="link"
            className="text-xs text-muted-foreground"
            onClick={() =>
              setAuthMode(authMode === "login" ? "signup" : "login")
            }
          >
            {authMode === "login"
              ? "还没有账号？立即注册"
              : "已有账号？返回登录"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
