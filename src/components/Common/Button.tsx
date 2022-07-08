import React, { ReactNode } from 'react'
import classNames from 'classnames/bind';
import styleButton from 'assets/styles/styleButton.module.scss';

const cx = classNames.bind(styleButton);

interface ButtonProps {
    children: ReactNode,
    className?: Object,
    onClick: Function,
}

export function Button({ children, className, onClick }: ButtonProps) {
    return (
        <button
            className={cx('button-layout', className)}
            type="button"
            onClick={() => onClick()}
        >
            { children }
        </button>
    )
}