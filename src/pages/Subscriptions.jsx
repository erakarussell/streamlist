import { useState } from "react";
import data from "../Data";

function Subscriptions({ cart, setCart }) {
  const [warning, setWarning] = useState("");

  const addToCart = (product) => {
    // Only one subscription can be in the cart at a time
    if (product.type === "subscription") {
      const existingSubscription = cart.find(
        (item) => item.type === "subscription"
      );

      if (existingSubscription) {
        setWarning(
          "Only one subscription can be added to the cart at a time."
        );
        return;
      }

      setCart([...cart, { ...product, quantity: 1 }]);
      setWarning("");
      return;
    }

    // Accessories can have multiple quantities
    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    setWarning("");
  };

  return (
    <div>
      <h1>Subscriptions</h1>

      <p>
        Choose a subscription or EZ Tech accessory to add to your cart.
      </p>

      {warning && <p className="warning">{warning}</p>}

      <div className="product-list">
        {data.map((product) => (
          <div className="product-card" key={product.id}>
            <h2>{product.name}</h2>

            <p>${product.price.toFixed(2)}</p>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscriptions;