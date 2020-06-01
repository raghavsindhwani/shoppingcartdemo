import React from 'react'
import '../styles/Navbar.css';


const NavBarView = (props) => {
    return (
        <nav className="navmain">
            <div className="navleft">
                <h3>Products </h3>
            </div>
            <div className="navmiddlesearch">
                <label>Search here: </label>
                <input type="text" onChange={props.searchHandler}/>
            </div>
            <div className="navright">
            <h3>{props.fullName}</h3>
            <h3>My Cart</h3>
            </div>
        </nav>
    )
}


export default NavBarView;