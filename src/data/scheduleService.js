import { fetchAPI } from './api-config';

export const scheduleService = {
  getAllSchedules: async () => {
    return await fetchAPI('/schedules/interview-schedules');
  },

  updateSchedule: async (id, data) => {
    return await fetchAPI(`/schedules/interview-schedules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  deleteSchedule: async (id) => {
    return await fetchAPI(`/schedules/interview-schedules/${id}`, {
      method: 'DELETE'
    });
  }
};
