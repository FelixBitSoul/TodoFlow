# My React App

一个基于 React + Vite 的现代化待办事项应用，集成 Supabase 后端和用户认证功能。

## 🚀 技术栈

- **前端框架**: React 19.2
- **构建工具**: Vite 8.0
- **样式方案**: Tailwind CSS 4.2 + shadcn/ui
- **状态管理**: Zustand 5.0
- **路由管理**: React Router 7.14
- **后端服务**: Supabase (PostgreSQL + Auth)
- **图标库**: Lucide React
- **主题管理**: Next Themes

## 📋 功能特性

- ✅ 用户认证（Supabase Auth）
- ✅ 创建、编辑、删除待办事项
- ✅ 深色/浅色主题切换
- ✅ 响应式设计
- ✅ 实时数据同步

## 🛠️ 快速开始

### 前置要求

- Node.js 16.0+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 环境配置

创建 `.env.local` 文件，配置 Supabase 凭证：

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173`

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 📁 项目结构

```
src/
├── components/
│   ├── Auth.jsx           # 认证组件
│   ├── TodoList.jsx       # 待办事项列表
│   ├── theme-provider.jsx # 主题提供者
│   ├── mode-toggle.jsx    # 主题切换器
│   └── ui/               # shadcn/ui 组件集合
├── lib/
│   ├── supabase.js       # Supabase 客户端配置
│   └── utils.js          # 工具函数
├── store/
│   └── useTodoStore.js   # Zustand 状态管理
├── App.jsx               # 主应用组件
└── main.jsx              # 应用入口
```

## 🔐 安全提示

- **不要**将 `.env.local` 提交到版本控制中
- Supabase API 密钥应通过环境变量管理
- 生产环境应使用权限受限的 API 密钥

## 📝 命令参考

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run lint` | 运行 ESLint 检查 |

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
