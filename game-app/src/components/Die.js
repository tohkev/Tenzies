import React from 'react';

export default function Dice(props) {
    return (
        <div className={`die ${props.isFrozen ? "freeze" : ""}`} onClick={() => { props.toggleFrozen(props.id) }}>
            <h2>{props.value}</h2>
        </div>
    )
}