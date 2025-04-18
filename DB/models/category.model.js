import mongoose, { Schema, model ,  Types} from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true, min: 3, max: 50 },
    slug: { type: String, required: true },
    image: { type: Object },
    status: { type: String, default: "active", enum: ["active", "not_active"] },
    role: { type: String, default: "user", enum: ["admin", "user"] },
    createdBy: { type:Types.ObjectId, ref: 'User' },
    updatedBy: { type:Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const categoryModel =
  mongoose.models.Category || model("Category", categorySchema);
export default categoryModel;
