import React, { Component } from 'react';

import './App.css';
import { REQUEST_URL, SEARCH_NAME_TEMPLATE, SEARCH_CITY_TEMPLATE, User } from './App.dictionary';

import UserComponent from './components/user/User';
import SearchBarComponent from './components/search-bar/SearchBar';

const LOADING_TEMPLATE: JSX.Element = <h1>Loading...</h1>;
const LOADING_ERROR_TEMPLATE: JSX.Element = <h1>Cannot load data, please try again.</h1>;
const NO_SEARCH_RESULTS_TEMPLATE: JSX.Element = <h1>Ooops...</h1>;

interface State {
  users: User[],
  filteredUsers: User[],
  isLoadingFailed: boolean,
  searchNameInput: string,
  searchCityInput: string
}

class App extends Component<{}, State> {
  state = {
    users: [],
    filteredUsers: [],
    isLoadingFailed: false,
    searchNameInput: '',
    searchCityInput: ''
  };

  handleOnChange(input: string, searchType: string): void {
    const filteredUsers = this.state.users.filter((user: User) => searchType === SEARCH_NAME_TEMPLATE
      ? user.name.first.includes(input)
      : user.location.city.includes(input));

    this.setState({
      filteredUsers,
      searchNameInput: searchType === SEARCH_NAME_TEMPLATE ? input : '',
      searchCityInput: searchType === SEARCH_CITY_TEMPLATE ? input : ''
    });
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
    const searchInput: string = this.state.searchNameInput || this.state.searchCityInput;
    let users: JSX.Element | JSX.Element[];

    if (searchInput && this.state.filteredUsers.length) {
      users = this.getUsers(this.state.filteredUsers);
    }
    else if (searchInput && !this.state.filteredUsers.length) {
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
              <React.Fragment>
                <div className="input-wrapper">
                  <SearchBarComponent
                    searchType={SEARCH_NAME_TEMPLATE}
                    searchInput={this.state.searchNameInput}
                    handleOnChange={this.handleOnChange.bind(this)} />
                  <SearchBarComponent
                    searchType={SEARCH_CITY_TEMPLATE}
                    searchInput={this.state.searchCityInput}
                    handleOnChange={this.handleOnChange.bind(this)} />
                </div>
                {users}
              </React.Fragment>
            )
        }
      </div>
    );
  }
}

export default App;
