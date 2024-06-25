import jwt from 'jsonwebtoken'
import prisma from "../lib/prisma.js";

export const getPostsController = async (req, res) => {
    const query=req.query;

    try {
        const posts= await prisma.post.findMany(
           { where:{
                city: query.city || undefined,
                type: query.type || undefined,
                Property: query.Property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price:{
                    gte:parseInt(query.minPrice) || undefined,
                    lte:parseInt(query.maxPrice) || undefined
                }
            }}
        );
        console.log("posts", posts);

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed to get posts"});
    }
};

export const getPostController = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;

    // if (token) {
    //   jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    //     if (!err) {
    //       const saved = await prisma.savedPost.findUnique({
    //         where: {
    //           userId_postId: {
    //             postId: id,
    //             userId: payload.id,
    //           },
    //         },
    //       });
    //       res.status(200).json({ ...post, isSaved: saved ? true : false });
    //     }
    //   });
    // }
    res.status(200).json({post });
    // res.status(200).json({ ...post, isSaved: false });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
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