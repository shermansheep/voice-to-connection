import React from 'react';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  UserIcon,
  PhoneIcon 
} from '@heroicons/react/24/outline';

interface StatusNotificationProps {
  status: 'pending' | 'matched' | 'in_progress' | 'completed';
  volunteer?: string;
  volunteerPhone?: string;
  estimatedTime?: string;
}

export const StatusNotification: React.FC<StatusNotificationProps> = ({
  status,
  volunteer,
  volunteerPhone,
  estimatedTime
}) => {
  if (status === 'pending') {
    return (
      <div className="fixed top-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg max-w-sm">
        <div className="flex items-center">
          <ClockIcon className="w-6 h-6 text-yellow-600 mr-3" />
          <div>
            <p className="font-medium text-yellow-800">正在尋找義工</p>
            <p className="text-sm text-yellow-600">請稍候，我們正在為您配對...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'matched') {
    return (
      <div className="fixed top-4 right-4 bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg max-w-sm">
        <div className="flex items-start">
          <CheckCircleIcon className="w-6 h-6 text-blue-600 mr-3 mt-1" />
          <div>
            <p className="font-medium text-blue-800">找到義工了！</p>
            <p className="text-sm text-blue-600 mb-2">義工即將聯絡您</p>
            {volunteer && (
              <div className="space-y-1">
                <div className="flex items-center text-sm">
                  <UserIcon className="w-4 h-4 mr-1" />
                  <span>{volunteer}</span>
                </div>
                {volunteerPhone && (
                  <div className="flex items-center text-sm">
                    <PhoneIcon className="w-4 h-4 mr-1" />
                    <span>{volunteerPhone}</span>
                  </div>
                )}
                {estimatedTime && (
                  <p className="text-xs text-blue-500">預計 {estimatedTime}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};