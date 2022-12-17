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
}