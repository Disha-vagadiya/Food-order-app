import React from 'react';
import Button from './UI/Button';
import { useContext } from 'react';
import CartContext from '../store/CartContext';

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem(meal); // Pass the meal to addItem
  }

  return (
    <li className='meal-item'>
      <article>
        <img src={`../backend/public/${meal.image}`} alt={meal.name}></img>
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">${meal.price}</p>
          <p className='meal-item-description'>{meal.description}</p>
        </div>
        <p className='meal-item-actions'>
          <Button onClick={handleAddMealToCart}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}
