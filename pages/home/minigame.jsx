import React from "react";
import { useState, useEffect } from "react";
import "./minigame.scss"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const ITEMS = [
    {
        id: 1,
        title: "Vòng quay quân huy (liên quân)",
        plays: "chưa cập nhật",
        priceOld: 17000,
        priceNew: 9999,
        img: "/giveaway.gif",
        link: "/",
    },
    {
        id: 2,
        title: "Vòng quay vàng NRO",
        plays: "chưa cập nhật",
        priceOld: 20000,
        priceNew: 8000,
        img: "/giveaway.gif",
        link: "/quay-vangnro",
    },
    {
        id: 3,
        title: "Vòng quay kim cương nro",
        plays: "chưa cập nhật",
        priceOld: 88888888,
        priceNew: 20000,
        img: "/giveaway.gif",
        link: "/",
    },
    {
        id: 4,
        title: "Vòng quay thần tài",
        plays: "chưa cập nhật",
        priceOld: 21022025,
        priceNew: 17050405,
        img: "/giveaway.gif",
        link: "/",
    },
    {
        id: 5,
        title: "Vòng quay quân huy (vip)",
        plays: "chưa cập nhật",
        priceOld: 21022025,
        priceNew: 17050405,
        img: "/giveaway.gif",
        link: "/",
    },
    {
        id: 6,
        title: "Vòng quay vàng (vip)",
        plays: "chưa cập nhật",
        priceOld: 21022025,
        priceNew: 17050405,
        img: "/giveaway.gif",
        link: "/",
    },
    {
        id: 7,
        title: "Vòng quay kim cương (vip)",
        plays: "chưa cập nhật",
        priceOld: 21022025,
        priceNew: 17050405,
        img: "/giveaway.gif",
        link: "/",
    },
    {
        id: 8,
        title: "Vòng quay thẻ cào",
        plays: "chưa cập nhật",
        priceOld: 21022025,
        priceNew: 17050405,
        img: "/giveaway.gif",
        link: "/",
    },
];

const handleClick = (e) => {
    e.preventDefault();

    Swal.fire({
        title: "THÔNG BÁO!",
        html: `
                <p>Chức năng đang được xây dựng</p>
            `,
        confirmButtonText: "Đồng ý",
        customClass: {
            popup: "my-popup"
        }
    }).then((result) => {
        if (result.isConfirmed) {
            return;
        }
    });
};

export default function Minigame() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleRedirect = (path) => {
        if (user) {
            navigate(path);
        }
        else {
            navigate("/login");
        }
    }

    return (
        <>
            <div className="container">
                <div className="game-grid">
                    {ITEMS.map((it) => (
                        <article key={it.id} className="game-card">
                            <div className="thumb">
                                <img src={it.img} alt={it.title} />
                            </div>

                            <h3 className="title">{it.title}</h3>

                            <div className="meta">
                                <span className="plays">Đã quay: {it.plays.toLocaleString("vi-VN")}</span>
                            </div>

                            <div className="prices">
                                {it.priceOld > 0 && (
                                    <span className="price old">
                                        {it.priceOld.toLocaleString("vi-VN")} đ
                                    </span>
                                )}
                                <span className="price new">{it.priceNew.toLocaleString("vi-VN")} đ</span>
                            </div>

                            {(it.id == 2) ? (
                                <>
                                    <a onClick={() => { handleRedirect("/quay-vangnro") }} className="buy-btn">Mua Ngay</a>
                                </>
                            ) : (
                                <>
                                    <a onClick={handleClick} className="buy-btn">Mua Ngay</a>
                                </>
                            )}
                        </article>
                    ))}
                </div>
            </div >
        </>
    )
}

