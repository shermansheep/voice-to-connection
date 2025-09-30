import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'elderly' | 'volunteer'>('elderly');
  
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+852',
    phone: '',
    password: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 模擬註冊成功
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">建立帳號</h1>
          <p className="text-gray-600">加入 Voice-to-Connection 社群</p>
        </div>

        {/* 用戶類型選擇 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            我是
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setUserType('elderly')}
              className={`p-3 rounded-lg border-2 text-center ${
                userType === 'elderly'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700'
              }`}
            >
              長者
            </button>
            <button
              type="button"
              onClick={() => setUserType('volunteer')}
              className={`p-3 rounded-lg border-2 text-center ${
                userType === 'volunteer'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700'
              }`}
            >
              義工/家屬
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              姓名
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              地址
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            建立帳號
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            已經有帳號？{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500">
              立即登入
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