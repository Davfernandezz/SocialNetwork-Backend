import mongoose from "mongoose";
import "dotenv/config";
import User from "../../entities/users/user.models.js";
import bcrypt from "bcrypt";

export const userSeeder = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {});

		const users = [
			{
				_id: "60f7d0c0c9b8b4b2e8c2e2b7a",
				email: "david@david.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "admin",
			},
			{
				_id: "60f7d0c0c9b8b4b2e8c2e2b7b",
				email: "dani@dani.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "admin",
			},
			{
				_id: "60f7d0c0c9b8b4b2e8c2e2b7c",
				email: "yoana@yoana.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "user",
			},
			{
				_id: "60f7d0c0c9b8b4b2e8c2e2b7d",
				email: "morena@morena.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "user",
			},
			{
				_id: "60f7d0c0c9b8b4b2e8c2e2b7e",
				email: "eve@eve.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "user",
			},
			{
				_id: "60f7d0c0c9b8b4b2e8c2e2b7f",
				email: "frank@frank.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "user",
			},
			{
				_id: "60f7d0c0c9b8b4b2e8c2e2b80",
				email: "mandy@mandy.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "user",
			},
			{
				_id: "60f7d0c0c9b8b4b2e8c2e2b81",
				email: "santi@santi.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "admin",
			},
			{
				_id: "60f7d0c0c9b8b4b2e8c2e2b82",
				email: "tati@tati.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "user",
			},
			{
				_id: "60f7d0c0c9b8b4b2e8c2e2b83",
				email: "myke@myke.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "user",
			},
		];

		await User.insertMany(users);

		console.log("============================");
		console.log("Users seeder executed successfully");
		console.log("============================");
	} catch (error) {
		console.log("============================");
		console.log("Error seeding users:", error);
		console.log("============================");
	} finally {
		await mongoose.connection.close()
	}
}