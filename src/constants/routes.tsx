import PageNotFound from "components/Page404";
import DashBoardMain from "features/dashboard";
import FileSystemPage from "features/files-system";
import MovieAuthorMainActorPage from "features/movie-author-main-actor";
import MovieCategoryPage from "features/movie-category";
import MovieManagerPage from "features/movie-manager";

import routePath from "./routePath";

export const routes = [
    { path: routePath.DASHBOARD, element: <DashBoardMain /> },
    { path: routePath.MOVIE_MANAGER, element: <MovieManagerPage /> },
    { path: routePath.MOVIE_CATEGORY, element: <MovieCategoryPage /> },
    { path: routePath.AUTHOR_MAIN_ACTOR, element: <MovieAuthorMainActorPage /> },
    { path: routePath.FILES_SYSTEM, element: <FileSystemPage /> },
    { path: "/*", element: <PageNotFound /> },
];