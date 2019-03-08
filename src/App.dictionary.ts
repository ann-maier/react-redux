export const REQUEST_URL: string = 'https://randomuser.me/api/?nat=gb&results=5';

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