import React from 'react'
import styleTable from 'assets/styles/styleTable.module.scss';
import classNames from 'classnames/bind';
import Pagination from 'components/Common/Pagination';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import moment from 'moment';
import { setCurrentPage } from 'reducers/categoryReducer/categorySlice';
import LoadingTable from 'components/Common/LoadingTable';
import TableDefault from 'components/Common/TableDefault';
import GroupButton from './GroupButton';
import WrapperModal from './WrapperModal';
import { status } from 'constants/status';

const tb = classNames.bind(styleTable);

const arrTitle = [
    {
        title: 'STT',
        width: 50,
    },
    {
        title: 'Danh Mục',
        width: 200,
    },
    {
        title: 'Trạng Thái',
        width: 150,
    },
    {
        title: 'Ngày Tạo',
        width: 150,
    },
    {
        title: 'Người tạo',
        width: 200,
    },
    {
        title: 'Options',
        width: 200,
    }
]

function TableCategory() {
    const { loadingFetch, categories, totalPage, currentPage, search } = useAppSelector(state => state.categoryState);
    const dispatch = useAppDispatch();

    return (
       <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'auto'}}>
            <WrapperModal />

            <div className={tb('wrapper-table')}>
                <div
                    className={tb('tb-header')}
                >   
                    {
                        arrTitle.map((arrT, index) => {
                            return  <div 
                                key={index}
                                className={tb('tb-header-title')}
                                style={{width: `${arrT.width}px`}}
                            >
                                { arrT.title }
                            </div>
                        })
                    } 
                </div>
                
                <ul
                    className={tb('tb-content')}
                >
                    {
                        categories.length > 0 ?
                        categories.map((ct, index) => {
                            let statusFilter = status.filter(s => s.id === ct.status);
                            return <li className={tb('tb-content-item')} key={index} >
                                <div style={{width: `${arrTitle[0].width}px`}}>
                                    { index + 1}
                                </div>
                                <div style={{width: `${arrTitle[1].width}px`}}>
                                    { ct.category_name }
                                </div>
                                <div style={{width: `${arrTitle[2].width}px`, color: statusFilter[0]?.color || "#ff9800" }}>
                                    { statusFilter[0]?.statusName || 'Không xác định' }
                                </div>
                                <div style={{width: `${arrTitle[3].width}px`}}>
                                    { moment(ct.createdAt).format('HH:mm DD/MM/YYYY') }
                                </div>  
                                <div style={{width: `${arrTitle[4].width}px`}}>
                                    { ct.createdBy }
                                </div>  
                                <div style={{width: `${arrTitle[5].width}px`}}>
                                    <GroupButton 
                                        status={ct.status}
                                        data={ct}
                                    />
                                </div>  
                            </li>
                        }) : loadingFetch ? <LoadingTable textLoading="Đang tải dữ liệu..."/> : <TableDefault textNotify='Không có thể loại hiện hành!'/>
                    }
                </ul>
            </div>
            <Pagination 
                currentPage={currentPage}
                totalPage={totalPage}
                onChangeCurrentPage={(page: number) => {
                    dispatch({
                        type: 'FETCH_ALL_CATEGORIES',
                        payload: {
                            page,
                            search
                        },
                    });

                    dispatch(setCurrentPage(page));
                }}
            />
       </div>
    )
}

export default TableCategory;