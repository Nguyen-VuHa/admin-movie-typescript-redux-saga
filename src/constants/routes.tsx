import PageNotFound from "components/Page404";
import DashBoardMain from "features/dashboard";
import MovieManagerPage from "features/movie-manager";

export const routes = [
    { path: "/dashboard", element: <DashBoardMain /> },
    { path: "/movie-manager", element: <MovieManagerPage /> },
    { path: "/*", element: <PageNotFound /> },
];