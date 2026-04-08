import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';

// 假设你新建了这两个简单的组件
const ActiveTodos = () => <div>这是未完成任务页</div>;
const CompletedTodos = () => <div>这是已完成任务页</div>;

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* 导航栏：使用 Link 而不是 <a>，因为 <a> 会刷新页面 */}
    <nav style={{ display: 'flex', gap: '10px', padding: '20px' }}>
      <Link to="/">全部</Link>
      <Link to="/active">进行中</Link>
      <Link to="/completed">已完成</Link>
    </nav>

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/active" element={<App />} />
      <Route path="/completed" element={<App />} />
    </Routes>
  </BrowserRouter>
);