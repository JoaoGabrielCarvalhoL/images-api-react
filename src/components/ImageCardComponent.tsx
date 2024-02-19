'use client'

import React from "react";

interface ImageCardComponentProps {
    name?:string;
    size?:number;
    uploadIn?:string;
    source?:string;
    extension?:string
}

export const ImageCardComponent: React.FC<ImageCardComponentProps> = (props: ImageCardComponentProps) => {

    function download() {
        window.open(props.source, '_blank')
    }

    function formatBytes(bytes: number = 0, decimals = 2) {
        if (!+bytes) return '0 Bytes'
     
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
     
        const i = Math.floor(Math.log(bytes) / Math.log(k))
     
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    return (
        <div className="card relative bg-white rounded-md shadow-md transition-transform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2">
            <img onClick={download} src={props.source} className="h-56 w-full object-cover rounded-t-md" alt="" />
            <div className="card-body p-4">
                <h5 className="text-xl font-semibold mb-2 text-gray-600">{props.name}</h5>
                <p className="text-gray-600">{props.extension}</p>
                <p className="text-gray-600">{formatBytes(props.size)}</p>
                <p className="text-gray-600">{props.uploadIn}</p>
            </div>
        </div>
    );
}