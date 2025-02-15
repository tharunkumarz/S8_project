import { create } from 'apisauce';

export interface BusSchedule {
  busNumber: string;
  departureCity: string;
  departureTime: string;
  returnTime: string;
  stops: string[];
}

// If testing on physical device, use your computer's IP address
export const api = create({
  baseURL: 'http://192.168.1.xxx:5000/api', // Replace with your IP address
  // baseURL: 'http://localhost:5000/api', // For web testing
});

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