import React, { useRef, useCallback, useEffect, useState } from 'react'
import InputStyle from 'assets/styles/input.style.module.scss';
import classNames from 'classnames/bind';
import { IoCaretForward, IoClose } from "react-icons/io5";
const cx = classNames.bind(InputStyle);

interface ObjectData {
    value: any,
    name: string,
}

interface InputSelectProps {
    value?: Array<string> | null,
    placeholder?: string,
    data?: Array<ObjectData>,
    labelDefault?: string,
    onChange?: Function,
    onRemoveItem?: Function,
    errMessage?: string,
}

function InputSelectMultiple({
    data, placeholder = "Selected Combobox",
    value, labelDefault = "-- Xóa tất cả --", onChange, onRemoveItem,
    errMessage
}: InputSelectProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);

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
                className={cx('input-select', ['multiple', isActive && "drop-active", (isActive || value) && "active"])}
                onClick={(e: any) => {
                    var rect = e.target.getBoundingClientRect();
                    
                    if (rect.bottom > 500) setPointerDrop(false);
                    else setPointerDrop(true);

                    if (selectRef.current && !selectRef.current.contains(e.target))
                        setisActive(!isActive);
                }}
            >
                <div className={cx('select-text')} >
                    <div className={cx('layout-select')} ref={selectRef}>
                        {
                            value && value.length > 0 ? 
                            value.map(v => {
                                return <div key={v}>
                                    <div>{ data && data.length > 0 && data.filter(lt => lt?.value == v)[0]?.name } </div>
                                    <IoClose 
                                        onClick={() => {
                                            onRemoveItem && onRemoveItem(v);
                                        }}
                                    />
                                </div>
                            })
                            : placeholder
                        }
                    </div>
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
                            value && value.length > 0 && <div
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

export default InputSelectMultiple