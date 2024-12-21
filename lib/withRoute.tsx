import { useParams } from "react-router-dom";

export const withRoute = (Component:any) => () => {
    const params = useParams();

    return <Component {...params} />;
}