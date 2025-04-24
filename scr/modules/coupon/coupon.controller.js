import couponModel from "../../../DB/models/coupon.model.js";

export const create = async (req, res) => {

    if(await couponModel.findOne({name: req.body.name })){
        return res.status(409).json({ message: "Coupon name already exists!" });
    }  

   req.body.expireDate = new Date(req.body.expireDate);
   req.body.createdBy = req.id;
   req.body.updatedBy = req.id;
     // Create the coupon
   const coupon = await couponModel.create( req.body);
    return res.status(201).json({ message: "Coupon created successfully!", coupon });
}
// get all coupons
export const get = async (req, res) => {
    const coupons = await couponModel.find();
    return res.status(200).json({ message: "Coupons retrieved successfully!", coupons });
}
// get coupon by id
export const getById = async (req, res) => {
    const coupon = await couponModel.findById(req.params.id);
    if (!coupon) {
        return res.status(404).json({ message: "Coupon not found!" });
    }
    return res.status(200).json({ message: "Coupon retrieved successfully!", coupon });
}
// update coupon by id
export const update = async (req, res) => {
    const coupon = await couponModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!coupon) {
        return res.status(404).json({ message: "Coupon not found!" });
    }       
    return res.status(200).json({ message: "Coupon updated successfully!", coupon });
}   
// delete coupon by id
export const deleteCoupon = async (req, res) => {
    const coupon = await couponModel.findByIdAndDelete(req.params.id);
    if (!coupon) {
        return res.status(404).json({ message: "Coupon not found!" });
    }       
    return res.status(200).json({ message: "Coupon deleted successfully!", coupon });
}

