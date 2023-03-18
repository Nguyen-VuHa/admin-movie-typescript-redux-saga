export interface ShowtimeSlice {
    loadingFetch: boolean,
    loadingEdit: boolean,
    loadingDetail: boolean,

    statusEdit: number,
    statusDeleted: number,
    statusDetail: number,
    
    showtimes: Array<any>,

    totalPage: number,
    currentPage: number,
    totalRows: number,
    
    errorMessage: string,
}