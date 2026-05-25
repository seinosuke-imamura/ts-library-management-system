const baseURL = 'http://localhost:3000';

export const apiClient = async (endpoint: string, options?: RequestInit ) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${baseURL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return response.json();
};