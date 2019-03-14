const REQUEST_URL: string = 'https://randomuser.me/api/?nat=gb&results=5';
const SEARCH_NAME_TYPE: string = 'Name';
const SEARCH_CITY_TYPE: string = 'City';
const COLUMNS_TYPES: string[] = [ 'APPLIED', 'INTERVIEWING', 'HIRED' ];

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
  status: number
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
  COLUMNS_TYPES
};