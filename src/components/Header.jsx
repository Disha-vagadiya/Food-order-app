import React, { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

    // const handlesignout =()=>{
    //   localStorage.removeItem('isUserSignedUp');
    //   localStorage.removeItem('full_name');
    //   localStorage.removeItem('isLoggedIn');
    // }
  

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav >
        <Button onClick={handleShowCart}>Cart ({totalCartItems})</Button>
        </nav>
        {/* <nav>        
          <Button onclick={handlesignout}>signout</Button>
        </nav> */}

     
    </header>
  );
}
