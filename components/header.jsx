import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateN } from "../src/app/userApi";
import "./header.css";

export default function Header() {
    const [user, setUser] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const [show1, setShow1] = useState(false);

    const handleClick = () => {
        setShow(!show);
    }

    const handleClick1 = () => {
        setShow1(!show1);
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);

            (async () => {
                const data = await updateN(parsedUser.id);
                if (data) {
                    setUser(data);
                    localStorage.setItem("user", JSON.stringify(data));
                } else {
                    setUser(parsedUser);
                }
            })();
        }
    }, []);



    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    const handleShow = () => {
        setShowMenu(!showMenu);
        console.log("Menu toggled:", !showMenu);
    };

    const handleRedirect = (path) => {
        if (user) {
            navigate(path);
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="header">
            <div className="header-container">
                <div className="header-logo">
                    <div className="logo-fix">
                        <a href="/" className="header-logo-a">
                            <img src="/logo.jpg" alt="Logo" className="header-logo-i" />
                        </a>
                    </div>
                </div>
                <div className="header-navigation">
                    <ul className="navigation-left">
                        <li className="navigation-element">
                            <Link to="/" className="element-a">Trang chủ</Link>
                        </li>
                        <li className="navigation-element navigation-special">
                            <div className="element-a">
                                <a href="#" className="element-div-a">Nạp tiền</a>
                                {show ? (
                                    <>
                                        <div className="nav-block">
                                            <div className="nav-block--fix">
                                                <ul className="nav-sub">
                                                    <li>
                                                        <a onClick={() => handleRedirect("/nap-the-tu-dong")} className="nav-sub-1">Nạp thẻ cào</a>
                                                    </li>
                                                    <li>
                                                        <a onClick={() => handleRedirect("/nap-tien-ATM")} className="nav-sub-2">Nạp ATM tự động</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                    </>
                                )
                                }
                            </div>
                        </li>
                        <li className="navigation-element">
                            <Link to="/dich-vu" className="element-a">Dịch vụ</Link>
                        </li>
                        <li className="navigation-element">
                            <Link to="/tin-tuc" className="element-a">Tin tức</Link>
                        </li>
                        <li className="navigation-element navigation-message">
                            <i className="fa-solid fa-bell fa-lg icon-message"></i>
                        </li>
                        <li className="navigation-element navigation-message">
                            <i className="fa-solid fa-cart-shopping fa-lg icon-message"></i>
                        </li>
                    </ul>

                    <ul className="nav-right">
                        {user ? (
                            <>
                                <li className="nav-right-li text-white navigation-login nav-signout">
                                    <Link to="/thong-tin-tai-khoan" className="username-link">
                                        <i className="fa-solid fa-user user-icon"></i>
                                        <span className="username-text">{user.user}</span>
                                        <span className="user-money">- {Math.floor(parseFloat(user.dollar))}</span>
                                        <span className="dollarPC">$</span>
                                    </Link>
                                </li>
                                <li className="nav-right-li">
                                    <button className="navigation-login nav-signout" onClick={handleLogout}>
                                        Đăng xuất
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-right-li">
                                    <Link to="/login" className="navigation-login nav-login">Đăng nhập</Link>
                                </li>
                                <li className="nav-right-li">
                                    <Link to="/signin" className="navigation-login nav-signin">Đăng ký</Link>
                                </li>
                            </>
                        )}
                    </ul>

                    <ul className="nav-mobile">
                        <li className="menu-icon-li">
                            <button onClick={handleShow} className="menu-toggle">
                                ☰
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="header-menumobile">
                    {showMenu && (
                        <>
                            <li className="show-home">
                                <Link to="/" className="show-a">Trang chủ</Link>
                            </li>
                            <li className="show-addcard">
                                <div className="show-addcard-div">
                                    <div className="title-addcard" onClick={handleClick1}>Nạp tiền ⇩</div>
                                    {show1 ? (
                                        <>
                                            <div className="nav-blockmobile">
                                                <div className="nav-block--fixmobile">
                                                    <ul className="nav-sub">
                                                        <li>
                                                            <a onClick={() => handleRedirect("/nap-the-tu-dong")} className="nav-sub-1mobile">Nạp thẻ cào</a>
                                                        </li>
                                                        <li>
                                                            <a onClick={() => handleRedirect("/nap-tien-ATM")} className="nav-sub-2mobile">Nạp ATM tự động</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </li>
                            <li className="show-dichvu">
                                <Link to="/dich-vu" className="show-a">Dịch vụ</Link>
                            </li>
                            <li className="show-information">
                                <Link to="/tin-tuc" className="show-a">Tin tức</Link>
                            </li>

                            {user ? (
                                <>
                                    <li className="user-onmenu show-loginmobile">
                                        <Link to="/thong-tin-tai-khoan" className="user-signinmobile">
                                            <i className="fa-solid fa-user user-icon"></i>
                                            <span className="username-text">{user.user}</span>
                                            <span className="user-money">- {Math.floor(parseFloat(user.dollar))}</span>
                                            <span className="dollar">$</span>
                                        </Link>
                                    </li>
                                    <li className="logout-menumobile">
                                        <button className="show-signinmobile" onClick={handleLogout}>
                                            Đăng xuất
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="show-login">
                                        <Link to="/login" className="login-mobile">Đăng nhập</Link>
                                    </li>
                                    <li className="show-signin">
                                        <Link to="/signin" className="signin-mobile">Đăng ký</Link>
                                    </li>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
