import React, { useRef, useCallback, useEffect, useState } from 'react'
import InputStyle from 'assets/styles/input.style.module.scss';
import classNames from 'classnames/bind';
import { IoCaretForward } from "react-icons/io5";
const cx = classNames.bind(InputStyle);

interface ObjectData {
    value: any,
    name: string,
}

interface InputSelectProps {
    value?: any,
    placeholder?: string,
    data?: Array<ObjectData>,
    labelDefault?: string,
    onChange?: Function,
    errMessage?: string,
    defaultItem?: boolean,
}

function InputSelect({
    data, placeholder = "Selected Combobox",
    value, labelDefault = "-- Xóa lựa chọn --", onChange,
    errMessage, defaultItem = true
}: InputSelectProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const [isActive, setisActive] = useState<boolean>(false);
    const [pointerDrop, setPointerDrop] = useState(false);

    const handleClickOutside = useCallback((event: any) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target))
                setisActive(false);
        }
    },[])
    
    useEffect(() => {
        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div
            className={cx('wrapper-select')}
        >
            <div
                ref={buttonRef} 
                className={cx('input-select', [isActive && "drop-active", (isActive || value) && "active"])}
                onClick={(e: any) => {
                    var rect = e.target.getBoundingClientRect();
                    
                    if (rect.bottom > 500) setPointerDrop(false);
                    else setPointerDrop(true);

                    setisActive(!isActive);
                }}
            >
                <div className={cx('select-text')}>
                    <span>
                    {
                        data && data.length > 0 && data.filter(lt => lt?.value === value)[0]?.name || placeholder
                    }
                    </span>
                </div>

                <div className={cx('icon-drop')}>
                    <IoCaretForward />
                </div>
            </div>
            {
                errMessage && <small className={cx('message-error')}>{ errMessage }</small>
            }

            <div ref={dropdownRef} className={cx('dropdown-select', [isActive && 'active', pointerDrop ? 'p-top' : 'p-bottom'])}>
                {
                    data && data.length > 0 ? 
                    <>
                        {
                            value && defaultItem && <div
                                className={cx('item-dropdown')}
                                onClick={() => {
                                    onChange && onChange(null);
                                }}
                            >
                                <span>{ labelDefault }</span>
                            </div> || <></>
                        }
                        {
                            data.map(dt => {
                                return <div 
                                    key={dt.value}
                                    className={cx('item-dropdown')}
                                    onClick={() => {
                                        onChange && onChange(dt.value);
                                        setisActive(false);
                                    }}
                                >
                                    <span>{ dt.name }</span>
                                </div>
                            })
                        }
                    </> 
                    :  <div className={cx('item-dropdown')}>
                        <span>Không có dữ liệu</span>
                    </div>
                }
               
            </div>
        </div>
    )
}

export default InputSelect