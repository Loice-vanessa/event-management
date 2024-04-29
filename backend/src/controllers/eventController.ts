import { Response } from "express"
import { EventService } from "../services/eventService"

class EventController{
    static async createEvent(req:any, res:Response){
       const {title, date, location,description, ticketAvailability,ticketPrice} = req.body
       const details = {
        title,
        date,
        location,
        description,
        ticketAvailability,
        ticketPrice
       }
       const data = await EventService.create(details)
       return res.status(201).json({
        status:201,
        message:"Event created successfully",
        data
       })
    }

    static async getAllEventsAdmin(req:any,res:Response){
        const data = await EventService.getAll()
        return res.status(201).json({
            status:201,
            message:"Retreived all events successfully",
            data
        })
    }

    static async updateEventDetails(req:any,res:Response){
        const {id} = req.query
        const {title, date, location,description, ticketAvailability,ticketPrice} = req.body
        const event = await EventService.getEvent(id)
        if(!event){
            return res.status(404).json({
                status:404,
                message:"Event not found"
            })
        }
        if(event.date < new Date()){
            return res.status(409).json({
                status:409,
                message:"Event has ended"
            })
        }
        const details = {
            title,
            date,
            location,
            description,
            ticketAvailability,
            ticketPrice
    }

    const data = await EventService.update(id,{...details})

    return res.status(201).json({
        status:201,
        message:"Event update successfully",
        data
    })
    }

    static async deleteEvent(req:any,res:Response){
        const {id} = req.query
        const event = await EventService.getEvent(id)
        if(!event){
            return res.status(404).json({
                status:404,
                message:"Event not found"
            })
        }

        await EventService.delete(id)
        return res.status(201).json({
            status:201,
            message:"Event was deleted successfully",
        })
    }
}

export default EventController