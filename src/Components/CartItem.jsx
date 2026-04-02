import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItem, updateQuantity } from '../features/CartSlice';

const CartItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);

  // Calculate total cart amount
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.cost.substring(1)); // remove '$'
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  // Subtotal for a single plant type
  const calculateItemTotal = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return (price * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ id: item.id }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ id: item.id }));
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleCheckout = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-card">
                <img src={item.thumbnail} alt={item.name} />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>Unit Price: {item.cost}</p>
                  <p>Item Total: ${calculateItemTotal(item)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                    <button className="delete-btn" onClick={() => handleRemove(item)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <p>Total Plants: {cartItems.reduce((sum, i) => sum + i.quantity, 0)}</p>
            <p>Total Cost: ${calculateTotalAmount()}</p>
            <div className="cart-buttons">
              <button onClick={handleContinueShopping}>Continue Shopping</button>
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default CartItem;