const API_URL = import.meta.env.VITE_API_URL;

export async function getConversations() {
  const response = await fetch(`${API_URL}/`);
  return await response.json();
}

export async function createConversation(title) {
  const response = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  return await response.json();
}
