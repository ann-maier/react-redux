import React, { Component } from 'react';
import { connect } from "react-redux";

import './App.css';
import { SEARCH_NAME_TYPE, SEARCH_CITY_TYPE, Store } from './App.dictionary';
import { fetchData, moveLeft, moveRight } from './actions';

import ColumnsComponent from './components/columns/Columns';
import SearchBarComponent from './components/search-bar/SearchBar';

const LOADING_TEMPLATE: JSX.Element = <h1>Loading...</h1>;
const LOADING_ERROR_TEMPLATE: JSX.Element = <h1>Cannot load data, please try again.</h1>;

interface Props extends Store {
  fetchUsers: Function,
  moveLeft: Function,
  moveRight: Function
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

  componentDidMount(): void {
    this.props.fetchUsers();
  }

  render() {
    const { users, loading, isLoadingFailed, moveLeft, moveRight }: Props = this.props;
    const { searchNameInput, searchCityInput }: State = this.state;

    const shouldShowMessageTemplate: boolean = loading || isLoadingFailed;
    const dispayedMessageTemplate: JSX.Element = loading ? LOADING_TEMPLATE : LOADING_ERROR_TEMPLATE;

    return (
      <div className="App">
        {
          shouldShowMessageTemplate
            ? dispayedMessageTemplate
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
                <ColumnsComponent
                  users={users}
                  searchNameInput={searchNameInput}
                  searchCityInput={searchCityInput}
                  moveLeft={moveLeft}
                  moveRight={moveRight}
                />
              </React.Fragment>
            )
        }
      </div>
    );
  }
}

const mapStateToProps = (store: Store) => ({
  users: store.users,
  loading: store.loading,
  isLoadingFailed: store.isLoadingFailed
});

export default connect(mapStateToProps, { fetchUsers: fetchData, moveLeft, moveRight })(App);