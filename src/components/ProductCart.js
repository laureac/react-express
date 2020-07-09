import React, { useState, useContext} from 'react';
import CartScreen from '../screens/CartScreen';
import { Store } from '../Store';

function ProductCart(props) {

    const product = props.product.product
    let [totalPrice, setTotalPrice] = useState(product.price)
    const { state, dispatch } = useContext(Store);


    return (
        <div key={product._id} className='product-row'>
            <div>
                {product.name}
            </div>
            <img src={product.image} alt={product.name}/>
            <div>
                {product.price}
            </div>
            <div>
                < select
                    onChange = {(e)=>
                    setTotalPrice(e.target.value*product.price)
                    }
                >
                    {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                            {x + 1}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                {totalPrice}
            </div>
            <button >Remove</button>
        </div>
    );
}

export default ProductCart;