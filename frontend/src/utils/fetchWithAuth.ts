export const fetchWithAuth = async (url: string, token: string, options: RequestInit = {}) => {
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    return fetch(url, { ...options, headers });
};