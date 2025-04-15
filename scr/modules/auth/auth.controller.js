import userModel from "../../../DB/models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async(req, res,next)=>{

     const {userName, email, password} = req.body;
        // Check if user already exists
    const user = await userModel.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "email  already registered" });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password,parseInt( process.env.SALT_ROUNDS));
    // Create new user
    const createdUser = await userModel.create({userName,email,
        password: hashedPassword,
    });
    // Save user to database


    return res.status(200).json({ message: "User registered successfully", user:createdUser });
}