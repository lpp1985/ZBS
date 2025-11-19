
import React from 'react'
import { ArrowRight, Dna, Server, Network, BarChart3, FlaskConical, Beaker } from 'lucide-react'
import { useToast } from '@/components/ui'

interface Module {
  id: number
  title: string
  description: string
  icon: React.ElementType
  color: string
  badge: string
  stats: string
}

export default function FunctionModules() {
  const { toast } = useToast()

  const modules: Module[] = [
    {
      id: 1,
      title: '生信平台',
      description: '生物信息学分析工具集成平台',
      icon: Dna,
      color: 'from-blue-600 to-blue-800',
      badge: '生信平台',
      stats: '15个工具'
    },
    {
      id: 2,
      title: '代谢平台',
      description: '代谢组学分析与代谢物鉴定平台',
      icon: FlaskConical,
      color: 'from-green-600 to-green-800',
      badge: '代谢平台',
      stats: '12个分析流程'
    },
    {
      id: 3,
      title: '蛋白平台',
      description: '蛋白质组学与蛋白质结构分析平台',
      icon: Beaker,
      color: 'from-purple-600 to-purple-800',
      badge: '蛋白平台',
      stats: '8个专业工具'
    },
    {
      id: 4,
      title: '个人数据中心',
      description: '个人数据存储与管理空间',
      icon: Server,
      color: 'from-cyan-600 to-cyan-800',
      badge: '数据中心',
      stats: '2.5GB已用'
    },
    {
      id: 5,
      title: '综合资源',
      description: '数据库与工具资源集合',
      icon: Network,
      color: 'from-red-600 to-red-800',
      badge: '资源',
      stats: '50+资源'
    },
    {
      id: 6,
      title: '综合报表',
      description: '数据分析与统计报表',
      icon: BarChart3,
      color: 'from-gray-700 to-gray-900',
      badge: '报表',
      stats: '本月12份'
    }
  ]

  const handleModuleClick = (module: Module) => {
    toast({
      title: "访问模块",
      description: `正在打开 ${module.title}`
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {modules.map(module => {
        const Icon = module.icon
        return (
          <div 
            key={module.id} 
            className={`bg-gradient-to-br ${module.color} rounded-lg p-6 text-white card-hover cursor-pointer`} 
            onClick={() => handleModuleClick(module)}
          >
            <div className="flex items-center justify-between mb-4">
              <Icon className="h-8 w-8" />
              <span className="bg-black/20 px-2 py-1 rounded text-xs">{module.badge}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{module.title}</h3>
            <p className="text-sm mb-4">{module.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs">{module.stats}</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
