import { apiFetch } from "./client";

export async function login(email: string, password: string) {
    return apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
    });
}

export async function register(
    email: string,
    password: string,
    name: string)
    {
    return apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, name})
    })
}
