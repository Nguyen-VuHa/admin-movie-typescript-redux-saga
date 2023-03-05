import PageNotFound from "components/Page404";
import CinemaEditMain from "features/cinema-edit/CinemaEdit.main";
import CinemaRoomMain from "features/cinema-rooms/CinemaRoom.main";
import CinemaMain from "features/cinema/Cinema.main";
import DashBoardMain from "features/dashboard";
import FileSystemPage from "features/files-system";
import MovieAuthorMainActorPage from "features/movie-author-main-actor";
import MovieCategoryPage from "features/movie-category";
import MovieEditPage from "features/movie-edit/MovieEdit.main";
import MovieManagerPage from "features/movie-manager";

import routePath from "./routePath";

export const routes = [
    // Route Dashboard
    { path: routePath.DASHBOARD, element: <DashBoardMain /> },

    // Route Movie
    { path: routePath.MOVIE_MANAGER, element: <MovieManagerPage />},
    { path: routePath.MOVIE_EDITER, element: <MovieEditPage />},

    //Route Cinema
    { path: routePath.CINEMA_MANAGER, element: <CinemaMain />},
    { path: routePath.CINEMA_EDIT, element: <CinemaEditMain />},

    // Route cinema room
    { path: routePath.ROOM_MANAGER, element: <CinemaRoomMain />},

    // Route Category
    { path: routePath.MOVIE_CATEGORY, element: <MovieCategoryPage /> }, 

    // Route Main Actor, Author
    { path: routePath.AUTHOR_MAIN_ACTOR, element: <MovieAuthorMainActorPage /> },

    // Route File System
    { path: routePath.FILES_SYSTEM, element: <FileSystemPage /> },

    // Except for all of the above will run here
    { path: "/*", element: <PageNotFound /> },
];