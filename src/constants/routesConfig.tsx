import { RouteObject } from "react-router-dom";
import { routes } from "./routes";

export const routesConfig: RouteObject[] = [
    {
        children: routes,
    },
];