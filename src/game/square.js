import React from 'react';
import './game.css';
const Square = ({ value, onClick }) => {
    return (
        <button className="square"
            onClick={onClick}>
            {value}
        </button>
    );
};
export default Square;
