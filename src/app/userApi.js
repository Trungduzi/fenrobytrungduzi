export const getUser = async () => {
    try {
        const res = await fetch('https://nrorealbytrungduzi-production.up.railway.app/api/get-user');
        return await res.json();
    } catch (e) {
        console.error("Lỗi getUser:", e);
        return { error: "Không thể lấy dữ liệu người dùng" };
    }
};

export const createUser = async (userData) => {
    try {
        const res = await fetch('https://nrorealbytrungduzi-production.up.railway.app/api/create-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const data = await res.json();

        if (!res.ok) {

            throw new Error(data.error || 'Đã xảy ra lỗi không xác định');
        }

        return data;
    } catch (error) {
        console.error('Lỗi createUser:', error.message);
        return { error: error.message }; // 👈 Trả về cho frontend dễ xử lý
    }
};

export const login = async (userData) => {
    try {
        const res = await fetch('https://nrorealbytrungduzi-production.up.railway.app/api/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("❌ Lỗi từ backend:", data);
            throw new Error(data.message || "Login failed");
        }

        return data;

    } catch (error) {
        console.error("🔥 Lỗi khi login:", error.message);
        throw error;
    }
};

export const createCard = async (infCard) => {
    try {
        const res = await fetch("https://nrorealbytrungduzi-production.up.railway.app/api/admin/create-card", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(infCard),
        });
        const data = await res.json();
        alert(data.message);
        return data;
    } catch (e) {
        console.log("Lỗi fetch rồi", e);
        return { status: false, message: "Không thể kết nối tới server." };
    }
}

export const napCard = async (infCard, infUser) => {
    try {
        const res = await fetch("https://nrorealbytrungduzi-production.up.railway.app/api/nap-card", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...infCard, ...infUser }),
        });
        const data = await res.json();
        alert(data.message);
        if (!res.ok) {
            console.log("Lỗi từ backend:", data);
            return
        }
        return data;
    } catch (e) {
        console.log("Lỗi fetch rồi", e);
        return { status: false, message: "Không thể kết nối tới server111." };
    }
}

export const getHistory = async (userId) => {
    const res = await fetch("https://nrorealbytrungduzi-production.up.railway.app/api/get-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
    })
    const data = await res.json();
    return data;
}

export const getHistoryCard = async (userId) => {
    try {
        // console.log("Received userId:", userId);
        const res = await fetch(`https://nrorealbytrungduzi-production.up.railway.app/api/get-historycard?id=${userId}`);

        if (!res.ok) {
            const html = await res.text();
            console.error("Phản hồi HTML:", html);
            throw new Error(`API lỗi: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (e) {
        console.error("Lỗi getCard:", e.message);
        return { error: "Không thể lấy data" };
    }
};
