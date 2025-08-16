import { NavLink } from "react-router-dom";
import "./sliderbar.scss";

const transactionMenuItems = [
    { label: "Dịch vụ đã mua", link: "/dich-vu-da-mua" },
    { label: "Thẻ cào đã mua", link: "/the-cao-da-mua" },
    { label: "Nạp thẻ tự động", link: "/nap-the-tu-dong" },
    { label: "Lịch sử nạp thẻ", link: "/lich-su-nap-the" },
    { label: "Tài Khoản đã mua", link: "/tai-khoan-da-mua" },
    { label: "Nạp tiền từ ATM - Ví Điện Tử", link: "/nap-tien-atm" },
    { label: "Lịch sử quay minigame", link: "/lich-su-quay-minigame" },
    { label: "Lịch sử trúng nick", link: "/lich-su-trung-nick" },
    { label: "Rút ngọc NRO", link: "/rut-ngoc-nro" },
    { label: "Rút vàng NRO", link: "/rut-vang-nro" },
    { label: "Rút quân huy liên quân", link: "/rut-quan-huy-lien-quan" },
];

export default function Sidebar() {
    return (
        <>
            <div className="sidebarSection">
                <div className="sectionTitle">MENU TÀI KHOẢN</div>
                <ul className="menuList">
                    <li>
                        <NavLink to="/thong-tin-tai-khoan" className="menuLink">
                            <span className="dot"></span> Thông tin tài khoản
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/lich-su-giao-dich" className="menuLink">
                            <span className="dot"></span> Lịch sử giao dịch
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="sidebarSection">
                <div className="sectionTitle">MENU GIAO DỊCH</div>
                <ul className="menuList">
                    {transactionMenuItems.map((item, index) => (
                        <li key={index}>
                            <NavLink to={item.link} className="menuLink">
                                <span className="dot"></span> {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
