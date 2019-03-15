import React from 'react';

import './User.css';

import { COLUMNS_TYPES, Name } from '../../App.dictionary';

const User = ({ id, name, city, age, picture, status, moveLeft, moveRight }
    : { id: string, name: Name, city: string, age: number, picture: string, status: number, moveLeft: Function, moveRight: Function }) => {
    return (
        <div>
            <div className="user-profile">
                <img src={picture} />
                <div className="user-profile-information">
                    <h2>{name.title} {name.first} {name.last}</h2>
                    <p>age: {age}</p>
                    <p>city: {city}</p>
                </div>
            </div>
            <div className="user-profile-status">
                { status === 0 || <button onClick={() => moveLeft(id, status)}>LEFT</button> }
                { status === COLUMNS_TYPES.length - 1 || <button onClick={() => moveRight(id, status)}>RIGHT</button> }
            </div>
        </div>
    );
};

export default React.memo(User);