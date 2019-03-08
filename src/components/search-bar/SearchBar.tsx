import React from 'react';
import './SearchBar.css';

const SearchBar = ({ handleOnChange, searchType, searchInput }
  : { handleOnChange: Function, searchType: string, searchInput: string }) => {
  return (
    <div className="input">
      <label>{searchType}</label>
      <input
        value={searchInput}
        onChange={e => handleOnChange(e.target.value, searchType)} />
    </div>
  );
};

export default SearchBar;