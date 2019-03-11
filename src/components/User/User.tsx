import React from 'react';

import './User.css';

import { Name } from '../../App.dictionary';

const User = ({ name, city, age, picture }: { name: Name, city: string, age: number, picture: string }) => {
    return (
        <div className="user-profile">
            <img src={picture} />
            <div className="user-profile-information">
                <h2>{name.title} {name.first} {name.last}</h2>
                <p>age: {age}</p>
                <p>city: {city}</p>
            </div>
        </div>
    );
};

export default User;