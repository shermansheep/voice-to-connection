import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userType = searchParams.get('type') || 'elderly';
  
  const [formData, setFormData] = useState({
    countryCode: '+852',
    phone: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 模擬登入成功
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {userType === 'elderly' ? '長者登入' : '義工/家屬登入'}
          </h1>
          <p className="text-gray-600">歡迎回到 Voice-to-Connection</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              電話號碼
            </label>
            <div className="flex w-full">
              <select
                className="w-20 px-2 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-white flex-shrink-0"
                value={formData.countryCode}
                onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
              >
                <option value="+852">+852</option>
                <option value="+86">+86</option>
              </select>
              <input
                type="tel"
                required
                className="flex-1 min-w-0 px-3 py-3 border border-l-0 border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              密碼
            </label>
            <input
              type="password"
              required
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            登入
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            還沒有帳號？{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-500">
              立即註冊
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            ← 返回首頁
          </Link>
        </div>
      </div>
    </div>
  );
};