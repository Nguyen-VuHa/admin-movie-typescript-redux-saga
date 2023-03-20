import React, { useRef, useCallback, useEffect, useState, useLayoutEffect } from 'react'
import InputStyle from 'assets/styles/input.style.module.scss';
import classNames from 'classnames/bind';
import { IoCaretForward } from "react-icons/io5";
import { RotatingLines } from 'react-loader-spinner';
const cx = classNames.bind(InputStyle);

const { default: axiosClient } = require("../../api/axiosClient");

interface ObjectData {
    value: any,
    name: string,
}

interface InputSelectProps {
    value?: any,
    placeholder?: string,
    labelDefault?: string,
    onChange?: Function,
    errMessage?: string,
    defaultItem?: boolean,
    style?: Object,
    url?: string,
    propsParams?: Object | undefined,
}

const _DEFAULT_CURRENT_PAGE = 1;
const _DEFAULT_TOTAL_PAGE = 1;
const _DEFAULT_PAGE_SIZE = 10;

function InputSelectFetchData({
    placeholder = "Selected Combobox",
    value, 
    labelDefault = "-- Xóa lựa chọn --", 
    onChange,
    errMessage, 
    defaultItem = true,
    style, 
    propsParams, // params request with url
    url, // url call api
}: InputSelectProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const [isActive, setisActive] = useState<boolean>(false);
    const [pointerDrop, setPointerDrop] = useState<boolean>(false);

    const [loadingFetch, setLoadingFetch] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState<number>(_DEFAULT_CURRENT_PAGE);
    const [pageSize, setPageSize] = useState<number>(_DEFAULT_PAGE_SIZE);
    const [totalPage, setTotalPage] = useState<number>(_DEFAULT_TOTAL_PAGE);
    const [data, setData] = useState<Array<ObjectData>>([]);
    const [isFetch, setIsFetch] = useState<boolean>(false);
    const [dataParams, setDataParams] = useState<Object | null>(null);
    

    // click ousite button or dropbox is colose dropbox
    const handleClickOutside = useCallback((event: any) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target))
                setisActive(false);
        }
    }, [])
    
    // firt render initialzation event click outside to `window`
    useEffect(() => {
        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useLayoutEffect(() => {
        loadMoreItems();
    }, []);
    
    useEffect(() => {
        setDataParams(propsParams || null);
        setCurrentPage(_DEFAULT_CURRENT_PAGE);
        setTotalPage(_DEFAULT_TOTAL_PAGE);
        setData([]);

        return () => {
            setDataParams(null);
            setCurrentPage(_DEFAULT_CURRENT_PAGE);
            setTotalPage(_DEFAULT_TOTAL_PAGE);
            setData([]);
        }
    }, [JSON.stringify(propsParams)]);
    

    const loadMoreItems = async () => {
        try {
            if(loadingFetch) return;

            if(!url) return;

            if(currentPage > totalPage) return;

            setLoadingFetch(true);
            // Update state with new items and increment page
            
            const config ={
                headers: { 'Authorization': 'JWT ' + 'NO TOKEN' },
                params: {
                    _p: currentPage,
                    _p_size: pageSize,
                    ...propsParams,
                },
            }
            
            // Call API with props url and params
            const response = await axiosClient.get(url, config);
            
            // check reponse call api
            if(response && response.data) {
                setData(data.concat(response.data));
                setCurrentPage(currentPage + 1);
                setTotalPage(response.totalPage);
            }

            setLoadingFetch(false);
            setIsFetch(false);
        } catch (error) {
            setLoadingFetch(false);
            setIsFetch(false);
        }
    };

    // Check if user has scrolled to the bottom of the page
    const handleScroll = () => {
        if(dropdownRef.current) {
            let emlWrapper = dropdownRef.current;
            emlWrapper.addEventListener('scroll', () => {
                if((emlWrapper.scrollHeight - (emlWrapper.scrollTop + emlWrapper.clientHeight)) <= 100) {
                    setIsFetch(true);
                }
                else
                    setIsFetch(false);
            });
    
            return () => emlWrapper.removeEventListener('scroll', () => {});
        }
    };

    useEffect(() => {
        // check props params for when there is changed
        if(dataParams && Object.keys(dataParams || {}).length > 0)
        {
            for(let i = 0; i < Object.keys(dataParams || {}).length; i++) 
            {
                var strKey = Object.keys(dataParams || {})[i]; 
                if(Object(dataParams)[`${strKey}`]) {
                    loadMoreItems();
                    return;
                }
            };
        }

        if(!loadingFetch && isFetch && currentPage <= totalPage) {
            loadMoreItems();
        }

        return () => {
            setDataParams(null);
        }
    }, [isFetch, dataParams]);

   // Add event listener for scroll event
    useEffect(() => {
        dropdownRef.current && dropdownRef.current.addEventListener('scroll', handleScroll);

        return () => {
            dropdownRef.current && dropdownRef.current.removeEventListener('scroll', handleScroll)
        };
    }, []);

    return (
        <div
            className={cx('wrapper-select')}
            style={style}
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
                    : !loadingFetch &&  <div className={cx('item-dropdown')}>
                        <span>Không có dữ liệu</span>
                    </div>
                } 
                {
                    currentPage < totalPage && <LoadingFetchData />
                }
            </div>
        </div>
    )
}

const layoutLoading = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '15px 0',
}

function LoadingFetchData() {

    return (
        <div 
            style={{
                ...layoutLoading,
                flexDirection: 'column',
            }}
        >
            <RotatingLines
                strokeColor="#f9ab00"
                strokeWidth="5"
                animationDuration="0.75"
                width="40"
                visible={true}
            />
        </div>
    )
}


export default InputSelectFetchData