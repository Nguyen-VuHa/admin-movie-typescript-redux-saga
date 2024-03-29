import React, { ReactNode, useRef, useState } from 'react'
import classNames from 'classnames/bind';
import styleButton from 'assets/styles/button.style.module.scss';
import { TailSpin } from  'react-loader-spinner';

const cx = classNames.bind(styleButton);

interface ButtonProps {
    children: ReactNode,
    className?: Object,
    onClick?: Function,
    loading?: boolean,
    loadingText?: string,
    style?: Object,
    title?: string,
    buttonType?: 'default' | 'dismiss',
    type?: "button" | "submit" | "reset" | undefined,
}

export function Button({ children, className, onClick, loading = false, loadingText, style, title, buttonType = 'default', type = 'button' }: ButtonProps) {

    const buttonRef = useRef<HTMLButtonElement>(null);

    const [statusHover, setStatusHover] = useState(false);
    const [position, setPosition] = useState('bottom');
    

    return (
        <button
            ref={buttonRef}
            className={cx(
                `button-layout`, 
                [ `${buttonType}`, `${className}` ]
            )}
            type={type}
            onClick={() => {
                if(!loading)
                    onClick && onClick();
            }}
            disabled={loading}
            style={style}
            onMouseMove={(e: any) => {
                if(buttonRef && buttonRef.current) {
                    setStatusHover(true);
                    let rect = buttonRef.current.getBoundingClientRect();
              
                    if(rect.top + rect.height >= window.innerHeight)
                    {
                        if(rect.left <= rect.width) 
                            setPosition('right');
                        else if(rect.width + rect.left >= window.innerWidth)
                            setPosition('left');
                        else
                            setPosition('top');
                    }
                    else 
                    {
                        if(rect.left <= rect.width) 
                            setPosition('right');
                        else if(rect.width + rect.left >= window.innerWidth)
                            setPosition('left');
                        else
                            setPosition('bottom');
                    }
                }
            }}
            onMouseLeave={() => setStatusHover(false)}
        >
            {
                loading ? 
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <TailSpin 
                        height={25}
                        width={25}
                        color='white'
                    />
                    {
                        loadingText && <div style={{marginLeft: '0.8rem'}}>{ loadingText }</div>
                    }
                </div>
                : children
            }
            {
                title && <div className={cx('title' , [statusHover ? 'show' : '', `${position}`])}>
                    { title }
                </div>
            }
        </button>
    )
}