import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Tamthoi() {
    useEffect(() => {
        // Nếu chưa ấn tắt hoặc thời gian tắt đã hết => hiện popup
        Swal.fire({
            title: "Cảnh báo",
            html: `
                        <p>💥 Mọi thắc mắc vui lòng liên hệ zalo <b>039.887.2286</b></p>
                    `,
            confirmButtonText: "Đồng ý",
            customClass: {
                popup: "my-popup"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/";
            }
        });
    }, []);

    return (
        <>
        </>
    )
}
