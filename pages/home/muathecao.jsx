import React from "react";
import { useState, useEffect } from "react";
import "./muathecao.scss";
import Tamthoi from "../../components/tamthoi";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getCardCreated, updateN } from "../../src/app/userApi";

export default function Muathecao() {
    const [user, setUser] = useState([]);
    const [user1, setUser1] = useState([]);
    const [number, setNumber] = useState([]);
    const navigate = useNavigate();
    const ITEMS = [
        {
            id: 1,
            title: "mua thẻ cào",
            plays: "chưa cập nhật",
            priceOld: 16665,
            priceNew: 9999,
            img: "/muathe.jpg",
            link: "/mua-the",
        },
        {
            id: 2,
            title: "Mua nick nro",
            plays: "chưa cập nhật",
            priceOld: 11429,
            priceNew: 8000,
            img: "/bynro.png",
            link: "/Tam-thoi",
        },
        {
            id: 3,
            title: "Mua nick liên quân",
            plays: "chưa cập nhật",
            priceOld: 20000,
            priceNew: 8000,
            img: "/bylq.png",
            link: "/Tam-thoi",
        },
    ];


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

    useEffect(() => {
        const fetchNumberCard = async () => {
            const res = await getCardCreated();
            setNumber(res.number);
        }
        if (!user.id) {
            fetchNumberCard()
        }
    }, [user.id]);

    const handleRedirect = (path) => {
        if (user.length != 0) {
            navigate(path);
        }
        else {
            navigate("/login");
        }
    }

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


                            {(it.id == 1) ? (
                                <>
                                    <div className="meta">
                                        <span className="plays" style={{ color: "white" }}>Số lượng: {number.toLocaleString("vi-VN")}</span>
                                    </div>
                                    <a onClick={() => handleRedirect("/mua-the")} className="buy-btn">Mua Ngay</a>
                                </>
                            ) : (
                                <>
                                    <div className="meta">
                                        <span className="plays" style={{ color: "white" }}>Số lượng: {it.plays.toLocaleString("vi-VN")}</span>
                                    </div>
                                    <a onClick={handleClick} className="buy-btn">Mua Ngay</a>
                                </>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </>
    )
}

