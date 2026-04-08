function App() {
  return (
    // bg-gray-100: 背景灰; min-h-screen: 最小高度占满全屏; py-10: 上下内边距
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      {/* max-w-md: 最大宽度; mx-auto: 水平居中; shadow-lg: 大阴影; rounded-xl: 超圆角 */}
      <div className="max-w-md mx-auto bg-white shadow-2xl rounded-2xl p-8">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          我的待办 📝
        </h2>

        <div className="flex gap-2 mb-6">
          {/* 给输入框加聚焦光晕：className="border-2 border-gray-100 focus:border-blue-500
           focus:ring-4 focus:ring-blue-500/20 outline-none transition-all" */}
          <input 
            type="text" 
            className="flex-1 border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all"
            placeholder="新任务..."
          />
          {/* className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white px-4 py-2 rounded-lg */}
          <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white px-4 py-2 rounded-lg">
            添加
          </button>
        </div>

        {/* 列表部分 */}
        <ul className="space-y-3">
          <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
            <span className="text-gray-700">学习 Tailwind</span>
            <button className="text-red-400 hover:text-red-600 text-sm">删除</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;