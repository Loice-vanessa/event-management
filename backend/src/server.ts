import express, { Application } from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import router from './routes';
import { prisma } from './services';

dotenv.config()

const port = process.env.PORT
const app:Application = express();

async function main(){
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({extended:true}));
    app.use(session({
    secret:process.env.SESSION_KEY || "your-secret-key",
    resave: false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));
    app.use(router)
    app.listen(port , () => console.log(`Server is listen on port ${port}`))
}

main()
.then(async() => {
    await prisma.$connect()
    console.log('Database connected')
}).catch(async(e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})