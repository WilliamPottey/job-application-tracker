const API_BASE_URL = "http://localhost:3000";

export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "API request failed")
    }

    return response.json()
}