import React, { ReactNode } from 'react';
import styleCheckbox from 'assets/styles/styleCheckbox.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styleCheckbox);

interface CheckBoxProps {
    children: ReactNode,
    className?: Object,
    value: boolean,
    onClick: Function,
}

export function CheckBox({ children, className, value = false, onClick }: CheckBoxProps) {
    return (
        <div className={cx('group-checkbox', [{ className }])}>
            <input id={cx('input-checkbox')} name="c-checkbox" type="checkbox" readOnly checked={value}></input>
            <label 
                className={cx('lable-checkbox')}
                onClick={() => onClick()}
            >
                { children }
            </label>
        </div>
    )
}