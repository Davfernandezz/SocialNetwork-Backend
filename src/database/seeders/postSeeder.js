import mongoose from "mongoose";
import "dotenv/config";
import Post from "../../entities/posts/post.model.js";

export const postSeeder = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});

        const posts = [
            {
                description: "Excited to share my new project with everyone!",
                userId: "65edc858352c4f2a5cf087c0",
            },
            {
                description: "Just finished reading a great book on design patterns.",
                userId: "65edc858352c4f2a5cf087bf",
            },
            {
                description: "Can't wait for the weekend trip to the mountains!",
                userId: "65edc858352c4f2a5cf087be",
            },
            {
                description: "New features coming soon. Stay tuned!",
                userId: "65edc858352c4f2a5cf087bd",
            },
            {
                description: "Had a great day exploring new cafes in town!",
                userId: "65edc858352c4f2a5cf087bc",
            },
            {
                description: "Starting a new fitness journey. Let's go!",
                userId: "65edc858352c4f2a5cf087bb",
            },
            {
                description: "Just got back from an amazing vacation!",
                userId: "65edc858352c4f2a5cf087ba",
            },
            {
                description: "Planning the next big tech conference!",
                userId: "65edc858352c4f2a5cf087b9",
            },
            {
                description: "Exploring new hobbies and interests.",
                userId: "65edc858352c4f2a5cf087b8",
            },
            {
                description: "Sharing tips for staying productive while working from home.",
                userId: "65edc858352c4f2a5cf087a7",
            },
        ];

        await Post.insertMany(posts);

        console.log("============================");
        console.log("Posts seeder executed successfully");
        console.log("============================");
    } catch (error) {
        console.log("============================");
        console.log("Error seeding posts:", error);
        console.log("============================");
    } finally {
        await mongoose.connection.close()
    }
}
export default postSeeder