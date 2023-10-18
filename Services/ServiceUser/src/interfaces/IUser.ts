export interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    profession: string,
    isActive?: boolean
}

export interface IUserCreate {
    firstName: string,
    lastName: string,
    age: number,
    profession: string,
}

export interface IUserUpdate {
    id: number,
    firstName?: string,
    lastName?: string,
    age?: number,
    profession?: string,
    isActive?: boolean
}