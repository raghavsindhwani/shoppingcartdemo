import React, { Component } from 'react';
import '../styles/cart.css'

export default class Cart extends Component {
    render() {
        const { cartItems } = this.props;
        
        return (
            <div className="item">
                {cartItems.length === 0
                    ? "Cart is empty" :
                    <h2>You have {cartItems.length} items in the cart <hr /></h2>
                }
                {cartItems.length > 0 &&
                    <div>
                        <ul style={{ marginLeft: -25 }}>
                            {cartItems.map(item => (
                                <li key={item.id}>
                                    <b>{item.title}</b>
                                    <button  
                                        onClick={(e) => this.props.handleRemoveFromCart(e, item)}>-</button>
                                    <br />
                                   <h3 > {item.count} x {item.price.final_price}</h3>
                                </li>))
                            }
                        </ul>
                        
                        <b style={{color: "red"}}>Total: ={cartItems.reduce((ini, sel) => (ini + sel.price.final_price * sel.count), 0)}
                        </b>
                    </div>
                }
            </div>
        )
    }
}
