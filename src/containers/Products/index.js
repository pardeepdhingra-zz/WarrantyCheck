import React, { Component } from 'react'
import { Link } from 'react-router'
import ProductsTable from '../../components/ProductsTable'

let products = [
    {
      category: "TV",
      brand: "Videocon",
      barcode: "1231314324",
      manufacturer: "Videocon",
      seller_id: null,
      seller_name: null,
      tin_service_tag: null,
      purchase_date: '23/1/2016',
      model_name: "LED40VBIKL"
    }
]

class Products extends Component {
  render() {
    return (
      <div>
        <Link to="/products/new">Add Product</Link>
        <ProductsTable products={products}/>
        {this.props.children}
      </div>
    );
  }
}

export default Products
