import mongoose from "mongoose";

const orderedItemSchema = new mongoose.Schema(
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

const orderSchema = new mongoose.Schema({
	userId: {
		type: String,
		ref: "user",
		required: true,
	},
	customerDeliveryInfo: {
		firstName: { type: String, required: true, trim: true },
		lastName: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true, lowercase: true },
		phone: { type: String, required: true, trim: true },
		street: { type: String, required: true, trim: true },
		city: { type: String, required: true, trim: true },
		state: { type: String, required: true, trim: true },
		postalCode: { type: String, required: true, trim: true },
		country: { type: String, required: true, trim: true },
	},
	orderedItems: {
		type: [orderedItemSchema],
		default: [],
	},
	totalAmount: {
		type: Number,
		required: true,
		min: 0,
	},
	paymentMethod: {
		type: String,
		required: true,
		trim: true,
	},
	paymentStatus: {
		type: String,
		required: true,
		trim: true,
		default: "Pending",
	},
	orderStatus: {
		type: String,
		default: "Food Processing",
		trim: true,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
});

const Order = mongoose.models.order || mongoose.model("order", orderSchema);

export default Order;
