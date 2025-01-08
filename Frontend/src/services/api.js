const API_URL = "http://localhost:8080/api";

// Create a new code snippet
export const createCodeSnippet = async (codeSnippet, userId) => {
  const response = await fetch(`${API_URL}/code-snippets?userId=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(codeSnippet),
  });
  return response.json();
};

// Get code snippets for a specific user
export const getUserCodeSnippets = async (userId) => {
  const response = await fetch(`${API_URL}/code-snippets/user/${userId}`);
  return response.json();
};

// Update an existing code snippet
export const updateCodeSnippet = async (initialData, codeSnippet, userId) => {
  const response = await fetch(
    `${API_URL}/code-snippets/${initialData.id}?userId=${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(codeSnippet),
    }
  );
  return response.json();
};

export const getUserById = async (userId) => {
  const response = await fetch(`${API_URL}/user/${userId}`);
  return response.json();
};

export const deleteUserByEmail = async (email) => {
  const response = await fetch(`${API_URL}/user/delete?email=${email}`, {
    method: "DELETE",
  });
  return response;
};

// Delete a code snippet
export const deleteCodeSnippet = async (id, userId) => {
  const response = await fetch(
    `${API_URL}/code-snippets/${id}?userId=${userId}`,
    {
      method: "DELETE",
    }
  );
  return response;
};
