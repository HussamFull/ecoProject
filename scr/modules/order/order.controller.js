import cartModel from "../../../DB/models/cart.model.js";
import couponModel from "../../../DB/models/coupon.model.js";
import orderModel from "../../../DB/models/order.model.js";
import productModel from "../../../DB/models/product.model.js";
import userModel from "../../../DB/models/user.model.js";


// create order
export const create = async (req, res) => {
  const { couponName, address, phoneNumber } = req.body; // استخلاص address و phoneNumber من req.body مباشرة

  const cart = await cartModel.findOne({ userId: req.id });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found!" });
  }

  if (couponName) {
    const coupon = await couponModel.findOne({ name: couponName });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found!" });
    }

    if (coupon.expireDate <= new Date()) {
      return res.status(404).json({ message: "Coupon has  expired!" });
    }

    // التحقق من أن usedBy موجود وهو مصفوفة قبل استخدام includes
    if (coupon.usedBy && Array.isArray(coupon.usedBy) && coupon.usedBy.includes(req.id)) {
      return res.status(404).json({ message: "Coupon already used!" });
    }

    req.body.coupon = coupon;
  }

  const finalProducts = [];
  let subTotal = 0;
  for (let product of cart.products) {
    const checkProduct = await productModel.findOne({
      _id: product.productId,
      stock: { $gte: product.quantity },
    });

    if (!checkProduct) {
      return res
        .status(404)
        .json({ message: "Product quantity not avaliable!" });
    }

    product = product.toObject();
    product.productName = checkProduct.name;
    product.unitPrice = checkProduct.priceAfterDiscont;
    product.finalPrice = checkProduct.priceAfterDiscont * product.quantity;
    subTotal += product.finalPrice;
    finalProducts.push(product);
  }

  // لا داعي لمحاولة تعديل req.id هنا
  // const user = await userModel.findById(req.id);
  // if (!req.id.address) {
  //   req.id.address = user.address;
  // }
  // if (!req.id.phoneNumber) {
  //   req.id.phoneNumber = user.phoneNumber;
  // }

  const order = await orderModel.create({
    UserId: req.id,
    Products: finalProducts,
    couponName: couponName ?? '',
    address: address, // استخدام address المستخرج من req.body
    phoneNumber: phoneNumber, // استخدام phoneNumber المستخرج من req.body
    finalPrice: subTotal - (subTotal * ((req.body.coupon.amount || 0)) / 100),
  });

  // decrase product  Stock 
  for (const product of cart.products) {
    await productModel.updateOne({ _id: product.productId},
       {
      $inc: { stock: - product.quantity },
    });
  }
  //  update coupon usedBy
  if (req.body.coupon) {
    await couponModel.updateOne({_id:req.body.coupon._id}, 
      {
        $addToSet: { 
          usedBy: req.id 
        },
      });
 
    }
  // delete cart
  await cartModel.updateOne({ userId: req.id }, 
    {  products: []  });


      return res.status(201).json({ message: "Order is Added !" , order });


};

// get User orders
export const getUserOrders = async (req, res) => {
  const orders = await orderModel.find({ UserId: req.id }).populate("Products.productId", "name price mainImage").select("-__v -createdAt -updatedAt -UserId -Products._id");
  if (!orders) {
    return res.status(404).json({ message: "Orders not found!" });
  }
  return res.status(200).json({ message: "success get all orders", orders });
};
// get getOrdersByStatus 
export const getOrdersByStatus = async (req, res) => {
  const { status } = req.params;
  const orders = await orderModel.find({ status }).populate("Products.productId", "name price mainImage").select("-__v -createdAt -updatedAt -UserId -Products._id");
  if (!orders) {
    return res.status(404).json({ message: "Orders not found!" });
  }
  return res.status(200).json({ message: "success get all orders", orders });
};