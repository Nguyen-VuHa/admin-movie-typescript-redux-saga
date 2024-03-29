
export interface MsgErrorFormCinema {
    msgSite: string,
    msgCinemaName: string,
    msgAddress: string,
}


export interface MsgErrorFormRoom {
    msgCinemaId: string,
    msgRoomName: string,
    msgRoomType: string,
    msgHorizontalSize: string,
    msgVerticalSize: string,
}


export interface DataEditCinema {
    id: string,
    siteCode: string,
    siteName: string,
    cinemaName: string,
    address: string,
    pointLat: string,
    pointLng: string,
}

export interface DataEditRooms {
    id: string,
    cinemaId: string,
    roomName: string,
    type: string,
    horizontalSize: number,
    verticalSize: number,
}

export interface CinemaSlice {
    // type action loading
    loadingFetch: boolean,
    loadingEdit: boolean,
    loadingFetchDetail: boolean,

    // data cinema
    sites: Array<any>,
    selectSite: number | null,

    cinemas: Array<any>,
    cinemaCombobox: Array<any>,
    selectCinema: string | null,

    rooms: Array<any>,

    areas: Array<any>,

    // type status edit
    statusEdited: number,

    // type pagination rooms
    totalPageRooms: number,
    currentPageRooms: number,
    totalRowsRooms: number,

    // type pagination
    totalPage: number,
    currentPage: number,
    totalRows: number,

    // data edit cinema
    dataEditCinema: DataEditCinema,

    // data edit rooms
    dataEditRooms: DataEditRooms,

    // type message error
    errorMessage: string,

    // type message error form data
    msgDataEdit: MsgErrorFormCinema,
    msgDataEditRoom: MsgErrorFormRoom,
}