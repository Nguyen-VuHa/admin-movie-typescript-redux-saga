import React, { ReactNode } from 'react'
import classNames from 'classnames/bind';
import styleButton from 'assets/styles/styleButton.module.scss';

const cx = classNames.bind(styleButton);

interface ButtonProps {
    children: ReactNode,
    className?: Object,
}

export function Button({ children, className }: ButtonProps) {
    return (
        <button
            className={cx('button-layout', className)}
            type="button"
        >
            { children }
        </button>
    )
}