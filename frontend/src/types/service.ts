export interface Service {
  serviceId: string;
  elderlyId: string;
  title: string;
  description: string;
  voiceRecordUrl?: string;
  category: ServiceCategory;
  urgency: 'low' | 'medium' | 'high';
  location: {
    lat: number;
    lng: number;
  };
  status: 'pending' | 'matched' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export type ServiceCategory = 
  | 'transportation'
  | 'shopping'
  | 'medical'
  | 'companionship'
  | 'household'
  | 'technology'
  | 'other';

export interface CreateServiceRequest {
  title: string;
  description: string;
  category: ServiceCategory;
  urgency: 'low' | 'medium' | 'high';
  voiceRecord?: Blob;
}

export interface Match {
  matchId: string;
  serviceId: string;
  elderlyId: string;
  volunteerId: string;
  status: 'pending' | 'accepted' | 'completed';
  matchScore: number;
  createdAt: string;
  acceptedAt?: string;
  completedAt?: string;
}