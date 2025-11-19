// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';

export default function GanttChart() {
  const {
    toast
  } = useToast();
  const [viewMode, setViewMode] = useState('week');

  // 模拟任务数据 - 包含不同时间单位的任务
  const tasks = [
    {
      server: '服务器 A',
      tasks: [
        { name: 'BLAST分析', start: 2, duration: 8, color: 'bg-blue-500', unit: 'hour' }, // 小时单位
        { name: '序列比对', start: 2, duration: 3, color: 'bg-green-500', unit: 'day' },  // 天单位
        { name: '质控分析', start: 1, duration: 2, color: 'bg-yellow-500', unit: 'week' } // 周单位
      ]
    },
    {
      server: '服务器 B',
      tasks: [
        { name: '基因组组装', start: 1, duration: 5, color: 'bg-purple-500', unit: 'day' }, // 天单位
        { name: '质控分析', start: 3, duration: 1, color: 'bg-yellow-500', unit: 'week' }  // 周单位
      ]
    },
    {
      server: '服务器 C',
      tasks: [
        { name: '质控分析', start: 10, duration: 6, color: 'bg-yellow-500', unit: 'hour' }, // 小时单位
        { name: '变异检测', start: 4, duration: 2, color: 'bg-red-500', unit: 'day' }     // 天单位
      ]
    }
  ];
  // 时间轴配置
  const timeSlots = {
    day: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      totalUnits: 24 // 一天24小时
    },
    week: {
      labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      totalUnits: 7 // 一周7天
    },
    month: {
      labels: ['第1周', '第2周', '第3周', '第4周'],
      totalUnits: 4 // 一个月4周
    }
  };

  // 单位转换函数
  const convertToViewUnits = (value, unit, viewMode) => {
    // 根据当前视图模式和任务时间单位进行转换
    if (viewMode === 'day') {
      // 日视图下，所有单位转换为小时
      switch (unit) {
        case 'hour': return value
        case 'day': return value * 24 // 1天=24小时
        case 'week': return value * 7 * 24 // 1周=7天=168小时
      }
    } else if (viewMode === 'week') {
      // 周视图下，所有单位转换为天
      switch (unit) {
        case 'hour': return value / 24 // 24小时=1天
        case 'day': return value
        case 'week': return value * 7 // 1周=7天
      }
    } else { // month
      // 月视图下，所有单位转换为周
      switch (unit) {
        case 'hour': return value / (24 * 7) // 168小时=1周
        case 'day': return value / 7 // 7天=1周
        case 'week': return value
      }
    }
  };

  // 计算任务在当前视图中的百分比位置和宽度
  const getTaskStyle = (task, viewMode) => {
    const totalUnits = timeSlots[viewMode].totalUnits
    const startInViewUnits = convertToViewUnits(task.start, task.unit, viewMode)
    const durationInViewUnits = convertToViewUnits(task.duration, task.unit, viewMode)
    
    // 计算百分比位置和宽度
    const leftPercent = (startInViewUnits / totalUnits) * 100
    const widthPercent = (durationInViewUnits / totalUnits) * 100
    
    // 确保不超出范围
    const safeLeftPercent = Math.min(Math.max(0, leftPercent), 100)
    const safeWidthPercent = Math.min(Math.max(0, widthPercent), 100 - safeLeftPercent)
    
    return {
      left: `${safeLeftPercent}%`,
      width: `${safeWidthPercent}%`
    };
  };

  // 获取任务显示标题
  const getTaskTitle = (task) => {
    let unitText = ''
    switch (task.unit) {
      case 'hour': unitText = '小时'
        break
      case 'day': unitText = '天'
        break
      case 'week': unitText = '周'
        break
    }
    return `${task.name} (${task.start} - ${task.start + task.duration} ${unitText})`
  };
  const handleViewModeChange = mode => {
    setViewMode(mode);
    toast({
      title: "视图切换",
      description: `切换到${mode === 'day' ? '日' : mode === 'week' ? '周' : '月'}视图`
    });
  };
  const handleTaskClick = (task, server) => {
    toast({
      title: "任务详情",
      description: `${server} - ${task.name}`
    });
  };
  return <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">服务器任务甘特图</h3>
        <div className="flex items-center space-x-2">
          {['day', 'week', 'month'].map(mode => <button key={mode} onClick={() => handleViewModeChange(mode)} className={`px-3 py-1 text-sm rounded transition-colors ${viewMode === mode ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {mode === 'day' ? '日' : mode === 'week' ? '周' : '月'}
            </button>)}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* 时间轴头部 */}
          <div className="flex border-b border-gray-200 pb-2 mb-4">
            <div className="w-32 text-sm font-medium text-gray-700">服务器</div>
            <div className="flex-1 flex">
              {timeSlots[viewMode].labels.map((slot, index) => <div key={index} className="flex-1 text-center text-xs text-gray-500">
                  {slot}
                </div>)}
            </div>
          </div>

          {/* 任务条 */}
          <div className="space-y-3">
            {tasks.map((serverData, serverIndex) => <div key={serverIndex} className="flex items-center">
                <div className="w-32 text-sm text-gray-700">{serverData.server}</div>
                <div className="flex-1 h-8 bg-gray-50 rounded relative overflow-hidden">
                  {serverData.tasks.map((task, taskIndex) => <div key={taskIndex} className={`absolute h-6 ${task.color} rounded gantt-bar cursor-pointer`} style={{
                ...getTaskStyle(task, viewMode),
                top: '4px'
              }} onClick={() => handleTaskClick(task, serverData.server)} title={getTaskTitle(task)}>
                      <span className="text-xs text-white px-1 truncate">
                        {task.name}
                      </span>
                    </div>)}
                </div>
              </div>)}
          </div>
        </div>
      </div>

      {/* 图例 */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-600">BLAST分析</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">序列比对</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span className="text-gray-600">基因组组装</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-gray-600">质控分析</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-600">变异检测</span>
          </div>
        </div>
      </div>
    </div>;
}