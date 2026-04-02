import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './Header';

import './App.css';
import AboutUs from './AboutUs';
import CartItem from './CartItem';
import ProductList from './ProductList';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <div className="landing">
            <div className="landing-content">
              <h1>Paradise Nursery</h1>
              <p>Bringing nature into your home with the finest houseplants.</p>
              <Link to="/products">
                <button className="get-started-btn">Get Started</button>
              </Link>
            </div>
          </div>
        } />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
    </Router>
  );
}

export default App;