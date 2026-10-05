import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const items =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(items);
  }, []);

  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: (item.quantity || 1) + 1,
          }
        : item
    );

    saveCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: (item.quantity || 1) - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item._id !== id
    );

    saveCart(updatedCart);
  };

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-green-700 mb-8">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-8 text-center">

          <h2 className="text-2xl font-bold text-gray-700">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mt-2">
            Add some products from the marketplace.
          </p>

          <Link
            to="/marketplace"
            className="inline-block mt-6 bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </Link>

        </div>
      ) : (
        <div>

          <div className="space-y-4">

            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow rounded-xl p-5"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                  <div className="flex items-center gap-4">

                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}

                    <div>
                      <h2 className="text-xl font-bold">
                        {item.name}
                      </h2>

                      <p className="text-green-700 font-semibold mt-1">
                        ₦{Number(
                          item.price || 0
                        ).toLocaleString()}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <button
                      onClick={() =>
                        decreaseQuantity(item._id)
                      }
                      className="w-10 h-10 bg-gray-200 rounded-lg font-bold"
                    >
                      −
                    </button>

                    <span className="font-bold text-lg w-8 text-center">
                      {item.quantity || 1}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item._id)
                      }
                      className="w-10 h-10 bg-green-700 text-white rounded-lg font-bold"
                    >
                      +
                    </button>

                  </div>

                  <div className="text-right">

                    <p className="font-bold text-lg">
                      ₦{(
                        Number(item.price || 0) *
                        Number(item.quantity || 1)
                      ).toLocaleString()}
                    </p>

                    <button
                      onClick={() =>
                        removeItem(item._id)
                      }
                      className="text-red-600 text-sm mt-2"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

          <div className="bg-white shadow rounded-xl p-6 mt-8">

            <div className="flex justify-between text-2xl font-bold">
              <span>Grand Total:</span>

              <span className="text-green-700">
                ₦{total.toLocaleString()}
              </span>
            </div>

            <Link
              to="/marketplace"
              className="block text-center border-2 border-green-700 text-green-700 py-3 rounded-lg font-bold mt-6"
            >
              Continue Shopping
            </Link>

            <Link
              to="/checkout"
              className="block text-center bg-green-700 text-white py-3 rounded-lg font-bold mt-3"
            >
              Proceed to Checkout
            </Link>

          </div>

        </div>
      )}

    </div>
  );
}

export default Cart;
