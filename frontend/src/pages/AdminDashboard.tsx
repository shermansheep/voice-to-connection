import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  UsersIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { adminAPI, AdminStats } from '../services/adminAPI';
import { JobsTable } from '../components/admin/JobsTable';



interface RecentActivity {
  id: string;
  type: 'service_created' | 'match_found' | 'service_completed';
  description: string;
  timestamp: Date;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalServices: 0,
    pendingServices: 0,
    matchedServices: 0,
    completedServices: 0,
    totalVolunteers: 0,
    activeVolunteers: 0,
    averageMatchTime: 0,
    matchSuccessRate: 0
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminAPI.getStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
        // Fallback to mock data
        setStats({
          totalServices: 156,
          pendingServices: 23,
          matchedServices: 45,
          completedServices: 88,
          totalVolunteers: 78,
          activeVolunteers: 34,
          averageMatchTime: 18,
          matchSuccessRate: 85.2
        });
      }
    };
    
    fetchStats();

    setRecentActivity([
      {
        id: '1',
        type: 'service_created',
        description: '王奶奶請求購物協助',
        timestamp: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        id: '2',
        type: 'match_found',
        description: '李爺爺的維修請求已配對義工',
        timestamp: new Date(Date.now() - 12 * 60 * 1000)
      },
      {
        id: '3',
        type: 'service_completed',
        description: '陳阿姨的陪診服務已完成',
        timestamp: new Date(Date.now() - 25 * 60 * 1000)
      }
    ]);
  }, []);

  const mockJobs = [
    {
      id: '1',
      serviceId: 'svc-001',
      elderlyName: '王奶奶',
      description: '需要購物協助',
      status: 'matched' as const,
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
      matchTime: 15
    },
    {
      id: '2',
      serviceId: 'svc-002',
      elderlyName: '李爺爺',
      description: '燈泡更換',
      status: 'pending' as const,
      createdAt: new Date(Date.now() - 10 * 60 * 1000)
    }
  ];

  const StatCard = ({ title, value, icon: Icon, color }: {
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    color: string;
  }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">管理員儀表板</h1>
          <p className="text-gray-600">監控服務配對統計與系統狀態</p>
        </div>

        {/* 統計卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="總服務請求"
            value={stats.totalServices}
            icon={ChartBarIcon}
            color="bg-blue-500"
          />
          <StatCard
            title="等待配對"
            value={stats.pendingServices}
            icon={ClockIcon}
            color="bg-yellow-500"
          />
          <StatCard
            title="已配對服務"
            value={stats.matchedServices}
            icon={UsersIcon}
            color="bg-green-500"
          />
          <StatCard
            title="已完成服務"
            value={stats.completedServices}
            icon={CheckCircleIcon}
            color="bg-purple-500"
          />
        </div>

        {/* 詳細統計 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">配對效率</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">平均配對時間</span>
                <span className="font-medium">{stats.averageMatchTime} 分鐘</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">配對成功率</span>
                <span className="font-medium">{stats.matchSuccessRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">活躍義工</span>
                <span className="font-medium">{stats.activeVolunteers}/{stats.totalVolunteers}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">服務狀態分布</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600">等待配對</span>
                <span className="ml-auto font-medium">{stats.pendingServices}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600">進行中</span>
                <span className="ml-auto font-medium">{stats.matchedServices}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600">已完成</span>
                <span className="ml-auto font-medium">{stats.completedServices}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 配對工作表格 */}
        <div className="mb-8">
          <JobsTable jobs={mockJobs} />
        </div>

        {/* 最近活動 */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">最近活動</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'service_created' ? 'bg-blue-100' :
                    activity.type === 'match_found' ? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    {activity.type === 'service_created' && <ExclamationTriangleIcon className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'match_found' && <UsersIcon className="w-4 h-4 text-green-600" />}
                    {activity.type === 'service_completed' && <CheckCircleIcon className="w-4 h-4 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">
                      {Math.floor((Date.now() - activity.timestamp.getTime()) / 60000)} 分鐘前
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};