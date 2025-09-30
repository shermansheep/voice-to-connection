import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { MicrophoneIcon, HeartIcon, UsersIcon } from '@heroicons/react/24/outline';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Voice-to-Connection
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            透過語音技術連接長者與義工，讓關懷更簡單、更直接
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login?type=elderly">
              <Button size="lg" className="w-full sm:w-auto">
                長者登入
              </Button>
            </Link>
            <Link to="/login?type=volunteer">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                義工/家屬登入
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MicrophoneIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">語音優先</h3>
            <p className="text-gray-600">
              簡單說話就能發出求助，不需要複雜的操作
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UsersIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">智能配對</h3>
            <p className="text-gray-600">
              根據地點、技能和時間自動找到最適合的志工
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">溫暖連結</h3>
            <p className="text-gray-600">
              建立真實的人與人之間的關懷與支持
            </p>
          </div>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">還沒有帳號嗎？</p>
          <Link to="/register">
            <Button variant="secondary">
              立即註冊
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};