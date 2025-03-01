'use client'

import { useState } from "react"
import { useDebouncedCallback } from "use-debounce";
import { FixedSizeList as List } from "react-window";

type ComplexListItemProps = {
    index: number,
    style: React.CSSProperties,
}

function ComplexListItem({ index, style }: ComplexListItemProps) {
    return (
        <div style={style}>
            {index} Lorem text
        </div>
    );
}

export default function Page() {
    const [amount, setAmount] = useState(50);
    const itemStyles = { color: "red", border: "1px solid green", display: "flex", "align-items": "center" };

    const handleAmount = useDebouncedCallback((e) => {
        setAmount(Number(e.target.value))
    }, 1000);

    return (
        <section>
            <label className="block">Generate, move range</label>
            <input className="block mb-4"
                type="range" min="1" max="300"
                onChange={(e) => handleAmount(e)} />

            <List height={800}
                width={400}
                itemCount={amount}
                itemSize={35}
            >
                {({ index, style }: ComplexListItemProps) => (
                    <ComplexListItem index={index} style={{
                        ...style, ...itemStyles
                    }} />
                )}
            </List>
        </section>
    )
}