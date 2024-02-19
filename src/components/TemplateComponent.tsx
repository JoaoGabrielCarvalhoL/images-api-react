import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { useAuthService } from "@/resources/users/authentication.service";
import { RenderIf } from "./RenderIf";
import { useRouter } from "next/navigation";

interface TemplateComponentProps {
    children: React.ReactNode
}

export const TemplateComponent: React.FC<TemplateComponentProps> = (props: TemplateComponentProps) => {
    return (
        <div>
            <Header></Header>
            <div className="container mx-auto mt-8 px-4">
                {props.children}
            </div>
            <Footer></Footer>
            <ToastContainer position="top-right" autoClose={8000} hideProgressBar={false} draggable={false} closeOnClick={true} pauseOnHover={true}></ToastContainer>
        </div>
    );
}

const Header: React.FC = () => {
    const authService = useAuthService();
    const user = authService.getUserSession();
    const router = useRouter();

    function logout() {
        authService.invalidateSession();
        router.push("/login");
    }

    return (
        
         <header className="bg-indigo-950 text-white py-3">
            <div className="container mx-auto flex justify-between items-center px-4">
                <Link href="/galery">
                    <h1 className="text-3x1 font-bold">Álbum de Fotos da FlorisANAL Pelada</h1>
                </Link>
                <RenderIf condition={!!user}>
                    <div className="flex items-center">
                        <div className="relative">
                            <span className="w-64 py-3 px-6 text-md">Welcome, {user?.name} </span>
                            <span className="w-64 py-3 px-6 text-sm">
                                <a href="#" onClick={logout}>
                                    Logout
                                </a>
                            </span>:
                        </div>
                    </div>
                </RenderIf>
            </div>
         </header>
        
    );
}

const Footer: React.FC = () => {
    return (
        
        <footer className="bg-indigo-950 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                <p>Desenvolvido por XVideos Brasil</p>
            </div>
        </footer>
        
    );
}