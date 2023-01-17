interface Movies {
    id: string,
    category_name: string,
    createdBy: string,
    status: number,
    createdAt: string,
}

interface PosterObject {
    id: number,
    base64: string,
}

export interface DataEditMovie {
    id: string,
    movieName: string,
    showtime: number,
    startDate: string,
    endDate: string,
    description: string,
    idTrailer: string,
    author: Array<string>,
    mainActor: Array<string>,
    categories: Array<string>,
}

export interface MsgErrorFormMovie {
    msgMovieName: string,
    msgShowtime: string,
    msgStartDate: string,
    msgEndDate: string,
    msgDescription: string,
    msgIdTrailer: string,
    msgAuthor: string,
    msgMainActor: string,
    msgCategories: string,
}

export interface MovieSlice {
    loadingFetch: boolean,
    loadingCreate: boolean,

    statusCreated: number,
    statusUpdated: number,
    statusDeleted: number,

    movies: Array<Movies> | [],

    totalPage: number,
    currentPage: number,
    totalRows: number,
    
    errorMessage: string,
    
    search: string,
    sortBy: string,

    modalEditImg: boolean,
    imgBase64: string,
    listPoster: Array<PosterObject>,
    dataEdit: DataEditMovie,
    msgDataEdit: MsgErrorFormMovie,
}