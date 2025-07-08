import { useState } from "react";

export default function TaiKhoanDaMua() {
    const [searchID, setSearchID] = useState("");
    const [status, setStatus] = useState("");
    const [price, setPrice] = useState("");
    const [game, setGame] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const fakeData = []; // bạn có thể thay bằng dữ liệu thật

    return (
        <div>
            <h4 className="fw-bold border-bottom pb-2 mb-4">TÀI KHOẢN ĐÃ MUA</h4>

            <div className="row g-3 mb-3">
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Mã tài khoản #"
                        value={searchID}
                        onChange={(e) => setSearchID(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">-- Chọn trạng thái --</option>
                        <option value="1">Thành công</option>
                        <option value="0">Thất bại</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <input
                        type="date"
                        className="form-control"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="date"
                        className="form-control"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <select className="form-select" value={price} onChange={(e) => setPrice(e.target.value)}>
                        <option value="">-- Chọn giá tiền --</option>
                        <option value="10000">10.000 đ</option>
                        <option value="20000">20.000 đ</option>
                        <option value="50000">50.000 đ</option>
                        <option value="100000">100.000 đ</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select className="form-select" value={game} onChange={(e) => setGame(e.target.value)}>
                        <option value="">--Tất cả game--</option>
                        <option value="nro">Ngọc Rồng</option>
                        <option value="lmht">Liên Minh Huyền Thoại</option>
                        <option value="ff">Free Fire</option>
                        {/* thêm game nếu cần */}
                    </select>
                </div>
            </div>

            <div className="d-flex gap-2 mb-3">
                <button className="btn btn-info">Tìm Kiếm</button>
                <button className="btn btn-danger">Tất Cả</button>
            </div>

            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Thời gian</th>
                        <th>ID</th>
                        <th>Game</th>
                        <th>Tài khoản</th>
                        <th>Trị giá</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {fakeData.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center text-danger fw-bold">
                                Không có dữ liệu !
                            </td>
                        </tr>
                    ) : (
                        fakeData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.time}</td>
                                <td>{item.id}</td>
                                <td>{item.game}</td>
                                <td>{item.account}</td>
                                <td>{item.price}</td>
                                <td>
                                    <span
                                        className={`badge ${item.status === "Thành công" ? "bg-success" : "bg-danger"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-primary">Chi tiết</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
