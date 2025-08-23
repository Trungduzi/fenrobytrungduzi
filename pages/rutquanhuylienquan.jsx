import { useState } from "react";

export default function RutQuanHuyLienQuan() {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleWithdraw = () => {
        if (!account || !password) {
            setMessage("Vui lòng nhập đầy đủ thông tin tài khoản và mật khẩu.");
            return;
        }

        setMessage("Tài khoản của quý khách chưa phát sinh giao dịch.");
    };

    return (
        <div className="container mt-4">
            <h4 className="fw-bold border-bottom pb-2 mb-3">RÚT VẬT PHẨM</h4>

            <div className="row mb-3">
                <div className="col-md-3 text-end fw-semibold">Chọn loại vật phẩm khác:</div>
                <div className="col-md-5">
                    <input
                        type="text"
                        className="form-control"
                        value="Gói Rút Quân Huy"
                        disabled
                    />
                </div>
            </div>

            <div className="text-danger text-center mb-3 fw-bold">
                Số vật phẩm hiện có: 0
            </div>

            <div className="row mb-3">
                <div className="col-md-3 text-end fw-semibold">Gói muốn rút:</div>
                <div className="col-md-5">
                    <select name="" className="form-select">
                        <option value="">Rút về gói 80 quân huy(20% nhập thêm 80 quân huy)</option>
                        <option value="">Rút về gói 160 quân huy(30% nhập thêm 160 quân huy)</option>
                        <option value="">Rút về gói 320 quân huy(40% nhập thêm 320 quân huy)</option>
                        <option value="">Rút về gói 800 quân huy(45% nhập thêm 800 quân huy)</option>
                        <option value="">Rút về gói 1600 quân huy(50% nhập thêm 1600 quân huy)</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-3 text-end fw-semibold">
                    Tài khoản Garena
                    <br />
                    <small className="text-muted">
                        (nếu là tài khoản fb, yêu cầu liên kết với garena trước khi rút)
                    </small>
                </div>
                <div className="col-md-5">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tài khoản garena"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                    />
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-3 text-end fw-semibold">Mật khẩu game:</div>
                <div className="col-md-5">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Mật khẩu game"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-8 text-center">
                    <button className="btn btn-info px-5 text-white fw-bold" onClick={handleWithdraw}>
                        Thực Hiện
                    </button>
                </div>
            </div>

            {message && (
                <div className="text-danger text-center fw-semibold">{message}</div>
            )}
        </div>
    );
}
