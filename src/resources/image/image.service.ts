import { Image } from "./image.resource";
import { useAuthService } from "../users/authentication.service";

class ImageService {
    baseUrl:string = "http://127.0.0.1:8080/v1/images";
    authService = useAuthService();

    async findAll(): Promise<Image[]> {
        const userSession = this.authService.getUserSession();
        const response = await fetch(this.baseUrl, {
            headers: {
                "Authorization": `Bearer ${userSession?.accessToken}`
            }
        });
        return await response.json();
    }

    async findByExtesion(extension:string): Promise<Image[]> {
        const response = await fetch(this.baseUrl+"/v2/filter/extension?extension="+extension);
        return await response.json();
    }

    async findByName(name:string): Promise<Image> {
        const response = await fetch(this.baseUrl+"/v2/filter/name?name="+name);
        return await response.json();
    }

    async save(data: FormData) : Promise<string | null> {
        const userSession = this.authService.getUserSession();
        const response = await fetch(this.baseUrl, {
            method: 'POST', 
            body: data, 
            headers: {
                "Authorization": `Bearer ${userSession?.accessToken}`
            }
        });

        return response.headers.get('location');
    }
}

export const useImageService = () => new ImageService();