import { DataEditCinema, DataEditRooms } from "models/cinema";
import isEmpty from "validator/lib/isEmpty";
import isLength from "validator/lib/isLength";


export const validateDataCinema = (data: DataEditCinema) => {
    const {
        siteCode,
        siteName,
        cinemaName,
        address,
    } = data;

    const msg = {
        msgSite: '',
        msgCinemaName: '',
        msgAddress: '',
    };

    msg.msgSite = validateSites(siteCode, siteName);
    msg.msgCinemaName = validateCinemaName(cinemaName);
    msg.msgAddress = validateCinemaAddress(address);

    let status = true;

    // check properties in the object `msg` must be empty => status is true and vice versa
    for(let i = 0; i < Object.keys(msg).length; i++) {
        if(Object.values(msg)[i])
        {
            status = false;
            break;
        }
    }

    return {
        status,
        error: msg,
    }; 
}

// validate variable sites `siteCode` & `siteName`
function validateSites(siteCode: string, siteName: string) {
    if(isEmpty(siteCode) || isEmpty(siteName))
        return "Trường này không được trống!";
    else if(!isLength(siteCode, { max: 6 }) || !isLength(siteName, { max: 50 }))
        return "Độ dài của trường khu vực vượt quá quy định! vui lòng xem lại";
    else
        return ''
}

// validate variable `cinemaName`
function validateCinemaName(cinemaName: string) {
    if(isEmpty(cinemaName))
        return "Trường này không được trống!";
    else if(!isLength(cinemaName, { max: 50 }))
        return "Tên rạp phim không được vượt quá 50 ký tự!";
    else
        return ''
}

// validate variable `address`
function validateCinemaAddress(address: string) {
    if(isEmpty(address))
        return "Trường này không được trống!";
    else if(!isLength(address, { max: 300 }))
        return "Tên rạp phim không được vượt quá 300 ký tự!";
    else
        return ''
}

export const validateDataRoom = (data: DataEditRooms) => {
    const {
        cinemaId,
        roomName,
        type,
        horizontalSize,
        verticalSize,
    } = data;

    const msg = {
        msgCinemaId: '',
        msgRoomName: '',
        msgRoomType: '',
        msgHorizontalSize: '',
        msgVerticalSize: '',
    };

    if(isEmpty(cinemaId))
        msg.msgCinemaId = 'Bạn chưa chọn cụm rạp cho phòng chiếu';

    msg.msgRoomName = validateRoomName(roomName);
    msg.msgRoomType = validateRoomType(type);
    msg.msgHorizontalSize = validateHorizontalSize(horizontalSize);
    msg.msgVerticalSize = validateVerticalSize(verticalSize);

    let status = true;

    // check properties in the object `msg` must be empty => status is true and vice versa
    for(let i = 0; i < Object.keys(msg).length; i++) {
        if(Object.values(msg)[i])
        {
            status = false;
            break;
        }
    }

    return {
        status,
        error: msg,
    }; 
}

// validate variable `roomName`
function validateRoomName(roomName: string) {
    if(isEmpty(roomName))
        return "Trường này không được trống!";
    else if(!isLength(roomName, { max: 50 }))
        return "Tên phòng chiếu không được vượt quá 50 ký tự!";
    else
        return ''
}

// validate variable `roomType`
function validateRoomType(roomType: string) {
    if(isEmpty(roomType))
        return "Trường này không được trống!";
    else if(!isLength(roomType, { max: 50 }))
        return "Tên loại phòng chiếu không được vượt quá 50 ký tự!";
    else
        return ''
}

const HORIZONTAL_MIN_SIZE = 10;
const HORIZONTAL_MAX_SIZE = 18;
const VERTICAL_MIN_SIZE = 8;
const VERTICAL_MAX_SIZE = 15;

// validate variable `horizontalSize`
function validateHorizontalSize(size: number) {
    if(size === 0 || isEmpty(size.toString()))
        return "Trường này không được trống!";
    else if(size < HORIZONTAL_MIN_SIZE || size > HORIZONTAL_MAX_SIZE)
        return `Kích thước chiều ngang tối thiểu là ${HORIZONTAL_MIN_SIZE} và không vượt quá ${HORIZONTAL_MAX_SIZE}`;
    else
        return ''
}

// validate variable `horizontalSize`
function validateVerticalSize(size: number) {
    if(size === 0 || isEmpty(size.toString()))
        return "Trường này không được trống!";
    else if(size < VERTICAL_MIN_SIZE || size > VERTICAL_MAX_SIZE)
        return `Kích thước chiều dọc tối thiểu là ${VERTICAL_MIN_SIZE} và không vượt quá ${VERTICAL_MAX_SIZE}`;
    else
        return ''
}