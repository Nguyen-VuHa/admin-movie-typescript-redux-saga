
export interface MsgErrorFormShowTime {
    msgRoomId: string,
    msgMovieId: string,
    msgFare: string,
    msgShowtime: string,
}


export interface DataEditShowTime {
    id: string,
    roomId: string,
    movieId: string,
    fare: number,
    showtime: string,
    description: string,
}


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

    dataEdit: DataEditShowTime,
    msgDataEdit: MsgErrorFormShowTime,
    
    errorMessage: string,

    siteSelectEdit: string | null,
    cinemaSelectEdit: string | null,
}