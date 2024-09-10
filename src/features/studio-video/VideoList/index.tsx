import { useAppDispatch, useAppSelector } from 'app/hooks';
import styleTable from 'assets/styles/table.style.module.scss';
import classNames from 'classnames/bind';
import LoadingTable from 'components/Common/LoadingTable';
import Pagination from 'components/Common/Pagination';
import TableDefault from 'components/Common/TableDefault';
import { statusVideo } from 'constants/status';
import moment from 'moment';
import GroupButton from './GroupButton';
import WrapperModal from './WrapperModal';
import { setVideoParams } from 'reducers/studioVideoReducer/studioVideoSlice';

const tb = classNames.bind(styleTable);

const arrTitle = [
    {
        title: 'ID',
    },
    {
        title: 'Tiêu đề',
    },
    {
        title: 'Ngày tải lên',
    },
    {
        title: 'Trạng Thái',
    },
    {
        title: 'Thao tác',
    }
]

function VideoList() {
    const dispatch = useAppDispatch();

    const { isFetchVideoList, videoParams, videoTotalRows, videos  } = useAppSelector(state => state.studioVideoState);
    const { page, pageSize } = videoParams

    console.log(videos, isFetchVideoList);
    
    return (
       <>
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
                        videos && videos.length > 0 && !isFetchVideoList
                        ? videos.map((m: any) => {
                            let statusFilter = statusVideo.filter(s => s.id === m.status);
                            return <tr key={m.ID} >
                                <td>
                                    <div className={tb('table-text')}> { m.ID } </div>
                                </td>
                                <td>
                                    <div className={tb('table-text')}> { m.title } </div>
                                </td>
                                <td>
                                    <div className={tb('table-text')}> { m.createTime }</div>
                                </td>  
                                <td >
                                    <div className={tb('table-text')} style={{color: statusFilter[0]?.color || "#ff9800" }}>
                                        { statusFilter[0]?.statusName || 'Không xác định' }
                                    </div>   
                                </td>
                                <td>
                                    <div className={tb('table-text')}>
                                        <GroupButton 
                                            status={m.status}
                                            data={m}
                                        />
                                    </div>
                                </td>  
                            </tr>
                        })
                        : isFetchVideoList ? 
                        <tr>
                            <td colSpan={arrTitle.length}>
                                <LoadingTable textLoading="Đang tải dữ liệu..." />
                            </td>
                        </tr> 
                        : <tr>
                            <td colSpan={arrTitle.length}>
                                <TableDefault textNotify='Không có video đăng tải.' />
                            </td>
                        </tr>
                    }
                </tbody>
             </table>
            <Pagination 
                currentPage={page}
                totalPage={Math.ceil(videoTotalRows / pageSize)}
                onChangeCurrentPage={(page: number) => {
                    dispatch(setVideoParams({
                        page,
                    }));
                }}
            />
       </>
    )
}

export default VideoList