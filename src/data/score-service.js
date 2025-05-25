import { fetchAPI } from './api-config';

export const scoreService = {
  // Get all scores
  getAllScores: async () => {
    return await fetchAPI('/scores');
  },

  // Get single score
  getScore: async (id) => {
    return await fetchAPI(`/scores/${id}`);
  },

  // Separate create and update methods
  createScore: async (data) => {
    return await fetchAPI('/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  },

  updateScore: async (id, data) => {
    return await fetchAPI(`/scores/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
};
