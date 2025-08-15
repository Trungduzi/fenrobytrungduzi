import React from "react";
import { useState, useEffect } from "react";
import "./muathecao.scss";
import Tamthoi from "../../components/tamthoi";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Swal from "sweetalert2";

export default function Muathecao() {

    const ITEMS = [
        {
            id: 1,
            title: "mua thẻ cào",
            plays: "chưa cập nhật",
            priceOld: 16665,
            priceNew: 9999,
            img: "/muathe.jpg",
            link: "/",
        },
        {
            id: 2,
            title: "Mua nick nro",
            plays: "chưa cập nhật",
            priceOld: 11429,
            priceNew: 8000,
            img: "/bynro.png",
            link: "/",
        },
        {
            id: 3,
            title: "Mua nick liên quân",
            plays: "chưa cập nhật",
            priceOld: 20000,
            priceNew: 8000,
            img: "/bylq.png",
            link: "/",
        },
    ];



    const handleClick = (e) => {
        e.preventDefault(); // chặn chuyển trang ngay lập tức

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

    return (
        <>
            <div className="container">
                <div className="game-grid">
                    {ITEMS.map((it) => (
                        <article key={it.id} className="game-card">
                            <div className="thumb1">
                                <img src={it.img} alt={it.title} />
                            </div>

                            <h3 className="title">{it.title}</h3>

                            <div className="meta">
                                <span className="plays">Số lượng: {it.plays.toLocaleString("vi-VN")}</span>
                            </div>
                            <a href={it.link} onClick={handleClick} className="buy-btn">Mua Ngay</a>
                        </article>
                    ))}
                </div>
            </div>
        </>
    )
}

