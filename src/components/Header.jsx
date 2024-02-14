import React, { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import { useNavigate } from 'react-router-dom'; 
import SignupPage from './SignupPage.jsx';
export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const navigate = useNavigate(); 
  function handleShowCart() {
    userProgressCtx.showCart();
  }

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  const handleSignOut = () => {
    localStorage.removeItem('isUserSignedUp');
    localStorage.removeItem('full_name');
    localStorage.removeItem('isLoggedIn');
    navigate('/'); 
    console.log(handleSignOut)
  };

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav >
        <Button onClick={handleShowCart}>Cart ({totalCartItems})</Button>
        <Button style={{ margin:20, color:'red',background:'white' }}onClick={handleSignOut}>SignOut</Button>
      </nav>
     
    </header>
  );
}
