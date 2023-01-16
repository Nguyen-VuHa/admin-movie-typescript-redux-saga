import React from 'react'
import Styles from './overview.module.scss';
import classNames from 'classnames/bind';
import OverViewItem from './OverViewItem';
import { IoBarChart, IoChatbubblesSharp, IoPersonAdd } from 'react-icons/io5';
import { useAppSelector } from 'app/hooks';

const cx = classNames.bind(Styles);

function OverView() {
    const { countMemberShip, turnOver, countMovieMew, countCommentAndRate, loadingOverView } = useAppSelector(state => state.dashboardState);

    return (
        <div className={cx('wrapper')}>
            <OverViewItem 
                title='Khách hàng thành viên'
                loading={loadingOverView}
                value={countMemberShip.toString()}
                icon={<IoPersonAdd
                    color="#f9ab00"
                    size={36} 
                />}
            />
            <OverViewItem 
                title='Doanh thu trong tháng'
                loading={loadingOverView}
                value={turnOver ? turnOver.totalNetAmount.toString() : 'NAN'}
                icon={<IoBarChart 
                    color="#f9ab00"
                    size={36} 
                />}
            />
            <OverViewItem 
                title='Phim mới trong tháng'
                loading={loadingOverView}
                value={countMovieMew.toString()}
            />
            <OverViewItem 
                title='Bình luận / Đánh giá mới'
                loading={loadingOverView}
                value={countCommentAndRate.toString()}
                icon={<IoChatbubblesSharp 
                    color="#f9ab00"
                    size={36} 
                />}
            />
        </div>
    )
}

export default OverView