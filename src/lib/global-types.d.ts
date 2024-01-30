export interface UserCreate {
    uid: string,
    email: string,
    firstName: string,
    lastName: string,
  }

export interface Translation {
  [index: string]: string
}