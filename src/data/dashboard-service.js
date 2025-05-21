const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function getDashboardSummary() {
  const response = await fetch(`${BASE_URL}/summary`);
  if (!response.ok) throw new Error("Failed to fetch dashboard summary.");
  return await response.json();
}

export async function createDashboardItem(data) {
  const response = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create dashboard item.");
  return await response.json();
}

export async function updateDashboardItem(id, data) {
  const response = await fetch(`${BASE_URL}/items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Failed to update item with ID ${id}.`);
  return await response.json();
}

export async function deleteDashboardItem(id) {
  const response = await fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`Failed to delete item with ID ${id}.`);
  return true;
}
