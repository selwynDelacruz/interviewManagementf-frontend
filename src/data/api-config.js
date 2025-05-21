export const API_BASE_URL = "http://127.0.0.1:8000/api";

export const headers = {
  "Content-Type": "application/json",
  // Add any other common headers here (e.g., authorization)
};

// Common fetch wrapper with error handling
export async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers,
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API call failed: ${response.statusText}`);
  }

  return response.json();
}
