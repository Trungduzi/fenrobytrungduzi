import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUser } from '../src/app/userApi.js';
import '@/index.css';

export default function Signin() {
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        replayPassword: '',
        firstName: '',
        phoneNumber: '',
        user: ''
    });

    const searchParams = new URLSearchParams(location.search);
    const returnUrl = searchParams.get('return_url') || '/';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra password nhập lại
        if (formData.password !== formData.replayPassword) {
            alert("Mật khẩu không khớp!");
            return;
        }

        const res = await createUser(formData);

        if (res && !res.error) {
            alert("Tạo user thành công!");
            setFormData({
                email: '',
                password: '',
                replayPassword: '',
                firstName: '',
                phoneNumber: '',
                user: ''
            });
        } else {
            alert(res.error || "Có lỗi xảy ra");
        }
        if (res && !res.error) {
            navigate(returnUrl);
        }
    };

    return (
        <div className="Signin">
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="form-row">

                            <div className="form-group col-md-6">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    className="form-control"
                                    placeholder="First name"
                                    autoComplete="given-name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    autoComplete="new-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="replayPassword">Replay Password</label>
                                <input
                                    id="replayPassword"
                                    name="replayPassword"
                                    type="password"
                                    className="form-control"
                                    placeholder="Replay Password"
                                    autoComplete="new-password"
                                    value={formData.replayPassword}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="user">User</label>
                                <input
                                    id="user"
                                    name="user"
                                    type="text"
                                    className="form-control"
                                    placeholder="User"
                                    autoComplete="username"
                                    value={formData.user}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    className="form-control"
                                    placeholder="Phone Number"
                                    autoComplete="tel"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <button type="submit" className="btn btn-primary mt-3">
                            Sign in
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
