import React, { Component } from 'react';

import './App.css';
import { REQUEST_URL, User } from './App.dictionary';

import UserComponent from './components/user/User';
import SearchBarComponent from './components/search-bar/SearchBar';

const LOADING_TEMPLATE: JSX.Element = <h1>Loading...</h1>;
const LOADING_ERROR_TEMPLATE: JSX.Element = <h1>Cannot load data, please try again.</h1>;
const NO_SEARCH_RESULTS_TEMPLATE: JSX.Element = <h1>Ooops...</h1>;

interface State {
  users: User[],
  filteredUsers: User[],
  isLoadingFailed: boolean,
  searchInput: string
}

class App extends Component<{}, State> {
  state = {
    users: [],
    filteredUsers: [],
    isLoadingFailed: false,
    searchInput: ''
  };

  handleOnChange(input: string): void {
    const filteredUsers = this.state.users.filter((user: User) => user.name.first.includes(input));

    this.setState({ filteredUsers, searchInput: input });
  }

  getUsers(users: User[]): JSX.Element[] {
    return users.map(({ name, location, dob, id, picture }: User) =>
      <UserComponent
        key={id.value}
        name={name}
        city={location.city}
        age={dob.age}
        picture={picture.thumbnail} />);
  }

  componentDidMount(): void {
    fetch(REQUEST_URL)
      .then(res => res.json())
      .then(users => this.setState({ users: users.results }))
      .catch(() => this.setState({ isLoadingFailed: true }));
  }

  render() {
    let users: JSX.Element | JSX.Element[];
    if (this.state.searchInput && this.state.filteredUsers.length) {
      users = this.getUsers(this.state.filteredUsers);
    }
    else if (this.state.searchInput && !this.state.filteredUsers.length) {
      users = NO_SEARCH_RESULTS_TEMPLATE;
    }
    else {
      users = this.state.users.length ? this.getUsers(this.state.users) : LOADING_TEMPLATE;
    }

    return (
      <div className="App">
        {
          this.state.isLoadingFailed
            ? LOADING_ERROR_TEMPLATE
            : (
              <div>
                <SearchBarComponent handleOnChange={this.handleOnChange.bind(this)} />
                {users}
              </div>
            )
        }
      </div>
    );
  }
}

export default App;
