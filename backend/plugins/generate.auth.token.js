import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.jwt_secret, { expiresIn : "2d"});
    res.cookie('jwt', token, {
      maxAge : 15*25*60*60*1000,
      httpOnly : true,
      sameSite : "strict",
      secure : process.env.node_environment || "development"
    })
  } catch (error) {
    console.log(error.message);
  }
}