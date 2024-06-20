import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    const token= req.cookies.access_token;
    if(!token){
        return res.status(401).json({message:"Please login first"});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.status(401).json({message:"Please login first"});
        }
        req.userId= user.id;
        next();
    })
}