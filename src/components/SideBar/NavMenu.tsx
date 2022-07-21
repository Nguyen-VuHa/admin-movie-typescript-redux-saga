import React from 'react'
import classNames from 'classnames/bind';
import styles from './sidebar.module.scss';
import globalStyles from 'utils/globalStyle.module.scss';
import Scrollbars from 'react-custom-scrollbars-2';
import NavMenuItem from './NavMenuItem';
import { IoApps, IoFilmSharp, IoCubeSharp, IoTicket, IoPeopleCircleOutline, IoChatbubblesSharp } from "react-icons/io5";

const cx = classNames.bind(styles);
const gb = classNames.bind(globalStyles);

let listMenu = [
    {
        icon: <IoApps size={20} />,
        menuName: 'TRANG CHỦ',
        navigateLink: '/admin/dashboard',
    },
    {
        icon: <IoFilmSharp size={20} />,
        menuName: 'QUẢN LÝ PHIM',
        navigateLink: '/admin',
    },
    {
        icon: <IoCubeSharp size={20} />,
        menuName: 'QUẢN LÝ RẠP CHIẾU PHIM',
        navigateLink: '/admin',
    },
    {
        icon: <IoTicket size={20} />,
        menuName: 'QUẢN LÝ VÉ PHIM',
        navigateLink: '/admin',
    },
    {
        icon: <IoPeopleCircleOutline size={20} />,
        menuName: 'QUẢN LÝ NGƯỜI DÙNG',
        navigateLink: '/admin',
    },
    {
        icon: <IoChatbubblesSharp size={20} />,
        menuName: 'COMMENTS & REVIEWS',
        navigateLink: '/admin',
    }
]

function NavMenu() {



    return (
        <div className={cx('sb-nav-warpper')}>
            <Scrollbars 
                style={{ width: '100%', height: 'calc(100vh - 230px)'}}
                renderThumbVertical={props => <div {...props} className={gb('theme-custom-scrollbar')}/>}
            >
                {/*List Nav Bar Menu  */}
                <ul className={cx('sb-navbar-list')}>
                    {
                        listMenu.map((lm, index) => {
                            return <NavMenuItem 
                                key={index}
                                icon={lm.icon}
                                menuName={lm.menuName}
                                navigation={lm.navigateLink}
                                active={window.location.pathname === lm.navigateLink}
                            />
                        })
                    }
                </ul>
            </Scrollbars>
        </div>
    )
}

export default NavMenu