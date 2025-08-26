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
        },
        table: {
            width: '100%',
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
    }, [user.id]);

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
        return Math.floor(100 + Math.random() * 900).toString();
    }

    const [captcha, setCaptcha] = useState(generateCaptcha());

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

        if (formData.captchaInput !== captcha) {
            newError.captchaInput = "Mã captcha không đúng!";
            hasError = true;
        }

        setError(newError);
        if (hasError) {
            setHideSpan(false);
            return;
        }
        console.log(formData);
        console.log(user.id);
        const res = await byCard(formData, user.id);
        console.log("lấy ra thẻ:", getCardByed);
        setUser(localStorage.getItem("user"));
        if (res.status === true) {
            setFormData({
                type: '',
                price: '',
                captchaInput: '',
            });
            if (res.user) {
                const fixedUser = { ...res.user, username: res.user.user };
                localStorage.setItem("user", JSON.stringify(fixedUser));
                window.dispatchEvent(new Event("storage"));
            }

            setTimeout(() => {
                window.location.href = "/mua-the";
            }, 200);
        }
    };

    return (
        <>
            <div style={styles.container}>
                {user.email === "tranhoangdung054@gmail.com" ?
                    (
                        <>
                            <h1 style={{ textAlign: "center", color: "black", textTransform: "uppercase", fontWeight: 10000, background: "lightblue", borderWidth: 2, borderStyle: "solid", marginBottom: "20px" }}>Riêng bạn thì liên hệ với chồng mình nhé! Bạn Mua nữa sập web mất:((</h1>
                        </>
                    ) : (
                        <>

                        </>
                    )}
                <div style={styles.formBox}>
                    <h2 style={styles.heading}>Mua thẻ</h2>
                    <div>
                        <div style={styles.formElement}>
                            <label>Loại thẻ:</label>
                            <select name="type" value={formData.type} onChange={handleChange} style={styles.input}>
                                <option value="">-- Vui lòng chọn nhà mạng --</option>
                                <option value="TDZI">TDZI</option>
                                <option value="DOCLAP">DOCLAP</option>
                                <option value="TUDO">TUDO</option>
                                <option value="HANHPHUC">HANHPHUC</option>
                                <option value="VIPGM">VIPGM</option>
                            </select>
                            <div style={{ color: "red" }}>{error.type}</div>
                        </div>

                        <div style={styles.formElement}>
                            <label>Mệnh giá:</label>
                            <select name="price" value={formData.price} onChange={handleChange} style={styles.input}>
                                <option value="">-- Chọn mệnh giá --</option>
                                <option value="10000">10.000 - Nhận 100.0%</option>
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
                        <button onClick={handleSubmit} style={styles.button}>Mua thẻ</button>

                    </div>

                    <div style={styles.tableWrapper}>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Lịch sử mua thẻ</h4>
                        <table style={{ ...styles.table, ...{ position: "relative" } }}>
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
                                {(getCardByed.length != 0) ? (
                                    <>
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
                                    </>
                                ) : (
                                    <>
                                        <tr style={{ textAlign: "center", width: "100%", textTransform: "uppercase", position: "absolute" }} ><h5><b>Không có data</b></h5></tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}