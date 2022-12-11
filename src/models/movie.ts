interface Movies {
    id: string,
    category_name: string,
    createdBy: string,
    status: number,
    createdAt: string,
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
}