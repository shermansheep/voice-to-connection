import React, { useState } from 'react';
import { VoiceRecorder } from '../common/VoiceRecorder';
import { Button } from '../common/Button';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { StatusNotification } from './StatusNotification';

interface ServiceRequest {
  id: string;
  description: string;
  status: 'pending' | 'matched' | 'in_progress' | 'completed';
  createdAt: Date;
  volunteer?: string;
  estimatedTime?: string;
  volunteerPhone?: string;
}

export const VoiceRequest: React.FC = () => {
  const [currentRequest, setCurrentRequest] = useState<string>('');
  const [requests, setRequests] = useState<ServiceRequest[]>([
    {
      id: 'demo-1',
      description: '需要有人幫我去超市買一些日常用品。',
      status: 'completed',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      volunteer: '王志華'
    },
    {
      id: 'demo-2', 
      description: '家裡的燈泡壞了，需要有人幫忙更換。',
      status: 'in_progress',
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
      volunteer: '陳志強',
      volunteerPhone: '+852 9123 4567'
    }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRecordingComplete = (audioBlob: Blob) => {
    // 模擬語音轉文字
    const mockTranscription = "我需要有人幫我去買菜，主要是一些日常用品和蔬菜。";
    setCurrentRequest(mockTranscription);
  };

  const submitRequest = async () => {
    if (!currentRequest.trim()) return;

    setIsSubmitting(true);
    
    // 模擬提交請求
    setTimeout(() => {
      const newRequest: ServiceRequest = {
        id: Date.now().toString(),
        description: currentRequest,
        status: 'pending',
        createdAt: new Date()
      };
      
      setRequests(prev => [newRequest, ...prev]);
      setCurrentRequest('');
      setIsSubmitting(false);
      
      // 模擬狀態更新
      setTimeout(() => {
        setRequests(prev => prev.map(req => 
          req.id === newRequest.id 
            ? { 
                ...req, 
                status: 'matched' as const,
                volunteer: '李志明',
                volunteerPhone: '+852 9876 5432',
                estimatedTime: '15分鐘內到達'
              }
            : req
        ));
      }, 3000);
    }, 1000);
  };

  const getStatusText = (status: ServiceRequest['status']) => {
    switch (status) {
      case 'pending': return '正在尋找志工';
      case 'matched': return '已找到志工';
      case 'in_progress': return '志工正在協助';
      case 'completed': return '服務已完成';
    }
  };

  const getStatusMessage = (status: ServiceRequest['status']) => {
    switch (status) {
      case 'pending': return '我們正在為您尋找合適的志工，請稍候...';
      case 'matched': return '太好了！我們已經為您找到志工，他們很快就會聯絡您。';
      case 'in_progress': return '志工正在為您提供服務，如有需要請直接聯絡志工。';
      case 'completed': return '服務已順利完成，感謝您使用我們的服務！';
    }
  };

  const getStatusColor = (status: ServiceRequest['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'matched': return 'text-blue-600 bg-blue-100';
      case 'in_progress': return 'text-orange-600 bg-orange-100';
      case 'completed': return 'text-green-600 bg-green-100';
    }
  };

  const latestRequest = requests[0];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* 狀態通知 */}
      {latestRequest && (latestRequest.status === 'pending' || latestRequest.status === 'matched') && (
        <StatusNotification
          status={latestRequest.status}
          volunteer={latestRequest.volunteer}
          volunteerPhone={latestRequest.volunteerPhone}
          estimatedTime={latestRequest.estimatedTime}
        />
      )}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          語音服務請求
        </h1>
        <p className="text-gray-600">
          請說出您需要的幫助，我們會為您找到合適的志工
        </p>
      </div>

      {/* 語音錄製區域 */}
      <div className="space-y-4">
        <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
        
        {/* 轉換後的文字 */}
        {currentRequest && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">您的請求內容：</h3>
            <textarea
              value={currentRequest}
              onChange={(e) => setCurrentRequest(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="您可以在這裡編輯或補充您的需求..."
            />
            <div className="mt-4 flex gap-3">
              <Button
                onClick={submitRequest}
                loading={isSubmitting}
                className="flex-1"
              >
                提交請求
              </Button>
              <Button
                variant="secondary"
                onClick={() => setCurrentRequest('')}
              >
                重新錄製
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 請求歷史 */}
      {requests.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">我的請求</h2>
          
          {requests.map((request) => (
            <div key={request.id} className="bg-white p-4 rounded-lg shadow-md border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-gray-800 mb-2">{request.description}</p>
                  <p className="text-sm text-gray-500">
                    {request.createdAt.toLocaleString('zh-TW')}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                  {getStatusText(request.status)}
                </span>
              </div>
              
              <div className={`p-3 rounded-lg mt-3 ${
                request.status === 'pending' ? 'bg-yellow-50 border border-yellow-200' :
                request.status === 'matched' ? 'bg-blue-50 border border-blue-200' :
                request.status === 'in_progress' ? 'bg-orange-50 border border-orange-200' :
                'bg-green-50 border border-green-200'
              }`}>
                <p className="text-sm font-medium text-gray-800 mb-1">
                  {getStatusMessage(request.status)}
                </p>
                
                {request.status === 'matched' && (
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">
                      <strong>志工：</strong>{request.volunteer || '張小明'}
                    </p>
                    {request.volunteerPhone && (
                      <p className="text-sm text-gray-600">
                        <strong>聯絡電話：</strong>{request.volunteerPhone}
                      </p>
                    )}
                    {request.estimatedTime && (
                      <p className="text-sm text-gray-600">
                        <strong>預計到達：</strong>{request.estimatedTime}
                      </p>
                    )}
                  </div>
                )}
                
                {request.status === 'in_progress' && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      <strong>服務志工：</strong>{request.volunteer || '張小明'}
                    </p>
                    {request.volunteerPhone && (
                      <p className="text-sm text-gray-600">
                        <strong>聯絡電話：</strong>{request.volunteerPhone}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};