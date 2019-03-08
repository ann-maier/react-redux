import React from 'react';

const SearchBar = ({ handleOnChange }: any) => { // which type should I write here insted of any ?
  return <input onChange={(e) => handleOnChange(e.target.value)} />;
};

export default SearchBar;