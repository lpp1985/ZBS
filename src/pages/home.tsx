console.log('home.tsx is built and running')

import React, { useState, useEffect } from 'react'
import { useToast } from '@/components/ui'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import DatabaseGrid from '@/components/DatabaseGrid'
import FunctionModules from '@/components/FunctionModules'
import GanttChart from '@/components/GanttChart'
import ServerStatusGrid from '@/components/ServerStatusGrid'

interface User {
  userId: string
  type: string
  name: string
  nickName?: string
  avatarUrl?: string
}

interface CloudInstance {
  callFunction: (params: { name: string; data: any }) => Promise<any>
  getCloudInstance: () => Promise<any>
}

interface Utils {
  navigateTo: (params: { pageId: string; params: any }) => void
  redirectTo: (params: { pageId: string; params: any }) => void
  navigateBack: () => void
}

interface Page {
  dataset: {
    params: Record<string, string>
  }
}

interface Auth {
  currentUser: User | null
}

interface Cloud {
  callFunction: (params: { name: string; data: any }) => Promise<any>
  getCloudInstance: () => Promise<CloudInstance>
}

interface Props {
  $w: {
    auth: Auth
    utils: Utils
    page: Page
    cloud: Cloud
  }
  className?: string
  style?: React.CSSProperties
}

export default function Home(props: Props) {
  const { toast } = useToast()
  const { $w, className, style } = props
  const [user, setUser] = useState<User>($w?.auth?.currentUser || {
    name: '张三',
    role: '普通用户',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'
  } as User)
  const [balance, setBalance] = useState(1234.56)
  const [notifications, setNotifications] = useState(5)
  const [messages, setMessages] = useState(12)
  const [reminders, setReminders] = useState(3)

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      // 模拟数据变化
      setBalance(prev => prev + (Math.random() - 0.5) * 10)
      setNotifications(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  // 模拟API调用获取数据
  const fetchBioDatabases = async () => {
    try {
      // 在低代码平台中，这里会调用平台提供的数据源API
      const response = await fetch('/api/bio-databases')
      if (!response.ok) {
        throw new Error('获取生物数据库数据失败')
      }
      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error('获取生物数据库数据失败:', error)
      toast({
        title: "数据加载失败",
        description: "无法获取生物数据库数据，请稍后重试",
        variant: "destructive"
      })
      return []
    }
  }

  const fetchServers = async () => {
    try {
      const response = await fetch('/api/servers')
      if (!response.ok) {
        throw new Error('获取服务器信息失败')
      }
      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error('获取服务器信息失败:', error)
      toast({
        title: "数据加载失败",
        description: "无法获取服务器信息，请稍后重试",
        variant: "destructive"
      })
      return []
    }
  }

  return (
    <div className="min-h-screen bg-gray-50" style={style}>
      {/* 顶部导航栏 */}
      <Header user={user} notifications={notifications} onUserChange={setUser} />

      <div className="flex h-screen pt-16">
        {/* 左侧边栏 */}
        <Sidebar 
          user={user} 
          balance={balance} 
          notifications={notifications} 
          messages={messages} 
          reminders={reminders} 
        />

        {/* 主内容区域 */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            {/* 生物信息数据库 */}
            <DatabaseGrid />

            {/* 四大功能模块 */}
            <FunctionModules />

            {/* 服务器任务甘特图 */}
            <GanttChart />

            {/* 服务器状态监控 */}
            <ServerStatusGrid />
          </div>
        </main>
      </div>
    </div>
  )
}
