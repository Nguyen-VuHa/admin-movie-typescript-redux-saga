import { DataEditShowTime } from "models";
import moment from "moment";
import isEmpty from "validator/lib/isEmpty";
import isUUID from "validator/lib/isUUID";

export const validatorEditShowtime = (data: DataEditShowTime, isUpdate: boolean = false): any => { 
    const msg = {
        msgRoomId: '',
        msgMovieId: '',
        msgFare: '',
        msgShowtime: '',
    };

    const { 
        roomId,
        movieId,
        fare,
        showtime,
    } = data;

    if(isEmpty(roomId))
        msg.msgRoomId = "Trường này không được trống!";
    else if(!isUUID(roomId))
        msg.msgRoomId = "Room ID phải là loại UUID";
    else
        msg.msgRoomId = ''

    if(isEmpty(movieId))
        msg.msgMovieId = "Trường này không được trống!";
    else if(!isUUID(movieId))
        msg.msgMovieId = "Room ID phải là loại UUID";
    else
        msg.msgMovieId = ''

    if(fare === 0)
        msg.msgFare = "Trường này không được trống!";
    else if(fare > 1000000)
        msg.msgFare = "Giá vé không được vượt quá 1,000,000 đ";
    else
        msg.msgFare = ''

    if(isEmpty(showtime))
        msg.msgShowtime = "Trường này không được trống!";
    else if((new Date(showtime)).toString() === "Invalid Date")
        msg.msgShowtime = "Định dạng ngày không hợp lệ!";
    else if(!isUpdate && !(moment(showtime).format('YYYY-MM-DD HH:mm') >= moment(new Date()).format('YYYY-MM-DD HH:mm')))
        msg.msgShowtime = "Ngày suất chiếu phải lớn hơn hoặc bằng ngày hiện tại!";
    else
        msg.msgShowtime = ''

    let status = true;

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