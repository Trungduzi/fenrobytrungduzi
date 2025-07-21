import "./napthetudong.css";
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { napCard, getHistory } from "../src/app/userApi.js";
import { useNavigate } from 'react-router-dom';


export default function NapTheTuDong() {
    function generateCaptcha() {
        return Math.floor(100 + Math.random() * 900).toString(); // mã bảo vệ 3 chữ số
    }

    const [error, setError] = useState({
        type: '',
        price: '',
        code: '',
        serial: '',
    });
    const navigate = useNavigate();
    const [hideSpan, setHideSpan] = useState(true);
    const [user, setUser] = useState({});
    const [historyUser, setHistoryUser] = useState([]);
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [formData, setFormData] = useState({
        type: '',
        price: '',
        code: '',
        serial: '',
        captchaInput: '',
    });


    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
    };



    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            // console.log("User từ localStorage:", parsedUser);
            setUser(JSON.parse(storedUser));
        }
    }, []);



    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };



    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await getHistory(user.id);
                setHistoryUser(res);
            } catch (error) {
                console.error("Lỗi khi lấy lịch sử:", error);
            }
        };

        if (user.id) {
            fetchHistory();
        }
    }, [user.id]);

    function formatDateTime(isoString) {
        const date = new Date(isoString);
        const pad = (n) => n.toString().padStart(2, '0');

        const time = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        const day = `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`;
        return `${time} ${day}`;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasError = false;
        // Tạo bản sao mới của error
        const newError = { ...error };
        if (formData.type.trim().length === 0) {
            newError.type = "Vui lòng nhập loại thẻ!";
            setHideSpan(false);
            hasError = true;
        } else {
            newError.type = "";
        }
        if (formData.price.trim().length === 0) {
            newError.price = "Vui lòng chọn mệnh giá!";
            setHideSpan(false);
            hasError = true;
        } else {
            newError.price = "";
        }
        if (formData.code.trim().length === 0) {
            newError.code = "Vui lòng nhập mã thẻ";
            setHideSpan(false);
            hasError = true;
        } else {
            newError.code = "";
        }
        if (formData.serial.trim().length === 0) {
            newError.serial = "Vui lòng nhập serial thẻ cào";
            setHideSpan(false);
            hasError = true;
        } else {
            newError.serial = "";
        }
        if (formData.captchaInput.trim().length === 0) {
            newError.captchaInput = "Vui lòng nhập mã xác thực";
            setHideSpan(false);
            hasError = true;
        } else {
            newError.captchaInput = "";
        }
        // Cập nhật lỗi một lần duy nhất
        setError(newError);
        if (!hasError) {
            setHideSpan(true); // Ẩn span nếu không có lỗi
            console.log("Submit hợp lệ:", formData);
            // Xử lý tiếp ở đây...
        }
        if (formData.captchaInput !== captcha) {
            alert("Mã captcha không đúng!");
            return;
        }
        const res = await napCard(formData, user);
        if (res.status === true) {
            setFormData({
                type: '',
                price: '',
                code: '',
                serial: '',
                captchaInput: '',
            })
            if (res.user) {
                const fixedUser = { ...res.user, username: res.user.user }; // đổi tên user → username
                localStorage.setItem("user", JSON.stringify(fixedUser));
                window.dispatchEvent(new Event("storage"));
            } else {
                console.warn("⚠️ Không có user trả về từ backend!");
            }
        } else {
            console.log(res?.message || "Có lỗi xảy ra khi lấy data từ backend.");
        }
        setTimeout(() => {
            window.location.href = "/nap-the-tu-dong";
            e.preventDefault();
        }, 500);
    };

    return (
        <>
            <div className="container mt-4">
                <h2 className="border-bottom border-3 border-danger pb-2 fw-bold">NẠP THẺ</h2>

                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label className="form-label">Loại thẻ:</label>
                        <select
                            className="form-select"
                            name="type"
                            id="select-type"
                            value={formData.type}
                            onChange={handleChange}
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
                        <span style={{ display: hideSpan ? "none" : "block", color: "red" }}></span>
                        <div style={{ color: "red" }}>{error.type}</div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mệnh giá:</label>
                        <select
                            className="form-select"
                            name="price"
                            id="select-price"
                            value={formData.price}
                            onChange={handleChange}
                        >
                            <option value="">-- Vui lòng chọn mệnh giá, sai mất thẻ --</option>
                            <option value="20000">20.000 - Nhận 100.0%</option>
                            <option value="50000">50.000 - Nhận 100.0%</option>
                            <option value="100000">100.000 - Nhận 100.0%</option>
                            <option value="200000">200.000 - Nhận 100.0%</option>
                            <option value="300000">300.000 - Nhận 100.0%</option>
                            <option value="500000">500.000 - Nhận 100.0%</option>
                            <option value="1000000">1.000.000 - Nhận 100.0%</option>
                        </select>
                        <span style={{ display: hideSpan ? "none" : "block", color: "red" }}></span>
                        <div style={{ color: "red" }}>{error.price}</div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mã số thẻ:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="code"
                            id="code"
                            minLength="13"
                            maxLength="13"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder="Nhập mã thẻ"
                        />
                        <span style={{ display: hideSpan ? "none" : "block", color: "red" }}></span>
                        <div style={{ color: "red" }}>{error.code}</div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Số Serial:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="serial"
                            id="serial"
                            minLength="13"
                            maxLength="13"
                            value={formData.serial}
                            onChange={handleChange}
                            placeholder="Nhập serial"
                        />
                        <span style={{ display: hideSpan ? "none" : "block", color: "red" }}></span>
                        <div style={{ color: "red" }}>{error.serial}</div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mã bảo vệ:</label>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                name="captchaInput"
                                value={formData.captchaInput}
                                onChange={handleChange}
                                placeholder="Nhập mã bảo vệ"
                            />
                            <span className="input-group-text text-danger fw-bold">{captcha}</span>

                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={refreshCaptcha}
                                title="Làm mới mã"
                            >
                                &#x21bb;
                            </button>

                        </div>
                        <span style={{ display: hideSpan ? "none" : "block", color: "red" }}></span>
                        <div style={{ color: "red" }}>{error.captchaInput}</div>
                    </div>

                    <button type="submit" className="btn btn-info text-white">Nạp Thẻ</button>
                </form>

                {/* <div className="mt-5 fw-bold fs-5">Ngày 25/06/2025</div> */}

                <table className="table table-bordered table-striped mt-3">
                    <thead className="table-light">
                        <tr>
                            <th>STT</th>
                            <th>Thời gian</th>
                            <th>Nhà mạng</th>
                            <th>Mã thẻ</th>
                            <th>Serial</th>
                            <th>Mệnh giá</th>
                            <th>Kết quả</th>
                            <th>Thực nhận</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyUser.map((item, index, array) => (
                            <tr key={index}>
                                <td>{array.length - index}</td>
                                <td>{formatDateTime(item.createdAt)}</td>
                                <td>{item.name}</td>
                                <td>{item.code}</td>
                                <td>{item.serial}</td>
                                <td>{item.price}</td>
                                <td>
                                    <span className="badge bg-danger">{item.status}</span>
                                </td>
                                <td>{item.receive}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}