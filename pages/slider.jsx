import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './slider.scss';
import { useState, useEffect } from 'react';
import { getUser } from '../src/app/userApi';

export default function Slide() {
    const images = [
        "/slider.png",
        "/slider.png",
        "/slider.png",
    ];

    const [topUser, setTopUser] = useState([]);

    useEffect(() => {
        const fetchTopUser = async () => {
            try {
                const result = await getUser();
                if (Array.isArray(result)) {
                    const userTop = result
                        .sort((a, b) => b.dollar - a.dollar)
                        .slice(0, 5)
                        .map(user => ({
                            firstName: user.firstName,
                            dollar: user.dollar,
                        }));
                    setTopUser(userTop);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu user:", error);
            }
        };
        fetchTopUser();
    }, []);

    return (
        <div className="container-main">
            <div className="container-blox">
                <div className="container-content">
                    <div className="content-title">
                        <div className="top-card">Top nạp thẻ tháng 7</div>
                        <div className="nap-card">Nạp thẻ</div>
                    </div>
                    <div className="content-displayuser">
                        <table className="user-table">
                            <tbody>
                                {topUser.map((user, index) => (
                                    <tr className="total-user" key={index}>
                                        <td className="user-select-1">{index + 1}</td>
                                        <td className="user-select-2">{user.firstName}</td>
                                        <td className="user-select-3 dollar-vjp">
                                            {Number(user.dollar).toLocaleString("vi-VN")}đ
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="slider-container">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 2000, disableOnInteraction: false }}
                        loop={true}
                        speed={1700}
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img src={img} alt={`slide-${index}`} className="slider-image" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
