import { fetchAPI } from './api-config';

export const applicantService = {
  // Get all applicants
  getAllApplicants: () => fetchAPI('/applicants'),

  // Get single applicant
  getApplicant: (id) => fetchAPI(`/applicants/${id}`),

  // Create new applicant
  createApplicant: (data) => fetchAPI('/applicants', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Update applicant
  updateApplicant: (id, data) => fetchAPI(`/applicants/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  // Delete applicant
  deleteApplicant: (id) => fetchAPI(`/applicants/${id}`, {
    method: 'DELETE'
  })
};
