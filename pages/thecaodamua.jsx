import React, { useEffect, useState } from 'react';
import { getByCard, getHistoryCard } from "../src/app/userApi";

export default function TheCaoDaMua() {
    const [user, setUser] = useState({});
    const [toID, setToID] = useState("");
    const [toSerial, setToSerial] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [history, setHistory] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const [res, res1] = await Promise.all([
            getHistoryCard(user.id),
            getByCard(user.id)
        ]);
        const formatDate = (date) => {
            return new Date(date).toLocaleDateString('en-CA');
        };
        try {
            const filtered = [...res, ...res1].filter(item => {
                const matchesStatus = status === "" ||
                    (item.status === "Mới" && status === "1") ||
                    (item.status === "Đã Dùng" && status === "2");

                const matchesText = toID === "" || item.code?.includes(toID);
                const matchesText1 = toSerial === "" || item.serial?.includes(toSerial);
                const itemDate = formatDate(item.createdAt);
                const matchesCardType = type === "" || item.name === type;
                const matchesFromDate = fromDate === "" || itemDate >= formatDate(fromDate);
                const matchesToDate = toDate === "" || itemDate <= formatDate(toDate);
                return matchesStatus && matchesText && matchesText1 && matchesCardType && matchesFromDate && matchesToDate;
            });
            setHistory(filtered);
        } catch (error) {
            console.error("Lỗi khi tìm kiếm:", error);
            alert("Đã xảy ra lỗi khi tìm kiếm.");
        }
    };

    const fetchHistory = async (e) => {
        e.preventDefault();
        try {
            const [res, res1] = await Promise.all([
                getHistoryCard(user.id),
                getByCard(user.id)
            ]);
            setHistory([...res, ...res1]);
        } catch (error) {
            console.error("Lỗi khi lấy lịch sử:", error);
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
                const [res, res1] = await Promise.all([
                    getHistoryCard(user.id),
                    getByCard(user.id)
                ]);
                setHistory([...res, ...res1]);
            } catch (error) {
                console.error("Lỗi khi lấy lịch sử:", error);
            }
        };

        if (user.id) {
            fetchHistory();
        }
    }, [user.id]);

    function formatDateTime(isoString) {
        const date = new Date(isoString);
        const pad = (n) => n.toString().padStart(2, '0');

        const time = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        const day = `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`;
        return `${time} ${day}`;
    }

    function formatDate(isoString) {
        const date = new Date(isoString);
        const pad = (n) => n.toString().padStart(2, '0');
        return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`;
    }

    const groupedHistory = history.reduce((groups, item) => {
        const day = formatDate(item.createdAt);
        if (!groups[day]) groups[day] = [];
        groups[day].push(item);
        return groups;
    }, {});


    return (
        <div>
            <h4 className="fw-bold mb-3 border-bottom pb-2 text-uppercase text-danger">
                Thẻ Cào Đã Mua
            </h4>

            <div className="row g-3 mb-3">
                <div className="col-md-3">
                    <label className="form-label">Mã Thẻ</label>
                    <input
                        type="text"
                        className="form-control"
                        value={toID}
                        placeholder='Mã thẻ...'
                        onChange={(e) => setToID(e.target.value)}
                    />
                </div>

                <div className="col-md-3">
                    <label className="form-label">Serial</label>
                    <input
                        type="text"
                        className="form-control"
                        value={toSerial}
                        placeholder='Serial...'
                        onChange={(e) => setToSerial(e.target.value)}
                    />
                </div>

                <div className="col-md-3">
                    <label className="form-label">Loại thẻ</label>
                    <select className="form-control"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">-- Vui lòng chọn loại thẻ --</option>
                        <option value="TDZI">TDZI</option>
                        <option value="DOCLAP">DOCLAP</option>
                        <option value="TUDO">TUDO</option>
                        <option value="HANHPHUC">HANHPHUC</option>
                        <option value="VIPGM">VIPGM</option>
                    </select>
                </div>

                <div className="col-md-3">
                    <label className="form-label">Trạng thái</label>
                    <select className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">-- Chọn trạng thái --</option>
                        <option value="1">Mới</option>
                        <option value="2">Đã Dùng</option>
                    </select>
                </div>


                <div className="col-md-2">
                    <label className="form-label">Từ ngày</label>
                    <input
                        type="date"
                        className="form-control"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>

                <div className="col-md-2">
                    <label className="form-label">Đến ngày</label>
                    <input
                        type="date"
                        className="form-control"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>

                <div className="col-md-12 d-flex gap-2 mt-2">
                    <button onClick={handleSearch} className="btn btn-info text-white">
                        Tìm kiếm
                    </button>
                    <button onClick={fetchHistory} className="btn btn-warning text-white">
                        Tất cả
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table" style={{ position: 'relative', minHeight: "100px" }}>
                    <thead className="table-light">
                        <tr>
                            <th colSpan={1} style={{ maxWidth: 200 }}>Thời gian</th>
                            <th>STT</th>
                            <th>Loại thẻ</th>
                            <th>Mã thẻ</th>
                            <th>Serial</th>
                            <th>Mệnh giá</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(Object.entries(groupedHistory).length !== 0) ? (<>
                            {Object.entries(groupedHistory).map(([day, items], index) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td
                                            style={{ textTransform: "uppercase", fontWeight: "700", fontSize: 17, minWidth: 170, maxWidth: 200 }}
                                            colSpan={1}
                                        >
                                            Ngày {day}
                                        </td>
                                    </tr>
                                    {items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td colSpan={1} style={{ maxWidth: 200 }}>{formatDateTime(item.createdAt)}</td>
                                            <td>{items.length - idx}</td>
                                            <td>{item.name}</td>
                                            <td>{item.code}</td>
                                            <td>{item.serial}</td>
                                            <td>{item.price}</td>
                                            <td style={{ background: item.status === "Mới" ? "green " : "red", color: "white" }}>{item.status}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </>
                        ) : (
                            <>
                                <tr style={{ textAlign: "center", width: "100%", position: "absolute", height: "20px" }} ><h5><b style={{ color: "red" }}>Không có data!</b></h5></tr>
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
