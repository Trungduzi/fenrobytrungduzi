import { Outlet } from "react-router-dom";
import Sidebar from "../components/Siderbar.jsx";
import Header from "../components/header.jsx";

export default function AppLayout() {
    return (
        <>
            <Header />
            <div
                style={{
                    position: "relative",
                    top: "18vh",
                    display: "flex",       // <-- thêm dòng này để hiển thị cùng hàng ngang
                    gap: "20px",          // khoảng cách giữa sidebar và content, tuỳ chỉnh
                    minHeight: "80vh",    // tuỳ chọn, cho chiều cao
                }}
            >
                {/* Sidebar bên trái */}
                <Sidebar />
                <Outlet /> {/* Chứa trang "nap-the-tu-dong" */}
            </div>
        </>
    );
}


