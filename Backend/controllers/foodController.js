import Food from "../models/foodModel.js";
import { v2 as cloudinary } from 'cloudinary';


const addFood = async (req, res) => {
   try {
      const { name, price, description, category } = req.body;

      const image1 = req.files.image && req.files.image[0];

      const image = [image1].filter(image => image !== undefined)

      let imageUrl = await Promise.all(
         image.map(async (image) => {
            let result = await cloudinary.uploader.upload(image.path, {resource_type: 'image'})
            return result.secure_url
         })
      )

      const foodData = {
         name,
         image: imageUrl,
         price: Number(price),
         description,
         category
      }


      const food = new Food(foodData);
      await food.save();
      res.json({ success: true, message: "Food item added successfully" });

   } catch (error) {
      console.log("Error adding food item:", error);
      res.json({ success: false, message: "Failed to add food item" });
   }
}


const getAllFoods = async (req, res) => {

   try {
      const foodList = await Food.find({});
      res.json({ success: true, foodList })
      
   } catch (error) {
      
      console.log(error)
      res.json({ success: false, message: error.message })

   }

}


const getSingleFood = async (req, res) => {
   try {
      const foodItem = await Food.findById(req.params.id);

      if (!foodItem) {
         return res.json({ success: false, message: "Food item not found" });
      }

      res.json({ success: true, foodItem });
   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }

}


const removeFood = async (req, res) => {

   try {
      const deletedFood = await Food.findByIdAndDelete(req.params.id);

      if (!deletedFood) {
         return res.json({ success: false, message: "Food item not found" });
      }

      res.json({ success: true, message: "Food item removed successfully" });
   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }

}


export { addFood, getAllFoods, getSingleFood, removeFood }