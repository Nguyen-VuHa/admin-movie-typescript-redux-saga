import { DataEditMovie } from "models";
import isLength from "validator/lib/isLength";
import isEmpty from "validator/lib/isEmpty";
import isDate from "validator/lib/isDate";
import moment from "moment";

export const validatorEditMovie = (data: DataEditMovie, isUpdate: boolean = false): any => {
    const msg = {
        msgMovieName: '',
        msgShowtime: '',
        msgStartDate: '',
        msgEndDate: '',
        msgDescription: '',
        msgIdTrailer: '',
        msgAuthor: '',
        msgMainActor: '',
        msgCategories: '',
    };
    
    const { 
        movieName,
        showTime,
        startDate,
        endDate,
        description,
        idTrailer,
        author,
        mainActor,
        categories,
    } = data;

    if(isEmpty(movieName))
        msg.msgMovieName = "Trường này không được trống!";
    else if(!isLength(movieName, { max: 60 }))
        msg.msgMovieName = "Tên phim không được vượt quá 60 ký tự!";
    else
        msg.msgMovieName = ''

    if(isEmpty(showTime.toString()))
        msg.msgShowtime = "Trường này không được trống!";
    else if(showTime < 60 || showTime > 180)
        msg.msgShowtime = "Thời lượng phim không được dưới 60 phút và trên 180 phút!";
    else
        msg.msgShowtime = ''

    if(isEmpty(startDate))
        msg.msgStartDate = "Trường này không được trống!";
    else if(!isDate(startDate))
        msg.msgStartDate = "Định dạng ngày không hợp lệ!";
    else if(!isUpdate && !(moment(startDate).format('YYYY-MM-DD') >= moment(new Date()).format('YYYY-MM-DD')))
        msg.msgStartDate = "Ngày bắt đầu phải lớn hơn hoặc bằng ngày hiện tại!";
    else
        msg.msgStartDate = ''

    if(isEmpty(endDate))
        msg.msgEndDate = "Trường này không được trống!";
    else if(!isDate(endDate))
        msg.msgEndDate = "Định dạng ngày không hợp lệ!";
    else if(!(moment(endDate).format('YYYY-MM-DD') >= moment(new Date()).format('YYYY-MM-DD')) || moment(endDate).format('YYYY-MM-DD') <= moment(startDate).format('YYYY-MM-DD'))
        msg.msgEndDate = "Ngày kết thúc phải lớn hơn ngày hiện tại và ngày bắt đầu!";
    else
        msg.msgEndDate = ''

    if(isEmpty(description))
        msg.msgDescription = "Trường này không được trống!";
    else if(!isLength(description, { max: 1000 }))
        msg.msgDescription = "Mô tả không được vượt quá 1000 ký tự!";
    else
        msg.msgDescription = ''

    if(isEmpty(idTrailer))
        msg.msgIdTrailer = "Trường này không được trống!";
    else if(!isLength(idTrailer, { max: 20 }))
        msg.msgIdTrailer = "Mô tả không được vượt quá 20 ký tự!";
    else
        msg.msgIdTrailer = ''

    if(author && author.length <= 0)
        msg.msgAuthor = "Bạn chưa chọn đạo diễn!";
    else
        msg.msgAuthor = ''

    if(mainActor && mainActor.length <= 0)
        msg.msgMainActor = "Bạn chưa chọn diễn viên!";
    else
        msg.msgMainActor = ''

    if(categories && categories.length <= 0)
        msg.msgCategories = "Bạn chưa chọn danh mục!";
    else
        msg.msgCategories = ''

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