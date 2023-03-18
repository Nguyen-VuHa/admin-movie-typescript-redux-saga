import React from 'react';
import styleTable from 'assets/styles/table.style.module.scss';
import classNames from 'classnames/bind';
import { useAppSelector } from 'app/hooks';
import LoadingTable from 'components/Common/LoadingTable';
import TableDefault from 'components/Common/TableDefault';
import GroupButton from './GroupButton';
import Pagination from 'components/Common/Pagination';

const tb = classNames.bind(styleTable);

const arrTitle = [
    {
        title: 'STT',
        width: 50,
    },
    {
        title: 'Mã suất chiếu',
        width: 100,
    },
    {
        title: 'Thời gian',
        width: 200,
    },
    {
        title: 'Giá tiền',
        width: 150,
    },
    {
        title: 'Trạng thái',
        width: 300,
    },
    {
        title: 'Phim',
        width: 150,
    },
    {
        title: 'Phòng chiếu',
        width: 300,
    },
    {
        title: 'Options',
        width: 200,
    }
];

function TableShowtimeMain() {
    const { cinemas, loadingFetch, currentPage, totalPage } = useAppSelector(state => state.cinemaState);
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'auto'}}>
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
                        cinemas && cinemas.length > 0 ? 
                        cinemas.map((c, idx) => {
                            return <tr key={c.id} >
                                <td>
                                    <div className={tb('table-text')}>{ idx + 1}</div>
                                </td>
                                <td>
                                    <div className={tb('table-text')}>{ c.code }</div>
                                </td>
                                <td>
                                    <div className={tb('table-text')}> { c.siteName }</div>
                                
                                </td>  
                                <td>
                                    <div className={tb('table-text')}>{ c.cinemaName }</div>
                                </td> 
                                <td>
                                    <div className={tb('table-text')}>{ c.address }</div>
                                </td>  
                                <td>
                                    <div className={tb('table-text')}>
                                        <GroupButton 
                                            // status={c.status}
                                            data={c}
                                        />
                                    </div>
                                </td>
                            </tr>
                        })
                        : loadingFetch ? 
                        <tr>
                            <td colSpan={arrTitle.length}>
                                <LoadingTable textLoading="Đang tải dữ liệu..."/>
                            </td>
                        </tr> 
                        : <tr>
                            <td colSpan={arrTitle.length}>
                                <TableDefault textNotify='Không có cụm rạp phim hiện hành!'/>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>

            <Pagination 
                currentPage={currentPage}
                totalPage={totalPage}
                onChangeCurrentPage={(page: number) => {
                    // dispatch({
                    //     type: 'FETCH_ALL_CATEGORIES',
                    //     payload: {
                    //         page,
                    //         search
                    //     },
                    // });

                    // dispatch(setCurrentPage(page));
                }}
            />
        </div>
    );
};

export default TableShowtimeMain;