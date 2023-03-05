import React from 'react'
import styleTable from 'assets/styles/table.style.module.scss';
import classNames from 'classnames/bind';
import { useAppSelector } from 'app/hooks';
import LoadingTable from 'components/Common/LoadingTable';
import TableDefault from 'components/Common/TableDefault';
import GroupButton from 'features/cinema/TableCinema/GroupButton';

const tb = classNames.bind(styleTable);

const arrTitle = [
    {
        title: 'STT',
        width: 50,
    },
    {
        title: 'Mã khu vực',
        width: 100,
    },
    {
        title: 'Rạp phim',
        width: 200,
    },
    {
        title: 'Phòng chiếu',
        width: 150,
    },
    {
        title: 'Loại',
        width: 100,
    },
    {
        title: 'Ngang',
        width: 100,
    },
    {
        title: 'Dọc',
        width: 100,
    },
    {
        title: 'Options',
        width: 200,
    }
];


function TableRoomMain() {
    const { rooms, loadingFetch } = useAppSelector(state => state.cinemaState);

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
                        rooms && rooms.length > 0 ? 
                        rooms.map((r, idx) => {
                            return <tr key={r.id}>
                                <td>
                                    <div className={tb('table-text')}>{ idx + 1}</div>
                                </td>
                                <td>
                                    <div className={tb('table-text')}>{ r.siteId }</div>
                                </td>
                                <td>
                                    <div className={tb('table-text')}> { r.cinemaName }</div>
                                
                                </td>  
                                <td>
                                    <div className={tb('table-text')}>{ r.roomName }</div>
                                </td> 
                                <td>
                                    <div className={tb('table-text')}>{ r.type }</div>
                                </td>  
                                <td>
                                    <div className={tb('table-text')}>{ r.horizontalSize }</div>
                                </td> 
                                <td>
                                    <div className={tb('table-text')}>{ r.verticalSize }</div>
                                </td>  
                                <td>
                                    <div className={tb('table-text')}>
                                        <GroupButton 
                                            // status={c.status}
                                            data={r}
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
                                <TableDefault textNotify='Không có phòng chiếu phim hiện hành!'/>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableRoomMain