// import { apiClient } from '../api/apiClient';
import { User } from '../store/authStore';
import { Establishment } from './establishmentService';

export interface AdminStats {
  totalUsers: number;
  totalEstablishments: number;
  totalBookings: number;
  revenue: number;
}

export const adminService = {
  async getStats(): Promise<AdminStats> {
    // Mock data for now, replace with actual API call when available
    // const response = await apiClient.get<AdminStats>('/admin/stats');
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalUsers: 150,
          totalEstablishments: 45,
          totalBookings: 320,
          revenue: 15000000, // CFA
        });
      }, 500);
    });
  },

  async getUsers(): Promise<User[]> {
    // const response = await apiClient.get<User[]>('/admin/users');
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            email: 'user@example.com',
            firstName: 'Jean',
            lastName: 'Dupont',
            role: 'USER',
          },
          {
            id: '2',
            email: 'operator@example.com',
            firstName: 'Marie',
            lastName: 'Curie',
            role: 'OPERATOR',
          },
          {
            id: '3',
            email: 'admin@example.com',
            firstName: 'Admin',
            lastName: 'Super',
            role: 'ADMIN',
          },
        ]);
      }, 500);
    });
  },

  async getPendingEstablishments(): Promise<Establishment[]> {
    // const response = await apiClient.get<Establishment[]>('/admin/establishments/pending');
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '101',
            name: 'Hôtel Le Rêve',
            description: 'Un hôtel magnifique au bord de la mer.',
            category: 'HOTEL',
            location: 'Pointe-Noire',
            address: 'Av. du Général de Gaulle',
            city: 'Pointe-Noire',
            images: [
              'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
            ],
            price: 50000,
            isVerified: false,
            operatorId: '2',
          },
        ]);
      }, 500);
    });
  },

  async validateEstablishment(id: string): Promise<void> {
    // await apiClient.put(`/admin/establishments/${id}/validate`);
    console.log(`Establishment ${id} validated`);
    return Promise.resolve();
  },

  async rejectEstablishment(id: string): Promise<void> {
    // await apiClient.put(`/admin/establishments/${id}/reject`);
    console.log(`Establishment ${id} rejected`);
    return Promise.resolve();
  },
};
