export const REQUEST_URL: string = 'https://randomuser.me/api/?nat=gb&results=5';
export const SEARCH_NAME_TEMPLATE: string = 'Name';
export const SEARCH_CITY_TEMPLATE: string = 'City';

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
  picture: { thumbnail: string }
}