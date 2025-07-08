import { useState } from "react";

export default function LichSuNapThe() {
    const [searchText, setSearchText] = useState("");
    const [cardType, setCardType] = useState("");
    const [status, setStatus] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const fakeData = [
        {
            time: "25/06/2025 18:33:25",
            network: "VIETTEL",
            card: "1234324323232",
            serial: "1232412311212",
            value: "10.000",
            result: "Thẻ sai",
            received: "0 đ",
        },
        {
            time: "25/06/2025 18:33:03",
            network: "VIETTEL",
            card: "12344442123",
            serial: "12324123112",
            value: "10.000",
            result: "Thẻ sai",
            received: "0 đ",
        },
    ];

    return (
        <div>
            <h4 className="fw-bold border-bottom pb-2 mb-4">THẺ CÀO ĐÃ NẠP</h4>

            <div className="row g-3 mb-3">
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Thẻ cào"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Mã thẻ, Serial..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <select className="form-select" value={cardType} onChange={(e) => setCardType(e.target.value)}>
                        <option>--Tất cả loại thẻ--</option>
                        <option>VIETTEL</option>
                        <option>VINAPHONE</option>
                        <option>MOBIFONE</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <input
                        type="date"
                        className="form-control"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        type="date"
                        className="form-control"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option>-- Chọn trạng thái --</option>
                        <option value="1">Thành công</option>
                        <option value="2">Đang xử lí</option>
                        <option value="0">Thất bại</option>
                    </select>
                </div>
            </div>

            <div className="d-flex gap-2 mb-3">
                <a herf="#" className="btn btn-info">Tìm kiếm</a>
                <a herf="#" className="btn btn-danger">Hôm nay</a>
                <a herf="#" className="btn btn-danger">Hôm qua</a>
                <a herf="#" className="btn btn-danger">Tháng này</a>
                <a herf="#" className="btn btn-info">Tất cả</a>
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
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
                    <tr>
                        <td colSpan="7" className="fw-bold text-start text-dark">
                            Ngày 25/06/2025
                        </td>
                    </tr>
                    {fakeData.map((item, idx) => (
                        <tr key={idx}>
                            <td>{item.time}</td>
                            <td>{item.network}</td>
                            <td>{item.card}</td>
                            <td>{item.serial}</td>
                            <td>{item.value}</td>
                            <td>
                                <span className="badge bg-danger">{item.result}</span>
                            </td>
                            <td>{item.received}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
