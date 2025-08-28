// hooks/useAuth.ts
import { useState, useEffect } from "react";

export interface User {
    email: string;
    name?: string;
    user_id?: string;
}

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/me', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();

                if (data.authenticated) {
                    setUser({
                        email: data.email,
                        name: data.name,
                        user_id: data.user_id,
                    });
                    setIsLoggedIn(true);
                } else {
                    setUser(null);
                    setIsLoggedIn(false);
                }
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Erreur lors de la vérification de l'auth:", error);
            setUser(null);
            setIsLoggedIn(false);
        } finally {
            setIsLoading(false);
        }
    };

    const login = () => {
        window.location.href = "http://localhost:8080/auth/google";
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:8080/auth/logout', {
                method: 'GET',
                credentials: 'include',
            });

            setUser(null);
            setIsLoggedIn(false);
        } catch (error) {
            console.error("Erreur de déconnexion:", error);
        }
    };

    return {
        isLoggedIn,
        isLoading,
        user,
        login,
        logout,
        checkAuthStatus
    };
};