"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    console.log(`Authenticated user ID: ${currentUserId}`);
    console.log(`Attempting to follow/unfollow user ID: ${userId}`);

    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    console.log('Existing follow:', existingFollow);

    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
      console.log(`Deleted existing follow: followerId=${currentUserId}, followingId=${userId}`);
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });

      console.log('Existing follow request:', existingFollowRequest);

      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
        console.log(`Deleted existing follow request: senderId=${currentUserId}, receiverId=${userId}`);
      } else {
        const newRequest = await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
        console.log(`Created new follow request: senderId=${currentUserId}, receiverId=${userId}`);
        console.log('New follow request details:', newRequest);
      }
    }
  } catch (err) {
    console.log('Error in switchFollow:', err);
    throw new Error("Something went wrong!");
  }
};



export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }

  try {
    console.log(`Authenticated user ID: ${currentUserId}`);
    console.log(`Accepting follow request from user ID: ${userId}`);

    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    console.log('Existing follow request:', existingFollowRequest);

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
      console.log(`Deleted follow request: senderId=${userId}, receiverId=${currentUserId}`);

      const newFollower = await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
      console.log(`Created new follower: followerId=${userId}, followingId=${currentUserId}`);
      console.log('New follower details:', newFollower);
    }
  } catch (err) {
    console.log('Error in acceptFollowRequest:', err);
    throw new Error("Something went wrong!");
  }
};


export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
  } catch (err) {
    console.log('Error declining follow request:', err);
    throw new Error("Something went wrong!");
  }
};

export const updateProfile = async (
  prevState: {success:boolean, error:boolean},
  payload: {formData:FormData, cover:string}
) => {
  const { formData, cover } = payload;
  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  )

  console.log(fields)

  const Profile = z.object({
    cover:z.string().optional(),
    name:z.string().max(60).optional(),
    surname:z.string().max(60).optional(),
    description:z.string().max(255).optional(),
    city:z.string().max(60).optional(),
    school:z.string().max(60).optional(),
    work:z.string().max(60).optional(),
    website:z.string().max(60).optional(),
  })

  const validateFields = Profile.safeParse({cover, ...filteredFields})

  if(!validateFields.success){
    console.log(validateFields.error.flatten().fieldErrors)
    return {success:false, error:true}
  }

  const { userId } = auth();

  if(!userId) {
    return {success:false, error:true}
  }

  try {
    await prisma.user.update({
      where: {
        id:userId
      },
      data: validateFields.data,
    })
    return {success:true, error:false}
  } catch (err) {
    return {success:false, error:true}
  }
}


export const switchLike = async (postId:number) => {

  const {userId} = auth()

  if (!userId) throw new Error("User is not authenticated!")

  try {
    const existingLike = await prisma.like.findFirst({
      where:{
        postId,
        userId
      }
    })

    if(existingLike) {
      await prisma.like.delete({
        where:{
          id:existingLike.id
        }
      })
    } else {
      await prisma.like.create({
        data:{
          postId,
          userId,
        }
      })
    }
  } catch (err) {
    console.log(err)
    throw new Error("Something went wrong!")
  }
}


export const addComment = async (postId: number, desc: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    const createdComment = await prisma.comment.create({
      data: {
        desc,
        userId,
        postId,
      },
      include: {
        user: true,
      },
    });

    return createdComment;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

export const addPost = async (formData:FormData, img:string) => {
  const desc = formData.get("desc") as string;

  const Desc = z.string().min(1).max(255)

  const validateDesc = Desc.safeParse(desc)

  if(!validateDesc.success) {
    // TODO
    console.log("description is not valid")
    return
  }
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    await prisma.post.create({
      data:{
        desc:validateDesc.data,
        userId,
        img,
      }
    })

    revalidatePath("/");
  } catch (err) {
    console.log(err)
  }
}


export const addStory = async (img:string) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {

    const existingStory = await prisma.story.findFirst({
      where:{
        userId
      }
    })

    if (existingStory) {
      await prisma.story.delete({
        where:{
          id:existingStory.id
        }
    })
    }
    const createdStory = await prisma.story.create({
      data:{
        userId,
        img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include:{
        user: true,
      }
    })

    return createdStory;
  } catch (err) {
    console.log(err)
  }
}


export const deletePost = async (postId:number) => {

  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    await prisma.post.delete({
      where:{
        id: postId,
        userId,
      }
    })
    revalidatePath("/");
  } catch (err) {
    console.log(err)
  }
}