import { fetchAPI } from './api-config';

export const statusService = {
  // Get all statuses
  getAllStatuses: () => fetchAPI('/statuses'),

  // Get status for specific applicant
  getApplicantStatus: (applicantId) => fetchAPI(`/statuses/${applicantId}`)
};
