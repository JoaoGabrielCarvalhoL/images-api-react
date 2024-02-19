'use client'

import { ImageCardComponent } from "@/components/ImageCardComponent"
import { TemplateComponent } from "@/components/TemplateComponent"
import { useState } from "react"
import { useImageService } from "@/resources/image/image.service"
import { Image } from "@/resources/image/image.resource"
import Link from "next/link"
import { useNotification } from "@/components/notification"
import { AuthenticatedPage } from "@/components/AuthenticatedPage"

export default function GaleryPage() {

    const useService = useImageService();
    const notification = useNotification();
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>("");
    const [extension, setExtension] = useState<string>("");

    async function getAllImages() {
        const response = await useService.findAll();
        setImages(response);
        console.table(response);
        notification.notify("Getting all images", "success");
    }

    async function findByName() {
        console.log(query);
        const response = await useService.findByName(query);
        console.table(response);     
    }

    function renderImageCard(image: Image) {
        return (
            <ImageCardComponent name={image.name} key={image.id} 
                extension={image.extension}
                size={image.size} source={image.source} 
                uploadIn={image.uploadIn.toString()} ></ImageCardComponent>
        );
    }

    function renderImageCards() {
        return images.map(renderImageCard);
    }

    return (
        <div>
            <AuthenticatedPage>
                <TemplateComponent>

                    <section className="flex flex-col items-center justify-center my-5">
                        <div className="flex space-x-4">
                            <input type="text" 
                            onChange={event => setQuery(event.target.value)}
                            className="border px-5 py-2 rounded-lg text-gray-900"></input>
                            <select className="border px-4 py-2 rounded-lg text-gray-900" onChange={event => setExtension(event.target.value)}>
                                <option value="PNG">PNG</option>
                                <option value="GIF">GIF</option>
                                <option value="JPEG">JPEG</option>
                                <option value="PDF">PDF</option>
                            </select>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-300" onClick={findByName}>Search</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-300" onClick={getAllImages}>Find All Images</button>
                            <Link href="/form">
                                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-300">Add new document</button>
                            </Link>
                        </div>
                    </section>

                    <section className="grid grid-cols-4 gap-8">
                        <ImageCardComponent name="Earth" size={10} source="https://c4.wallpaperflare.com/wallpaper/848/572/54/space-world-planet-earth-wallpaper-thumb.jpg" uploadIn="31/01/2024"></ImageCardComponent>
                        <ImageCardComponent name="Mars" size={10} source="https://c4.wallpaperflare.com/wallpaper/201/912/973/mars-space-universe-artwork-wallpaper-thumb.jpg" uploadIn="31/01/2024"></ImageCardComponent>
                        <ImageCardComponent name="Galaxy" size={10} source="https://c4.wallpaperflare.com/wallpaper/130/39/667/space-art-spiral-galaxy-planet-stars-wallpaper-thumb.jpg" uploadIn="31/01/2024"></ImageCardComponent>
                        <ImageCardComponent name="Cosmic" size={10} source="https://c4.wallpaperflare.com/wallpaper/961/272/38/universe-galaxy-space-stars-wallpaper-thumb.jpg" uploadIn="31/01/2024"></ImageCardComponent>
                        <ImageCardComponent name="Mercury" size={10} source="https://c4.wallpaperflare.com/wallpaper/961/272/38/universe-galaxy-space-stars-wallpaper-thumb.jpg" uploadIn="31/01/2024"></ImageCardComponent>
                        <ImageCardComponent name="Jupiter" size={10} source="https://c4.wallpaperflare.com/wallpaper/986/898/387/space-planet-jupiter-hd-wallpaper-thumb.jpg" uploadIn="31/01/2024"></ImageCardComponent>
                        <ImageCardComponent name="Planets" size={10} source="https://c4.wallpaperflare.com/wallpaper/625/691/621/planet-space-solar-system-space-art-wallpaper-thumb.jpg" uploadIn="31/01/2024"></ImageCardComponent>
                        <ImageCardComponent name="Black Hole" size={10} source="https://c4.wallpaperflare.com/wallpaper/638/16/939/movies-gargantua-black-holes-artwork-wallpaper-thumb.jpg" uploadIn="31/01/2024"></ImageCardComponent>
                        {
                            renderImageCards()
                        }
                    
                    </section>
                </TemplateComponent>

            </AuthenticatedPage>
            
        </div>
    )
}