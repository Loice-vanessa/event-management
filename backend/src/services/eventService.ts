import { prisma } from ".";

export class EventService{
    static async create(data:any):Promise<any>{
        return await prisma.event.create({
            data
        })
    }

    static async getAll(){
        return await prisma.event.findMany()
    }

    static async getEvent(condition:any){
        return await prisma.event.findFirst({
            where: {
                ...condition
            }
        })
    }

    static async update(id:any, data:any){
        return await prisma.event.update({
            where: {
                id
            },
            data
        })
    }

    static async delete(id:string){
        return await prisma.event.delete({
            where:{
                id
            }
        })
    }
}