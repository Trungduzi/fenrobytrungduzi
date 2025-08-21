import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Tamthoi() {
    useEffect(() => {
        // Nếu chưa ấn tắt hoặc thời gian tắt đã hết => hiện popup
        Swal.fire({
            title: "Admin chưa cứu được",
            html: `
                        <b>Hãy lập nick mới</b>
                        <b>Thông báo admin qua zalo 0398872286 nếu tài khoản quá nhiều tiền</b>`,
            confirmButtonText: "Đồng ý",
            customClass: {
                popup: "my-popup",
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/signin";
            }
        });
    }, []);

    return (
        <>
        </>
    )
}
