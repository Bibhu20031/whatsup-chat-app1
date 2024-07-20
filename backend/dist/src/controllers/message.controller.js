import prisma from "../db/prisma.js";
import { v2 as cloudinary } from "cloudinary";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { Redis } from 'ioredis';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const serviceUri = process.env.SERVICE_URI;
export const redis = new Redis(serviceUri);
export const sendMessage = async (req, res) => {
    try {
        const { message, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;
        let imageUrl;
        if (image) { // Handle image upload if present
            try {
                const uploadResponse = await cloudinary.uploader.upload(image.path);
                imageUrl = uploadResponse.secure_url;
            }
            catch (error) {
                console.error("Error uploading image to Cloudinary:", error.message);
                return res.status(400).json({ error: "Failed to upload image" });
            }
        }
        let conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, receiverId],
                },
            },
        });
        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    participantIds: {
                        set: [senderId, receiverId],
                    },
                },
            });
        }
        const newMessage = await prisma.message.create({
            data: {
                senderId,
                body: message,
                imageUrl,
                conversationId: conversation.id,
            },
        });
        await redis.publish("chat:messages", JSON.stringify(newMessage));
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.error("Error in sendMessage:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user.id;
        const conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, userToChatId],
                },
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });
        if (!conversation) {
            return res.status(200).json([]);
        }
        res.status(200).json(conversation.messages);
    }
    catch (error) {
        console.error("Error in getMessages: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
export const getUsersForSidebar = async (req, res) => {
    try {
        const authUserId = req.user.id;
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: authUserId,
                },
            },
            select: {
                id: true,
                fullName: true,
                profilePic: true,
            },
        });
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
