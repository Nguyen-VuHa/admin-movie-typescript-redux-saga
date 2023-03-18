import React from 'react'
import styleTable from 'assets/styles/table.style.module.scss';
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
import { DEFAULT_PAGE_SIZE } from 'constants/globalConstant';

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

            <table className={tb('wrapper-table')}>
                <thead>
                    <tr>
                        {
                            arrTitle.map((arrT, index) => {
                                return  <th 
                                    key={index}
                                >
                                    { arrT.title }
                                </th>
                            })
                        } 
                    </tr>
                </thead>
                <tbody>
                    {
                        categories && categories.length > 0 ? 
                        categories.map((ct, index) => {
                            let statusFilter = status.filter(s => s.id === ct.status);
                            return <tr key={index} >
                                <td>
                                    <div className={tb('table-text')}>{ index + 1 + ((currentPage - 1) * DEFAULT_PAGE_SIZE) }</div>
                                </td>
                                <td>
                                    <div className={tb('table-text')}>{  ct.category_name }</div>
                                </td>
                                <td >
                                    <div className={tb('table-text')} style={{color: statusFilter[0]?.color || "#ff9800" }}>
                                        { statusFilter[0]?.statusName || 'Không xác định' }
                                    </div>   
                                </td>
                                <td>
                                    <div className={tb('table-text')}> { moment(ct.createdAt).format('HH:mm DD/MM/YYYY') }</div>
                                   
                                </td>  
                                <td>
                                    <div className={tb('table-text')}>{ ct.createdBy }</div>
                                </td>  
                                <td>
                                    <div className={tb('table-text')}>
                                        <GroupButton 
                                            status={ct.status}
                                            data={ct}
                                        />
                                    </div>
                                </td>  
                            </tr>
                        }) : loadingFetch ? 
                        <tr>
                            <td colSpan={arrTitle.length}>
                                <LoadingTable textLoading="Đang tải dữ liệu..."/>
                            </td>
                        </tr> 
                        : <tr>
                            <td colSpan={arrTitle.length}>
                                <TableDefault textNotify='Không có thể loại hiện hành!'/>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
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