import React, { useState } from 'react';
import Button from './UI/Button';
import { useContext } from 'react';
import CartContext from '../store/CartContext';
import './signpage.css'

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);
  const [showNotification, setShowNotification] = useState(false);


  function handleAddMealToCart() {
    cartCtx.addItem(meal); 

    setShowNotification(true);

  
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  }

  return (
    <li className='meal-item'>
       {showNotification && (
        <div className='notification'>
          Item added to cart successfully!
        </div>
      )}
      <article>
     
        <img src={`../backend/public/${meal.image}`} alt={meal.name}></img>
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">₹{meal.price}</p>
          <p className='meal-item-description'>{meal.description}</p>
        </div>
        <p className='meal-item-actions'>
          <Button onClick={handleAddMealToCart}>Add to cart</Button>
        </p>
      
      </article>
    </li>
  );
}
