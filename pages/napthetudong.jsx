import React, { useEffect, useState } from 'react';
import { napCard, getHistory } from "../src/app/userApi.js";

const styles = {
    container: {
        padding: '10px',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
    },
    formBox: {
        width: '100%',
        maxWidth: 900,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 30,
    },
    heading: {
        borderBottom: '3px solid red',
        paddingBottom: '10px',
        fontWeight: 'bold',
        marginTop: 0,
    },
    formElement: {
        marginBottom: '10px',
    },
    input: {
        width: '100%',
        padding: '5px',
    },
    button: {
        width: '100%',
        backgroundColor: '#00bcd4',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    tableWrapper: {
        marginTop: '30px',
        overflowX: 'auto',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: 4,
        padding: '10px',
    },
    table: {
        width: '100%',
        // borderCollapse: 'collapse',
        minWidth: 800,
    },
    thead: {
        backgroundColor: '#f9f9f9',
    },
    th: {
        fontWeight: 'bold',
        padding: '10px',
        borderBottom: '1px solid #ddd',
        textAlign: 'left',
    },
    td: {
        padding: '8px 10px',
        borderBottom: '1px solid #ddd',
    },
    badgeFail: {
        backgroundColor: '#f44336',
        color: 'white',
        padding: '3px 8px',
        borderRadius: '5px',
        fontSize: '12px',
        display: 'inline-block',
    }
};

export default function NapTheTuDong() {
    const [user, setUser] = useState({});
    const [historyUser, setHistoryUser] = useState([]);
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [hideSpan, setHideSpan] = useState(true);
    const [error, setError] = useState({
        type: '',
        price: '',
        code: '',
        serial: '',
        captchaInput: '',
    });

    const [formData, setFormData] = useState({
        type: '',
        price: '',
        code: '',
        serial: '',
        captchaInput: '',
    });

    function generateCaptcha() {
        return Math.floor(100 + Math.random() * 900).toString(); // 3 chữ số
    }

    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

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

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasError = false;
        const newError = { ...error };

        if (!formData.type) {
            newError.type = "Vui lòng chọn loại thẻ!";
            hasError = true;
        } else newError.type = "";

        if (!formData.price) {
            newError.price = "Vui lòng chọn mệnh giá!";
            hasError = true;
        } else newError.price = "";

        if (!formData.code) {
            newError.code = "Vui lòng nhập mã thẻ!";
            hasError = true;
        } else newError.code = "";

        if (!formData.serial) {
            newError.serial = "Vui lòng nhập số serial!";
            hasError = true;
        } else newError.serial = "";

        if (!formData.captchaInput) {
            newError.captchaInput = "Vui lòng nhập mã bảo vệ!";
            hasError = true;
        } else newError.captchaInput = "";

        setError(newError);
        if (hasError) {
            setHideSpan(false);
            return;
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
            });

            if (res.user) {
                const fixedUser = { ...res.user, username: res.user.user };
                localStorage.setItem("user", JSON.stringify(fixedUser));
                window.dispatchEvent(new Event("storage"));
            }

            setTimeout(() => {
                window.location.href = "/nap-the-tu-dong";
            }, 200);
        } else {
            alert(res.message || "Có lỗi xảy ra khi gửi thẻ.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formBox}>
                <h2 style={styles.heading}>NẠP THẺ</h2>

                <form onSubmit={handleSubmit}>
                    <div style={styles.formElement}>
                        <label>Loại thẻ:</label>
                        <select name="type" value={formData.type} onChange={handleChange} style={styles.input}>
                            <option value="">-- Vui lòng chọn nhà mạng --</option>
                            <option value="VIETTEL">VIETTEL</option>
                            <option value="VINAPHONE">VINAPHONE</option>
                            <option value="MOBIFONE">MOBIFONE</option>
                            <option value="ZING">ZING</option>
                            <option value="GARENA">GARENA</option>
                            <option value="GATE">GATE</option>
                        </select>
                        <div style={{ color: "red" }}>{error.type}</div>
                    </div>

                    <div style={styles.formElement}>
                        <label>Mệnh giá:</label>
                        <select name="price" value={formData.price} onChange={handleChange} style={styles.input}>
                            <option value="">-- Chọn mệnh giá --</option>
                            <option value="20000">20.000 - Nhận 100.0%</option>
                            <option value="50000">50.000 - Nhận 100.0%</option>
                            <option value="100000">100.000 - Nhận 100.0%</option>
                            <option value="200000">200.000 - Nhận 100.0%</option>
                            <option value="500000">500.000 - Nhận 100.0%</option>
                            <option value="1000000">1.000.000 - Nhận 100.0%</option>
                        </select>
                        <div style={{ color: "red" }}>{error.price}</div>
                    </div>

                    <div style={styles.formElement}>
                        <label>Mã số thẻ:</label>
                        <input type="text" name="code" value={formData.code} onChange={handleChange} style={styles.input} maxLength={13} minLength={13} placeholder="Nhập mã thẻ" />
                        <div style={{ color: "red" }}>{error.code}</div>
                    </div>

                    <div style={styles.formElement}>
                        <label>Số Serial:</label>
                        <input type="text" name="serial" value={formData.serial} onChange={handleChange} style={styles.input} maxLength={13} minLength={13} placeholder="Nhập serial" />
                        <div style={{ color: "red" }}>{error.serial}</div>
                    </div>

                    <div style={styles.formElement}>
                        <label>Mã bảo vệ:</label>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <input
                                type="text"
                                name="captchaInput"
                                value={formData.captchaInput}
                                onChange={handleChange}
                                style={{ ...styles.input, flex: 1 }}
                                placeholder="Nhập mã bảo vệ"
                            />
                            <span style={{ fontWeight: "bold", color: "red" }}>{captcha}</span>
                            <button type="button" onClick={refreshCaptcha} style={{ padding: "6px 10px" }}>
                                🔄
                            </button>
                        </div>
                        <div style={{ color: "red" }}>{error.captchaInput}</div>
                    </div>

                    <button type="submit" style={styles.button}>Nạp Thẻ</button>
                </form>
            </div>

            <div style={styles.tableWrapper}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Lịch sử nạp thẻ</h4>
                <table style={styles.table}>
                    <thead style={styles.thead}>
                        <tr>
                            <th style={styles.th}>STT</th>
                            <th style={styles.th}>Thời gian</th>
                            <th style={styles.th}>Nhà mạng</th>
                            <th style={styles.th}>Mã thẻ</th>
                            <th style={styles.th}>Serial</th>
                            <th style={styles.th}>Mệnh giá</th>
                            <th style={styles.th}>Kết quả</th>
                            <th style={styles.th}>Thực nhận</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyUser.map((item, index, array) => (
                            <tr key={index}>
                                <td style={styles.td}>{array.length - index}</td>
                                <td style={styles.td}>{formatDateTime(item.createdAt)}</td>
                                <td style={styles.td}>{item.name}</td>
                                <td style={styles.td}>{item.code}</td>
                                <td style={styles.td}>{item.serial}</td>
                                <td style={styles.td}>{item.price}</td>
                                <td style={styles.td}>
                                    <span style={styles.badgeFail}>{item.status}</span>
                                </td>
                                <td style={styles.td}>{item.receive}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
