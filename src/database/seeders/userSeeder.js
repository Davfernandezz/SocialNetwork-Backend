import mongoose from "mongoose";
import "dotenv/config";
import User from "../../entities/users/user.model.js";
import bcrypt from "bcrypt";

export const userSeeder = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {});

		const users = [
			{
				_id: "65edc858352c4f2a5cf087a7",
				email: "david@david.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "admin",
			},
			{
				_id: "65edc858352c4f2a5cf087b8",
				email: "dani@dani.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "admin",
			},
			{
				_id: "65edc858352c4f2a5cf087b9",
				email: "yoana@yoana.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "user",
			},
			{
				_id: "65edc858352c4f2a5cf087ba",
				email: "morena@morena.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "user",
			},
			{
				_id: "65edc858352c4f2a5cf087bb",
				email: "eve@eve.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "user",
			},
			{
				_id: "65edc858352c4f2a5cf087bc",
				email: "frank@frank.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "user",
			},
			{
				_id: "65edc858352c4f2a5cf087bd",
				email: "mandy@mandy.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "user",
			},
			{
				_id: "65edc858352c4f2a5cf087be",
				email: "santi@santi.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "admin",
			},
			{
				_id: "65edc858352c4f2a5cf087bf",
				email: "tati@tati.com",
				password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
				role: "user",
			},
			{
				_id: "65edc858352c4f2a5cf087c0",
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
export default userSeeder