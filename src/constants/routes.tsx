import PageNotFound from "components/Page404";
import DashBoardMain from "features/dashboard";

export const routes = [
    { path: "/dashboard", element: <DashBoardMain /> },
    { path: "/*", element: <PageNotFound /> },
];