function Cart({ cart, setCart }) {
  // Increase quantity for accessories only
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.type === "accessory") {
        return { ...item, quantity: item.quantity + 1 };
      }

      return item;
    });

    setCart(updatedCart);
  };

  // Decrease quantity, but do not go below 1
  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setCart(updatedCart);
  };

  // Remove an item completely from the cart
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // Calculate the total price of all items
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <h2>{item.name}</h2>

                <p>Price: ${item.price.toFixed(2)}</p>

                <p>Quantity: {item.quantity}</p>

                <p>
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>

                <div className="cart-buttons">
                  {item.type === "accessory" && (
                    <>
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>

                      <button onClick={() => increaseQuantity(item.id)}>
                        +
                      </button>
                    </>
                  )}

                  <button onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="cart-total">
            Total: ${totalPrice.toFixed(2)}
          </h2>
        </>
      )}
    </div>
  );
}

export default Cart;