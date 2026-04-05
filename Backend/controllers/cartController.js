
import Cart from "../models/cartModel.js";


const addCartItem = async (req, res) => {
	try {
		const { userId, foodId, name, price, image, quantity } = req.body;

		if (!userId || !foodId || !name || price === undefined || !image) {
			return res.json({ success: false, message: "Missing required cart item data" });
		}

		const itemQuantity = Number(quantity) > 0 ? Number(quantity) : 1;

		let cart = await Cart.findOne({ userId });

		if (!cart) {
			cart = new Cart({
				userId,
				items: [{
					foodId,
					name,
					price: Number(price),
					image,
					quantity: itemQuantity,
				}],
			});
		} else {
			const itemIndex = cart.items.findIndex(
				(item) => item.foodId.toString() === foodId.toString()
			);

			if (itemIndex !== -1) {
				cart.items[itemIndex].quantity += itemQuantity;
			} else {
				cart.items.push({
					foodId,
					name,
					price: Number(price),
					image,
					quantity: itemQuantity,
				});
			}
		}

		await cart.save();

		res.json({ success: true, message: "Item added to cart", cart });
	} catch (error) {
		console.log(error)
		res.json({ success: false, message: error.message })
	}
}


const listCartItems = async (req, res) => {
	try {
		const userId = req.query.userId || req.body.userId;

		if (!userId) {
			return res.json({ success: false, message: "userId is required" });
		}

		const cart = await Cart.findOne({ userId });

		res.json({ success: true, items: cart?.items || [] });
	} catch (error) {
		console.log(error)
		res.json({ success: false, message: error.message })
	}
}


const removeCartItem = async (req, res) => {
	try {
		const userId = req.body.userId || req.query.userId;
		const foodId = req.params.id || req.body.foodId;

		if (!userId || !foodId) {
			return res.json({ success: false, message: "userId and foodId are required" });
		}

		const updatedCart = await Cart.findOneAndUpdate(
			{ userId, "items.foodId": foodId },
			{ $pull: { items: { foodId } } },
			{ returnDocument: "after" }
		);

		if (!updatedCart) {
			const cart = await Cart.findOne({ userId });

			if (!cart) {
				return res.json({ success: false, message: "Cart not found" });
			}

			return res.json({ success: false, message: "Cart item not found" });
		}

		res.json({ success: true, message: "Item removed from cart", cart: updatedCart });
	} catch (error) {
		console.log(error)
		res.json({ success: false, message: error.message })
	}
}


const updateCartItem = async (req, res) => {
	try {
		const userId = req.body.userId || req.query.userId;
		const foodId = req.params.id || req.body.foodId;
		const { quantity } = req.body;

		if (!userId || !foodId || quantity === undefined) {
			return res.json({ success: false, message: "userId, foodId and quantity are required" });
		}

		const cart = await Cart.findOne({ userId });

		if (!cart) {
			return res.json({ success: false, message: "Cart not found" });
		}

		const itemIndex = cart.items.findIndex(
			(item) => item.foodId.toString() === foodId.toString()
		);

		if (itemIndex === -1) {
			return res.json({ success: false, message: "Cart item not found" });
		}

		const parsedQuantity = Number(quantity);

		if (parsedQuantity <= 0) {
			cart.items = cart.items.filter((item) => item.foodId.toString() !== foodId.toString());
		} else {
			cart.items[itemIndex].quantity = parsedQuantity;
		}

		await cart.save();

		res.json({ success: true, message: "Cart item updated", cart });
	} catch (error) {
		console.log(error)
		res.json({ success: false, message: error.message })
	}
}


export { addCartItem, listCartItems, removeCartItem, updateCartItem }