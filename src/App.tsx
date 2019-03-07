import React, { Component } from 'react';

import { REQUEST_URL, User } from './App.dictionary';
import UserComponent from './components/User/User';

interface State {
  users: User[]
}

class App extends Component<{}, State> {
  state = {
    users: []
  };

  componentDidMount() {
    fetch(REQUEST_URL)
      .then(res => res.json())
      .then(users => this.setState({ users: users.results }))
      .catch(err => console.log(err));
  }

  render() {
    const users = this.state.users
      .map(({ name, location, dob, id, picture }: User) =>
        <UserComponent
          key={id.value}
          name={name}
          city={location.city}
          age={dob.age}
          picture={picture.thumbnail} />);

    return (
      <React.Fragment>
        {users}
      </React.Fragment>
    );
  }
}

export default App;
