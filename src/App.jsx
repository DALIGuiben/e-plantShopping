import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

// Separate component for landing page with navigate
function LandingPage() {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/products');
  };
  return (
    <div className="landing">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p>Bringing nature into your home with the finest houseplants.</p>
        <button onClick={handleGetStarted} className="get-started-btn">
          Get Started
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
    </Router>
  );
}

export default App;
