import { Outlet } from "react-router-dom";
import Sidebar from "../components/Siderbar.jsx";
import Header from "../components/header.jsx";

export default function AppLayout() {
    return (
        <>
            <Header />
            <div
                className="d-flex"
                style={{
                    position: "absolute",
                    top: "18vh",
                    left: 0,
                    right: 0,
                    minHeight: "82vh",
                    overflowX: "auto",
                    flexWrap: "nowrap"
                }}
            >
                {/* Sidebar */}
                <div style={{ flex: "0 0 220px", minWidth: "200px" }}>
                    <Sidebar />
                </div>

                {/* Nội dung nạp thẻ */}
                <div style={{ flex: "1 1 auto", minWidth: "300px" }} className="p-3">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
