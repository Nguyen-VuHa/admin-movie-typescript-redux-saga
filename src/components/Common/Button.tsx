import React, { ReactNode } from 'react'
import classNames from 'classnames/bind';
import styleButton from 'assets/styles/styleButton.module.scss';
import { TailSpin } from  'react-loader-spinner';

const cx = classNames.bind(styleButton);

interface ButtonProps {
    children: ReactNode,
    className?: Object,
    onClick: Function,
    loading?: boolean,
    loadingText?: string,
}

export function Button({ children, className, onClick, loading = false, loadingText }: ButtonProps) {
    return (
        <button
            className={cx('button-layout', className)}
            type="button"
            onClick={() => onClick()}
            disabled={loading}
        >
            {
                loading ? 
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}}>
                    <TailSpin 
                        height={25}
                        width={25}
                        color='white'
                    />
                    {
                        loadingText && <div style={{marginLeft: '0.2rem'}}>{ loadingText }</div>
                    }
                </div>
                : children
            }
        </button>
    )
}