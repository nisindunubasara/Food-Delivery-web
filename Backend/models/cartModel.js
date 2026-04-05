import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
	{
		foodId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "food",
			required: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		image: {
			type: String,
			required: true,
			trim: true,
		},
		quantity: {
			type: Number,
			required: true,
			min: 1,
			default: 1,
		},
	},
	{ _id: false }
);

const cartSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			ref: "user",
			required: true,
			unique: true,
		},
		items: {
			type: [cartItemSchema],
			default: [],
		},
	},
	{ timestamps: true }
);

const Cart = mongoose.models.cart || mongoose.model("cart", cartSchema);

export default Cart;
