import React, { ReactNode, useRef } from 'react'
import classNames from 'classnames/bind';
import styleButton from 'assets/styles/styleButton.module.scss';
import { hexToRGBA } from 'utils/hexToRgba';

const cx = classNames.bind(styleButton);

interface ButtonProps {
    className?: Object,
    onClick?: Function,
    style?: Object,
    title?: string,
    icon?: ReactNode,
    color?: string,
}

export function ButtonTable({ onClick, style, icon, color = '#fff' }: ButtonProps) {
    const buttonRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={buttonRef}
            className={cx('btn-table')}
            onClick={() => {
                onClick && onClick();
            }}
            style={{
                color: color,
                backgroundColor: hexToRGBA(color, 0.08),
                transition: 'all .3s ease',
                ...style,
            }}
            onMouseMove={() => {
                if(buttonRef.current)
                    buttonRef.current.style.backgroundColor = hexToRGBA(color, 0.2);
            }}
            onMouseLeave={() => {
                if(buttonRef.current)
                    buttonRef.current.style.backgroundColor = hexToRGBA(color, 0.08);
            }}
        >
            { icon && icon}
        </div>
    )
}