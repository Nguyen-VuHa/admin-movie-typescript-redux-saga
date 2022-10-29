import React from 'react'
import classNames from 'classnames/bind';
import styles from './sidebar.module.scss';
import globalStyles from 'utils/globalStyle.module.scss';
import Scrollbars from 'react-custom-scrollbars-2';
import NavMenuItem from './NavMenuItem';
import { IoApps, IoFilmSharp, IoCubeSharp, IoTicket, IoPeopleCircleOutline, IoChatbubblesSharp, IoDocumentAttach } from "react-icons/io5";
import NavMenuItemDrop from './NavMenuItemDrop';
import routePath from 'constants/routePath';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);
const gb = classNames.bind(globalStyles);

let listMenu = [
    {
        icon: <IoApps size={20} />,
        menuName: 'TRANG CHỦ',
        navigateLink: routePath.DASHBOARD,
    },
    {
        icon: <IoFilmSharp size={20} />,
        menuName: 'QUẢN LÝ PHIM',
        navigateLink: '#',
        listItemDrop: [
            {
                menuName: 'Danh Sách Phim',
                navigateLink: routePath.MOVIE_MANAGER,
            },
            {
                menuName: 'Thể loại',
                navigateLink: routePath.MOVIE_CATEGORY,
            },
            {
                menuName: 'Đạo diễn / Diễn viên',
                navigateLink: routePath.AUTHOR_MAIN_ACTOR,
            },
            {
                menuName: 'Quản lý Poster phim',
                navigateLink: '#',
            },
        ]
    },
    {
        icon: <IoCubeSharp size={20} />,
        menuName: 'QUẢN LÝ RẠP CHIẾU PHIM',
        navigateLink: '#',
    },
    {
        icon: <IoTicket size={20} />,
        menuName: 'QUẢN LÝ VÉ PHIM',
        navigateLink: '#',
    },
    {
        icon: <IoPeopleCircleOutline size={20} />,
        menuName: 'QUẢN LÝ NGƯỜI DÙNG',
        navigateLink: '#',
    },
    {
        icon: <IoChatbubblesSharp size={20} />,
        menuName: 'COMMENTS & REVIEWS',
        navigateLink: '#',
    },
    {
        icon: <IoDocumentAttach size={20} />,
        menuName: 'FILES SYSTEM',
        navigateLink: routePath.FILES_SYSTEM,
    }
]

function NavMenu() {
    const location = useLocation();


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
                            if(lm.listItemDrop && lm.listItemDrop.length > 0) {
                                return <NavMenuItemDrop 
                                    key={index}
                                    icon={lm.icon}
                                    menuName={lm.menuName}
                                    navigation={lm.navigateLink}
                                    active={window.location.pathname === lm.navigateLink}
                                    menuDrop={lm.listItemDrop}
                                />
                            } else {
                                return <NavMenuItem 
                                    key={index}
                                    icon={lm.icon}
                                    menuName={lm.menuName}
                                    navigation={lm.navigateLink}
                                    active={location.pathname.includes(lm.navigateLink)}
                                />
                            }
                            
                        })
                    }
                </ul>
            </Scrollbars>
        </div>
    )
}

export default NavMenu