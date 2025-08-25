import { useState, useEffect } from "react";
import { resetPassword } from "../src/app/userApi";
import { Eye, EyeOff } from "lucide-react";

export default function DoiMatKhau() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
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

        if (cutPassword === cutNewPassword) {
            newError.new = "Trùng mật khẩu cũ!";
            hasError = true;
        } else { newError.new = "" }

        if (newPassword !== confirmPassword) {
            newError.confirm = "Mật khẩu không khớp";
            hasError = true;
        } else { newError.confirm = "" }

        if (cutNewPassword.length !== newPassword.length || cutConfirmPassword.length !== confirmPassword.length) {
            if (cutNewPassword.length !== newPassword.length) {
                newError.new = "Mật khẩu không được chứa dấu cách"
            }
            if (cutConfirmPassword.length !== confirmPassword.length) {
                newError.confirm = "Mật khẩu không được chứa dấu cách"
            }
        }

        setError(newError);
        if (hasError) {
            setHideSpan(false);
            return;
        }
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

    return (
        <>
            <div>
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
                                type={showPassword ? "text" : "password"}
                                className="col-md-6 ps-2 pt-1 pb-1"
                                id="password"
                                placeholder="Mật khẩu cũ"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ position: "relative" }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="ms-2 mt-1 mb-1"
                                style={{ background: "white", border: "none", position: "absolute", transform: "translateX(-32px)", fontWeight: 10 }}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
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
                                type={showPassword1 ? "text" : "password"}
                                className="col-md-6 ps-2 pt-1 pb-1"
                                id="password"
                                placeholder="Mật khẩu mới"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword1(!showPassword1)}
                                className="ms-2 mt-1 mb-1"
                                style={{ background: "white", border: "none", position: "absolute", transform: "translateX(-32px)", fontWeight: 10 }}
                            >
                                {showPassword1 ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
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
                                type={showPassword2 ? "text" : "password"}
                                className="col-md-6 ps-2 pt-1 pb-1"
                                id="password"
                                placeholder="Xác nhận mật khẩu"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword2(!showPassword2)}
                                className="ms-2 mt-1 mb-1"
                                style={{ background: "white", border: "none", position: "absolute", transform: "translateX(-32px)", fontWeight: 10 }}
                            >
                                {showPassword2 ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            <div style={{ display: hideSpan ? "none" : "block", color: "red" }}>{error.confirm}</div>
                        </div>
                        <div className="col-6 offset-3 p-1">
                            <button
                                onClick={handleSubmit}
                                className="w-100 m-3 pt-1 pb-1 text-white bg-primary"
                            >
                                Đổi Mật Khẩu
                            </button>
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}