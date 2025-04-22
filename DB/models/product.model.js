import mongoose, { Schema, model, Types } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 3,
      max: 50,
    },
    description: { type: String, required: true },
    stock: { type: Number, default: 1 },
    price: { type: Number, required: true, min: 0 },
    discont: { type: Number, default: 0 },
    slug: { type: String, required: true },
    mainImage: { type: Object , required: true },
    subImages: [{ type: Object}],
    categoryId: { type: Types.ObjectId, ref: "Category" },
    status: { type: String, default: "active", enum: ["active", "not_active"] },
    role: { type: String, default: "user", enum: ["admin", "user"] },
    createdBy: { type: Types.ObjectId, ref: "User" },
    updatedBy: { type: Types.ObjectId, ref: "User" },

    colors:[String],
    sizes:[{
        type: [String],
        enum: ["small", "medium", "large", "XL", "XXL"],
        default: "M",

    }],

  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.models.Product || model("Product", productSchema);
export default productModel;
