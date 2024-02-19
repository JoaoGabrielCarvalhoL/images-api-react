interface HomeComponentProps {
    message: string;
}

export const HomeComponent: React.FC<HomeComponentProps> = (props: HomeComponentProps) => {
    return (
        <div>
            {props.message}
        </div>
    );
}