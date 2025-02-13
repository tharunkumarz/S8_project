import { api } from './api';
import type { BusSchedule } from './api';

export const getBusSchedules = async (): Promise<BusSchedule[]> => {
  try {
    const response = await api.get<BusSchedule[]>('/buses');
    if (response.ok && response.data) {
      return response.data;
    }
    throw new Error(response.problem?.toString() || 'Unknown API error');
  } catch (error) {
    console.error('Error fetching bus schedules:', error);
    throw error;
  }
}; 