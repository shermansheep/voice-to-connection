import React, { useState } from 'react';
import { VoiceRecorder } from '../common/VoiceRecorder';
import { Button } from '../common/Button';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

interface ServiceRequest {
  id: string;
  description: string;
  status: 'pending' | 'matched' | 'completed';
  createdAt: Date;
  volunteer?: string;
}

export const VoiceRequest: React.FC = () => {
  const [currentRequest, setCurrentRequest] = useState<string>('');
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
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
    }, 1000);
  };

  const getStatusText = (status: ServiceRequest['status']) => {
    switch (status) {
      case 'pending': return '等待配對';
      case 'matched': return '已配對';
      case 'completed': return '已完成';
    }
  };

  const getStatusColor = (status: ServiceRequest['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'matched': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
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
              
              {request.status === 'pending' && (
                <div className="flex items-center text-sm text-gray-600">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  正在為您尋找合適的志工...
                </div>
              )}
              
              {request.status === 'matched' && (
                <div className="flex items-center text-sm text-blue-600">
                  <CheckCircleIcon className="w-4 h-4 mr-1" />
                  已配對志工：{request.volunteer || '張小明'}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};