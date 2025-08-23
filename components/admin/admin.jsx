import React from "react";
import { useState, useEffect } from "react";
import { createCard } from "../../src/app/userApi";

export default function CardForm() {
    const [newCard, setNewCard] = useState({
        name: "",
        price: "",
        code: "",
        serial: "",
    });

    const handleChange = (e) => {
        setNewCard(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let codeRandom;
        let serialRandom;
        codeRandom = Math.floor(Math.random() * 989999999999999 + 1000000000000);
        serialRandom = Math.floor(Math.random() * 989999999999999 + 1000000000000);
        newCard.code = codeRandom;
        newCard.serial = serialRandom;

        try {
            const res = await createCard(newCard);
            if (res.status === true) {
                setNewCard({
                    name: "",
                    price: "",
                })
            } else {
                console.log(res?.message || "Có lỗi xảy ra khi lấy data từ backend.");
            }
        } catch (e) {
            console.log("không vào được backend");
        }
        window.location.href = "/admin"
    };

    return (
        <form onSubmit={handleSubmit} className="">
            <div className="container mt-2">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">Loại thẻ: </label>
                    <select
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Nhà mạng (Viettel, Vina, Mobi...)"
                        className="form-select"
                        autoComplete="off"
                        value={newCard.name}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Vui lòng chọn nhà mạng --</option>
                        <option value="TDZI">TDZI</option>
                        <option value="DOCLAP">DOCLAP</option>
                        <option value="TUDO">TUDO</option>
                        <option value="HANHPHUC">HANHPHUC</option>
                        <option value="VIPGM">VIPGM</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="price">Mệnh Giá:</label>
                    <select
                        name="price"
                        id="price"
                        value={newCard.price}
                        className="form-select"
                        onChange={handleChange}
                        autoComplete="off"
                    >
                        <option value="">--Chọn mệnh giá--</option>
                        <option value="10000">10.000</option>
                        <option value="20000">20.000</option>
                        <option value="50000">50.000</option>
                        <option value="100000">100.000</option>
                        <option value="200000">200.000</option>
                        <option value="500000">500.000</option>
                        <option value="1000000">1.000.000</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                style={{ backgroundColor: "blue" }}
            >
                Gửi
            </button>
        </form >
    );
}
