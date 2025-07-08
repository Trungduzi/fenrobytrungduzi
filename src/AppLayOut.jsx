import { Outlet } from "react-router-dom";
import Sidebar from "../components/Siderbar.jsx";
import Header from "../components/header.jsx";

export default function AppLayout() {
    return (
        <>
            <Header /> {/* Header hiển thị cố định ở trên */}
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-3">
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
