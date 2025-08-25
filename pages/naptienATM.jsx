export default function NapTienATM() {
    const qrInfo = {
        content: "VN MUANICK 17050405",
        bank: "VCB",
        accountNumber: "1039396558",
        accountName: "VŨ ĐĂNG TRUNG",
        branch: "BẮC NINH",
    };

    const fakeTransactionHistory = [];

    return (
        <div>
            <h4 className="fw-bold border-bottom pb-2 mb-3">NẠP VÍ / ATM</h4>
            <p>
                Để nạp tiền, bạn có thể quét mã QR để tự động hoàn tất giao dịch hoặc sao chép số tài khoản và tên ngân
                hàng dưới đây để chuyển tiền thủ công.
            </p>
            <p>
                Nhấp vào nút dưới đây để tải về và bắt đầu nạp tiền ngay lập tức
                <br />
                <a href="https://scontent.fhan14-1.fna.fbcdn.net/v/t1.15752-9/515097579_770121809006224_1974862240779017766_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_ohc=zLHBU4VWxbkQ7kNvwFvT0B6&_nc_oc=AdnQLH-NZcm62qN-i2G9pyJmR7IRtge6lBrZa4fS28Co4ALvCseJMeYa_aUnwIeX6fpu8rbcpCZ4eSu3OdX2p4AW&_nc_zt=23&_nc_ht=scontent.fhan14-1.fna&oh=03_Q7cD3AEqQrBJoL2PuzSHXSRzcoKpSQ2Ttda3LAgjjvRtPqchiw&oe=68CD0617&dl=1" className="btn btn-sm btn-outline-primary mt-2">
                    ⬇️ Tải mã QR
                </a>
            </p>

            <div className="row align-items-start my-4">
                <div className="col-md-4 text-center">
                    <img
                        src="/qr-vcb.jpg"
                        alt="QR Code"
                        className="img-fluid"
                        style={{ maxWidth: "240px", border: "1px solid #ccc", borderRadius: "8px" }}
                    />
                    <p className="mt-2 mb-0 fw-semibold">VCB-QR</p>
                </div>
                <div className="col-md-6 offset-md-1">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th colSpan="2" className="text-center bg-light">Thông tin nạp tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Nội dung chuyển khoản</th>
                                <td>{qrInfo.content}</td>
                            </tr>
                            <tr>
                                <th>Tên ngân hàng</th>
                                <td>{qrInfo.bank}</td>
                            </tr>
                            <tr>
                                <th>Số tài khoản</th>
                                <td>{qrInfo.accountNumber}</td>
                            </tr>
                            <tr>
                                <th>Tên tài khoản</th>
                                <td>{qrInfo.accountName}</td>
                            </tr>
                            <tr>
                                <th>Chi nhánh</th>
                                <td>{qrInfo.branch}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="alert alert-warning small">
                <strong>Lưu ý:</strong> Vui lòng chuyển <span className="text-danger fw-bold">ĐÚNG nội dung</span> để
                được cộng tiền vào tài khoản.
                <br />
                (Trong trường hợp ghi nhầm ID của người khác, Shop sẽ không chịu trách nhiệm!)
                <ul>
                    <li>Hệ thống sẽ tự động cộng số dư sau khi chuyển khoản 1-5 phút nếu bạn ghi đúng nội dung.</li>
                    <li>
                        Bạn có thể thao tác chuyển khoản bằng cách mở ứng dụng ngân hàng và chọn{" "}
                        <strong className="text-danger">quét mã QR</strong> để tự động điền thông tin chuyển khoản.
                    </li>
                    <li>
                        Trong trường hợp sau 5 phút không được xử lý, vui lòng{" "}
                        <a href="#" className="text-danger text-decoration-underline">
                            liên hệ CSKH
                        </a>{" "}
                        để được hỗ trợ.
                    </li>
                </ul>
            </div>
        </div>
    );
}
