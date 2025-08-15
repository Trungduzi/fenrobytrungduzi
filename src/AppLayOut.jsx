import { Outlet } from "react-router-dom";
import Sidebar from "../components/Siderbar.jsx";
import Header from "../components/header.jsx";

export default function AppLayout() {
    return (
        <>
            <Header />
            <div className="container mt-4" style={{ position: "absolute", top: "18vh" }}>
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}
