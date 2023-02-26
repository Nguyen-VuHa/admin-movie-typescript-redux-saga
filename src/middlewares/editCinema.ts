import { DataEditCinema } from "models/cinema";
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