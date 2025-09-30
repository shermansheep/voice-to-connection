import React from 'react';
import { Button } from '../common/Button';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ArrowPathIcon 
} from '@heroicons/react/24/outline';

interface Job {
  id: string;
  serviceId: string;
  elderlyName: string;
  description: string;
  status: 'pending' | 'matched' | 'completed' | 'failed';
  createdAt: Date;
  matchTime?: number;
}

interface JobsTableProps {
  jobs: Job[];
  onRetry?: (jobId: string) => void;
}

export const JobsTable: React.FC<JobsTableProps> = ({ jobs, onRetry }) => {
  const getStatusIcon = (status: Job['status']) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case 'matched':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-blue-500" />;
      case 'failed':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusText = (status: Job['status']) => {
    switch (status) {
      case 'pending': return '等待配對';
      case 'matched': return '已配對';
      case 'completed': return '已完成';
      case 'failed': return '配對失敗';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">配對工作狀態</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">服務</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">狀態</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">建立時間</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">配對時間</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{job.elderlyName}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{job.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {getStatusIcon(job.status)}
                    <span className="ml-2 text-sm">{getStatusText(job.status)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {job.createdAt.toLocaleString('zh-TW')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {job.matchTime ? `${job.matchTime} 分鐘` : '-'}
                </td>
                <td className="px-6 py-4">
                  {job.status === 'failed' && onRetry && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onRetry(job.id)}
                    >
                      <ArrowPathIcon className="w-4 h-4 mr-1" />
                      重試
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};