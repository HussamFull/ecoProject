import jwt from "jsonwebtoken";
import userModel from "../../DB/models/user.model.js";

export const auth = (accessRoles = []) => {
    // Middleware to check if the user is authenticated

    return async (req, res, next) => {
        const  {token}  = req.headers;
        if (!token) {
            return res.status(400).json({ message: "invalid auth" });
        }
        // Here you would typically verify the token and check user permissions

        const decoded = jwt.verify(token, process.env.LOGIN_SIGNAL);
        
        const user = await userModel.findById(decoded.id);

        // Check if the token is valid and extract user information
        if (!accessRoles.includes(user.role )) {
            return res.status(400).json({ message: "not auth user " });
        }
        

        req.id = decoded.id;
        next();
    };
  
};