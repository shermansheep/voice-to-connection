import apiClient from './api';

export interface AdminStats {
  totalServices: number;
  pendingServices: number;
  matchedServices: number;
  completedServices: number;
  totalVolunteers: number;
  activeVolunteers: number;
  averageMatchTime: number;
  matchSuccessRate: number;
}

export interface MatchingJob {
  jobId: string;
  serviceId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  matchCount: number;
  errorMessage?: string;
}

export const adminAPI = {
  async getStats(): Promise<AdminStats> {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  },

  async getMatchingJobs(): Promise<MatchingJob[]> {
    const response = await apiClient.get('/admin/matching-jobs');
    return response.data;
  },

  async retryMatchingJob(jobId: string): Promise<void> {
    await apiClient.post(`/admin/matching-jobs/${jobId}/retry`);
  }
};