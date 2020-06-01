import React, { Component } from 'react';
import '../styles/Products.css';
export default class Products extends Component {

    render() {
        const productItems = this.props.products.map(product => (
        <div className="top" key={product.id}>
                <div className="gallery">
                        <img src={product.image} alt={product.title} />
                        <div className="top-right">{product.discount > 0 ? product.discount: null}</div>
                        <div className="des">{product.title}</div>
                        <div>{product.brand}</div>
                        <p>{product.colour.title}</p>                        
                    <b>{product.price.final_price}</b>
                    <hr/>
                    <button className="butn" onClick={(e)=>this.props.handleAddToCart(e, product)}>Add to cart</button>
                    
                </div>
            </div>
        ));

        return (
            <div className="row">
                {productItems}
            </div>
        )
    }
}
