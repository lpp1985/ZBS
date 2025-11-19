
import React from 'react'
import { ListTodo, Mail, Bell, Wallet } from 'lucide-react'

interface User {
  name: string
  role?: string
  avatar?: string
}

interface SidebarProps {
  user: User
  balance: number
  notifications: number
  messages: number
  reminders: number
}

export default function Sidebar({ user, balance, notifications, messages, reminders }: SidebarProps) {
  return (
    <aside className="w-64 bg-white shadow-lg overflow-y-auto">
      <div className="p-4">
        {/* 用户信息卡片 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white mb-4">
          <div className="flex items-center space-x-3">
            <img 
              className="h-12 w-12 rounded-full border-2 border-white" 
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'} 
              alt="用户头像" 
            />
            <div>
              <h3 className="font-semibold">{user?.name || '用户'}</h3>
              <p className="text-xs opacity-90">{user?.role || '普通用户'}</p>
            </div>
          </div>
        </div>

        {/* 剩余机时 */}
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg p-4 text-white mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm">剩余机时</span>
            <Wallet className="h-4 w-4" />
          </div>
          <div className="text-2xl font-bold mt-2">{balance?.toFixed(1) || '0.0'} 机时</div>
          <div className="text-xs opacity-90 mt-1">上次分配: 2024-01-15</div>
        </div>

        {/* 功能按钮 */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="flex items-center space-x-3">
              <ListTodo className="h-4 w-4" />
              <span>我的代办</span>
            </div>
            {notifications > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{notifications}</span>
            )}
          </button>

          <button className="w-full flex items-center justify-between p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4" />
              <span>我的消息</span>
            </div>
            {messages > 0 && (
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">{messages}</span>
            )}
          </button>

          <button className="w-full flex items-center justify-between p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
            <div className="flex items-center space-x-3">
              <Bell className="h-4 w-4" />
              <span>我的提醒</span>
            </div>
            {reminders > 0 && (
              <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full">{reminders}</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  )
}
