
import React, { useState } from 'react'
import { Bell, ChevronDown, Menu, X } from 'lucide-react'

interface User {
  name: string
  role?: string
  avatar?: string
}

interface HeaderProps {
  user: User
  notifications: number
  onUserChange: (user: User) => void
}

export default function Header({ user, notifications, onUserChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userRole, setUserRole] = useState('User')

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(e.target.value)
    // 这里可以添加角色切换的逻辑
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 左侧品牌 */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">数据中心</h1>
              <p className="text-xs text-gray-500">算力管理平台</p>
            </div>
          </div>

          {/* 中间导航菜单 - 桌面版 */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="block px-3 py-2 text-blue-600 hover:text-blue-800 font-medium">集成门户</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">生信平台</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">代谢平台</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">蛋白平台</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">资源申请</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">业务管理中心</a>
            </nav>

          {/* 右侧用户区域 */}
          <div className="flex items-center space-x-4">
            {/* 通知铃铛 */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Bell className="h-5 w-5" />
              {notifications > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
            </button>

            {/* 用户头像和下拉菜单 */}
            <div className="relative">
              <button className="flex items-center space-x-3 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <img 
                  className="h-8 w-8 rounded-full" 
                  src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'} 
                  alt="用户头像" 
                />
                <span className="hidden md:block font-medium text-gray-700">{user?.name || '用户'}</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            {/* 身份切换 */}
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm text-gray-600">身份:</span>
              <select 
                className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                value={userRole} 
                onChange={handleRoleChange}
              >
                <option value="User">User</option>
                <option value="Guest">Guest</option>
                <option value="Administrator">Administrator</option>
              </select>
            </div>

            {/* 移动端菜单按钮 */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-gray-900" 
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-blue-600 hover:text-blue-800 font-medium">集成门户</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">生信平台</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">代谢平台</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">蛋白平台</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">资源申请</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">业务管理中心</a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-4 flex items-center space-x-2">
                <span className="text-sm text-gray-600">身份:</span>
                <select 
                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={userRole} 
                  onChange={handleRoleChange}
                >
                  <option value="User">User</option>
                  <option value="Guest">Guest</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
