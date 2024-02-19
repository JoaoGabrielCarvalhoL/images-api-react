import { UUID } from "crypto";

export class Image {
    public size:number;
    public name:string;
    public extension:string;
    public id:UUID; 
    public source:string;
    public uploadIn:Date;

    constructor(size:number, name:string, extension:string, id:UUID, source:string, uploadIn:Date) {
        this.size = size;
        this.name = name; 
        this.extension = extension;
        this.id = id;
        this.source = source;
        this.uploadIn = uploadIn;
    }

    public getSize():number {
        return this.size;
    }

    public setSize(size:number):void {
        this.size = size;
    }

    public getName():string {
        return this.name;
    }

    public setName(name:string) {
        this.name = name;
    }

    public getExtension():string {
        return this.extension;
    }

    public setExtension(extension:string) {
        this.extension = extension;
    }

    public getId():UUID {
        return this.id;
    }

    public setId(id:UUID) {
        this.id = id;
    }

    public getSource():string {
        return this.source;
    }

    public setSource(source:string) {
        this.source = source;
    }

    public getUploadIn():Date {
        return this.uploadIn;
    }

    public setUploadIn(uploadIn:Date) {
        this.uploadIn = uploadIn;
    }
}