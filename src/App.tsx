import React, { Component } from 'react';
import { connect } from "react-redux";

import './App.css';
import { SEARCH_NAME_TYPE, SEARCH_CITY_TYPE, API_CALL_REQUEST, User, Store } from './App.dictionary';

import UserComponent from './components/user/User';
import SearchBarComponent from './components/search-bar/SearchBar';

// const LOADING_TEMPLATE: JSX.Element = <h1>Loading...</h1>;
const LOADING_ERROR_TEMPLATE: JSX.Element = <h1>Cannot load data, please try again.</h1>;
const NO_SEARCH_RESULTS_TEMPLATE: JSX.Element = <h1>Ooops...</h1>;

interface Props extends Store {
  fetchUsers: Function
}

interface State {
  searchNameInput: string,
  searchCityInput: string
}

class App extends Component<Props, State> {
  state = {
    searchNameInput: '',
    searchCityInput: ''
  };

  handleOnChange = (input: string, searchType: string): void => {
    this.setState({
      searchNameInput: searchType === SEARCH_NAME_TYPE ? input.toLowerCase() : this.state.searchNameInput,
      searchCityInput: searchType === SEARCH_CITY_TYPE ? input.toLowerCase() : this.state.searchCityInput
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

  getRenderData(searchInput: string, filteredUsers: User[], users: User[]): JSX.Element | JSX.Element[] {
    return searchInput
      ? (filteredUsers.length ? this.getUsers(filteredUsers) : NO_SEARCH_RESULTS_TEMPLATE)
      : this.getUsers(users);
  }

  componentDidMount(): void {
    this.props.fetchUsers();
  }

  render() {
    const { users, isLoadingFailed }: Props = this.props;
    const { searchNameInput, searchCityInput }: State = this.state;
    const searchInput: string = searchNameInput || searchCityInput;
    const filteredUsers: User[] = users.filter((user: User) =>
      user.name.first.includes(searchNameInput) && user.location.city.includes(searchCityInput));

    const renderedData: JSX.Element | JSX.Element[] = this.getRenderData(searchInput, filteredUsers, users);

    return (
      <div className="App">
        {
          isLoadingFailed
            ? LOADING_ERROR_TEMPLATE
            : (
              <React.Fragment>
                <div className="input-wrapper">
                  <SearchBarComponent
                    searchType={SEARCH_NAME_TYPE}
                    searchInput={searchNameInput}
                    handleOnChange={this.handleOnChange} />
                  <SearchBarComponent
                    searchType={SEARCH_CITY_TYPE}
                    searchInput={searchCityInput}
                    handleOnChange={this.handleOnChange} />
                </div>
                {renderedData}
              </React.Fragment>
            )
        }
      </div>
    );
  }
}

const mapStateToProps = (store: Store) => ({
  users: store.users,
  isLoadingFailed: store.isLoadingFailed
});

const mapDispatchToProps = (dispatch: Function) => ({
  fetchUsers: () => dispatch({ type: API_CALL_REQUEST })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
