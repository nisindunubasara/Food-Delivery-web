import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
   name: {type: String,required: true},
   image: {type: String,required: true},
});

const menuModel = mongoose.models.menu || mongoose.model("menu", menuSchema);
export default menuModel;