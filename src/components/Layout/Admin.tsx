import classNames from "classnames";
import LoadingFullScreem from "components/Common/LoadingFullScreem";
import MainSideBar from "components/SideBar";
import { routesConfig } from "constants/routesConfig";
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import globalStyles from 'utils/globalStyle.module.scss';

const gb = classNames.bind(globalStyles);

export default function Admin() {
    const routes = useRoutes(routesConfig);
    
    return (
        <div style={{width: '100%', height: '100%', position: 'relative', display: 'flex'}}>
            <LoadingFullScreem />

            {/* SIDEBAR COMPONENT */}
            <MainSideBar />

            <Suspense fallback={<div className={gb('container-main')}>Loading...</div>}>
                {/* MAIN COMPONENT */}
                { routes }
            </Suspense>
        </div>
    )
}