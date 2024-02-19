import { AccessToken, UserRequest, AuthenticateRequest, UserSessionToken } from "./user.resource";
import jwt from "jwt-decode"

class AuthService {
    baseUrl:string = "http://127.0.0.1:8080/v1/auth"
    static AUTH_PARAM: string = "_auth";

    async authenticate(authenticate: AuthenticateRequest) : Promise<AccessToken> {
        const response = await fetch(this.baseUrl, {
            method: "POST", 
            body: JSON.stringify(authenticate), 
            headers: {
                "Content-Type": "application/json"
            }  
        });

        if (response.status == 401) {
            throw new Error("User or password are incorrect!")
        }

        return await response.json();
    }

    initSession(accessToken: AccessToken) {
        if (accessToken.token) {
            const decodedToken: any = jwt(accessToken.token);
            console.log("Decoded token: ", decodedToken);

            const userSession : UserSessionToken = {
                name: decodedToken.name, 
                email: decodedToken.sub,
                accessToken: accessToken.token,
                expiration: decodedToken.exp
            }

            this.setAuthentication(userSession);
        }
    }

    setAuthentication(userSession: UserSessionToken) {
        try {
            localStorage.setItem(AuthService.AUTH_PARAM, JSON.stringify(userSession));
        }catch(error) {
            console.log(error);
        }
    }

    invalidateSession(): void {
        try {
            localStorage.removeItem(AuthService.AUTH_PARAM);
        } catch(error) {
            console.log(error);
        }
    }

    getUserSession(): UserSessionToken | null {
        
        //const authentication = typeof window !== "undefined" ? window.localStorage.getItem(AuthService.AUTH_PARAM) : false;
        try {
            const authentication = localStorage.getItem(AuthService.AUTH_PARAM);
            if (!authentication) {
                return null;
            }
            const token: UserSessionToken = JSON.parse(authentication);
            return token;
        } catch(error) {
            return null;
        }
        
    }

    isSessionValid() : boolean {
        const user: UserSessionToken | null = this.getUserSession();
        if (!user) {
            return false;
        }
        
        const expiration: number | undefined = user.expiration;
        if (expiration) {
            const expirationDateMillis = expiration * 1000;
            return new Date() < new Date(expirationDateMillis);
        }
        return false;
    }
}

export const useAuthService = () => new AuthService();