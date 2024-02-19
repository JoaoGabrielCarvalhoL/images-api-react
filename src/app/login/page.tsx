'use client'

import { RenderIf } from "@/components/RenderIf";
import { TemplateComponent } from "@/components/TemplateComponent"
import { useState } from "react";
import { LoginForm, formScheme, validationScheme } from "./formScheme";
import { useFormik } from "formik";
import { useAuthService } from "@/resources/users/authentication.service";
import { useRouter } from "next/navigation";
import { AccessToken, AuthenticateRequest, UserRequest } from "@/resources/users/user.resource";
import { useNotification } from "@/components/notification";
import { useUserService } from "@/resources/users/user.service";

export default function LoginPage() {

    const [newUserState, setNewUserState] = useState<boolean>(false);

    const authService = useAuthService();
    const userService = useUserService();
    const notification = useNotification();
    const router = useRouter();
    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<LoginForm>({
        initialValues: formScheme, 
        validationSchema: validationScheme, 
        onSubmit: onSubmit
    });

    async function onSubmit(values: LoginForm) {
        if (!newUserState) {
            const authenticateRequest: AuthenticateRequest = {
                email: values.email, 
                password: values.hashPassword 
            }

                try {
                    const accessToken: AccessToken = await authService.authenticate(authenticateRequest);
                    authService.initSession(accessToken);
                    authService.isSessionValid();
                    router.push("/galery")
                } catch(error: any) {
                    const message = error?.message;
                    notification.notify(message, "error")
                }
        } else {
            const userRequest: UserRequest = {
                name: values.name, 
                email: values.email, 
                username: values.username, 
                password: values.hashPassword
            }

            console.log(userRequest);

            try {
                await userService.save(userRequest);
                notification.notify("Success on saving user!", "success")
                resetForm();
                setNewUserState(false);
            } catch(error: any) {
                const message = error?.message;
                notification.notify(message, "error")
            }
        }
    }
        
    
    return (
        <TemplateComponent>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900">
                        { newUserState ? "Create New User" : "Sign In to Your Account" }
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-2">

                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Name:  </label>
                            </div>

                            <div className="mt-2">
                                <input type="text" className="w-full border px-5 py-2 rounded-lg text-gray-900" id="name" 
                                value={values.name} onChange={handleChange}></input>
                            </div>
                            <span className="text-red-500">
                                {errors.name}
                            </span>
                        
                        </RenderIf>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email:  </label>
                        </div>

                        <div className="mt-2">
                            <input type="email" className="w-full border px-5 py-2 rounded-lg text-gray-900" id="email" 
                            value={values.email} onChange={handleChange}></input>
                        </div>
                        <span className="text-red-500">
                                {errors.email}
                        </span>

                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Username:  </label>
                            </div>

                            <div className="mt-2">
                                <input type="text" className="w-full border px-5 py-2 rounded-lg text-gray-900" id="username" 
                                value={values.username} onChange={handleChange}></input>
                            </div>
                        </RenderIf>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password:  </label>
                        </div>

                        <div className="mt-2">
                            <input type="password" className="w-full border px-5 py-2 rounded-lg text-gray-900" id="hashPassword" 
                            value={values.hashPassword} onChange={handleChange}></input>
                        </div>
                        <span className="text-red-500">
                                {errors.hashPassword}
                        </span>

                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Repeat Password:  </label>
                            </div>

                            <div className="mt-2">
                                <input type="password" className="w-full border px-5 py-2 rounded-lg text-gray-900" id="passwordMatch" 
                                value={values.passwordMatch} onChange={handleChange}></input>
                            </div>
                            <span className="text-red-500">
                                {errors.passwordMatch}
                            </span>
                        </RenderIf>

                        <div>
                            <RenderIf condition={newUserState}>
                                <button className="bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-500" type="submit">Save</button>
                                <button className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-500 mx-3" type="button" onClick={event => setNewUserState(false)}>Cancel</button>
                            </RenderIf>

                            <RenderIf condition={!newUserState}>
                                <button className="bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-500" type="submit">Sign In</button>
                                <button className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-500 mx-3" type="button" onClick={event => setNewUserState(true)}>Sign Up</button>
                            </RenderIf>
                        </div>
                    </form>
                </div>
            </div>
        </TemplateComponent>
    );
}
