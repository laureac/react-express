import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './App.scss';
import ProductScreen from './screens/ProductScreen';
import ProductsScreen from './screens/ProductsScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';


function App() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchDataAction = async () => {
      const data = await fetch('/api/products');
      const dataJSON = await data.json();
      setProducts(dataJSON)
    };
    fetchDataAction();
    
  }, []);

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };

  return (
    <BrowserRouter>

    <div className='App'>
      <div className="grid-container">
        <header className="header">
          <div className="header-links">
            <button onClick={openMenu}>&#9776;</button>
          </div>
          <div className="brand">
              <Link to="/">Swedish Candy Bar</Link>
          </div>
          <ul className="categories">
            <li>
              <Link to="/products/">Shop</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </header>
        <aside className="sidebar">
          <h3>Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
            <li>
              <Link to="/">Sour</Link>
            </li>
            <li>
              <Link to="/">Mix</Link>
            </li>
            <li>
              <Link to="/">Chocolate</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Switch>
              <Route 
                path="/products/:id" 
                render={(props)=>{
                return <ProductScreen {...props} products={products} />
                }} 
              />
              <Route path="/products/" render={(props)=>(
                <ProductsScreen products={products} />
              )} />
              <Route path="/" exact={true} component={HomeScreen}/>
              <Route path="/cart" component={CartScreen}/>
            </Switch>
          </div>
        </main>
        <footer className="footer">All right reserved.</footer>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
