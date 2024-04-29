import { prisma } from ".";

export class BookingService{
    static async create(data:any):Promise<any>{
        return await prisma.booking.create({
            data
        })
    }

    static async getAll(){
        return await prisma.booking.findMany()
    }

    static async getEvent(condition:any){
        return await prisma.booking.findFirst({
            where: {
                ...condition
            }
        })
    }

    static async update(id:any, data:any){
        return await prisma.booking.update({
            where: {
                id
            },
            data
        })
    }

    static async delete(id:string){
        return await prisma.booking.delete({
            where:{
                id
            }
        })
    }
}