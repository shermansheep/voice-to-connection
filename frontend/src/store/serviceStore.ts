import { create } from 'zustand';
import { Service, CreateServiceRequest, Match } from '../types/service';
import { serviceAPI } from '../services/api';

interface ServiceState {
  services: Service[];
  matches: Match[];
  currentService: Service | null;
  isLoading: boolean;
  error: string | null;
  createService: (request: CreateServiceRequest) => Promise<void>;
  getServices: () => Promise<void>;
  acceptMatch: (matchId: string) => Promise<void>;
  completeService: (serviceId: string) => Promise<void>;
}

export const useServiceStore = create<ServiceState>((set, get) => ({
  services: [],
  matches: [],
  currentService: null,
  isLoading: false,
  error: null,

  createService: async (request) => {
    set({ isLoading: true, error: null });
    try {
      const service = await serviceAPI.createService(request);
      set(state => ({ 
        services: [service, ...state.services], 
        isLoading: false 
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  getServices: async () => {
    set({ isLoading: true });
    try {
      const services = await serviceAPI.getServices();
      set({ services, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  acceptMatch: async (matchId) => {
    try {
      await serviceAPI.acceptMatch(matchId);
      set(state => ({
        matches: state.matches.map(match => 
          match.matchId === matchId 
            ? { ...match, status: 'accepted' as const }
            : match
        )
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  completeService: async (serviceId) => {
    try {
      await serviceAPI.completeService(serviceId);
      set(state => ({
        services: state.services.map(service => 
          service.serviceId === serviceId 
            ? { ...service, status: 'completed' as const }
            : service
        )
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  }
}));