import jwt from 'jsonwebtoken'
export const shouldBeLoggedin=(req,res,next)=>{
    
        res.status(200).json({message:"You are logged in"})
    
}

export const shouldBeAdmin=(req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Not Authenticated"})
    }
    jwt.verify(token, process.env.  ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.status(40).json({message:"Not Authenticated"})
        }
        if(!user.isAdmin){
            return res.status(401).json({message:"Not Authorized"})
        }
        
    });
    res.status(200).json({message:"You are Authenticated"})
    
}