import MainSideBar from "components/SideBar";
import { routesConfig } from "constants/routesConfig";
import { useRoutes } from "react-router-dom";

export default function Admin() {
    const routes = useRoutes(routesConfig);
    
    return (
        <div style={{width: '100%', height: '100%', position: 'relative', display: 'flex'}}>
            {/* SIDEBAR COMPONENT */}
            <MainSideBar />

            {/* MAIN COMPONENT */}
            { routes }
        </div>
    )
}