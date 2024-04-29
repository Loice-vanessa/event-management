import bcrypt from 'bcrypt';

const {hash, compare} = bcrypt

async function hashPassword(password:string){
    const result = await hash(password, 10);
    return result
}

async function comparePassword(password:string, hashedPassword:any){
    const result = await compare(password, hashedPassword);
    return result
}

export {hashPassword, comparePassword}
