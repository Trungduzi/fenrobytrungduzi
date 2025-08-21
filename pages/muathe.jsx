import React, { useEffect, useState, useRef } from 'react';
import { byCard } from '../src/app/userApi';
import { getByCard } from '../src/app/userApi';

export default function Muathe() {
    const styles = {
        container: {
            padding: '10px',
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            position: "relative",
            top: "20vh",
        },
        formBox: {
            width: '100%',
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
            height: "300px",
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
            borderBottom: '2px solid #ddd',
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
    const [user, setUser] = useState({});
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [hideSpan, setHideSpan] = useState(true);
    const [getCardByed, setGetCardByed] = useState([]);

    const [error, setError] = useState({
        type: '',
        price: '',
        captchaInput: '',
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await getByCard(user.id);
                console.log(res);
                setGetCardByed(res);
            } catch (error) {
                console.error("Lỗi khi lấy lịch sử:", error);
            }
        };

        if (user.id) {
            fetchHistory();
        }
    }, [user.id]);


    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const [formData, setFormData] = useState({
        type: '',
        price: '',
        captchaInput: '',
    });

    function generateCaptcha() {
        return Math.floor(100 + Math.random() * 900).toString(); // 3 chữ số
    }

    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
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
            // alert("Mã captcha không đúng!");
            newError.captchaInput = "Mã captcha không đúng!";
            hasError = true;
            return;
        }
        console.log(getCardByed);
        const res = await byCard(formData, user.id);

        if (res.status === true) {
            setFormData({
                type: '',
                price: '',
                captchaInput: '',
            });
            alert("Mua thẻ thành công");
            if (res.user) {
                const fixedUser = { ...res.user, username: res.user.user };
                localStorage.setItem("user", JSON.stringify(fixedUser));
                window.dispatchEvent(new Event("storage"));
            }

            setTimeout(() => {
                window.location.href = "/mua-the";
            }, 200);
        } else {
            alert("Hết thẻ. Vui lòng chọn thẻ khác!");
        }
    };

    return (
        <>
            <div style={styles.container}>
                <div style={styles.formBox}>
                    <h2 style={styles.heading}>Mua thẻ</h2>

                    <form>
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
                        <div style={{ marginBottom: "5px", color: "red", fontWeight: "900" }}>Tổng Bill:  {formData.price * 2}</div>
                        <button type="submit" onClick={handleSubmit} style={styles.button}>Mua thẻ</button>
                    </form>
                </div>

                <div style={styles.tableWrapper}>
                    <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Lịch sử mua thẻ</h4>
                    <table style={styles.table}>
                        <thead style={styles.thead}>
                            <tr>
                                <th style={styles.th}>STT</th>
                                <th style={styles.th}>Nhà mạng</th>
                                <th style={styles.th}>Mã thẻ</th>
                                <th style={styles.th}>Serial</th>
                                <th style={styles.th}>Mệnh giá</th>
                                <th style={styles.th}>Trạng thái</th>
                                <th style={styles.th}>Thời gian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getCardByed.map((item, index, array) => (
                                <tr key={index}>
                                    <td style={styles.td}>{array.length - index}</td>
                                    <td style={styles.td}>{item.name}</td>
                                    <td style={styles.td}>{item.code}</td>
                                    <td style={styles.td}>{item.serial}</td>
                                    <td style={styles.td}>{item.price}</td>
                                    <td style={styles.td}>
                                        <span style={styles.badgeFail}>{item.status}</span>
                                    </td>
                                    <td style={styles.td}>{item.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}