import { useState } from "react";

export default function RutNgocNro() {
    const [server, setServer] = useState("Vũ Trụ 1");
    const [packageOption, setPackageOption] = useState("Rút 1501 Ngọc");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleWithdraw = () => {
        if (!username || !password) {
            setMessage("Vui lòng nhập đầy đủ thông tin tài khoản.");
            return;
        }

        // Giả lập phản hồi thất bại vì chưa phát sinh giao dịch
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
                        value="Rút Ngọc NRO"
                        disabled
                    />
                </div>
            </div>

            <div className="text-danger text-center mb-3 fw-bold">Số vật phẩm hiện có: 0</div>

            <div className="row mb-3">
                <div className="col-md-3 text-end fw-semibold">Chọn máy chủ:</div>
                <div className="col-md-5">
                    <select
                        className="form-select"
                        value={server}
                        onChange={(e) => setServer(e.target.value)}
                    >
                        <option>Vũ Trụ 1</option>
                        <option>Vũ Trụ 2</option>
                        <option>Vũ Trụ 3</option>
                        <option>Vũ Trụ 4</option>
                        <option>Vũ Trụ 5</option>
                        <option>Vũ Trụ 6</option>
                        <option>Vũ Trụ 7</option>
                        <option>Vũ Trụ 8</option>
                        <option>Vũ Trụ 9</option>
                        <option>Vũ Trụ 10</option>
                        <option>Vũ Trụ 11</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-3 text-end fw-semibold">Gói muốn rút:</div>
                <div className="col-md-5">
                    <select
                        className="form-select"
                        value={packageOption}
                        onChange={(e) => setPackageOption(e.target.value)}
                    >
                        <option>Rút 1501 Ngọc</option>
                        <option>Rút 3000 Ngọc</option>
                        <option>Rút 5000 Ngọc</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-3 text-end fw-semibold">Tài Khoản:</div>
                <div className="col-md-5">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tài Khoản"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-3 text-end fw-semibold">Mật Khẩu:</div>
                <div className="col-md-5">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Mật Khẩu"
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
