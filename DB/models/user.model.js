import mongoose, {Schema,model } from "mongoose";

const userSchema = new Schema(
    {
    userName: { type: String, required: true, min:3, max: 20 },
    email: { type: String, required: true, unique: true },
    confirmEmail: { type: Boolean, default: false },
    password: { type: String, required: true, min:3 },
    image: { type: Object },
    address: { type: String },
    phone: { type: String },
    gender: { type: String, enum:['Male' , 'Female']  },
    status: { type: String, enum:['active' , 'not_active']  },
    role: { type: String, default:'user',  enum:['admin' , 'user']  },
}, {
  timestamps: true,
});

const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;