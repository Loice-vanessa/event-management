import { prisma } from ".";
import { User } from "../types/user";

export class UserService{
    static async create(data:any):Promise<User | any>{
        return await prisma.user.create({
            data
        })
    }

    static async getAll(){
        return await prisma.user.findMany()
    }

    static async getUser(condition:any){
        return await prisma.user.findFirst({
            where: {
                ...condition
            }
        })
    }

    static async update(id:string, data:any){
        return await prisma.user.update({
            where: {
                id
            },
            data
        })
    }
}