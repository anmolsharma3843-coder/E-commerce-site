const OrderDetailsModal = ({ order, users, onClose }) => {
  if (!order) return null;

  const user = users.find(
    (u) => u._id.toString() === order.userId.toString()
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 w-[90%] max-w-3xl rounded-2xl p-6 shadow-lg overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold dark:text-white">
            Order Details
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 font-bold text-lg sticky"
          >
            ✕
          </button>
        </div>

        {/* Order Info */}
        <div className="space-y-3 text-sm dark:text-gray-300">
          <p><strong>Order ID:</strong> #{order._id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p className="font-bold underline"><strong>Total:</strong> ₹{order.totalAmount}</p>
          <p><strong>Payment:</strong> {order.paymentMethod}</p>
        </div>

        {/* User */}
        <div className="mt-4 flex items-center gap-1.5">
          <h3 className="font-semibold dark:text-white">User:</h3>
          <p className="text-sm dark:text-gray-300">
            {user?.username || "Unknown User"}
          </p>
        </div>

        {/* Address */}
        <div className="mt-4 flex items-center gap-1.5">
          <h3 className="font-semibold dark:text-white">Address:</h3>
          <p className="text-sm dark:text-gray-300">
             {order.address?.address}, {order.address?.city}
          </p>
        </div>

        {/* Items */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2 dark:text-white">Items</h3>

          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex gap-3 border p-3 rounded-xl dark:border-gray-700"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-16 h-16 object-contain bg-gray-100 rounded"
                />

                <div className="flex-1">
                  <p className="font-medium dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>

                <div className="font-semibold dark:text-white">
                  ₹{item.price * item.qty}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetailsModal;