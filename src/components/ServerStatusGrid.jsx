// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ChevronDown, ChevronUp, Server, Cloud, AlertTriangle } from 'lucide-react';

export default function ServerStatusGrid() {
  const {
    toast
  } = useToast();
  const [servers, setServers] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    internalNormal: false,
    internalError: false,
    rentalNormal: false,
    rentalError: false
  });

  // 模拟服务器数据 - 增加更多数据以展示展开/收起和拖拽功能
  const mockServers = [
    // 组内计算资源 - 正常机器
    {
      id: 1,
      name: '组内服务器 A',
      status: 'running',
      cpu: 45,
      memory: 62,
      statusText: '运行中',
      statusColor: 'text-blue-600',
      type: 'internal'
    },
    {
      id: 2,
      name: '组内服务器 B',
      status: 'idle',
      cpu: 12,
      memory: 28,
      statusText: '空闲',
      statusColor: 'text-green-600',
      type: 'internal'
    },
    {
      id: 3,
      name: '组内服务器 C',
      status: 'full',
      cpu: 89,
      memory: 94,
      statusText: '资源满',
      statusColor: 'text-yellow-600',
      type: 'internal'
    },
    {
      id: 5,
      name: '组内服务器 E',
      status: 'running',
      cpu: 35,
      memory: 58,
      statusText: '运行中',
      statusColor: 'text-blue-600',
      type: 'internal'
    },
    {
      id: 6,
      name: '组内服务器 F',
      status: 'idle',
      cpu: 8,
      memory: 22,
      statusText: '空闲',
      statusColor: 'text-green-600',
      type: 'internal'
    },
    
    // 组内计算资源 - 故障机器
    {
      id: 4,
      name: '组内服务器 D',
      status: 'error',
      cpu: null,
      memory: null,
      statusText: '故障',
      statusColor: 'text-red-600',
      type: 'internal'
    },
    {
      id: 7,
      name: '组内服务器 G',
      status: 'error',
      cpu: null,
      memory: null,
      statusText: '故障',
      statusColor: 'text-red-600',
      type: 'internal'
    },
    {
      id: 13,
      name: '组内服务器 H',
      status: 'error',
      cpu: null,
      memory: null,
      statusText: '故障',
      statusColor: 'text-red-600',
      type: 'internal'
    },
    {
      id: 14,
      name: '组内服务器 I',
      status: 'error',
      cpu: null,
      memory: null,
      statusText: '故障',
      statusColor: 'text-red-600',
      type: 'internal'
    },
    {
      id: 15,
      name: '组内服务器 J',
      status: 'error',
      cpu: null,
      memory: null,
      statusText: '故障',
      statusColor: 'text-red-600',
      type: 'internal'
    },
    
    // 租用计算资源 - 正常机器
    {
      id: 8,
      name: '租用服务器 A',
      status: 'running',
      cpu: 65,
      memory: 72,
      statusText: '运行中',
      statusColor: 'text-blue-600',
      type: 'rental'
    },
    {
      id: 9,
      name: '租用服务器 B',
      status: 'idle',
      cpu: 15,
      memory: 32,
      statusText: '空闲',
      statusColor: 'text-green-600',
      type: 'rental'
    },
    {
      id: 10,
      name: '租用服务器 C',
      status: 'full',
      cpu: 92,
      memory: 96,
      statusText: '资源满',
      statusColor: 'text-yellow-600',
      type: 'rental'
    },
    {
      id: 12,
      name: '租用服务器 E',
      status: 'running',
      cpu: 42,
      memory: 65,
      statusText: '运行中',
      statusColor: 'text-blue-600',
      type: 'rental'
    },
    
    // 租用计算资源 - 故障机器
    {
      id: 11,
      name: '租用服务器 D',
      status: 'error',
      cpu: null,
      memory: null,
      statusText: '故障',
      statusColor: 'text-red-600',
      type: 'rental'
    },
    {
      id: 16,
      name: '租用服务器 E',
      status: 'error',
      cpu: null,
      memory: null,
      statusText: '故障',
      statusColor: 'text-red-600',
      type: 'rental'
    },
    {
      id: 17,
      name: '租用服务器 F',
      status: 'error',
      cpu: null,
      memory: null,
      statusText: '故障',
      statusColor: 'text-red-600',
      type: 'rental'
    },
    {
      id: 18,
      name: '租用服务器 G',
      status: 'error',
      cpu: null,
      memory: null,
      statusText: '故障',
      statusColor: 'text-red-600',
      type: 'rental'
    }
  ];

  useEffect(() => {
    // 在实际应用中，这里会从API获取数据
    setServers(mockServers);

    // 模拟实时数据更新
    const interval = setInterval(() => {
      setServers(prevServers => prevServers.map(server => {
        if (server.status === 'error') return server;
        return {
          ...server,
          cpu: Math.max(0, Math.min(100, server.cpu + Math.floor(Math.random() * 11) - 5)),
          memory: Math.max(0, Math.min(100, server.memory + Math.floor(Math.random() * 11) - 5))
        };
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleServerClick = server => {
    toast({
      title: "服务器详情",
      description: `查看 ${server.name} 的详细信息`
    });
  };

  const getStatusIndicator = status => {
    switch (status) {
      case 'running':
        return 'bg-blue-500';
      case 'idle':
        return 'bg-green-500';
      case 'full':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getCpuColor = cpu => {
    if (cpu === null) return 'bg-gray-400';
    if (cpu < 50) return 'bg-blue-500';
    if (cpu < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getMemoryColor = memory => {
    if (memory === null) return 'bg-gray-400';
    if (memory < 50) return 'bg-green-500';
    if (memory < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // 处理拖拽开始
  const handleDragStart = (e, server) => {
    setDraggedItem(server);
    // 设置拖拽数据
    e.dataTransfer.setData('text/plain', JSON.stringify(server));
  };

  // 处理拖拽结束
  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  // 处理拖拽经过
  const handleDragOver = (e, server) => {
    e.preventDefault();
    // 只允许相同类型和状态组的服务器之间拖拽
    if (draggedItem && 
        draggedItem.type === server.type && 
        (draggedItem.status === 'error') === (server.status === 'error')) {
      setDragOverItem(server);
    }
  };

  // 处理拖拽离开
  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  // 处理放置
  const handleDrop = (e, targetServer) => {
    e.preventDefault();
    
    if (draggedItem && 
        draggedItem.type === targetServer.type && 
        (draggedItem.status === 'error') === (targetServer.status === 'error')) {
      
      setServers(prevServers => {
        const newServers = [...prevServers];
        const draggedIndex = newServers.findIndex(s => s.id === draggedItem.id);
        const targetIndex = newServers.findIndex(s => s.id === targetServer.id);
        
        // 交换两个服务器的位置
        if (draggedIndex !== -1 && targetIndex !== -1) {
          [newServers[draggedIndex], newServers[targetIndex]] = [newServers[targetIndex], newServers[draggedIndex]];
        }
        
        return newServers;
      });
    }
    
    setDraggedItem(null);
    setDragOverItem(null);
  };

  // 切换展开/收起状态
  const toggleExpanded = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // 获取服务器项目的样式类
  const getItemClass = (server) => {
    let baseClass = 'border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-move relative';
    
    // 拖拽时的样式
    if (draggedItem && draggedItem.id === server.id) {
      baseClass += ' opacity-50 shadow-lg scale-105';
    }
    
    // 拖拽经过时的样式
    if (dragOverItem && dragOverItem.id === server.id && draggedItem && draggedItem.id !== server.id) {
      baseClass += ' border-2 border-blue-500 shadow-md bg-blue-50';
    }
    
    return baseClass;
  };

  // 过滤服务器数据
  const getVisibleServers = (type, isError, limit = 2) => {
    const filtered = servers.filter(server => 
      server.type === type && (server.status === 'error') === isError
    );
    
    // 根据展开状态决定显示数量
    const sectionKey = `${type}${isError ? 'Error' : 'Normal'}`;
    return expandedSections[sectionKey] ? filtered : filtered.slice(0, limit);
  };

  // 获取隐藏的服务器数量
  const getHiddenServerCount = (type, isError) => {
    const total = servers.filter(server => 
      server.type === type && (server.status === 'error') === isError
    ).length;
    
    const visibleCount = 2; // 默认显示2个
    return Math.max(0, total - visibleCount);
  };

  return <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">服务器状态监控</h3>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse-slow"></span>
          <span className="text-sm text-gray-600">实时更新</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 组内计算资源 */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
            <Server className="w-5 h-5 mr-2 text-blue-600" />
            组内计算资源
          </h4>
          
          {/* 正常机器行 */}
          <div className="mb-4 relative">
            <div className="absolute top-0 right-0 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              正常机器
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-2">
              {getVisibleServers('internal', false).map(server => (
                <div 
                    key={server.id} 
                    className={server.status === 'error' ? 
                      `${getItemClass(server)} bg-red-50 border-red-200 hover:border-red-300 transition-all duration-200 animate-pulse-slow` : 
                      getItemClass(server)
                    }
                    draggable
                    onDragStart={(e) => handleDragStart(e, server)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => handleDragOver(e, server)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, server)}
                    onClick={() => handleServerClick(server)}
                  >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-700 truncate">{server.name}</span>
                    <span className={`w-2 h-2 ${getStatusIndicator(server.status)} rounded-full`}></span>
                  </div>

                  <div className="space-y-1">
                    {/* CPU使用率 */}
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">CPU</span>
                      <span className="font-medium">
                        {server.cpu !== null ? `${server.cpu}%` : '--'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`${getCpuColor(server.cpu)} h-1.5 rounded-full transition-all duration-300`} 
                        style={{
                          width: server.cpu !== null ? `${server.cpu}%` : '100%'
                        }}
                      ></div>
                    </div>

                    {/* 内存使用率 */}
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">内存</span>
                      <span className="font-medium">
                        {server.memory !== null ? `${server.memory}%` : '--'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`${getMemoryColor(server.memory)} h-1.5 rounded-full transition-all duration-300`} 
                        style={{
                          width: server.memory !== null ? `${server.memory}%` : '100%'
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <span className={`text-xs ${server.statusColor} font-medium`}>
                      {server.statusText}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 展开/收起按钮 */}
            {getHiddenServerCount('internal', false) > 0 && (
              <button 
                className="absolute bottom-0 right-0 flex items-center text-xs text-blue-600 hover:text-blue-800"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpanded('internalNormal');
                }}
              >
                {expandedSections.internalNormal ? (
                  <>
                    <ChevronUp className="w-3 h-3 mr-1" />
                    收起 {getHiddenServerCount('internal', false)} 台机器
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3 mr-1" />
                    展开 {getHiddenServerCount('internal', false)} 台机器
                  </>
                )}
              </button>
            )}
          </div>

          {/* 故障机器行 */}
          <div className="relative">
            <div className="absolute top-0 right-0 bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-medium flex items-center">
              <AlertTriangle className="w-3 h-3 mr-1" />
              故障机器
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-2">
              {getVisibleServers('internal', true).map(server => (
                <div 
                  key={server.id} 
                  className={getItemClass(server)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, server)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(e, server)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, server)}
                  onClick={() => handleServerClick(server)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-700 truncate">{server.name}</span>
                    <span className={`w-2 h-2 ${getStatusIndicator(server.status)} rounded-full`}></span>
                  </div>

                  <div className="space-y-1">
                    {/* CPU使用率 */}
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">CPU</span>
                      <span className="font-medium">--</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-gray-400 h-1.5 rounded-full"
                      ></div>
                    </div>

                    {/* 内存使用率 */}
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">内存</span>
                      <span className="font-medium">--</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-gray-400 h-1.5 rounded-full"
                      ></div>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <span className={`text-xs ${server.statusColor} font-medium`}>
                      {server.statusText}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 展开/收起按钮 */}
            {getHiddenServerCount('internal', true) > 0 && (
              <button 
                className="absolute bottom-0 right-0 flex items-center text-xs text-red-600 hover:text-red-800 bg-red-50 px-2 py-1 rounded font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpanded('internalError');
                }}
              >
                {expandedSections.internalError ? (
                  <>
                    <ChevronUp className="w-3 h-3 mr-1" />
                    收起 {getHiddenServerCount('internal', true)} 台机器
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3 mr-1" />
                    展开 {getHiddenServerCount('internal', true)} 台机器
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* 租用计算资源 */}
        <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
            <Cloud className="w-5 h-5 mr-2 text-purple-600" />
            租用计算资源
          </h4>
          
          {/* 正常机器行 */}
          <div className="mb-4 relative">
            <div className="absolute top-0 right-0 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              正常机器
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-2">
              {getVisibleServers('rental', false).map(server => (
                <div 
                  key={server.id} 
                  className={getItemClass(server)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, server)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(e, server)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, server)}
                  onClick={() => handleServerClick(server)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-700 truncate">{server.name}</span>
                    <span className={`w-2 h-2 ${getStatusIndicator(server.status)} rounded-full`}></span>
                  </div>

                  <div className="space-y-1">
                    {/* CPU使用率 */}
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">CPU</span>
                      <span className="font-medium">
                        {server.cpu !== null ? `${server.cpu}%` : '--'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`${getCpuColor(server.cpu)} h-1.5 rounded-full transition-all duration-300`} 
                        style={{
                          width: server.cpu !== null ? `${server.cpu}%` : '100%'
                        }}
                      ></div>
                    </div>

                    {/* 内存使用率 */}
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">内存</span>
                      <span className="font-medium">
                        {server.memory !== null ? `${server.memory}%` : '--'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`${getMemoryColor(server.memory)} h-1.5 rounded-full transition-all duration-300`} 
                        style={{
                          width: server.memory !== null ? `${server.memory}%` : '100%'
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <span className={`text-xs ${server.statusColor} font-medium`}>
                      {server.statusText}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 展开/收起按钮 */}
            {getHiddenServerCount('rental', false) > 0 && (
              <button 
                className="absolute bottom-0 right-0 flex items-center text-xs text-blue-600 hover:text-blue-800"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpanded('rentalNormal');
                }}
              >
                {expandedSections.rentalNormal ? (
                  <>
                    <ChevronUp className="w-3 h-3 mr-1" />
                    收起 {getHiddenServerCount('rental', false)} 台机器
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3 mr-1" />
                    展开 {getHiddenServerCount('rental', false)} 台机器
                  </>
                )}
              </button>
            )}
          </div>

          {/* 故障机器行 */}
          <div className="relative">
            <div className="absolute top-0 right-0 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              故障机器
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-2">
              {getVisibleServers('rental', true).map(server => (
                <div 
                  key={server.id} 
                  className={getItemClass(server)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, server)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(e, server)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, server)}
                  onClick={() => handleServerClick(server)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-700 truncate">{server.name}</span>
                    <span className={`w-2 h-2 ${getStatusIndicator(server.status)} rounded-full`}></span>
                  </div>

                  <div className="space-y-1">
                    {/* CPU使用率 */}
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">CPU</span>
                      <span className="font-medium">--</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-gray-400 h-1.5 rounded-full"
                      ></div>
                    </div>

                    {/* 内存使用率 */}
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">内存</span>
                      <span className="font-medium">--</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-gray-400 h-1.5 rounded-full"
                      ></div>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <span className={`text-xs ${server.statusColor} font-medium`}>
                      {server.statusText}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 展开/收起按钮 */}
            {getHiddenServerCount('rental', true) > 0 && (
              <button 
                className="absolute bottom-0 right-0 flex items-center text-xs text-red-600 hover:text-red-800 bg-red-50 px-2 py-1 rounded font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpanded('rentalError');
                }}
              >
                {expandedSections.rentalError ? (
                  <>
                    <ChevronUp className="w-3 h-3 mr-1" />
                    收起 {getHiddenServerCount('rental', true)} 台机器
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3 mr-1" />
                    展开 {getHiddenServerCount('rental', true)} 台机器
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {servers.filter(s => s.status === 'running').length}
            </div>
            <div className="text-xs text-gray-600">运行中</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {servers.filter(s => s.status === 'idle').length}
            </div>
            <div className="text-xs text-gray-600">空闲</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {servers.filter(s => s.status === 'full').length}
            </div>
            <div className="text-xs text-gray-600">资源满</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {servers.filter(s => s.status === 'error').length}
            </div>
            <div className="text-xs text-gray-600">故障</div>
          </div>
        </div>
      </div>
    </div>;
}
