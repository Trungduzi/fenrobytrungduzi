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
        try {
            const res = await createCard(newCard);
            // if (res.status === true) {
            //     setNewCard({
            //         name: "",
            //         price: "",
            //         code: "",
            //         serial: "",
            //     })
            // } else {
            //     console.log(res?.message || "Có lỗi xảy ra khi lấy data từ backend.");
            // }
        } catch (e) {
            console.log("không vào được backend");
        }
        // window.location.href = "/admin"
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
                        <option value="VIETTEL">VIETTEL</option>
                        <option value="VINAPHONE">VINAPHONE</option>
                        <option value="MOBIFONE">MOBIFONE</option>
                        <option value="GARENA">GARENA</option>
                        <option value="ZING">ZING</option>
                        <option value="VCON">VCON</option>
                        <option value="GATE">GATE</option>
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
                        <option value="300000">300.000</option>
                        <option value="500000">500.000</option>
                        <option value="1000000">1.000.000</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="code">Mã số thẻ: </label>
                    <input
                        type="text"
                        name="code"
                        id="code"
                        className="form-select"
                        value={newCard.code}
                        onChange={handleChange}
                        autoComplete="21022025"
                        minLength={13}
                        maxLength={13}
                    ></input>
                </div>
                <div className="mb-4">
                    <label htmlFor="serial">Số Serial: </label>
                    <input type="text"
                        name="serial"
                        id="serial"
                        className="form-select"
                        value={newCard.serial}
                        onChange={handleChange}
                        autoComplete="21022025"
                        minLength={13}
                        maxLength={13}
                    />
                </div>
            </div>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                Gửi
            </button>
        </form>
    );
}
