import { User } from "../entities/users.entity.js";
import { appDataSource } from "../db/app-data-source.js";
import { IUser, IUserCreate, IUserUpdate } from "../interfaces/IUser.js";
import axios from "axios";
import serverConfig from "../config/config.js"

export const dbUser = {
    getUsersList: async (page: number): Promise<IUser[] | string> => {
        try {
            if (page === 0) {
                return await appDataSource.getRepository(User).find({
                    order: {
                        id: "DESC"
                    }
                })
            }
            const take = 5
            const skip = take * Number(page - 1)
            return await appDataSource.getRepository(User).find({
                take: take,
                skip: skip,
                order: {
                    id: "DESC"
                }
            })
        }
        catch (e) {
            return (e as Error).message
        }
    },

    createUser: async (data: IUserCreate): Promise<IUser | string> => {
        try {

            const user = appDataSource.getRepository(User).create(data)
            const new_user = await appDataSource.getRepository(User).save(user)
            axios.post(`${process.env.HISTORY_SERVICE_HOST}:${process.env.HISTORY_SERVICE_PORT}/create`, {
                // axios.post('http://192.168.56.101:6060/create', {
                id: new_user.id
            }).then((response) => console.log(response)).catch((e) => console.log(e))
            return new_user
        }
        catch (e) {
            return (e as Error).message
        }
    },

    updateUserData: async (id: number, data: IUserUpdate): Promise<IUser | string> => {
        try {

            const user = await appDataSource.getRepository(User).findOneBy({
                id: id
            });
            data.id = id
            const changed = Object.keys(user).filter(key => data[key] !== user[key])
            if (changed.length > 0) {
                let history_data = {}
                changed.forEach((item) => {
                    history_data[`${item}`] = data[`${item}`]
                })
                axios.put(`${process.env.HISTORY_SERVICE_HOST}:${process.env.HISTORY_SERVICE_PORT}/update`, {
                    // axios.put('http://192.168.56.101:6060/update', {
                    id: data.id,
                    data: history_data
                }).then((response) => console.log(response)).catch((e) => console.log(e))
            }
            appDataSource.getRepository(User).merge(user, data)
            return await appDataSource.getRepository(User).save(user)
        }
        catch (e) {
            return (e as Error).message
        }
    }
}