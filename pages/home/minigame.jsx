import React from "react";
import { useState, useEffect } from "react";
import "./minigame.scss"
import Swal from "sweetalert2";
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
        title: "Vòng quay vàng SJC(9999)",
        plays: "chưa cập nhật",
        priceOld: 10000000,
        priceNew: 8000000,
        img: "/giveaway.gif",
        link: "/",
    },
    {
        id: 3,
        title: "Vòng quay kim cương",
        plays: "chưa cập nhật",
        priceOld: 20000000,
        priceNew: 10000000,
        img: "/giveaway.gif",
        link: "/",
    },
    {
        id: 4,
        title: "Vòng quay thần tài (NEW)",
        plays: "chưa cập nhật",
        priceOld: 88888888,
        priceNew: 21022025,
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

                            <a href={it.link} onClick={handleClick} className="buy-btn">Quay Ngay</a>
                        </article>
                    ))}
                </div>
            </div>
        </>
    )
}

