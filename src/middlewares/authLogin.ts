import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isByLength from 'validator/lib/isByteLength';
import { AuthLogin } from 'models';

export const handleValidationLogin = (data: AuthLogin, setValidator: React.SetStateAction<any>): boolean => {
    const msg = {
        email: '',
        password: '',
    };

    if(isEmpty(data.email))
        msg.email = "Trường này không được trống!";
    else if(!isEmail(data.email))
        msg.email = "Email không hợp lệ xin mời kiểm tra lại!";
    else
        msg.email = ''

    if(isEmpty(data.password))
        msg.password = "Trường này không được trống!";
    else if(isByLength(data.password, {min: 50}))
        msg.password = "Mật khẩu không được vượt quá 50 ký tự!";
    else
        msg.password = ''

    if(msg.email === '' && msg.password === '') 
    {
        setValidator(null);
        return true;
    }
    else
    {
        setValidator(msg);
        return false;
    }
   
}