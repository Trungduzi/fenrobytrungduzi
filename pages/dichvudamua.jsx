import { useState } from "react";

export default function DichVuDaMua() {
    const [toID, setToID] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        alert("Đang tìm kiếm...");
    };

    const handleReset = () => {
        setToID("");
        setFromDate("");
        setToDate("");
        setStatus("");
        setType("");
    };

    return (
        <div>
            <h4 className="fw-bold mb-4 border-bottom pb-2 text-uppercase text-danger">
                Dịch Vụ Đã Mua
            </h4>
            <form className="row g-3 mb-4" onSubmit={handleSearch}>
                <div className="col-md-3">
                    <label className="form-label">Mã ID</label>
                    <input
                        type="text"
                        className="form-control"
                        value={toID}
                        onChange={(e) => setToID(e.target.value)}
                    />
                </div>

                <div className="col-md-3">
                    <label className="form-label">Từ ngày</label>
                    <input
                        type="date"
                        className="form-control"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>

                <div className="col-md-3">
                    <label className="form-label">Đến ngày</label>
                    <input
                        type="date"
                        className="form-control"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>

                <div className="col-md-3">
                    <label className="form-label">Trạng thái</label>
                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">-- Tất cả --</option>
                        <option value="success">Thành công</option>
                        <option value="pending">Đang xử lý</option>
                        <option value="failed">Thất bại</option>
                    </select>
                </div>

                <div className="col-md-3">
                    <label className="form-label">Giao dịch</label>
                    <select
                        className="form-select"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">-- Tất cả --</option>
                        <option value="napthe">Nạp thẻ tự động</option>
                        <option value="muaac">Thanh toán dịch vụ</option>
                        <option value="rutvang">Nạp ví ATM tự động</option>
                    </select>
                </div>

                <div className="col-md-12 d-flex gap-2 mt-2">
                    <button type="submit" className="btn btn-info text-white">
                        Tìm kiếm
                    </button>
                    <button type="button" className="btn btn-danger" onClick={handleReset}>
                        Tất cả
                    </button>
                </div>
            </form>

            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Thời gian</th>
                            <th>ID</th>
                            <th>Tài khoản</th>
                            <th>Giao dịch</th>
                            <th>Số tiền</th>
                            <th>Số dư cuối</th>
                            <th>Nội dung</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={8} className="text-center text-danger fw-bold">
                                Không có dữ liệu
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
