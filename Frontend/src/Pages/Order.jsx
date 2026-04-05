import React, { useContext } from "react";
import Title from "../Components/Title";
import { foodContext } from "../Context/foodContext";
import { toast } from "react-toastify";

const Order = () => {
  const { orderItems, currency, fetchOrderItems } = useContext(foodContext);

  const safeOrders = Array.isArray(orderItems) ? orderItems.filter(Boolean) : [];

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString();
  };

  const formatOrderStatus = (orderStatus) => orderStatus || "Food Processing";

  const getCustomerName = (customer) => {
    if (!customer) return "-";
    return `${customer.firstName || ""} ${customer.lastName || ""}`.trim() || "-";
  };

  const getAddress = (customer) => {
    if (!customer) return "-";

    return [customer.street, customer.city, customer.state, customer.zipcode, customer.country]
      .filter(Boolean)
      .join(", ") || "-";
  };

  const handleTrackOrder = async () => {
    const previousOrderIds = safeOrders.map((order) => order?._id).filter(Boolean);
    const latestOrders = await fetchOrderItems();
    const refreshedOrders = Array.isArray(latestOrders) ? latestOrders.filter(Boolean) : [];

    const removedOrders = previousOrderIds.filter(
      (previousOrderId) => !refreshedOrders.some((order) => order?._id === previousOrderId)
    );

    if (removedOrders.length > 0) {
      toast.info("This order was cancelled by admin");
      return;
    }

    toast.success("Order status updated");
  };

  if (safeOrders.length === 0) {
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
        {safeOrders.map((order, orderIndex) => {
          const customer = order?.customer || {};
          const orderedItems = Array.isArray(order?.orderedItems)
            ? order.orderedItems.filter(Boolean)
            : [];
          const paymentStatusLabel = order?.paymentStatus || "Pending";
          const orderStatusLabel = formatOrderStatus(order?.orderStatus);

          return (
            <div key={order?._id || orderIndex} className="rounded-lg border p-4 shadow-sm">
              {/* Order top details */}
              <div className="mb-4 flex flex-col gap-2 text-sm text-gray-700 sm:text-base">
                <p>
                  <span className="font-medium">Customer:</span>{" "}
                  {getCustomerName(customer)}
                </p>

                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {customer?.phone || "-"}
                </p>

                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {getAddress(customer)}
                </p>

                <p>
                  <span className="font-medium">Date:</span>{" "}
                  <span className="text-gray-500">
                    {formatDate(order?.createdDate || order?.createdAt)}
                  </span>
                </p>

                <p>
                  <span className="font-medium">Payment Method:</span>{" "}
                  <span className="text-gray-500">{order?.paymentMethod || "-"}</span>
                </p>

                <p>
                  <span className="font-medium">Payment Status:</span>{" "}
                  <span className="text-gray-500">{paymentStatusLabel}</span>
                </p>

                <p>
                  <span className="font-medium">Order Status:</span>{" "}
                  <span className="text-gray-500">{orderStatusLabel}</span>
                </p>

                <p>
                  <span className="font-medium">Total Amount:</span>{" "}
                  <span className="text-gray-500">
                    {currency}
                    {Number(order?.totalAmount || 0)}
                  </span>
                </p>
              </div>

              {/* Ordered food items */}
              <div className="space-y-4">
                {orderedItems.length > 0 ? (
                  orderedItems.map((item, itemIndex) => (
                    <div
                      key={item?._id || item?.foodId || itemIndex}
                      className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                      <div className="flex items-start gap-6 text-sm">
                        <img
                          className="w-16 sm:w-20"
                          src={Array.isArray(item?.image) ? item.image[0] : item?.image}
                          alt={item?.name || "Ordered item"}
                        />

                        <div>
                          <p className="sm:text-base font-medium">{item?.name || "-"}</p>

                          <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                            <p>
                              {currency}
                              {Number(item?.price || 0)}
                            </p>
                            <p>Quantity: {item?.quantity || 0}</p>
                          </div>

                          <p className="mt-2">
                            Payment Method:{" "}
                            <span className="text-gray-500">{order?.paymentMethod || "-"}</span>
                          </p>
                        </div>
                      </div>

                      <div className="md:w-1/2 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <p
                            className={`min-w-2 h-2 rounded-full ${
                              paymentStatusLabel.toLowerCase() === "paid"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></p>
                          <p className="text-sm md:text-base">
                            {paymentStatusLabel}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleTrackOrder}
                          className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer"
                        >
                          Track Order
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="py-4 text-sm text-gray-500">No items found in this order.</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Order;