import { fetchAPI } from './api-config';

export const scheduleService = {
  // Get all interview schedules
  getAllSchedules: () => fetchAPI('/schedules/interview-schedules'),

  // Create new schedule
  createSchedule: (data) => fetchAPI('/schedules/interview-schedules', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Update schedule
  updateSchedule: (id, data) => fetchAPI(`/schedules/interview-schedules/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  // Delete schedule
  deleteSchedule: (id) => fetchAPI(`/schedules/interview-schedules/${id}`, {
    method: 'DELETE'
  }),

  // Assign interview schedule
  assignSchedule: (data) => fetchAPI('/schedules/interview-schedules/assign', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};
