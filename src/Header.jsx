import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#2e7d32', color: 'white' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>Paradise Nursery</Link>
      <div>
        <Link to="/products" style={{ color: 'white', marginRight: '1rem' }}>Plants</Link>
        <Link to="/cart" style={{ color: 'white' }}>
          <FaShoppingCart />
          <span style={{ marginLeft: '5px', backgroundColor: 'red', borderRadius: '50%', padding: '2px 6px' }}>{totalItems}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Header;