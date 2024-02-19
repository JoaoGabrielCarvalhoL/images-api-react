import * as Yup from "yup"

export interface LoginForm {
    name?: string, 
    email: string, 
    username?: string, 
    hashPassword: string,
    passwordMatch: string
}

export const validationScheme = Yup.object().shape({
    email: Yup.string().trim().required("Email is required!").email("Invalid email!"), 
    hashPassword: Yup.string().required("Password is required!").min(8, "Password must have at least 8 characters!"),
    passwordMatch: Yup.string().oneOf([Yup.ref('hashPassword')], "Password must match!")
});

export const formScheme: LoginForm = { name: "", email: "", username: "", hashPassword: "", passwordMatch: "" }