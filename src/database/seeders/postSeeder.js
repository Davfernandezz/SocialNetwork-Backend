import mongoose from "mongoose";
import "dotenv/config";
import Post from "../../entities/posts/post.models.js";

export const postSeeder = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});

        const posts = [
            {
                _id: "70f7d0c0c9b8b4b2e8c2e2b7a",
                description: "Excited to share my new project with everyone!",
                userId: "60f7d0c0c9b8b4b2e8c2e2b7a",
                like: [
                    "60f7d0c0c9b8b4b2e8c2e2b7b",
                    "60f7d0c0c9b8b4b2e8c2e2b7c",
                ],
            },
            {
                _id: "70f7d0c0c9b8b4b2e8c2e2b7b",
                description: "Just finished reading a great book on design patterns.",
                userId: "60f7d0c0c9b8b4b2e8c2e2b7b",
                like: [
                    "60f7d0c0c9b8b4b2e8c2e2b7a",
                    "60f7d0c0c9b8b4b2e8c2e2b7d",
                ],
            },
            {
                _id: "70f7d0c0c9b8b4b2e8c2e2b7c",
                description: "Can't wait for the weekend trip to the mountains!",
                userId: "60f7d0c0c9b8b4b2e8c2e2b7c",
                like: [
                    "60f7d0c0c9b8b4b2e8c2e2b7e",
                ],
            },
            {
                _id: "70f7d0c0c9b8b4b2e8c2e2b7d",
                description: "New features coming soon. Stay tuned!",
                userId: "60f7d0c0c9b8b4b2e8c2e2b7d",
                like: [
                    "60f7d0c0c9b8b4b2e8c2e2b7a",
                    "60f7d0c0c9b8b4b2e8c2e2b7b",
                ],
            },
            {
                _id: "70f7d0c0c9b8b4b2e8c2e2b7e",
                description: "Had a great day exploring new cafes in town!",
                userId: "60f7d0c0c9b8b4b2e8c2e2b7e",
                like: [
                    "60f7d0c0c9b8b4b2e8c2e2b7c",
                ],
            },
            {
                _id: "70f7d0c0c9b8b4b2e8c2e2b7f",
                description: "Starting a new fitness journey. Let's go!",
                userId: "60f7d0c0c9b8b4b2e8c2e2b7f",
                like: [
                    "60f7d0c0c9b8b4b2e8c2e2b7a",
                    "60f7d0c0c9b8b4b2e8c2e2b7d",
                ],
            },
            {
                _id: "70f7d0c0c9b8b4b2e8c2e2b80",
                description: "Just got back from an amazing vacation!",
                userId: "60f7d0c0c9b8b4b2e8c2e2b80",
                like: [
                    "60f7d0c0c9b8b4b2e8c2e2b7b",
                ],
            },
            {
                _id: "70f7d0c0c9b8b4b2e8c2e2b81",
                description: "Planning the next big tech conference!",
                userId: "60f7d0c0c9b8b4b2e8c2e2b81",
                like: [
                    "60f7d0c0c9b8b4b2e8c2e2b7a",
                ],
            },
            {
                _id: "70f7d0c0c9b8b4b2e8c2e2b82",
                description: "Exploring new hobbies and interests.",
                userId: "60f7d0c0c9b8b4b2e8c2e2b82",
                like: [
                    "60f7d0c0c9b8b4b2e8c2e2b7c",
                    "60f7d0c0c9b8b4b2e8c2e2b7d",
                ],
            },
            {
                _id: "70f7d0c0c9b8b4b2e8c2e2b83",
                description: "Sharing tips for staying productive while working from home.",
                userId: "60f7d0c0c9b8b4b2e8c2e2b83",
                like: [
                    "60f7d0c0c9b8b4b2e8c2e2b7e",
                ],
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