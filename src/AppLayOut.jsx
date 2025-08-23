import { Outlet } from "react-router-dom";
import Sidebar from "../components/Siderbar.jsx";
import Header from "../components/header.jsx";
import "./AppLayOut.scss";

export default function AppLayout() {
    return (
        <>
            <Header />
            <div className="layoutTotal"
                style={{
                    position: "relative",
                    top: "22vh",
                    display: "flex",
                    gap: "20px",
                }}
            >
                <div className="layout1"><Sidebar /></div>
                <div className="layout2"><Outlet /></div>
                <div className="layoutNull"></div>
            </div >
        </>
    );
}


