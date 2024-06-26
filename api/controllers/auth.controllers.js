import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken'
export const registerController=async(req,res)=>{ 
    const {username , email ,password}= req.body;
    if(!username || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }

   try {
     const hashedPassword=await bcrypt.hash(password,10);
 
     //check if user already exists
     const user=await prisma.user.findUnique({
         where:{
             email
         }
     })
     if(user){
         return res.status(409).json({message:"User already exists"});
     }
     const userCreated=await prisma.user.create({
         data:{
             username,
             email,
             password:hashedPassword
         }
     })
     console.log(userCreated);
     res.status(201).json({message:"User created successfully"});
   } catch (error) {
     console.log(error);
     res.status(500).json({message:"Failed to create user !!"});
   }
    
}
export const loginController=async(req,res)=>{
    const {email,username,password}=req.body;
    try {
        const user= await prisma.user.findUnique({
            where:{
                email
            }
        });
        // const user= await prisma.user.findUnique({
        //     where:{
        //         username
        //     }
        // });
        if(!user){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({message:"Invalid credentials"});
        }
        console.log("user",user);
        const {password:userPassord, ...userInfo}=user
        //generate cookies token
        const age= 1000*60*60*24*7;

        const token= jwt.sign({
            id:user.id,
            email:user.email
        },process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:age})

        res.cookie("token",token,{
            httpOnly:true,
            // secure:true , //for production
            maxAge:age})
        .status(200).json({message:"Login successful",userInfo});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to login"});
    }
 };
export const logOutController=(req,res)=>{ 
    return res.clearCookie("token").status(200).json({message:"Logout successful"});
}