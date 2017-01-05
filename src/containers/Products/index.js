import React, { Component } from 'react'
import { Link } from 'react-router'
import ProductsTable from '../../components/ProductsTable'
import {graphql} from 'graphql'
import Schema from '../../graphql/Schema'

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  componentWillMount() {
    var query = 'query{ products {id, name, category, brand} }'
    graphql(Schema, query).then(result => this.setState({products: result.data.products}))
  }

  render() {
    return (
      <div>
        <Link to="/products/new">Add Product</Link>
        <ProductsTable products={this.state.products}/>
        {this.props.children}
      </div>
    );
  }
}

export default Products
