import React, { useMemo, useRef, useState } from "react";

export default function LuckyWheel({
    items = [
        { label: "10tr vàng", color: "#F97316", weight: 1 },
        { label: "100tr vàng", color: "#22C55E", weight: 1 },
        { label: "1 tỷ vàng", color: "#3B82F6", weight: 1 },
        { label: "10 tỷ vàng", color: "#EAB308", weight: 1 },
        { label: "100 tỷ", color: "#A855F7", weight: 1 },
        { label: "1000 tỷ", color: "#EF4444", weight: 1 },
        { label: "20 tỷ vàng", color: "#06B6D4", weight: 1 },
        { label: "50 tỷ vàng", color: "#10B981", weight: 1 },
    ],
    size = 500,
    spinDuration = 5000,
    onFinish,
    disabled = false,
}) {
    const [spinning, setSpinning] = useState(false);
    const [resultIndex, setResultIndex] = useState(null);
    const [history, setHistory] = useState([]);
    const wheelRef = useRef(null);
    const currentRotationRef = useRef(100);

    const totalWeight = useMemo(
        () => items.reduce((acc, it) => acc + (it.weight ?? 1), 0),
        [items]
    );

    const angles = useMemo(() => {
        const n = items.length;
        const slice = 360 / n;
        return items.map((_, i) => ({ start: i * slice, end: (i + 1) * slice }));
    }, [items]);

    const pickWeightedIndex = () => {
        const r = Math.random() * totalWeight;
        let acc = 0;
        for (let i = 0; i < items.length; i++) {
            acc += items[i].weight ?? 1;
            if (r <= acc) return i;
        }
        return items.length - 1;
    };

    const spin = () => {
        if (spinning || items.length === 0 || disabled) return;

        setSpinning(true);
        setResultIndex(null);

        const selectedIndex = pickWeightedIndex();

        const n = items.length;
        const slice = 360 / n;
        const sliceStart = selectedIndex * slice;
        const sliceCenter = sliceStart + slice / 2;
        const current = ((currentRotationRef.current % 360) + 360) % 360;
        const targetBase = 360 - sliceCenter;
        const extraTurns = 1000 + Math.floor(Math.random() * 3);
        let target = targetBase + extraTurns * 360;
        target += Math.ceil((current - target) / 360) * 360;
        const wheel = wheelRef.current;
        if (!wheel) return;
        wheel.style.transition = `transform ${spinDuration}ms cubic-bezier(0.12, 0.65, 0.04, 20)`;
        wheel.style.transform = `rotate(${target}deg)`;
        const cleanup = () => {
            wheel.style.transition = "";
            currentRotationRef.current = target;
            setSpinning(false);
            setResultIndex(selectedIndex);
            setHistory((h) => [{ index: selectedIndex, ts: Date.now() }, ...h].slice(0, 10));
            onFinish?.({ index: selectedIndex, item: items[selectedIndex] });
            wheel.removeEventListener("transitionend", cleanup);
        };
        wheel.addEventListener("transitionend", cleanup);
    };

    const r = size / 2;
    const cx = r;
    const cy = r;

    const makeSlicePath = (startDeg, endDeg) => {
        const rad = (a) => (a * Math.PI) / 180;
        const x1 = cx + r * Math.sin(rad(startDeg));
        const y1 = cy - r * Math.cos(rad(startDeg));
        const x2 = cx + r * Math.sin(rad(endDeg));
        const y2 = cy - r * Math.cos(rad(endDeg));
        const largeArc = endDeg - startDeg <= 180 ? 0 : 5;
        return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    };

    return (
        <div className="w-full flex flex-col items-center gap-6" style={{ width: "100vw", textAlign: "center" }}>
            <div className="relative" style={{ width: "100%", height: size, borderRadius: "50%", textAlign: "center" }}>
                <svg
                    ref={wheelRef}
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    className="rounded-full shadow-2xl bg-white"
                    style={{ transform: `rotate(${currentRotationRef.current}degn)`, borderRadius: "50%", textAlign: "center" }}
                >
                    {angles.map((a, i) => (
                        <g key={i}>
                            <path d={makeSlicePath(a.start, a.end)} fill={items[i].color || "#ddd"} />
                            <text
                                x={cx}
                                y={cy - r * 0.65}
                                fontSize={Math.max(12, Math.floor(size * 0.05))}
                                fontWeight="700"
                                textAnchor="middle"
                                fill="#111827"
                                transform={`rotate(${a.start + (a.end - a.start) / 2} ${cx} ${cy})`}
                                style={{ userSelect: "none" }}
                            >
                                {items[i].label}
                            </text>
                        </g>
                    ))}

                    <circle cx={cx} cy={cy} r={Math.max(24, r * 0.12)} fill="#fff" stroke="#e5e7eb" strokeWidth="2" />
                    <circle cx={cx} cy={cy} r={Math.max(8, r * 0.04)} fill="#111827" />
                </svg>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={spin}
                    disabled={spinning || disabled}
                    className="px-5 py-2 rounded-2xl shadow bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ marginTop: 20 }}
                >
                    {spinning ? "Đang quay..." : "Quay"}
                </button>
                {resultIndex !== null && (
                    <div className="text-sm text-gray-700" style={{ marginTop: 10 }}>
                        Kết quả: <span className="font-semibold">Bạn trúng {items[resultIndex].label}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
