import React, { useCallback, useEffect, useRef } from 'react';
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
    focus?: boolean,
}

function Input({ className, placeholder, onChange, value, type, id, errMessage, styleLayout, focus = false }: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnChangeText = useCallback((text: string) => {
        onChange(text);
    },[]);

    useEffect(() => {
        if(focus && inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focus])
    
    
    return (
       <div style={{ width: '100%', ...styleLayout }}>
            <input 
                ref={inputRef}
                id={id}
                className={cx('custom-input', [`${className}`])}
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