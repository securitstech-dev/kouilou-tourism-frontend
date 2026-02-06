import { apiClient } from '../api/apiClient';

export interface Establishment {
  id: string;
  name: string;
  description: string;
  category: 'HOTEL' | 'RESTAURANT' | 'ACTIVITY' | 'SITE_TOURISTIQUE';
  location: string;
  address: string;
  city: string;
  images: string[];
  price?: number;
  rating?: number;
  latitude?: number;
  longitude?: number;
  isVerified: boolean;
  operatorId: string;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
}

export const establishmentService = {
  async getAll(filters?: SearchFilters): Promise<Establishment[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
    }
    const response = await apiClient.get<Establishment[]>(`/establishments?${params.toString()}`);
    return response.data;
  },

  async getById(id: string): Promise<Establishment> {
    const response = await apiClient.get<Establishment>(`/establishments/${id}`);
    return response.data;
  },

  async create(data: FormData): Promise<Establishment> {
    const response = await apiClient.post<Establishment>('/establishments', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async update(id: string, data: Partial<Establishment>): Promise<Establishment> {
    const response = await apiClient.put<Establishment>(`/establishments/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/establishments/${id}`);
  },

  async getMyEstablishments(): Promise<Establishment[]> {
    const response = await apiClient.get<Establishment[]>('/operators/my-establishments');
    return response.data;
  },
};
