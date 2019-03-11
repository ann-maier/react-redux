import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import { REQUEST_URL, SEARCH_NAME_TEMPLATE, SEARCH_CITY_TEMPLATE, User } from './App.dictionary';

import UserComponent from './components/user/User';
import SearchBarComponent from './components/search-bar/SearchBar';

const LOADING_TEMPLATE: JSX.Element = <h1>Loading...</h1>;
const LOADING_ERROR_TEMPLATE: JSX.Element = <h1>Cannot load data, please try again.</h1>;
const NO_SEARCH_RESULTS_TEMPLATE: JSX.Element = <h1>Ooops...</h1>;

interface State {
  users: User[],
  isLoadingFailed: boolean,
  searchNameInput: string,
  searchCityInput: string
}

class App extends Component<{}, State> {
  state = {
    users: [],
    isLoadingFailed: false,
    searchNameInput: '',
    searchCityInput: ''
  };

  handleOnChange = (input: string, searchType: string): void => {
    this.setState({
      searchNameInput: searchType === SEARCH_NAME_TEMPLATE ? input.toLowerCase() : this.state.searchNameInput,
      searchCityInput: searchType === SEARCH_CITY_TEMPLATE ? input.toLowerCase() : this.state.searchCityInput
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
    axios.get(REQUEST_URL)
      .then(res => this.setState({ users: res.data.results }))
      .catch(() => this.setState({ isLoadingFailed: true }));
  }

  render() {
    const { users, isLoadingFailed, searchNameInput, searchCityInput }: State = this.state;
    const searchInput: string = searchNameInput || searchCityInput;
    const filteredUsers = users.filter((user: User) => user.name.first.includes(searchNameInput) && user.location.city.includes(searchCityInput));

    let renderedUsers: JSX.Element | JSX.Element[];

    if (searchInput && filteredUsers.length) {
      renderedUsers = this.getUsers(filteredUsers);
    }
    else if (searchInput && !filteredUsers.length) {
      renderedUsers = NO_SEARCH_RESULTS_TEMPLATE;
    }
    else {
      renderedUsers = users.length ? this.getUsers(users) : LOADING_TEMPLATE;
    }

    return (
      <div className="App">
        {
          isLoadingFailed
            ? LOADING_ERROR_TEMPLATE
            : (
              <React.Fragment>
                <div className="input-wrapper">
                  <SearchBarComponent
                    searchType={SEARCH_NAME_TEMPLATE}
                    searchInput={searchNameInput}
                    handleOnChange={this.handleOnChange} />
                  <SearchBarComponent
                    searchType={SEARCH_CITY_TEMPLATE}
                    searchInput={searchCityInput}
                    handleOnChange={this.handleOnChange} />
                </div>
                {renderedUsers}
              </React.Fragment>
            )
        }
      </div>
    );
  }
}

export default App;
