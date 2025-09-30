import axios from 'axios';
import { Service, CreateServiceRequest, Match } from '../types/service';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.voice-to-connection.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 請求攔截器 - 添加認證token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 響應攔截器 - 處理錯誤
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const serviceAPI = {
  // 服務相關
  async createService(request: CreateServiceRequest): Promise<Service> {
    const formData = new FormData();
    formData.append('title', request.title);
    formData.append('description', request.description);
    formData.append('category', request.category);
    formData.append('urgency', request.urgency);
    
    if (request.voiceRecord) {
      formData.append('voiceRecord', request.voiceRecord, 'voice-request.wav');
    }

    const response = await apiClient.post('/services', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async getServices(): Promise<Service[]> {
    const response = await apiClient.get('/services');
    return response.data;
  },

  async getService(id: string): Promise<Service> {
    const response = await apiClient.get(`/services/${id}`);
    return response.data;
  },

  // 配對相關
  async findMatches(serviceId: string): Promise<Match[]> {
    const response = await apiClient.post('/matching/find', { serviceId });
    return response.data;
  },

  async acceptMatch(matchId: string): Promise<void> {
    await apiClient.post('/matching/accept', { matchId });
  },

  async completeService(serviceId: string): Promise<void> {
    await apiClient.put(`/services/${serviceId}`, { status: 'completed' });
  },

  // 語音相關
  async transcribeAudio(audioBlob: Blob): Promise<string> {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.wav');
    
    const response = await apiClient.post('/voice/transcribe', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.text;
  },

  async synthesizeSpeech(text: string): Promise<Blob> {
    const response = await apiClient.post('/voice/synthesize', 
      { text }, 
      { responseType: 'blob' }
    );
    return response.data;
  }
};

export default apiClient;