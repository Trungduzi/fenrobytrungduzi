import { useState } from "react";

export default function LichSuQuayMiniGame() {
    const [searchID, setSearchID] = useState("");
    const [status, setStatus] = useState("");
    const [price, setPrice] = useState("");
    const [game, setGame] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const fakeData = [];

    return (
        <div>
            <h4 className="fw-bold border-bottom pb-2 mb-4">Lịch Sử Quay MINIGAME</h4>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Thời gian</th>
                        <th>ID</th>
                        <th>Giao Dịch</th>
                        <th>Số Tiền</th>
                        <th>Số Dư Cuối</th>
                        <th>Nội dung</th>
                        <th>Trạng thái</th>
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
