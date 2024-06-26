// import prisma from "../lib/prisma.js";

// export const getUsersController = async (req, res) => {
//     try {
//         const users = await prisma.user.findMany();
//         res.status(200).json({users});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "Failed to get users"});
//     }
// }
// export const getUserController = async (req, res) => {
//     const id= req.params.id;
//     try {
//         const user = await prisma.user.findUnique({
//             where: {
//                 id
//             }
//         })
//         res.status(200).json({user});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "Failed to get user"});
//     }
// }
// export const updateUserController = async (req, res) => {
//     const id= req.params.id;
//     const tokenUserId= req.userId;
//     const body=req.body;
//     if(id !== tokenUserId){
//         return res.status(401).json({message: "Unauthorized"});
//     }
//     try {
//         const updatedUser = await prisma.user.update({
//             where: {
//                 id
//             },
//             data:body,
//         })
//         // console.log(updatedUser);
//         res.status(200).json({updatedUser});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "Failed to get users"});
//     }
// }
// export const deleteUserController = async (req, res) => {
//     try {
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "Failed to get users"});
//     }
// }


import { query } from "express";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;
console.log("update ");
  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPassword, ...userInfo } = updatedUser;

    res.status(200).json({message:"user goy updated",userInfo});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update users!" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete users!" });
  }
};

export const savePost= async (req, res) => {
  console.log('savepost req',req.body);
  const postId= req.body.postId;
  const tokenUserId= req.userId;
  const saved=req.body.isSaved;
  console.log('save',saved, tokenUserId,postId);
  try {
    const savedPost = await prisma.savedPost.findUnique({
      where:{
        userId: tokenUserId,
        postId
      }
    })
    console.log("saved post", savedPost);
    if(savedPost){
      await prisma.savedPost.delete({
        where:{
          id:savedPost.id
        }
      }) ;
      
      res.status(200).json({message:"post removed from saved list"}); 
    
    }else{
      const data=await prisma.savedPost.create({
        data:{
          userId: tokenUserId,
          postId,
          isSaved: saved,
        },
      });
      console.log("data==========================",data)
      res.status(200).json({message:"Post added to saved list"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Failed to save post"});
  }
}
export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
    });
    const saved = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: {
        post: true,
      },
    });

    const savedPosts = saved.map((item) => item.post);
    res.status(200).json({ userPosts, savedPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile posts!" });
  }
};