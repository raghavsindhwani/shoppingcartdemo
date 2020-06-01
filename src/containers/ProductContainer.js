import React from 'react';
import Products from '../components/Products';
import Filter from '../components/Filter';

const ProductContainer = (props) => {
    const { handleColorChange, handleBrandChange, handleMinPriceChange, handleMaxPriceChange, filterSubmitHandler, products, handleAddToCart}=props;
    return (
        <div className="filter">
            <Filter
              handleColorChange={handleColorChange} handleBrandChange={handleBrandChange}
              handleMinPriceChange={handleMinPriceChange} handleMaxPriceChange={handleMaxPriceChange}
              filterSubmitHandler={filterSubmitHandler} />
            <hr />
            <Products products={products} handleAddToCart={handleAddToCart} />
        </div>
    )
};

export default ProductContainer;