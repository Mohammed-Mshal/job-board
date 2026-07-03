'use client';
import { useAuthStore } from "@/src/store/auth.store";
import { useEffect } from "react";
export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const fetchUser = useAuthStore((state) => state.fetchUser);

    useEffect(() => {
        fetchUser()
    }, [fetchUser]);
    return (
        <>
            {children}
        </>
    )
}