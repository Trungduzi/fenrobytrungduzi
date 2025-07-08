import { useState, useEffect } from "react"

export default function Shopping() {
    const [getData, setGetData] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await getUser();
                const elemnt = result.data;


            } catch (e) {
                console.log("Lỗi ở đây nè", e);
            }
        }
    }, [])
    return (
        <>
            <div className="container-block">
                <div className="container-title">
                    <h2 className="container title">Danh mục minigame</h2>
                </div>
                <div className="container-content row">

                </div>
            </div>
        </>
    )
}