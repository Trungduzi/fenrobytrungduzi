import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../src/app/userApi.js';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await login({ email, password });

            if (result.status === "success") {
                const userInfo = {
                    username: result.user.user,
                    email: result.user.email,
                    id: result.user.id,
                    firstName: result.user.firstName,
                    phoneNumber: result.user.phoneNumber,
                    dollar: result.user.dollar
                };
                localStorage.setItem("user", JSON.stringify(userInfo));
                window.location.href = "/"; // hoặc navigate("/")
            } else {
                alert(result.message || "Đăng nhập thất bại");
            }

        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="Login bg-gray-100 min-h-screen flex items-center justify-center" style={{ position: "relative", top: "12vw", }} >
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password:&nbsp;&nbsp;&nbsp;
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <p></p>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" style={{ backgroundColor: "blue" }}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy; Product developed by TRUNGDUZI.
                </p>
            </div>
        </div>
    );
}
