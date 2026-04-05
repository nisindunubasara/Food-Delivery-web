import Order from "../models/orderModel.js";


const addOrder = async (req, res) => {
	try {
		const {
			userId,
			customerDeliveryInfo,
			orderedItems,
			totalAmount,
			paymentMethod,
			paymentStatus,
			orderStatus,
		} = req.body;

		if (!userId || !customerDeliveryInfo || !orderedItems || totalAmount === undefined || !paymentMethod) {
			return res.json({ success: false, message: "Missing required order data" });
		}

		const order = new Order({
			userId,
			customerDeliveryInfo,
			orderedItems,
			totalAmount: Number(totalAmount),
			paymentMethod,
			paymentStatus,
			orderStatus,
		});

		await order.save();

		res.json({ success: true, message: "Order placed successfully", order });
	} catch (error) {
		console.log(error)
		res.json({ success: false, message: error.message })
	}
}


const listOrders = async (req, res) => {
	try {
		const userId = req.query?.userId || req.body?.userId;

		const query = userId ? { userId } : {};
		const orders = await Order.find(query).sort({ createdDate: -1 });

		res.json({ success: true, orders, orderList: orders });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error.message });
	}
};


const updateOrder = async (req, res) => {
	try {
		const { paymentStatus, orderStatus, paymentMethod } = req.body;

		if (paymentStatus === undefined && orderStatus === undefined && paymentMethod === undefined) {
			return res.json({ success: false, message: "No fields provided to update" });
		}

		const updateData = {};

		if (paymentStatus !== undefined) updateData.paymentStatus = paymentStatus;
		if (orderStatus !== undefined) updateData.orderStatus = orderStatus;
		if (paymentMethod !== undefined) updateData.paymentMethod = paymentMethod;

		const updatedOrder = await Order.findByIdAndUpdate(
			req.params.id,
			updateData,
			{ new: true, runValidators: true }
		);

		if (!updatedOrder) {
			return res.json({ success: false, message: "Order not found" });
		}

		res.json({ success: true, message: "Order updated successfully", order: updatedOrder });
	} catch (error) {
		console.log(error)
		res.json({ success: false, message: error.message })
	}
}


const removeOrder = async (req, res) => {
	try {
		const deletedOrder = await Order.findByIdAndDelete(req.params.id);

		if (!deletedOrder) {
			return res.json({ success: false, message: "Order not found" });
		}

		res.json({ success: true, message: "Order removed successfully" });
	} catch (error) {
		console.log(error)
		res.json({ success: false, message: error.message })
	}
}


export { addOrder, listOrders, updateOrder, removeOrder }