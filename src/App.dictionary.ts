const REQUEST_URL: string = 'https://randomuser.me/api/?nat=gb&results=5';
const SEARCH_NAME_TYPE: string = 'Name';
const SEARCH_CITY_TYPE: string = 'City';

const API_CALL_REQUEST: string = 'API_CALL_REQUEST';
const API_CALL_SUCCESS: string = 'API_CALL_SUCCESS';
const API_CALL_FAILURE: string = 'API_CALL_FAILURE';

export interface Name {
  title: string,
  first: string,
  last: string
}

export interface User {
  name: Name,
  location: { city: string },
  dob: { age: number },
  id: { value: string },
  picture: { thumbnail: string },
  status: string
}

export interface Store {
  users: User[],
  isLoadingFailed: boolean
}

export interface Action {
  type: string,
  payload?: any
}

export {
  REQUEST_URL,
  SEARCH_NAME_TYPE,
  SEARCH_CITY_TYPE,
  API_CALL_REQUEST,
  API_CALL_SUCCESS,
  API_CALL_FAILURE
};