import { useState } from "react";
import { AuthContext } from "./AuthContext"
import type { User } from "./AuthContext"

export function AuthProvider({ children }: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    function login(token: string, user: User) {
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
    }

    function logout() {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token")
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
