import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);

  // Calculate total cart amount
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.cost.substring(1));
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  // Calculate subtotal for a single plant type
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

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Shopping Cart</h2>
        <p>Your cart is empty.</p>
        <button onClick={handleContinueShopping}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Shopping Cart</h2>
      <div>
        {cartItems.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '1rem', gap: '1rem' }}>
            <img src={item.thumbnail} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <h3>{item.name}</h3>
              <p>Unit Price: {item.cost}</p>
              <p>Item Total: ${calculateItemTotal(item)}</p>
            </div>
            <div>
              <button onClick={() => handleDecrement(item)}>-</button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
              <button onClick={() => handleRemove(item)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2rem', textAlign: 'right' }}>
        <p>Total Plants: {cartItems.reduce((sum, i) => sum + i.quantity, 0)}</p>
        <p>Total Cost: ${calculateTotalAmount()}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button onClick={handleContinueShopping}>Continue Shopping</button>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
