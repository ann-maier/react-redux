import React from 'react';
import './Columns.css';

import { COLUMNS_TYPES, User } from '../../App.dictionary';

import UserComponent from '../user/User';

const NO_SEARCH_RESULTS_TEMPLATE: JSX.Element = <h1>Ooops...</h1>;

const getRenderUsers = (users: User[], moveLeft: Function, moveRight: Function): JSX.Element[] => {
    return users.map(({ name, location, dob, id, picture, status }: User) =>
        <UserComponent
            key={id.value}
            id={id.value}
            name={name}
            city={location.city}
            age={dob.age}
            picture={picture.thumbnail}
            status={status}
            moveLeft={moveLeft}
            moveRight={moveRight} />);
};

const getColumnFilteredUsers: Function = (users: User[], index: number): User[] => users.filter((user: User) => user.status === index);

const getRenderColumns = (users: User[], moveLeft: Function, moveRight: Function): JSX.Element[] => {
    return COLUMNS_TYPES.map((column: string, index: number) => {
        const columnfilteredUsers: User[] = getColumnFilteredUsers(users, index);
        
        return (
            <div key={column}>
                <p>{column}</p>
                {getRenderUsers(columnfilteredUsers, moveLeft, moveRight)}
            </div>
        );
    });
};

const Columns = ({ users, searchNameInput, searchCityInput, moveLeft, moveRight } 
    : { users: User[], searchNameInput: string, searchCityInput: string, moveLeft: Function, moveRight: Function }) => {
    
    const searchInput: string = searchNameInput || searchCityInput;
    const filteredUsers: User[] = users.filter((user: User) =>
        user.name.first.includes(searchNameInput) && user.location.city.includes(searchCityInput));

    const getRenderData = (searchInput: string, filteredUsers: User[], users: User[]): JSX.Element | JSX.Element[] => {
        return searchInput
            ? (filteredUsers.length ? getRenderColumns(filteredUsers, moveLeft, moveRight) : NO_SEARCH_RESULTS_TEMPLATE)
            : getRenderColumns(users, moveLeft, moveRight);
    }

    return (
        <div className="columns">
            {getRenderData(searchInput, filteredUsers, users)}
        </div>
    );
};

export default React.memo(Columns);