import { lazy } from 'react';
import routePath from "./routePath";

const PageNotFound = lazy(() => import("components/Page404"));
const CinemaEditMain = lazy(() => import("features/cinema-edit/CinemaEdit.main"));
const CinemaRoomEditMain = lazy(() => import("features/cinema-rooms-edit/CinemaRoomEdit.main"));
const CinemaRoomMain = lazy(() => import("features/cinema-rooms/CinemaRoom.main"));
const CinemaMain = lazy(() => import("features/cinema/Cinema.main"));
const DashBoardMain = lazy(() => import("features/dashboard"));
const FileSystemPage = lazy(() => import("features/files-system"));
const MovieAuthorMainActorPage = lazy(() => import("features/movie-author-main-actor"));
const MovieCategoryPage = lazy(() => import("features/movie-category"));
const MovieEditPage = lazy(() => import("features/movie-edit/MovieEdit.main"));
const MovieManagerPage = lazy(() => import("features/movie-manager"));
const ShowTimeEditPage = lazy(() => import("features/showtime-edit/ShowTimeEdit.main"));
const ShowTimeMain = lazy(() => import("features/showtime/ShowTime.main"));
const StudioMainPage = lazy(() => import("features/studio-video"))
const StudioEditMainPage = lazy(() => import("features/studio-video-edit"))

export const routes = [
    // Route Dashboard
    { path: routePath.DASHBOARD, element: <DashBoardMain /> },

    // Router Studio
    { path: routePath.STUDIO_VIDEO, element: <StudioMainPage />},
    { path: routePath.STUDIO_VIDEO_EDIT, element: <StudioEditMainPage />},

    // Route Movie
    { path: routePath.MOVIE_MANAGER, element: <MovieManagerPage />},
    { path: routePath.MOVIE_EDITER, element: <MovieEditPage />},

    //Route Cinema
    { path: routePath.CINEMA_MANAGER, element: <CinemaMain />},
    { path: routePath.CINEMA_EDIT, element: <CinemaEditMain />},

    // Route cinema room
    { path: routePath.ROOM_MANAGER, element: <CinemaRoomMain />},
    { path: routePath.ROOM_EDIT, element: <CinemaRoomEditMain />},

    // Route showtime manager
    { path: routePath.SHOWTIME_MANAGER, element: <ShowTimeMain />},
    { path: routePath.SHOWTIME_EDIT, element: <ShowTimeEditPage />},

    // Route Category
    { path: routePath.MOVIE_CATEGORY, element: <MovieCategoryPage /> }, 

    // Route Main Actor, Author
    { path: routePath.AUTHOR_MAIN_ACTOR, element: <MovieAuthorMainActorPage /> },

    // Route File System
    { path: routePath.FILES_SYSTEM, element: <FileSystemPage /> },

    // Except for all of the above will run here
    { path: "/*", element: <PageNotFound /> },
];