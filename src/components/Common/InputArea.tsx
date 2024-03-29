import React, { useCallback, useEffect } from 'react';
import styleInput from 'assets/styles/input.style.module.scss';
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
    minHeight?: number,
}

const InputArea = ({ className, placeholder, onChange, value, type, id = '', errMessage, styleLayout, focus = false, minHeight = 300 }: InputProps, ref?: any) => {
    const handleOnChangeText = useCallback((text: string) => {
        onChange(text);
    },[]);

    useEffect(() => {
        if(focus && ref && ref.current) {
            ref.current.focus();
        }
    }, [focus])
    
    
    return (
       <div style={{ width: '100%', ...styleLayout }}>
            <textarea 
                ref={ref}
                id={id}
                style={{ paddingTop: 15, minHeight: `${minHeight}px`}}
                className={cx('custom-input-area', [`${className}`])}
                placeholder={placeholder}
                onChange={(e) => {
                    handleOnChangeText(e.target.value);
                }}
                value={value}
            />
            {
                errMessage && <small className={cx('message-error')}>{ errMessage }</small>
            }
       </div>
    )
}

export default React.memo(React.forwardRef(InputArea));