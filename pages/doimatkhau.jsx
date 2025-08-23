import { useState, useEffect } from "react";
import { resetPassword } from "../src/app/userApi";

export default function DoiMatKhau() {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [user, setUser] = useState("");
    const [hideSpan, setHideSpan] = useState(true);
    const [error, setError] = useState({
        old: "",
        new: "",
        confirm: "",
    })

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasError = false;
        const newError = { ...error };
        const cutPassword = password.replace(/\s+/g, "");
        const cutNewPassword = newPassword.replace(/\s+/g, "");
        const cutConfirmPassword = confirmPassword.replace(/\s+/g, "");
        if (password.trim() === newPassword.trim()) {
            newError.new = "Trùng mật khẩu cũ!";
            setHideSpan(false);
            hasError = true;
        }
        else {
            newError.new = "";
        }
        if (cutNewPassword.length !== newPassword.length || cutConfirmPassword.length !== confirmPassword.length) {
            newError.new = "Mật khẩu không được chứa dấu cách";
            newError.confirm = "Mật khẩu không được chứa dấu cách";
            setHideSpan(false);
            hasError = true;
        }
        else {
            newError.new = "";
            newError.confirm = "";
        }
        setError(newError);
        if (!hasError) {
            setHideSpan(true);
            const res = await resetPassword({
                id: user.id,
                password,
                newPassword,
                confirmPassword
            });
            console.log(res.status);
            if (res.status === false) {
                newError.old = "Mật khẩu sai";
                setHideSpan(false);
                hasError = true;
                if (!hasError) {
                    setHideSpan(true);
                    return;
                }
            }
            else {
                newError.old = "";
            }

        }
    }

    return (
        <>
            <div>
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
                                <div style={{ display: hideSpan ? "none" : "block", color: "red" }}>{error.old}</div>
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
                                <div style={{ display: hideSpan ? "none" : "block", color: "red" }}>{error.new}</div>
                            </div>
                            <div className="col-md-12 m-3">
                                <label
                                    htmlFor="password"
                                    className="col-md-3 text-end pe-3"
                                >
                                    Confỉrm pass:
                                </label>
                                <input
                                    type="password"
                                    className="col-md-6 ps-2 pt-1 pb-1"
                                    id="password"
                                    placeholder="Xác nhận mật khẩu"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <div style={{ display: hideSpan ? "none" : "block", color: "red" }}>{error.confirm}</div>
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
            </div>
        </>
    )
}