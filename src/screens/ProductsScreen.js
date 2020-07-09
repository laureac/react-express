import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';

function ProductsScreen(props) {
 
    const products = props.products
    const checkQty = (product) =>{
        state.cart.find(x => x.product._id === product._id) ? alert('product already in cart') : handleAddToCart(product)
    }
   
    const qty = 1;

    const handleAddToCart = (product) => {
        dispatch({
        type: 'ADD_CART',
        payload: {product}
      })
  };
  const { state, dispatch } = useContext(Store);

    return (
        <div>
            <h1>Shop</h1>
            <ul className="products">
                {products.map((product) => (
                    <li key={product._id}>
                        <div className="product">
                            <Link to={'/products/' + product._id}>
                            <img
                                className="product-image"
                                src={product.image}
                                alt={product.name}
                            />
                            </Link>
                            <div className="product-name">
                            <Link to={'/products/' + product._id}>{product.name}</Link>
                            </div>
                            <div>{product.description}</div>
                            <div className="product-price">
                                <div>${product.price}</div>
                                {product.countInStock ? 
                                <button  onClick={() => checkQty(product)}>+</button> 
                                : 
                                <div>coming soon</div>}
                            </div>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductsScreen;

