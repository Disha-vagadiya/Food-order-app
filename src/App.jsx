// import Header from "./components/Header";
// import Meals from "./components/Meals";
// import { CartContextProvider } from "./store/CartContext.jsx";
// import  { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
// import Cart from "./components/Cart.jsx";
// import Checkout from "./components/Checkout.jsx";

// function App() {
//   return (
//     <UserProgressContextProvider>
//     <CartContextProvider>
//     <Header/>
//     <Meals/>
//     <Cart/>
//     <Checkout/>
//   </CartContextProvider>
//   </UserProgressContextProvider>
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Meals from './components/Meals';
import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import SignupPage from './components/SignupPage'; // Import the SignupPage component

function App() {
  const [isUserSignedUp, setIsUserSignedUp] = useState(false);

  useEffect(() => {
   
    const storedStatus = localStorage.getItem('isUserSignedUp');
    if (storedStatus) {
      setIsUserSignedUp(JSON.parse(storedStatus));
    }
  }, []);

  const handleSignupSuccess = () => {
    setIsUserSignedUp(true);
    // Store user signup status in local storage
    localStorage.setItem('isUserSignedUp', JSON.stringify(true));
  };

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        {isUserSignedUp ? (
          <>
            <Header />
            <Meals />
            <Cart />
            <Checkout />
          </>
        ) : (
          <SignupPage onSignupSuccess={handleSignupSuccess} />
        )}
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;

