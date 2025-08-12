import { useEffect } from "react";
import Swal from "sweetalert2";

export default function HomePage() {
    useEffect(() => {
        const hiddenUntil = localStorage.getItem("popup_hidden_until");
        const now = Date.now();

        // Nếu chưa ấn tắt hoặc thời gian tắt đã hết => hiện popup
        if (!hiddenUntil || now > parseInt(hiddenUntil)) {
            Swal.fire({
                title: "Thông báo",
                html: `
          <p>💥 Mua vàng ngọc - nhập acc giá cao zalo <b>0339.38.2222</b></p>
          <p>💥 Mỗi ngày update 40 acc mới !!!! - hệ thống auto 100%</p>
        `,
                icon: "info",
                confirmButtonText: "Tắt trong 1h",
                cancelButtonText: "Cancel",
                showCancelButton: true,
                customClass: {
                    popup: "my-popup"
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Lưu thời gian tắt (hiện tại + 1 tiếng)
                    const oneHourLater = now + 60 * 60 * 1000;
                    localStorage.setItem("popup_hidden_until", oneHourLater.toString());
                }
            });
        }
    }, []);

    return (
        <>
        </>
    )
}
