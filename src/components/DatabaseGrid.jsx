// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ExternalLink, Database, Activity, Atom, Plus, MoreHorizontal } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

export default function DatabaseGrid() {
  const {
    toast
  } = useToast();
  const [databases, setDatabases] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [showAllDatabases, setShowAllDatabases] = useState(false);

  // 模拟数据库数据
  const mockDatabases = [{
    id: 1,
    name: 'NCBI',
    description: '美国国家生物技术信息中心',
    type: '综合型',
    icon: 'https://www.ncbi.nlm.nih.gov/favicon.ico',
    url: 'https://www.ncbi.nlm.nih.gov',
    color: 'blue'
  }, {
    id: 2,
    name: 'KEGG',
    description: '京都基因与基因组百科全书',
    type: '代谢',
    icon: 'https://www.kegg.jp/favicon.ico',
    url: 'https://www.kegg.jp',
    color: 'green'
  }, {
    id: 3,
    name: 'UniProt',
    description: '通用蛋白质资源数据库',
    type: '蛋白',
    icon: 'https://www.uniprot.org/favicon.ico',
    url: 'https://www.uniprot.org',
    color: 'purple'
  }, {
    id: 4,
    name: 'PDB',
    description: '蛋白质数据银行',
    type: '结构',
    icon: 'https://www.rcsb.org/favicon.ico',
    url: 'https://www.rcsb.org',
    color: 'orange'
  }, {
    id: 5,
    name: 'Ensembl',
    description: '基因组浏览器',
    type: '基因组',
    icon: 'https://www.ensembl.org/favicon.ico',
    url: 'https://www.ensembl.org',
    color: 'red'
  }, {
    id: 6,
    name: 'GenBank',
    description: '遗传序列数据库',
    type: '序列',
    icon: 'https://www.ncbi.nlm.nih.gov/favicon.ico',
    url: 'https://www.ncbi.nlm.nih.gov/genbank',
    color: 'blue'
  }, {
    id: 7,
    name: 'PubMed',
    description: '生物医学文献数据库',
    type: '文献',
    icon: 'https://pubmed.ncbi.nlm.nih.gov/favicon.ico',
    url: 'https://pubmed.ncbi.nlm.nih.gov',
    color: 'teal'
  }, {
    id: 8,
    name: 'STRING',
    description: '蛋白质相互作用数据库',
    type: '互作',
    icon: 'https://string-db.org/favicon.ico',
    url: 'https://string-db.org',
    color: 'brown'
  }, {
    id: 9,
    name: 'InterPro',
    description: '蛋白质家族数据库',
    type: '蛋白',
    icon: 'https://www.ebi.ac.uk/interpro/favicon.ico',
    url: 'https://www.ebi.ac.uk/interpro',
    color: 'indigo'
  }, {
    id: 10,
    name: 'Reactome',
    description: '生物通路数据库',
    type: '通路',
    icon: 'https://reactome.org/favicon.ico',
    url: 'https://reactome.org',
    color: 'pink'
  }, {
    id: 11,
    name: 'ChEMBL',
    description: '小分子药物数据库',
    type: '化学',
    icon: 'https://www.ebi.ac.uk/chembl/favicon.ico',
    url: 'https://www.ebi.ac.uk/chembl',
    color: 'lime'
  }, {
    id: 12,
    name: 'GEO',
    description: '基因表达数据库',
    type: '表达',
    icon: 'https://www.ncbi.nlm.nih.gov/geo/favicon.ico',
    url: 'https://www.ncbi.nlm.nih.gov/geo',
    color: 'emerald'
  }];
  useEffect(() => {
    // 在实际应用中，这里会从API获取数据
    setDatabases(mockDatabases);
  }, []);
  const handleDatabaseClick = database => {
    toast({
      title: "访问数据库",
      description: `正在打开 ${database.name} 数据库`
    });
    // 在实际应用中，这里会打开新窗口或导航到数据库页面
    window.open(database.url, '_blank');
  };
  const handleAddDatabase = () => {
    toast({
      title: "添加数据库",
      description: "打开添加数据库对话框"
    });
  };
  // 获取类型对应的颜色
  const getTypeColor = type => {
    switch (type) {
      case '综合型':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case '代谢':
        return 'bg-green-100 text-green-800 border-green-200';
      case '蛋白':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case '结构':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case '基因组':
        return 'bg-red-100 text-red-800 border-red-200';
      case '序列':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case '文献':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case '互作':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case '通路':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case '化学':
        return 'bg-lime-100 text-lime-800 border-lime-200';
      case '表达':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  // 获取类型对应的图标
  const getTypeIcon = type => {
    switch (type) {
      case '综合型':
      case '序列':
      case '表达':
        return <Database className="h-3 w-3" />;
      case '代谢':
      case '通路':
        return <Activity className="h-3 w-3" />;
      case '蛋白':
      case '互作':
        return <Atom className="h-3 w-3" />;
      case '结构':
      case '化学':
        return <Atom className="h-3 w-3" />;
      case '基因组':
      case '文献':
        return <Database className="h-3 w-3" />;
      default:
        return <Database className="h-3 w-3" />;
    }
  };

  // 拖拽开始事件处理
  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    // 设置拖拽时的自定义光标图标
    e.dataTransfer.effectAllowed = 'move';
    
    // 创建一个拖拽时的预览效果
    if (e.target instanceof HTMLElement) {
      // 设置拖拽时的样式
      e.target.style.opacity = '0.8';
      e.target.style.transform = 'scale(1.05)';
      e.target.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.4)';
      e.target.style.borderColor = '#93c5fd';
      e.target.style.backgroundColor = '#eff6ff';
      e.target.style.zIndex = '10';
    }
  };

  // 拖拽结束事件处理
  const handleDragEnd = (e) => {
    setDraggedItem(null);
    // 恢复元素原始样式
    if (e.target instanceof HTMLElement) {
      e.target.style.opacity = '';
      e.target.style.transform = '';
      e.target.style.boxShadow = '';
      e.target.style.borderColor = '';
      e.target.style.backgroundColor = '';
    }
  };

  // 拖拽经过事件处理
  const handleDragOver = (e) => {
    e.preventDefault(); // 允许放置
  };

  // 获取拖拽时目标元素的样式类
  const getItemClass = (index) => {
    let className = 'bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 cursor-move relative';
    
    // 被拖拽元素的样式
    if (draggedItem === index) {
      className += ' opacity-80 scale-105 shadow-lg border-blue-400 bg-blue-50 z-10';
    }
    // 拖拽经过的元素样式（放置目标）
    else if (dragOverIndex === index) {
      className += ' border-dashed border-blue-500 bg-blue-50 scale-[1.02]';
    }
    // 拖拽操作中其他受影响的元素样式
    else if (draggedItem !== null) {
      // 计算元素位置变化方向，添加相应的视觉提示
      if (Math.abs(draggedItem - index) <= 1) {
        className += ' border-blue-200 shadow-sm';
      } else {
        className += ' border-gray-300';
      }
    }
    
    return className;
  };

  // 放置事件处理 - 重新排序数据库
  const handleDrop = (e, index) => {
    e.preventDefault();
    
    if (draggedItem === null || draggedItem === index) {
      setDragOverIndex(null);
      return;
    }
    
    const newDatabases = [...databases];
    const itemToMove = newDatabases[draggedItem];
    
    // 从原位置移除
    newDatabases.splice(draggedItem, 1);
    // 插入到新位置
    newDatabases.splice(index, 0, itemToMove);
    
    // 添加微动画效果：先设置一个临时状态，然后更新实际数据
    // 这会触发两次渲染，创建一个微小的动画间隔
    setTimeout(() => {
      setDatabases(newDatabases);
    }, 50);
    
    // 重置状态
    setDragOverIndex(null);
  };

  // 切换显示所有数据库
  const toggleShowAllDatabases = () => {
    setShowAllDatabases(!showAllDatabases);
    // 重置拖拽状态，避免状态冲突
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  // 根据显示设置获取要显示的数据库
  const visibleDatabases = showAllDatabases 
    ? databases 
    : databases.slice(0, 3);
  return <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">数据库中心（公有+私有）</h3>
        <button onClick={handleAddDatabase} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>添加数据库</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleDatabases.map((database, index) => {
          return (
            <div 
              key={database.id} 
              className={getItemClass(index)}
              onClick={() => handleDatabaseClick(database)}
              draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={(e) => {
              handleDragEnd(e);
              setDragOverIndex(null); // 拖拽结束时重置拖拽经过索引
            }}
            onDragOver={handleDragOver}
            onDragEnter={(e) => {
              e.preventDefault();
              // 只有当拖拽的不是自身时才设置拖拽经过索引
              if (draggedItem !== index) {
                setDragOverIndex(index);
              }
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              // 检查是否真的离开了元素区域（而不是进入子元素）
              const relatedTarget = e.relatedTarget;
              const currentTarget = e.currentTarget;
              
              // 如果离开到了外部或者到了不同的数据库卡片
              if (!currentTarget.contains(relatedTarget) || 
                  (relatedTarget && relatedTarget.closest('.cursor-move') !== currentTarget)) {
                // 添加延迟以确保拖拽效果流畅
                setTimeout(() => {
                  setDragOverIndex(null);
                }, 50);
              }
            }}
            onDrop={(e) => handleDrop(e, index)}
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
                <img src={database.icon} alt={database.name} className="w-full h-full object-contain" onError={e => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iI0YzRjRGNiIvPgo8cGF0aCBkPSJNMzIgMTZDMjUuMzcyNiAxNiAyMCAyMS4zNzI2IDIwIDI4QzIwIDM0LjYyNzQgMjUuMzcyNiA0MCAzMiA0MEMzOC42Mjc0IDQwIDQ0IDM0LjYyNzQgNDQgMjhDNDQgMjEuMzcyNiAzOC42Mjc0IDE2IDMyIDE2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+';
            }} />
              </div>
            </div>

            {/* 数据库信息 */}
            <div className="text-center mb-3">
              <h4 className="font-semibold text-gray-900 mb-1">{database.name}</h4>
              <p className="text-xs text-gray-600">{database.description}</p>
            </div>

            {/* 访问按钮 */}
            <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" onClick={e => {
          e.stopPropagation();
          handleDatabaseClick(database);
        }}>
              <ExternalLink className="h-4 w-4" />
              <span className="text-sm font-medium">访问数据库</span>
            </button>
            </div>
          );
        })}

        {/* 更多数据库按钮 - 仅当数据库数量大于3且未显示全部时显示 */}
        {databases.length > 3 && !showAllDatabases && (
          <div 
            className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={toggleShowAllDatabases}
          >
            <MoreHorizontal className="h-6 w-6 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">更多 ({databases.length - 3})</span>
          </div>
        )}
        
        {/* 收起按钮 - 当显示全部数据库时显示 */}
        {showAllDatabases && (
          <div 
            className="flex flex-col items-center justify-center p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
            onClick={toggleShowAllDatabases}
          >
            <MoreHorizontal className="h-6 w-6 text-blue-500 mb-2" />
            <span className="text-sm text-blue-600">收起显示</span>
          </div>
        )}
      </div>
    </div>;
}