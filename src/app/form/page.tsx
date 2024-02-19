'use client'

import { TemplateComponent } from "@/components/TemplateComponent"
import Link from "next/link"
import { useFormik } from "formik"
import { useImageService } from "@/resources/image/image.service"
import { useNotification } from "@/components/notification"
import { FormProps, formScheme, formValidationScheme } from "./formScheme"
import { AuthenticatedPage } from "@/components/AuthenticatedPage"
export default function FormPage() {

    const service = useImageService();
    const notification = useNotification();

    const formik = useFormik({
        initialValues: formScheme, 
        onSubmit: handleSubmit, 
        validationSchema: formValidationScheme
    });

    async function handleSubmit(data: FormProps) {
        const formData = new FormData();
        formData.append("file", data.file);
        formData.append("name", data.name);
        formData.append("tags", data.tags);
        await service.save(formData);

        formik.resetForm();
        notification.notify("Upload sent successfully!", "success");
    }

    function onFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            console.log(event.target.files)
            const files = event.target.files[0];
            formik.setFieldValue("file", files);
        }
    }

    return (
        <AuthenticatedPage>
            <TemplateComponent>
                <section className="flex flex-col items-center justify-center my-5">
                    <h5 className="mt-3 mb-10 text-3xl font-extrabold tracking-tight text-gray-900">Add new Document</h5>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Name: *</label>
                            <input id="name" type="text" value={formik.values.name} onChange={formik.handleChange} required className="border px-5 py-2 rounded-lg text-gray-900" placeholder="Type image name"></input>
                            <span className="text-red-500">
                                {formik.errors.name}
                            </span>
                        </div>

                        <div className="mt-5 grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Tags: *</label>
                            <input id="tags" type="text" value={formik.values.tags} onChange={formik.handleChange} required className="border px-5 py-2 rounded-lg text-gray-900" placeholder="Type the tags comma separeted"></input>
                            <span className="text-red-500">
                                {formik.errors.tags}
                            </span>
                        </div>

                        <div className="mt-5 grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Document: *</label>
                            <span className="text-red-500">
                                {formik.errors.file}
                            </span>
                            <div className="mt-2 flex justify-center roudend-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center ">
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <input type="file" required onChange={onFileUpload} className="border px-5 py-2 rounded-lg text-gray-900"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 flex items-center justify-end gap-x-6">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-300" type="submit">Save</button>
                            <Link href="/galery">
                                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-300" type="button">Cancel</button>
                            </Link>
                        </div>

                    </form>
                </section>
            </TemplateComponent>

        </AuthenticatedPage>
    )
}