import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

// Plant data – at least 6 items in 3 categories
const plantsData = {
  "Aromatic Plants": [
    { id: "lavender", name: "Lavender", cost: "$15", thumbnail: "/images/lavender.jpg" },
    { id: "rosemary", name: "Rosemary", cost: "$12", thumbnail: "/images/rosemary.jpg" },
  ],
  "Medicinal Plants": [
    { id: "aloe-vera", name: "Aloe Vera", cost: "$18", thumbnail: "/images/aloe.jpg" },
    { id: "tulsi", name: "Holy Basil", cost: "$10", thumbnail: "/images/tulsi.jpg" },
  ],
  "Air Purifiers": [
    { id: "snake-plant", name: "Snake Plant", cost: "$25", thumbnail: "/images/snake.jpg" },
    { id: "spider-plant", name: "Spider Plant", cost: "$20", thumbnail: "/images/spider.jpg" },
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
    <div style={{ padding: '20px' }}>
      {Object.entries(plantsData).map(([category, plants]) => (
        <div key={category} style={{ marginBottom: '40px' }}>
          <h2>{category}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {plants.map(plant => (
              <div key={plant.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                <img src={plant.thumbnail} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <h3>{plant.name}</h3>
                <p>{plant.cost}</p>
                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={isInCart(plant.id)}
                  style={{
                    backgroundColor: isInCart(plant.id) ? 'gray' : '#2e7d32',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer'
                  }}
                >
                  {isInCart(plant.id) ? 'Added to Cart' : 'Add to Cart'}
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
