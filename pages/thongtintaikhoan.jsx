import { useState, useEffect } from "react";

const styles = {
    container: {
        padding: '10px',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
    },
    box: {
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
        textTransform: 'uppercase',
        color: 'red',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        width: '30%',
        padding: '8px 10px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#f9f9f9',
        fontWeight: 'bold',
    },
    td: {
        padding: '8px 10px',
        borderBottom: '1px solid #ddd',
    },
    dangerText: {
        color: 'red',
        fontWeight: 'bold',
    },
    passwordLink: {
        color: 'red',
        fontStyle: 'italic',
        textDecoration: 'none',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    inputRow: {
        display: 'flex',
        marginTop: 20,
        maxWidth: 500,
    },
    input: {
        flex: 1,
        padding: 8,
        marginRight: 10,
        borderRadius: 4,
        border: '1px solid #ccc',
    },
    button: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
    },
};

export default function ThongTinTaiKhoan() {
    const [userCurrent, setUserCurrent] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUserCurrent(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <h4 style={styles.heading}>Thông tin tài khoản</h4>

                {userCurrent && (
                    <table style={styles.table}>
                        <tbody>
                            <tr>
                                <th style={styles.th}>ID của bạn:</th>
                                <td style={styles.td}>{userCurrent.id}</td>
                            </tr>
                            <tr>
                                <th style={styles.th}>Tên tài khoản:</th>
                                <td style={styles.td}>{userCurrent.username}</td>
                            </tr>
                            <tr>
                                <th style={styles.th}>Số dư tài khoản:</th>
                                <td style={{ ...styles.td, ...styles.dangerText }}>
                                    {userCurrent.dollar}_$
                                </td>
                            </tr>
                            <tr>
                                <th style={styles.th}>Số dư Acoin:</th>
                                <td style={{ ...styles.td, ...styles.dangerText }}>0</td>
                            </tr>
                            <tr>
                                <th style={styles.th}>Tiền khuyến mãi:</th>
                                <td style={{ ...styles.td, ...styles.dangerText }}>0</td>
                            </tr>
                            <tr>
                                <th style={styles.th}>Mật khẩu:</th>
                                <td style={styles.td}>
                                    <span style={styles.dangerText}>***</span>
                                    <a href="/doi-mat-khau" style={styles.passwordLink}>Đổi mật khẩu</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}

                <form style={styles.inputRow}>
                    <input
                        type="text"
                        style={styles.input}
                        placeholder="Nhập mã giới thiệu"
                    />
                    <button type="submit" style={styles.button}>Gửi</button>
                </form>
            </div>
        </div>
    );
}
