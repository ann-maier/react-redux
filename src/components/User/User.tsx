import User from './User.dictionary';

const user = ({name, age, city}: User) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>{age}</p>
            <p>{city}</p>
        </div>
    );
};

export default user;