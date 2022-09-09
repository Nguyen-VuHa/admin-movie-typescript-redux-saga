import PageNotFound from "components/Page404";
import DashBoardMain from "features/dashboard";
import MovieCategoryPage from "features/movie-category";
import MovieManagerPage from "features/movie-manager";

import routePath from "./routePath";

export const routes = [
    { path: routePath.DASHBOARD, element: <DashBoardMain /> },
    { path: routePath.MOVIE_MANAGER, element: <MovieManagerPage /> },
    { path: routePath.MOVIE_CATEGORY, element: <MovieCategoryPage /> },
    { path: "/*", element: <PageNotFound /> },
];