'use client';

import LoginPage from "@/app/login/page";
import { useAuthService } from "@/resources/users/authentication.service";

interface AuthenticatedPageProps {
    children: React.ReactNode
}

export const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({ children }) => {
    
    const authService = useAuthService();
    
    if (!authService.isSessionValid()) {
        return <LoginPage/>
    }

    return (
        <div>
            {children}
        </div>
    );
}