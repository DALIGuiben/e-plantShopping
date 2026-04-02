import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/CartSlice';

// Sample plant data (at least 6 items, 3+ categories)
const plantsData = {
  "Aromatic Plants": [
    { id: "lavender", name: "Lavender", cost: "$15", thumbnail: "/images/lavender.jpg", category: "Aromatic" },
    { id: "rosemary", name: "Rosemary", cost: "$12", thumbnail: "/images/rosemary.jpg", category: "Aromatic" },
  ],
  "Medicinal Plants": [
    { id: "aloe-vera", name: "Aloe Vera", cost: "$18", thumbnail: "/images/aloe.jpg", category: "Medicinal" },
    { id: "tulsi", name: "Holy Basil (Tulsi)", cost: "$10", thumbnail: "/images/tulsi.jpg", category: "Medicinal" },
  ],
  "Air Purifiers": [
    { id: "snake-plant", name: "Snake Plant", cost: "$25", thumbnail: "/images/snake.jpg", category: "Air Purifier" },
    { id: "spider-plant", name: "Spider Plant", cost: "$20", thumbnail: "/images/spider.jpg", category: "Air Purifier" },
  ],
};

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const isInCart = (id) => cartItems.some(item => item.id === id);

  const handleAddToCart = (plant) => {
    dispatch(addItem({
      id: plant.id,
      name: plant.name,
      cost: plant.cost,
      thumbnail: plant.thumbnail,
    }));
  };

  return (
    <div className="product-list">
      {Object.entries(plantsData).map(([category, plants]) => (
        <div key={category} className="category-section">
          <h2>{category}</h2>
          <div className="plants-grid">
            {plants.map(plant => (
              <div key={plant.id} className="plant-card">
                <img src={plant.thumbnail} alt={plant.name} />
                <h3>{plant.name}</h3>
                <p>{plant.cost}</p>
                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={isInCart(plant.id)}
                  className={isInCart(plant.id) ? "added-btn" : "add-btn"}
                >
                  {isInCart(plant.id) ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductList;