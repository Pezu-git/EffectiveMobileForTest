import { IUser, IUserCreate, IUserUpdate } from "../interfaces/IUser";
import { injectable } from "inversify";
import { dbUser } from "../lib/dbUser.js";

@injectable()
export abstract class UserRepository {
    async getUsersList(page: number): Promise<IUser[] | string> {
        try {
            return await dbUser.getUsersList(page)
        }
        catch (e) {
            return e
        }
    }
    async createUser(data: IUserCreate): Promise<IUser | string> {
        try {
            return await dbUser.createUser(data)
        }
        catch (e) {
            return e
        }
    }

    async updateUserData(id: number, data: IUserUpdate): Promise<IUser | string> {
        try {
            return await dbUser.updateUserData(id, data)
        }
        catch (e) {
            return e
        }
    }
}