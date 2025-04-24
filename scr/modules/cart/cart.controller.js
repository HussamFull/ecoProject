import cartModel from "../../../DB/models/cart.model.js";

export const addToCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.id; // من الأفضل تخزين req.id في متغير لزيادة الوضوح

  try {
    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      // إذا لم يكن هناك سلة مشتريات للمستخدم، قم بإنشاء واحدة جديدة
      const newCart = await cartModel.create({
        userId,
        products: [{ productId }], // يجب أن يكون products عبارة عن مصفوفة من الكائنات
      });
      return res.status(201).json({ message: "Product added to cart successfully!", cart: newCart });
    }

    // تحقق مما إذا كان المنتج موجودًا بالفعل في سلة المشتريات
    const productExists = cart.products.some(
      (item) => item.productId.toString() === productId
    );

    if (productExists) {
      return res.status(409).json({ message: "Product is already in the cart!"});
    }

    // إذا لم يكن المنتج موجودًا، قم بإضافته إلى سلة المشتريات
    cart.products.push({ productId });
    await cart.save();

    return res
      .status(201) // استخدام 200 OK للتحديث الناجح
      .json({ message: "Product added to the shopping cart successfully!", cart });
  } catch (error) {
    console.error("An error occurred while adding the product to the shopping cart:", error);
    return res.status(500).json({ message: "An internal server error occurred."
 });
  }
};