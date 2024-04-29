import jwt from 'jsonwebtoken';

function generateToken(payload:any){
    const token = jwt.sign(payload, `${process.env.JWT_SECRET}`,{
        expiresIn:"7d"
    })
    return token
}

function decodeToken(token:any){
  const verify = jwt.verify(token, `${process.env.JWT_SECRET}`)
  return verify
}

export {generateToken, decodeToken}