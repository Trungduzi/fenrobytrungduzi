import { useState, useEffect, use } from "react";

export default function ThongTinTaiKhoan() {
    const [userCurrent, setUserCurrent] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUserCurrent(JSON.parse(storedUser));
        }
    }, []);

    return (
        <>
            <h4 className="fw-bold mb-4 border-bottom pb-2 text-uppercase text-danger">
                Thông tin tài khoản
            </h4>

            <div className="table-responsive">
                {userCurrent ? (
                    <>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th style={{ width: "30%" }}>ID của bạn:</th>
                                    <td>{userCurrent.id}</td>
                                </tr>
                                <tr>
                                    <th>Tên tài khoản:</th>
                                    <td>{userCurrent.username}</td>
                                </tr>
                                <tr>
                                    <th>Số dư tài khoản:</th>
                                    <td className="text-danger fw-bold">{userCurrent.dollar}_$</td>
                                </tr>
                                <tr>
                                    <th>Số dư Acoin:</th>
                                    <td className="text-danger fw-bold">0</td>
                                </tr>
                                <tr>
                                    <th>Tiền khuyến mãi:</th>
                                    <td className="text-danger fw-bold">0</td>
                                </tr>
                                <tr>
                                    <th>Mật khẩu:</th>
                                    <td>
                                        <span className="fw-bold text-danger">***</span>
                                        &nbsp;
                                        <a href="/doi-mat-khau" className="fw-bold fst-italic text-danger text-decoration-none ">
                                            Đổi mật khẩu
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                ) : (
                    <>
                    </>
                )}

            </div>

            <form className="d-flex mt-4" style={{ maxWidth: "500px" }}>
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Nhập mã giới thiệu"
                />
                <button type="submit" className="btn btn-primary">
                    Gửi
                </button>
            </form>
        </>
    );
}
