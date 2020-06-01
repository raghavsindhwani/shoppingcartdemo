import React, { Component } from 'react';
import Cart from '../components/Cart';
import Navbar from '../components/Navbar';
import ProductContainer from './ProductContainer';
import axios from 'axios';

class ShowPage extends Component {
  constructor() {
    super();
    this.state = { color: '', brand: '', minPrice: 0, maxPrice: 0,cartItems: [], products: [], filteredProducts: [], errorMessage: '' };
  }
  componentWillMount() {

    axios.get('https://xebiascart.herokuapp.com/products')
      .catch(err => this.setState({
        errorMessage: 'Unable to Fetch Products',
      }))
      .then(res => {
        this.setState({ products: res.data});
        this.ShowProductsList();
      }).catch(err => console.log(err));
  }

  handleRemoveFromCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems.filter(carti => carti.id !== product.id);
      return { cartItems: cartItems };
    })
  }

  handleAddToCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      cartItems.forEach(clk => {
        if (clk.id === product.id) {
          clk.count = clk.count+1;
          productAlreadyInCart = true;
        }
      });

      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
      return { cartItems: cartItems };
    });
  }

  ShowProductsList = () => {
    this.setState(state => {
      if(state.brand !== '') {
        const filtering = state.products.filter(a => a.brand === state.brand);
        return { filteredProducts: filtering };
      }
      if(state.minPrice !== 0) {
        const filtering = state.products.filter(a => a.price.final_price >= state.minPrice);
        return { filteredProducts: filtering };
      }
      if(state.maxPrice !== 0) {
        const filtering = state.products.filter(a => a.price.final_price <= state.maxPrice);
        return { filteredProducts: filtering };
      }
      if (state.color !== '') {
        const filtering = state.products.filter(a => a.colour.title === state.color);
      return {filteredProducts: filtering};
    }
      return { filteredProducts: state.products };
    });
  }
  filterSubmitHandler = () => {
    this.setState({
      color: '',
      brand: '',
      minPrice: 0,
      maxPrice: 0,
    });
    this.ShowProductsList();
  }
  handleColorChange = (e) => {
    this.setState({ color: e.target.value });
    this.ShowProductsList();
  }
  handleBrandChange = (e) => {
    this.setState({ brand: e.target.value });
    this.ShowProductsList();
  }
  handleMinPriceChange = (e) => {
    this.setState({ minPrice: e.target.value});
    this.ShowProductsList();
  }
  handleMaxPriceChange = (e) => {
    this.setState({ maxPrice: e.target.value});
    this.ShowProductsList();
  }
  searchHandler = (e) => {
    e.preventDefault();
    const searchedValue = e.target.value;
    axios.get(`https://xebiascart.herokuapp.com/products?title=${searchedValue}`)
        .catch((err) => this.setState({
          errorMessage: 'Unable to find products with such title'
        }))
        .then((response) => {
            this.setState({ filteredProducts: response.data })})
        .catch(err => console.log(err));
    this.ShowProductsList();
  }


  render() {
    return (
      <div>
       { this.state.errorMessage && <h3>{this.state.errorMessage}</h3> }
      <Navbar searchHandler={this.searchHandler} fullName={this.props.location.state.details} />
      <div className="page">
        <div className="pagebelow">
          <ProductContainer 
              handleAddToCart={this.handleAddToCart}
              handleColorChange={this.handleColorChange}
              handleBrandChange={this.handleBrandChange}
              handleMinPriceChange={this.handleMinPriceChange}
              handleMaxPriceChange={this.handleMaxPriceChange}
              filterSubmitHandler={this.filterSubmitHandler}
              products={this.state.filteredProducts}
            />
          <div className="cartpage">
            <Cart cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart} />
          </div>

        </div>

      </div>
      </div>
    );
  }
}

export default ShowPage;
