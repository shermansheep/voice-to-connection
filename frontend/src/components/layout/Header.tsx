import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../common/Button';
import { UserCircleIcon, PhoneIcon } from '@heroicons/react/24/outline';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              Voice-to-Connection
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* 緊急求助按鈕 */}
            <button className="p-2 text-red-600 hover:bg-red-50 rounded-full">
              <PhoneIcon className="w-6 h-6" />
            </button>

            {/* 用戶資訊 */}
            {user && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <UserCircleIcon className="w-8 h-8 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    {user.profile.name}
                  </span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={logout}
                >
                  登出
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};