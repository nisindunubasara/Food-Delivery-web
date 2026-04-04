
import menuModel from "../models/menuModel.js";
import { v2 as cloudinary } from 'cloudinary';
import mongoose from "mongoose";

const addMenu = async (req, res) => {
   try {
      const { name } = req.body;

      const uploadedImage =
         (req.files && req.files.image && req.files.image[0]) ||
         (req.files && req.files.menuImage && req.files.menuImage[0]) ||
         req.file;

      if (!name || !uploadedImage) {
         return res.json({ success: false, message: "Menu name and image are required" });
      }

      const result = await cloudinary.uploader.upload(uploadedImage.path, { resource_type: 'image' });

      const menu = new menuModel({
         name,
         image: result.secure_url,
      });

      await menu.save();

      return res.json({ success: true, message: "Menu added successfully", menu });
   } catch (error) {
      console.log("Error adding menu:", error);
      return res.json({ success: false, message: "Failed to add menu" });
   }
}

const getAllMenus = async (req, res) => {
   try {
      const menuList = await menuModel.find({});
      return res.json({ success: true, menuList });
   } catch (error) {
      console.log(error);
      return res.json({ success: false, message: error.message });
   }
}

const removeMenu = async (req, res) => {
   try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.json({ success: false, message: "Invalid menu id" });
      }

      const deletedMenu = await menuModel.findByIdAndDelete(id);

      if (!deletedMenu) {
         return res.json({ success: false, message: "Menu not found" });
      }

      return res.json({ success: true, message: "Menu removed successfully" });
   } catch (error) {
      console.log(error);
      return res.json({ success: false, message: error.message });
   }
}

export { addMenu, getAllMenus, removeMenu };