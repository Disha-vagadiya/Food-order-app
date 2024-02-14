// // import React, { useEffect, useState } from 'react';
// // import Header from './components/Header';
// // import Meals from './components/Meals';
// // import { CartContextProvider } from './store/CartContext.jsx';
// // import { UserProgressContextProvider } from './store/UserProgressContext.jsx';
// // import Cart from './components/Cart.jsx';
// // import Checkout from './components/Checkout.jsx';
// // import SignupPage from './components/SignupPage'; // Import the SignupPage component
// // import { Route, Router } from 'react-router-dom';

// // function App() {
// //   const [isUserSignedUp, setIsUserSignedUp] = useState(false);

// //   useEffect(() => {
   
// //     const storedStatus = localStorage.getItem('isUserSignedUp');
// //     if (storedStatus) {
// //       setIsUserSignedUp(JSON.parse(storedStatus));
// //     }
// //   }, []);

// //   const handleSignupSuccess = () => {
// //     setIsUserSignedUp(true);

// //     localStorage.setItem('isUserSignedUp', JSON.stringify(true));
// //   };

// //   return (
// //     <Router>
// //     <UserProgressContextProvider>
// //       <CartContextProvider>
// //              <Route path="singup" exact>
// //         {isUserSignedUp ? (
// //           <>
// //             <Header />
// //             <Meals />
// //             <Cart />
// //             <Checkout />
// //           </>
// //         ) : (
// //           <SignupPage onSignupSuccess={handleSignupSuccess} />
// //         )}
// //           </Route>
       

// //       </CartContextProvider>
// //     </UserProgressContextProvider>
// //     </Router>
// //   );
// // }

// // export default App;

// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom'; // Import BrowserRouter and Route
// import Header from './components/Header';
// import Meals from './components/Meals';
// import { CartContextProvider } from './store/CartContext.jsx';
// import { UserProgressContextProvider } from './store/UserProgressContext.jsx';
// import Cart from './components/Cart.jsx';
// import Checkout from './components/Checkout.jsx';
// import SignupPage from './components/SignupPage'; // Import the SignupPage component

// function App() {
//   const [isUserSignedUp, setIsUserSignedUp] = useState(false);

//   useEffect(() => {
//     const storedStatus = localStorage.getItem('isUserSignedUp');
//     if (storedStatus) {
//       setIsUserSignedUp(JSON.parse(storedStatus));
//     }
//   }, []);

//   const handleSignupSuccess = () => {
//     setIsUserSignedUp(true);
//     localStorage.setItem('isUserSignedUp', JSON.stringify(true));
//   };

//   return (
//     <Router> 
//       <UserProgressContextProvider>
//         <CartContextProvider>
//           <Route path="/" exact>
//             {isUserSignedUp ? (
//               <>
//                 <Header />
//                 <Meals />
//                 <Cart />
//                 <Checkout />
//               </>
//             ) : (
//               <SignupPage onSignupSuccess={handleSignupSuccess} />
//             )}
//           </Route>
//         </CartContextProvider>
//       </UserProgressContextProvider>
//     </Router>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
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
    localStorage.setItem('isUserSignedUp', JSON.stringify(true));
  };

  return (
    <Router>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Routes>
            <Route path="/meals"  element={isUserSignedUp ? (
              <>
                <Header />
                <Meals /> 
                <Cart />
                <Checkout />
              </>
            ) : (
              
              <SignupPage onSignupSuccess={handleSignupSuccess} />
            )} />

        <Route path="/" element={<SignupPage />} />
          </Routes>
        </CartContextProvider>
      </UserProgressContextProvider>
    </Router>
  );
}

export default App;



