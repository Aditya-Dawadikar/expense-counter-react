import React from 'react'
import './Display.css';

function Display(props) {
    return (
        <div className="container">
            <div className="title">Balance</div>
            <div className="center">{props.total}</div>
        </div>
    )
}
 
export default Display
