import React, { useContext, useEffect, useState } from 'react';
import Modal from './UI/Modal.jsx';
import CartContext from '../store/CartContext.jsx';
import { currencyFormatter } from '../util/formatting.js';
import Input from './UI/Input.jsx';
import Button from './UI/Button.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import useHttp from './hooks/useHttp.js';
import Error from './Error.jsx';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0); 
  const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

  useEffect(() => {
    let totalDiscountPercentage = 0;

    if (cartTotal >= 300) {
      totalDiscountPercentage += 0.3; 
    } else if (cartTotal >= 200) {
      totalDiscountPercentage += 0.2; 
    }

   
    if (couponCode === '20OFF') {
      totalDiscountPercentage += 0.2;
    }else if(couponCode === '30OFF'){
      totalDiscountPercentage += 0.3;
    }else if( couponCode === '440OFF'){
      totalDiscountPercentage  += 0.5;
    }

  
    totalDiscountPercentage = Math.min(totalDiscountPercentage, 1);

   
    setDiscountPercentage(totalDiscountPercentage);
  }, [cartTotal, couponCode]);

  function handleClose() {
    userProgressCtx.hideCheckOut();
  }

  function handleFinish() {
    userProgressCtx.hideCheckOut();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData
        }
      })
    );
  }

  let actions = (
    <>
      <Button type="button" onClick={handleClose}>Close</Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details via email within the next few minutes.</p>
        <p className="modal-actions"><Button type="button" onClick={handleFinish}>Okay</Button></p>
      </Modal>
    );
  }

  return (
    <Modal className='checkout' open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2 style={{ fontSize: 27 }}>Checkout</h2>
        <p style={{ fontWeight: 'bold', fontSize: 23 }}>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input
          label="Coupon Code"
          type="text"
          id="coupon-code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <div>
          <p style={{ fontSize: 26, color: 'red',fontWeight:'bold', backgroundColor: 'yellow', width: '80%' }}>
            Total Amount: {currencyFormatter.format(cartTotal * (1 - discountPercentage))}
            (Discount: {discountPercentage * 100}%)
          </p>
        </div>

        <Input label="Full Name" type="text" id="name"  required/>
        <Input label="E-Mail Address" type="email" id="email"  required />
        <Input label="Street" type="text" id="street"  required />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code"  required/>
          <Input label="City" type="text" id="city"   required />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">
          {actions}
        </p>
      </form>
    </Modal>
  );
}

