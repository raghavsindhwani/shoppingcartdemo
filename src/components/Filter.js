import React, { Component } from 'react';
import axios from 'axios';
import '../styles/filter.css';

export default class Filter extends Component {

    constructor() {
        super();
        this.state = { filters:[]};
    }
    componentWillMount() {
        axios.get("https://xebiascart.herokuapp.com/filters")
        .then((response) => {
            this.setState({ filters: response.data })
        })
    };


   Brandfilter = (filters) => {
        return (
            filters.map((filter) => {
                return (
                    filter.type === 'BRAND' ?

                        filter.values.map((value) => <option key={value.title}>{value.value}</option>) : null
                )

            })
        )
    }
    Colorfilter = (filters) => {
        return (
            filters.map((filter) => {
                return (
                    filter.type === 'COLOUR' ?

                        filter.values.map((value) => <option key={value.color}>{value.title}</option>) : null
                )

            })
        )
    }
    maxPricefilter= (filters) => {
        return (
            filters.map((filter) => {
                return (
                    filter.type === 'PRICE' ?

                        filter.values.map((value) => {
                            return (
                                value.key > 2000 || value.key === "Max" ?
                                    <option key={value.key}>{value.displayValue}</option> : null)
                        }) : null
                )

            })
        )
    }

    minPricefilter = (filters) => {
        return (
            filters.map((filter) => {
                return (
                    filter.type === 'PRICE' ?

                        filter.values.map((value) => {
                            return (
                                value.key < 2000 || value.key === "Min" ?
                                    <option key={value.key}>{value.displayValue}</option> : null)
                        }) : null
                )

            })
        )
    }

    render() {
        return (
            <div className="filter">
                    <div className="filterbrand">
                        <label>Brand
                        <select className="form" value = {this.props.brand} key='brands' onChange={this.props.handleBrandChange}>
                            {this.Brandfilter(this.state.filters)}
                        </select>
                        </label>
                    </div>
                    <div className="filtercolor">
                        <label>Color
                        <select className="form" value = {this.props.color} key='color' onChange={this.props.handleColorChange}>
                            {this.Colorfilter(this.state.filters)}
                        </select>
                        </label>
                    </div>
                    <div className="filtermax">
                        <label>Min Price
                        <select className="form" value= {this.props.minPrice} key='min-price' onChange={this.props.handleMinPriceChange}>
                            {this.minPricefilter(this.state.filters)}
                        </select>
                        </label>
                    </div>
                    <div className="filtermax">
                        <label>Max Price
                        <select className="form" value= {this.props.maxPrice} key='max-price' onChange={this.props.handleMaxPriceChange} >
                            {this.maxPricefilter(this.state.filters)}
                        </select>
                        </label>
                    </div>
                        <div>
                            <button className="filterB" onClick={this.props.filterSubmitHandler} >Reset Filter</button>
                        </div>
                    </div>
        )
    }
}
