import userModel from "../../../DB/models/user.model.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import {nanoid ,customAlphabet} from "nanoid";


// register
export const register = async (req, res, next) => {
  //return res.json(req.headers.host);

  const { userName, email, password } = req.body;
  // Check if user already exists
  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "email  already registered" });
  }
  // hash password
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );
  // Create new user
  const createdUser = await userModel.create({
    userName,
    email,
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
  return res
    .status(201)
    .json({ message: "User registered successfully", user: createdUser });
};

// confirmEmail
export const confirmEmail = async (req, res) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.CONFIEMEMAILSIGNAL);

  await userModel.findOneAndUpdate(
    { email: decoded.email },
    { confirmEmail: true }
  );

  return res.status(201).json({ message: "Email confirmed successfully" });
};

// loginUser

export const login = async (req, res) => {
  const { email, password } = req.body;
  // Check if user exists
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  // Check if password is correct
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Check if email is confirmed
  if (!user.confirmEmail) {
    return res.status(400).json({ message: "Please confirm your email" });
  }

  // Check if user is active
  if (user.status == "not_active") {
    return res.status(400).json({ message: "Yout Account  is Blocked" });
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, userName: user.userName, role: user.role },
    process.env.LOGIN_SIGNAL
  );

  // Send response
  return res.status(200).json({ message: "Login successful", token });
};

// sendCode for reset password
// 1-  sendCode
export const sendCode = async (req,res)=>{
     const { email } = req.body;
     const code = customAlphabet('1234567890abcdefABCDEF', 4)();

        // Check if user exists

        const user = await userModel.findOneAndUpdate({ email } , { sendCode: code });

     const html = `
     <div>
        <h1>Welcome to T-Shop</h1>
        <h2>Reset Password</h2>
        <p>Please use the code below to reset your password:</p>
        <h1>${code}</h1>
        <p>Thank you for using T-Shop.</p>
        </div>
        `;

        await sendEmail(email, "Reset Password", html);

     return res.status(200).json({ message: "Code sent successfully" });
}

// 2- verifyCode und resetPassword
export const resetPassword = async (req,res)=>{

    const { email , code , password } = req.body;
    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email -- not register Account " });
      }
      // Check if code is correct
      if (user.sendCode != code) {
        return res.status(400).json({ message: "Invalid  code" });
      }
      // hash password
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUND)
      );
      // Update password and remove sendCode
      user.password = hashedPassword;
      user.sendCode= null ;
        await user.save();


      return res.status(200).json({ message: "Password reset successfully" });
}
