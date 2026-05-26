import { createContext, useState, useEffect, useContext } from "react";
import { apiClient } from "../lib/api";

type AuthUser = {
    sub: string;
    role: string;
};

type AuthContextType = {
    user: AuthUser | null;
    token: string | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoggedIn: boolean;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const parseToken = (token: string) => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload;
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token){
            setToken(token);
                const payload = parseToken(token);
                if (!payload) {
                    localStorage.removeItem("token");
                    setToken(null);
                    setUser(null);
                    setIsLoggedIn(false);
                } else {
                    setUser({ sub: payload.sub, role: payload.role });
                    setIsLoggedIn(true);
                }
            }
        setIsLoading(false);
    }, []);
    const login = async (username: string, password: string) => {
            const response = await apiClient("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ username, password }),
            });
            if (response.success){
                setToken(response.data.token);
                const payload = parseToken(response.data.token);
                if (!payload) {
                    localStorage.removeItem("token");
                    setToken(null);
                    setUser(null);
                    setIsLoggedIn(false);
                    return;
                }
                setUser({ sub: payload.sub, role: payload.role });
                setIsLoggedIn(true);
                localStorage.setItem("token", response.data.token);
            } else {
                console.error("Login failed", response.error);
            }
            return response.success;
    };
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsLoggedIn(false);
    };
    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};