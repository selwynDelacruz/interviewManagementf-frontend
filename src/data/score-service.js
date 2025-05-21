import { fetchAPI } from './api-config';

export const scoreService = {
  // Get all scores
  getAllScores: () => fetchAPI('/scores'),

  // Get single score
  getScore: (id) => fetchAPI(`/scores/${id}`),

  // Create new score
  createScore: (data) => fetchAPI('/scores', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Delete score
  deleteScore: (id) => fetchAPI(`/scores/${id}`, {
    method: 'DELETE'
  })
};
