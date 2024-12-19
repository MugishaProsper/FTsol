import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv();

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ id : userId }, process.env.jwt_secret, { expiresIn : "15d"});
    res.cookie('jwt', token, {
      maxAge : 15*25*60*60*1000,
      httpOnly : true,
      sameSite : "strict",
      secure : process.env.node_environment || "development"
    })
}