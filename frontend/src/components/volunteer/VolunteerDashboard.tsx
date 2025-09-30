import React, { useState } from 'react';
import { Button } from '../common/Button';
import { 
  MapPinIcon, 
  ClockIcon, 
  UserIcon, 
  CheckCircleIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

interface ServiceRequest {
  id: string;
  elderlyName: string;
  description: string;
  location: string;
  distance: string;
  urgency: 'low' | 'medium' | 'high';
  estimatedTime: string;
  createdAt: Date;
}

interface AcceptedRequest extends ServiceRequest {
  status: 'accepted' | 'in_progress' | 'completed';
  acceptedAt: Date;
}

export const VolunteerDashboard: React.FC = () => {
  const [availableRequests] = useState<ServiceRequest[]>([
    {
      id: '1',
      elderlyName: '王奶奶',
      description: '需要有人幫忙去超市買一些日常用品，主要是米、油和一些蔬菜。',
      location: '台北市大安區',
      distance: '0.8公里',
      urgency: 'medium',
      estimatedTime: '1-2小時',
      createdAt: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '2',
      elderlyName: '李爺爺',
      description: '家裡的燈泡壞了，需要有人幫忙更換，我已經買好燈泡了。',
      location: '台北市信義區',
      distance: '1.2公里',
      urgency: 'low',
      estimatedTime: '30分鐘',
      createdAt: new Date(Date.now() - 45 * 60 * 1000)
    },
    {
      id: '3',
      elderlyName: '陳阿姨',
      description: '需要有人陪同去醫院看診，預約時間是明天下午2點。',
      location: '台北市中山區',
      distance: '2.1公里',
      urgency: 'high',
      estimatedTime: '3-4小時',
      createdAt: new Date(Date.now() - 15 * 60 * 1000)
    }
  ]);

  const [acceptedRequests, setAcceptedRequests] = useState<AcceptedRequest[]>([]);

  const getUrgencyColor = (urgency: ServiceRequest['urgency']) => {
    switch (urgency) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
    }
  };

  const getUrgencyText = (urgency: ServiceRequest['urgency']) => {
    switch (urgency) {
      case 'low': return '一般';
      case 'medium': return '中等';
      case 'high': return '緊急';
    }
  };

  const acceptRequest = (request: ServiceRequest) => {
    const acceptedRequest: AcceptedRequest = {
      ...request,
      status: 'accepted',
      acceptedAt: new Date()
    };
    setAcceptedRequests(prev => [...prev, acceptedRequest]);
  };

  const updateRequestStatus = (id: string, status: AcceptedRequest['status']) => {
    setAcceptedRequests(prev => 
      prev.map(req => req.id === id ? { ...req, status } : req)
    );
  };

  const getStatusText = (status: AcceptedRequest['status']) => {
    switch (status) {
      case 'accepted': return '已接受';
      case 'in_progress': return '進行中';
      case 'completed': return '已完成';
    }
  };

  const getStatusColor = (status: AcceptedRequest['status']) => {
    switch (status) {
      case 'accepted': return 'text-blue-600 bg-blue-100';
      case 'in_progress': return 'text-orange-600 bg-orange-100';
      case 'completed': return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          義工儀表板
        </h1>
        <p className="text-gray-600">
          查看附近的服務請求，選擇您想要幫助的長者
        </p>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {availableRequests.length}
          </div>
          <div className="text-gray-600">可接受請求</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {acceptedRequests.length}
          </div>
          <div className="text-gray-600">我的服務</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {acceptedRequests.filter(r => r.status === 'completed').length}
          </div>
          <div className="text-gray-600">已完成</div>
        </div>
      </div>

      {/* 可接受的請求 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">附近的服務請求</h2>
        
        {availableRequests.filter(req => !acceptedRequests.some(acc => acc.id === req.id)).map((request) => (
          <div key={request.id} className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <UserIcon className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="font-medium text-gray-900">{request.elderlyName}</span>
                  <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                    {getUrgencyText(request.urgency)}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{request.description}</p>
                
                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {request.location} ({request.distance})
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    預估 {request.estimatedTime}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {Math.floor((Date.now() - request.createdAt.getTime()) / 60000)} 分鐘前
              </span>
              <Button onClick={() => acceptRequest(request)}>
                接受請求
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 我接受的請求 */}
      {acceptedRequests.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">我的服務</h2>
          
          {acceptedRequests.map((request) => (
            <div key={request.id} className="bg-white p-6 rounded-lg shadow-md border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <UserIcon className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="font-medium text-gray-900">{request.elderlyName}</span>
                    <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {getStatusText(request.status)}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{request.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {request.location}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      預估 {request.estimatedTime}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  接受時間：{request.acceptedAt.toLocaleString('zh-TW')}
                </span>
                <div className="space-x-2">
                  {request.status === 'accepted' && (
                    <Button
                      onClick={() => updateRequestStatus(request.id, 'in_progress')}
                      size="sm"
                    >
                      開始服務
                    </Button>
                  )}
                  {request.status === 'in_progress' && (
                    <Button
                      onClick={() => updateRequestStatus(request.id, 'completed')}
                      size="sm"
                      variant="secondary"
                    >
                      完成服務
                    </Button>
                  )}
                  {request.status === 'completed' && (
                    <div className="flex items-center text-green-600">
                      <CheckCircleIcon className="w-5 h-5 mr-1" />
                      已完成
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};