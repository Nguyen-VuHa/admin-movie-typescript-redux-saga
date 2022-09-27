import React, { useCallback } from 'react';
import styleInput from 'assets/styles/styleInput.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styleInput);

interface InputProps {
    className?: Object,
    placeholder?: string,
    onChange: Function,
    value: string,
    type?: string,
    id?: string,
    errMessage?: string,
    styleLayout?: Object,
}

function Input({ className, placeholder, onChange, value, type, id, errMessage, styleLayout }: InputProps) {

    const handleOnChangeText = useCallback((text: string) => {
        onChange(text);
    },[]);
    
    return (
       <div style={{ width: '100%', ...styleLayout }}>
            <input 
                id={id}
                className={cx('custom-input', [{ className }])}
                placeholder={placeholder}
                onChange={(e) => {
                    handleOnChangeText(e.target.value);
                }}
                value={value}
                type={type || 'text'}
            />
            {
                errMessage && <small className={cx('message-error')}>{ errMessage }</small>
            }
       </div>
    )
}

export default React.memo(Input)