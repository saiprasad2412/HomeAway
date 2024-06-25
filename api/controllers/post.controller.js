import prisma from "../lib/prisma.js";

export const getPostsController = async (req, res) => {
    try {
        const posts= await prisma.post.findMany();

        res.status(200).json({posts});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed to get posts"});
    }
};

export const getPostController = async (req, res) => {
    const id= req.params.id;
    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            },
            include: {
                postDetail: true,
                user: {
                  select: {
                    username: true,
                    avatar: true,
                  },
                },
              },
        })
        res.status(200).json({post});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed to get post"});
    }
};

export const addPostController = async (req, res) => {
    const body= req.body;
    const tokenUserId= req.userId;
    try {
        const newPost = await prisma.post.create({
            data:{
                ...body.postData,
                userId: tokenUserId,
                postDetail:{
                    create: body.postDetail
                },
            },
        });
        console.log("creating a new post", newPost);
        res.status(200).json({newPost});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed to create post"});
    }
};

export const updatePostController = async (req, res) => {};

export const deletePostController = async (req, res) => {
    const id= req.params.id;
    const tokenUserId= req.userId;
    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            }
            
        })

        if(post.userId !== tokenUserId){
            return res.status(403).json({message: "Not Authorized!"});
        }
        await prisma.post.delete({
            where: {
                id
            }
        })
        res.status(200).json({message:'Post deleted'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed to delete post"});
    }
};