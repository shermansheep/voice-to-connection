import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { VoiceRequest } from './components/elderly/VoiceRequest';
import { VolunteerDashboard } from './components/volunteer/VolunteerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'elderly' | 'volunteer'>('elderly');

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* 模擬儀表板路由 */}
          <Route 
            path="/dashboard" 
            element={
              <div>
                <div className="bg-white shadow-sm border-b p-4 mb-6">
                  <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Voice-to-Connection</h1>
                    <div className="flex flex-col space-y-2">
                      <button 
                        onClick={() => setUserType('elderly')}
                        className={`px-4 py-2 rounded ${userType === 'elderly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      >
                        長者模式
                      </button>
                      <button 
                        onClick={() => setUserType('volunteer')}
                        className={`px-4 py-2 rounded ${userType === 'volunteer' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      >
                        義工模式
                      </button>
                    </div>
                  </div>
                </div>
                {userType === 'elderly' ? <VoiceRequest /> : <VolunteerDashboard />}
              </div>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;