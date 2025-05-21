import { fetchAPI } from './api-config';

export const interviewerService = {
  // Get all interviewers
  getAllInterviewers: async () => {
    return await fetchAPI('/interviewers');
  },

  // Get single interviewer
  getInterviewerById: async (id) => {
    return await fetchAPI(`/interviewers/${id}`);
  }
};
