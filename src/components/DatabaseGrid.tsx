
import React, { useState, useEffect } from 'react'
import { ExternalLink, Database, Activity, Atom, Plus, MoreHorizontal } from 'lucide-react'
import { useToast } from '@/components/ui'

interface Database {
  id: number
  name: string
  description: string
  type: string
  icon: string
  url: string
  color: string
}

export default function DatabaseGrid() {
  const { toast } = useToast()
  const [databases, setDatabases] = useState<Database[]>([])

  // 模拟数据库数据
  const mockDatabases: Database[] = [
    {
      id: 1,
      name: 'NCBI',
      description: '美国国家生物技术信息中心',
      type: '综合型',
      icon: 'https://www.ncbi.nlm.nih.gov/favicon.ico',
      url: 'https://www.ncbi.nlm.nih.gov',
      color: 'blue'
    },
    {
      id: 2,
      name: 'KEGG',
      description: '京都基因与基因组百科全书',
      type: '代谢',
      icon: 'https://www.kegg.jp/favicon.ico',
      url: 'https://www.kegg.jp',
      color: 'green'
    },
    {
      id: 3,
      name: 'UniProt',
      description: '通用蛋白质资源数据库',
      type: '蛋白',
      icon: 'https://www.uniprot.org/favicon.ico',
      url: 'https://www.uniprot.org',
      color: 'purple'
    }
  ]

  useEffect(() => {
    // 在实际应用中，这里会从API获取数据
    setDatabases(mockDatabases)
  }, [])

  const handleDatabaseClick = (database: Database) => {
    toast({
      title: "访问数据库",
      description: `正在打开 ${database.name} 数据库`
    })
    // 在实际应用中，这里会打开新窗口或导航到数据库页面
    window.open(database.url, '_blank')
  }

  const handleAddDatabase = () => {
    toast({
      title: "添加数据库",
      description: "打开添加数据库对话框"
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case '综合型':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case '代谢':
        return 'bg-green-100 text-green-800 border-green-200'
      case '蛋白':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case '综合型':
        return <Database className="h-3 w-3" />
      case '代谢':
        return <Activity className="h-3 w-3" />
      case '蛋白':
        return <Atom className="h-3 w-3" />
      default:
        return <Database className="h-3 w-3" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">生物信息数据库</h3>
        <button 
          onClick={handleAddDatabase} 
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>添加数据库</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {databases.map(database => (
          <div 
            key={database.id} 
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-move card-hover relative" 
            onClick={() => handleDatabaseClick(database)}
          >
            {/* 类型标签 */}
            <div className="absolute top-2 right-2">
              <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(database.type)}`}>
                {getTypeIcon(database.type)}
                <span>{database.type}</span>
              </span>
            </div>

            {/* 数据库图标 */}
            <div className="flex justify-center mb-3 mt-6">
              <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center p-2 shadow-sm">
                <img 
                  src={database.icon} 
                  alt={database.name} 
                  className="w-full h-full object-contain" 
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iI0YzRjRGNiIvPgo8cGF0aCBkPSJNMzIgMTZDMjUuMzcyNiAxNiAyMCAyMS4zNzI2IDIwIDI4QzIwIDM0LjYyNzQgMjUuMzcyNiA0MCAzMiA0MEMzOC42Mjc0IDQwIDQ0IDM0LjYyNzQgNDQgMjhDNDQgMjEuMzcyNiAzOC42Mjc0IDE2IDMyIDE2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+'
                  }} 
                />
              </div>
            </div>

            {/* 数据库信息 */}
            <div className="text-center mb-3">
              <h4 className="font-semibold text-gray-900 mb-1">{database.name}</h4>
              <p className="text-xs text-gray-600">{database.description}</p>
            </div>

            {/* 访问按钮 */}
            <button 
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" 
              onClick={(e) => {
                e.stopPropagation()
                handleDatabaseClick(database)
              }}
            >
              <ExternalLink className="h-4 w-4" />
              <span className="text-sm font-medium">访问数据库</span>
            </button>
          </div>
        ))}

        {/* 更多数据库按钮 */}
        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <MoreHorizontal className="h-6 w-6 text-gray-400 mb-2" />
          <span className="text-sm text-gray-600">更多 (9)</span>
        </div>
      </div>
    </div>
  )
}
