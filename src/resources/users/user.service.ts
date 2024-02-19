import { UserRequest } from "./user.resource"

export class UserService {
    baseUrl:string = "http://127.0.0.1:8080/v1/users";

    async save(userRequest:UserRequest) : Promise<void> {
        const response = await fetch(this.baseUrl, {
            method: "POST", 
            body: JSON.stringify(userRequest), 
            headers: {
                "Content-Type": "application/json"
            } 
        });

        console.log(response);

        if (response.status == 409) {
            throw new Error("Resource already in used by other user on system. Email and username must be uniques.");
        }

    }
}



export const useUserService = () => new UserService();