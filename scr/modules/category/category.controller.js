import slugify from "slugify";
import categoryModel from "../../../DB/models/category.model.js";


export const create = async (req, res) => {

    const { name } = req.body;
    req.body.slug =  slugify( name);
    req.body.createdBy = req.id;
    req.body.updatedBy = req.id;

    const category = await categoryModel.create( req.body );
    
    return res.status(201).json({message: "success Added category" , category });

}

export const get = async (req, res) => {
    const categories = await categoryModel.find({});
    return res.status(200).json({message: "success" , categories });
}
   

export const getActive = async (req, res) => {
    const categories = await categoryModel.find({status: "active"});
    return res.status(200).json({message: "success" , categories });
}

// category remove
export const remove = async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) return res.status(404).json({message: "category not found" });
    return res.status(200).json({message: "success deleted category" , category });
}
/*
export const update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    req.body.slug =  slugify( name);
    req.body.updatedBy = req.id;

    const category = await categoryModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!category) return res.status(404).json({message: "category not found" });
    return res.status(200).json({message: "success updated category" , category });
}
     */ 