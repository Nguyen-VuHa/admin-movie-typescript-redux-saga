import MainSideBar from "components/SideBar";

export interface AdminProps {

}

export default function Admin(props: AdminProps) {

    return (
        <div style={{width: '100%', height: '100%', position: 'relative'}}>
            {/* SIDEBAR COMPONENT */}
            <MainSideBar />

            {/* MAIN COMPONENT */}
            <div></div>
        </div>
    )
}