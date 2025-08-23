import { useState } from "react";

export default function LichSuTrungNick() {
    const [searchID, setSearchID] = useState("");
    const [status, setStatus] = useState("");
    const [price, setPrice] = useState("");
    const [game, setGame] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const fakeData = [
        {
            time: "10:22:23 18/08/2008",
            id: 11112123,
            game: "172123",
            account: "91.231.910.000",
            price: "1.000.000",
            content: "mua thẻ",
            status: "Thành công",
        }

    ];

    return (
        <div>
            <h4 className="fw-bold border-bottom pb-2 mb-4">Lịch Sử Trúng Nick</h4>
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
                                <td>{item.price}</td>
                                <td>{item.account}</td>
                                <td>{item.content}</td>
                                <td>
                                    <span
                                        className={`badge ${item.status === "Thành công" ? "bg-danger" : "bg-success"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
