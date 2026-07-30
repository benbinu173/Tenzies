import React from 'react'

const PIP_LAYOUTS = {
    1: ["mm"],
    2: ["tl", "br"],
    3: ["tl", "mm", "br"],
    4: ["tl", "tr", "bl", "br"],
    5: ["tl", "tr", "mm", "bl", "br"],
    6: ["tl", "ml", "bl", "tr", "mr", "br"],
}

export default function Die(props) {
    return (
        <button
            className={`die-face ${props.isHeld ? "die-face--held" : ""}`}
            onClick={() => props.hold(props.id)}
            aria-pressed={props.isHeld}
            aria-label={`Die showing ${props.value}, ${props.isHeld ? "held" : "not held"}`}
        >
            <span className="die-pips">
                {PIP_LAYOUTS[props.value].map((pos, i) => (
                    <span key={i} className={`pip pip--${pos}`} />
                ))}
            </span>
        </button>
    )
}