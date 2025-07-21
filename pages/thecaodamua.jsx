import React, { useEffect, useState } from 'react';
import { getHistoryCard } from "../src/app/userApi";

export default function TheCaoDaMua() {
    const [user, setUser] = useState({});
    const [toID, setToID] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const [history, setHistory] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await getHistoryCard();
            setHistory(res.user);
        } catch (error) {
            console.error("Lỗi khi tìm kiếm:", error);
            alert("Đã xảy ra lỗi khi tìm kiếm.");
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log("User từ localStorage:", parsedUser);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await getHistoryCard(user.id);
                setHistory(res);
            } catch (error) {
                console.error("Lỗi khi lấy lịch sử:", error);
            }
        };

        if (user.id) {
            fetchHistory();
        }
    }, [user.id]);


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
                Thẻ Cào Đã Mua
            </h4>

            <form className="row g-3 mb-4" onSubmit={handleSearch}>
                <div className="col-md-3">
                    <label className="form-label">Mã Thẻ, Serial...</label>
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

                <div className="col-md-12 d-flex gap-2 mt-2">
                    <button type="submit" className="btn btn-info text-white">
                        Tìm kiếm
                    </button>
                </div>
            </form>

            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Thời gian</th>
                            <th>ID</th>
                            <th>Loại thẻ</th>
                            <th>Tài khoản</th>
                            <th>Số tiền</th>
                            <th>Số dư cuối</th>
                            <th>Nội dung</th>
                            <th>Trạng thái</th>
                            <th>Thực nhận</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.concat(user).map((item, index) => (
                            item.createdAt && item.code && item.name ? (
                                <tr key={index}>
                                    <td>{item.createdAt}</td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.dollar}</td>
                                    <td>{item.code}</td>
                                    <td>{item.serial}</td>
                                    <td>
                                        <span className="badge bg-danger">{item.status}</span>
                                    </td>
                                    <td>{item.receive}</td>
                                </tr>
                            ) : null
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
