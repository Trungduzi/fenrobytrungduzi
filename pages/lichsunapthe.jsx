import { useState, useEffect } from "react";
import { getHistoryCard } from "../src/app/userApi";

export default function LichSuNapThe() {
    const [searchText, setSearchText] = useState("");
    const [cardType, setCardType] = useState("");
    const [status, setStatus] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [user, setUser] = useState({});
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            // console.log("User từ localStorage:", parsedUser);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await getHistoryCard(user.id);
            setHistory(res);
        } catch (error) {
            console.error("Lỗi khi tìm kiếm:", error);
            alert("Đã xảy ra lỗi khi tìm kiếm.");
        }
    };

    const handleSearchToday = async (e) => {
        e.preventDefault();
        try {
            const res = await getHistoryCard(user.id); // res là mảng trực tiếp
            const DateToday = new Date().toLocaleDateString('en-CA'); // "yyyy-mm-dd"
            const todayHistory = res.filter(item => {
                const itemDate = new Date(item.createdAt).toLocaleDateString('en-CA');
                return itemDate === DateToday;
            });

            setHistory(todayHistory);
        } catch (error) {
            console.error("Lỗi khi tìm kiếm:", error);
            alert("Đã xảy ra lỗi khi tìm kiếm.");
        }
    };

    const handleSearchYesterday = async (e) => {
        e.preventDefault();
        try {
            const res = await getHistoryCard(user.id);
            const today = new Date();
            today.setDate(today.getDate() - 1);
            const dateCompare = today.toLocaleDateString('en-CA');
            const todayHistory = res.filter(item =>
                new Date(item.createdAt).toLocaleDateString('en-CA') === dateCompare
            );
            setHistory(todayHistory);
        }
        catch (error) {
            console.error("Lỗi khi tìm kiếm:", error);
            alert("Đã xảy ra lỗi khi tìm kiếm.");
        }
    };

    const handleSearchMonth = async (e) => {
        e.preventDefault();
        try {
            const res = await getHistoryCard(user.id);
            const today = new Date();
            today.setDate(today.getDate() - 2);
            const dateCompare = today.toLocaleDateString('en-CA');
            const todayHistory = history.filter(item =>
                new Date(item.createdAt).toLocaleDateString('en-CA') === dateCompare
            );
            setHistory(todayHistory);
        }
        catch (error) {
            console.error("Lỗi khi tìm kiếm:", error);
            alert("Đã xảy ra lỗi khi tìm kiếm.");
        }
    };

    const finding = async (e) => {
        e.preventDefault();
        console.log("Đang tìm kiếm...");
        alert("Đang tìm kiếm...");
    }

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

    function formatDateTime(isoString) {
        const date = new Date(isoString);
        const pad = (n) => n.toString().padStart(2, '0');

        const time = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        const day = `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`;
        return `${time} ${day}`;
    }

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
                <button onClick={finding} className="btn btn-info">Tìm kiếm</button>
                <button onClick={handleSearchToday} className="btn btn-danger">Hôm nay</button>
                <button onClick={handleSearchYesterday} className="btn btn-danger">Hôm qua</button>
                <button onClick={handleSearchMonth} className="btn btn-danger">Tháng này</button>
                <button onClick={handleSearch} className="btn btn-info">Tất cả</button>
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Thời gian</th>
                        <th>Nhà mạng</th>
                        <th>Mã thẻ</th>
                        <th>Serial</th>
                        <th>Mệnh giá</th>
                        <th>Kết quả</th>
                        <th>Thực nhận</th>
                    </tr>
                </thead>
                {/* <tr>
                        <td colSpan="7" className="fw-bold text-start text-dark">
                            Ngày 25/06/2025
                        </td>
                    </tr> */}
                <tbody>
                    {history.map((item, index, array) => (
                        item.createdAt && item.code && item.name ? (
                            <tr key={index}>
                                <td>{array.length - index}</td>
                                <td>{formatDateTime(item.createdAt)}</td>
                                <td>{item.name}</td>
                                <td>{item.code}</td>
                                <td>{item.serial}</td>
                                <td>{item.price}</td>
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
    );
}
