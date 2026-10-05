import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get(`/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrder(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadOrder();
  }, [id]);

  if (!order) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700">
        Order Details
      </h1>

      <div className="bg-white shadow rounded-xl p-6 mt-6">
        <p><strong>Order Number:</strong> {order.orderNumber}</p>

        <p><strong>Status:</strong> {order.orderStatus}</p>

        <p><strong>Total:</strong> ₦{order.totalAmount?.toLocaleString()}</p>

        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      <hr className="my-6" />

<h2 className="text-xl font-bold mb-4">
  Ordered Items
</h2>

<div className="space-y-3">
  {order.items?.map((item) => (
    <div
      key={item.product}
      className="border rounded-lg p-4 flex justify-between"
    >
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p>Quantity: {item.quantity}</p>
      </div>

      <div className="font-bold">
        ₦{item.price?.toLocaleString()}
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  );
}

export default OrderDetails;
