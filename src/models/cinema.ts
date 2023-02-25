


export interface CinemaSlice {
    // type action loading
    loadingFetch: boolean,
    loadingCreate: boolean,

    // data cinema
    sites: Array<any>,
    selectSite: number | null,

    cinemas: Array<any>,

    // type status edit
    statusEdited: number,

    // type pagination
    totalPage: number,
    currentPage: number,
    totalRows: number,

    // type message error
    errorMessage: string,
}