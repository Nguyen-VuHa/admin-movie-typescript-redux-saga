import React from 'react';
import styleInput from 'assets/styles/styleInput.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styleInput);

interface InputProps {
    className?: Object,
    placeholder?: string,
    onChange: Function,
    value: string,
    type?: string,
}

function Input({ className, placeholder, onChange, value, type }: InputProps) {

    return (
        <input 
            className={cx('custom-input', className)}
            placeholder={placeholder}
            onChange={(e) => {
                onChange(e.target.value);
            }}
            value={value}
            type={type || 'text'}
        />
    )
}

export default React.memo(Input)