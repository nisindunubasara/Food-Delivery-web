import React, { useContext } from "react";
import Title from "../Components/Title";
import { foodContext } from "../Context/foodContext";

const Order = () => {
  const { orderItems, currency } = useContext(foodContext);

  if (!orderItems || orderItems.length === 0) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text={"MY ORDERS"} />
        </div>
        <p className="mt-6 text-gray-500">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text={"MY ORDERS"} />
      </div>

      <div className="mt-6 space-y-8">
        {orderItems.map((order, orderIndex) => (
          <div key={orderIndex} className="rounded-lg border p-4 shadow-sm">
            {/* Order top details */}
            <div className="mb-4 flex flex-col gap-2 text-sm text-gray-700 sm:text-base">
              <p>
                <span className="font-medium">Customer:</span>{" "}
                {order.customer.firstName} {order.customer.lastName}
              </p>

              <p>
                <span className="font-medium">Phone:</span>{" "}
                {order.customer.phone}
              </p>

              <p>
                <span className="font-medium">Address:</span>{" "}
                {order.customer.street}, {order.customer.city},{" "}
                {order.customer.state}, {order.customer.zipcode},{" "}
                {order.customer.country}
              </p>

              <p>
                <span className="font-medium">Date:</span>{" "}
                <span className="text-gray-500">
                  {new Date(order.createdDate).toLocaleDateString()}
                </span>
              </p>

              <p>
                <span className="font-medium">Payment Method:</span>{" "}
                <span className="text-gray-500">{order.paymentMethod}</span>
              </p>

              <p>
                <span className="font-medium">Total Amount:</span>{" "}
                <span className="text-gray-500">
                  {currency}
                  {order.totalAmount}
                </span>
              </p>
            </div>

            {/* Ordered food items */}
            <div className="space-y-4">
              {order.orderedItems.map((item, itemIndex) => (
                <div
                  key={item._id || itemIndex}
                  className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex items-start gap-6 text-sm">
                    <img
                      className="w-16 sm:w-20"
                      src={Array.isArray(item.image) ? item.image[0] : item.image}
                      alt={item.name}
                    />

                    <div>
                      <p className="sm:text-base font-medium">{item.name}</p>

                      <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                        <p>
                          {currency}
                          {item.price}
                        </p>
                        <p>Quantity: {item.quantity}</p>
                      </div>

                      <p className="mt-2">
                        Payment Method:{" "}
                        <span className="text-gray-500">{order.paymentMethod}</span>
                      </p>
                    </div>
                  </div>

                  <div className="md:w-1/2 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <p
                        className={`min-w-2 h-2 rounded-full ${
                          order.paymentStatus ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></p>
                      <p className="text-sm md:text-base">
                        {order.paymentStatus ? "Paid" : "Pending"}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;