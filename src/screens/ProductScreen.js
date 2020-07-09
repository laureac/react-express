import React, {useState, useEffect, useContext} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Store } from '../Store';

export default function ProductScreen() {
    
    const { state, dispatch } = useContext(Store);

    const fetchDataAction = async () => {
        const data = await fetch(
          '/api/products'
        );
        const dataJSON = await data.json();
        return dispatch({
          type: 'FETCH_DATA',
          payload: dataJSON
        });
      };
    
      useEffect(() => {
        state.products.length === 0 && fetchDataAction();
      });



    const products = state.products
    let { id } = useParams();
    
    let qty = 1;

    const product = products.find(x => x._id == id)

    const checkQty = (product, qty) =>{
        state.cart.find(x => x.product._id === product._id) ? 
        alert('product already in cart') : handleAddToCart(product, qty)
    }

    const handleAddToCart = (product, qty) => {
            dispatch({
            type: 'ADD_CART',
            payload: {product, qty}
          })
      };

   

    return (
        product ? 
        <React.Fragment>
        
        <div>
            <div className="back-to-result">
                <Link to="/products">Keep shopping</Link>
            </div>
            <div>
                <Link to="/cart">Go to cart</Link>
            </div>
            <div className="details">
                <div className="details-image">
                    <img src={product.image} alt="product"></img>
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{product.name}</h4>
                        </li>
                        <li>
                            Price: <b>${product.price}</b>
                        </li>
                        <li>
                            Description:
                            <div>{product.description}</div>
                        </li>
                    </ul>
                </div>
                <div className="details-action">
                    <ul>
                        <li>
                            Status:{' '}
                            {product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
                        </li>
                        <li>
                            {product.countInStock > 0 && (
                                <button
                                onClick={() => checkQty(product, qty)}
                                className="button primary"
                                >
                                Add to Cart
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </React.Fragment> : null
    );
}

