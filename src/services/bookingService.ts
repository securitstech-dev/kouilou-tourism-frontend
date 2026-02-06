import { apiClient } from '../api/apiClient';

export interface Booking {
  id: string;
  userId: string;
  establishmentId: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  establishment?: {
    name: string;
    images: string[];
    location: string;
  };
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface CreateBookingData {
  establishmentId: string;
  checkIn: string; // ISO Date string
  checkOut: string; // ISO Date string
  guests: number;
}

export const bookingService = {
  async create(data: CreateBookingData): Promise<Booking> {
    const response = await apiClient.post<Booking>('/bookings', data);
    return response.data;
  },

  async getMyBookings(): Promise<Booking[]> {
    const response = await apiClient.get<Booking[]>('/bookings/my-bookings');
    return response.data;
  },

  async getById(id: string): Promise<Booking> {
    const response = await apiClient.get<Booking>(`/bookings/${id}`);
    return response.data;
  },

  async cancel(id: string): Promise<Booking> {
    const response = await apiClient.put<Booking>(`/bookings/${id}/cancel`);
    return response.data;
  },

  // Operator methods
  async getOperatorBookings(establishmentId?: string): Promise<Booking[]> {
    const url = establishmentId
      ? `/operators/bookings?establishmentId=${establishmentId}`
      : '/operators/bookings';
    const response = await apiClient.get<Booking[]>(url);
    return response.data;
  },

  async updateStatus(id: string, status: 'CONFIRMED' | 'CANCELLED'): Promise<Booking> {
    const response = await apiClient.put<Booking>(`/bookings/${id}/status`, { status });
    return response.data;
  },
};
