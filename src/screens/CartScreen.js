import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { Link } from 'react-router-dom';
import ProductCart from '../components/ProductCart';
import Cookie from "js-cookie";

function CartScreen(props) {
    
    const { state, dispatch } = useContext(Store);
    const cart = state.cart;
    console.log(cart)
    Cookie.set('cartItems', JSON.stringify(cart))

    return (
        <div>
            <Link to="/products/">Back to the Store</Link>
            <div>
                {
                    cart[0] ? 
                    cart.map(x => (
                        <ProductCart key={x.product._id} product={x}/>
                    ))
                    : 
                    <div>Cart empty</div>
                }
            </div>
            <div>Total</div>
                
        </div> 
    );
}


export default CartScreen;