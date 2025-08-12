import { useEffect } from "react";
import Swal from "sweetalert2";

export default function HomePage() {
    useEffect(() => {
        const hiddenUntil = localStorage.getItem("popup_hidden_until");
        const now = Date.now();

        // Nếu chưa ấn tắt hoặc thời gian tắt đã hết => hiện popup
        if (!hiddenUntil || now > parseInt(hiddenUntil)) {
            Swal.fire({
                title: "Cảnh báo",
                icon: "warning",
                html: `
          <p>💥 Admin đang trong quá trình xây dựng trang web</p>
          <p>💥 Hiện tại web chỉ mang chức năng trải nghiệm</p>
          <p>💥 Vui lòng không thực hiện bất cứ giao dịch nào để bảo vệ tài sản của bạn</p>
          <p>💥 Cảm ơn vì trải nghiệm của bạn</p>
          <p>💥 Mọi thắc mắc vui lòng liên hệ zalo<b>039.887.2286</b></p>
        `,
                icon: "info",
                confirmButtonText: "Tắt trong 10 phút",
                cancelButtonText: "Cancel",
                showCancelButton: true,
                customClass: {
                    popup: "my-popup"
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Lưu thời gian tắt (hiện tại + 1 tiếng)
                    const oneHourLater = now + 10 * 60 * 1000;
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
