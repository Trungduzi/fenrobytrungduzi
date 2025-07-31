import { useState, useEffect } from "react";
import { resetPassword } from "../src/app/userApi";

export default function DoiMatKhau() {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [user, setUser] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user.id);
        const res = await resetPassword(user.id);
        const data = res.json();
        console.log(data);
    }

    return (
        <>
            <h4 className="fw-bold mb-4 border-bottom pb-2 text-uppercase text-danger">
                Đổi mật khẩu
            </h4>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 m-3">
                            <label
                                htmlFor="password"
                                className="col-md-3 text-end pe-3"
                            >
                                Mật khẩu cũ:
                            </label>
                            <input
                                type="password"
                                className="col-md-6 ps-2 pt-1 pb-1"
                                id="password"
                                placeholder="Mật khẩu cũ"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="col-md-12 m-3">
                            <label
                                htmlFor="password"
                                className="col-md-3 text-end pe-3"
                            >
                                Mật khẩu mới:
                            </label>
                            <input
                                type="password"
                                className="col-md-6 ps-2 pt-1 pb-1"
                                id="password"
                                placeholder="Mật khẩu mới"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="col-md-12 m-3">
                            <label
                                htmlFor="password"
                                className="col-md-3 text-end pe-3"
                            >
                                Xác nhận mật khẩu:
                            </label>
                            <input
                                type="password"
                                className="col-md-6 ps-2 pt-1 pb-1"
                                id="password"
                                placeholder="Xác nhận mật khẩu"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="col-6 offset-3 p-1">
                            <button
                                type="submit"
                                className="w-100 m-3 pt-1 pb-1 text-white bg-primary"
                            >
                                Đổi Mật Khẩu
                            </button>
                        </div>
                    </div>
                </div >
            </form>
        </>
    )
}