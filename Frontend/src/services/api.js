import axios from "axios";

const API_URL = "http://localhost:8080/api";

// Create a new code snippet
export const createCodeSnippet = (codeSnippet, userId) =>
  axios.post(`${API_URL}/code-snippets`, codeSnippet, {
    headers: {
      "Content-Type": "application/json",
    },
    params: { userId },
  });

// Get code snippets for a specific user
export const getUserCodeSnippets = (userId) =>
  axios.get(`${API_URL}/code-snippets/user/${userId}`);

// Update an existing code snippet
export const updateCodeSnippet = (initialData, codeSnippet, userId) =>
  axios.put(`${API_URL}/code-snippets/${initialData.id}`, codeSnippet, {
    headers: {
      "Content-Type": "application/json",
    },
    params: { userId },
  });

export const getUserById = (userId) => {
  return axios.get(`${API_URL}/user/${userId}`);
};

export const deleteUserByEmail = (email) => {
  return axios.delete(`${API_URL}/user/delete`, {
    params: { email },
  });
};

// Delete a code snippet
export const deleteCodeSnippet = (id, userId) =>
  axios.delete(`${API_URL}/code-snippets/${id}`, { params: { userId } });
