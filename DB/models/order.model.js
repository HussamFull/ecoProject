import mongoose, { Schema, model ,  Types} from "mongoose";

const orderSchema = new Schema(
  {
    UserId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    Products: [
      {
        productName: {
          type: String,
          required: true,
        },
        productId: {
          type: Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          required: true,
        },
        unitPrice: {
          type: Number,
          required: true,
        },
        finalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    couponName: {
      type: Name,
    },

    finalPrice: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      default: "cash",
      enum: ["cash", "credit_card", "paypal", "bank_transfer"],
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "cancelled", "delivered", "confirmed", "onWay"],
      default: "pending",
    },
    note: String,
    reasonRejected: String,

    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    
  },
  {
    timestamps: true,
  }
);

const orderModel =
  mongoose.models.Order || model("Order", orderSchema);
export default orderModel;
