import userModel from "../../../DB/models/user.model.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken";




export const register = async(req, res,next)=>{

    //return res.json(req.headers.host);

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

    // Generate JWT token
    const token = jwt.sign({ email }, process.env.CONFIEMEMAILSIGNAL);


    // Send welcome email
    const html = `
    <div>
    <h1>Welcome to T-Shop, ${userName}!</h1>
    <h2>Confirm Email </h2>
    <p>Please click the link below to confirm your email address:</p>
    <a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}">Confirm your  Email</a>
    <p>Thank you for registering. We are excited to have you on board.</p>
    </div>
    `;

   
    await sendEmail(email, "Welcome to T-Shop", html);
    return res.status(201).json({ message: "User registered successfully", user:createdUser });
}



export const confirmEmail = async(req, res)=>{

    const {token} = req.params;
    const decoded = jwt.verify(token, process.env.CONFIEMEMAILSIGNAL);

     await userModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true});
   
    return res.status(201).json({ message: "Email confirmed successfully" });

}