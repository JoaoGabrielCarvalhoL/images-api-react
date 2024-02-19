import exp from "constants";

export class UserRequest {
    public name?: string; 
    public email?: string;
    public username?: string; 
    public password?: string;

    constructor(name:string, email:string, username:string, password:string) {
        this.name = name; 
        this.email = email; 
        this.username = username; 
        this.password = password;
    }
}

export class AuthenticateRequest {
    public email: string;
    public password: string;

    constructor(email:string, password:string) {
        this.email = email; 
        this.password = password;
    }
}

export class AccessToken {
    public token: string;

    constructor(token: string) {
        this.token = token;
    }
}

export class UserSessionToken {
    public name?: string; 
    public email?: string; 
    public accessToken?: string; 
    public expiration?: number;

    constructor (name: string, email:string, accessToken: string, expiration: number) {
        this.name = name; 
        this.email = email; 
        this.accessToken = accessToken;
        this.expiration = expiration;
    }
}