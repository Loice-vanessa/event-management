import { Response,NextFunction } from "express";
import { UserService } from "../services/userService";

export const auth = async (req:any,res:Response, next:NextFunction) => {
    const {id} = req.user
     const user = await UserService.getUser(id)
    if(!user || user.role !== "ADMIN"){
        return res.status(403).json({
            status:403,
            message:"Access denied"
        })
    }

    next()
}