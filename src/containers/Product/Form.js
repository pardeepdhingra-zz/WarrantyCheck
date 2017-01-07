import React, { Component } from 'react'
import { FormGroup, InputGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import {graphql} from 'graphql'
import Schema from '../../graphql/Schema'
import FaIcon from '../../components/FaIcon'
import SelectBox from '../../components/SelectBox'

import 'react-datepicker/dist/react-datepicker.css'

class Form extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this._handleSubmit.bind(this)
    this.state = {
      category: '',
      barcode: '',
      manufacturer: '',
      brand: '',
      model_name: '',
      purchase_date: moment(),
      seller: '',
      seller_name: '',
      tin: '',
      categories: [],
      brands: []
    }
  }

  componentWillMount(){
    let query = 'query{ categories {id, name} }'
    graphql(Schema, query).then(result => this.setState({categories: result.data.categories}))
  }

  _handleSubmit(e){

  }

  setCategory(category_id) {
    console.log(category_id)
  }

  render() {
    return (
				<form method="post" onSubmit={this.handleSubmit} className="product-form">
          <FormGroup controlId="categoryId">
            <ControlLabel>Category</ControlLabel>
            <SelectBox
              data={this.state.categories}
              action={e => this.setCategory(e)}
            />
          </FormGroup>

          <FormGroup controlId="barcode">
            <ControlLabel>Barcode</ControlLabel>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Barcode"
                onChange={e => this.setState({barcode: e.target.value})}
              />
              <InputGroup.Addon>
                <FaIcon icon="barcode" />
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>

          <FormGroup controlId="manufacturer">
            <ControlLabel>Manufacturer</ControlLabel>
            <FormControl
              type="text"
              placeholder="Manufacturer"
              onChange={e => this.setState({manufacturer: e.target.value})}
            />
          </FormGroup>

          <FormGroup controlId="purchase_date">
            <ControlLabel>Purchase Date</ControlLabel>
            <DatePicker
              dateFormat="YYYY/MM/DD"
              selected={this.state.purchase_date}
            />
          </FormGroup>

          <FormGroup controlId="brand">
            <ControlLabel>Brand</ControlLabel>
            <SelectBox data={this.state.brands} />
          </FormGroup>

          <FormGroup controlId="model_name">
            <ControlLabel>Model/Name</ControlLabel>
            <FormControl
              type="text"
              placeholder="Model/Name"
              onChange={e => this.setState({model_name: e.target.value})}
            />
          </FormGroup>

          <FormGroup controlId="sellerId">
            <ControlLabel>Seller</ControlLabel>
            <FormControl componentClass="Select" placeholder="Seller">
              <option value="select">select</option>
              <option value="#other">Other</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="seller_name">
            <ControlLabel>Seller Name</ControlLabel>
            <FormControl
              type="text"
              placeholder="Seller Name"
              onChange={e => this.setState({seller_name: e.target.value})}
            />
          </FormGroup>

          <FormGroup controlId="tin_service_tag">
            <ControlLabel>TIN/Serivce/Tag Number</ControlLabel>
            <FormControl
              type="text"
              placeholder="TIN/Serivce/Tag Number"
              onChange={e => this.setState({tin: e.target.value})}
            />
          </FormGroup>

          <FormGroup controlId="invoice">
            <ControlLabel>Attach Invoice</ControlLabel>
            <FormControl
              type="file"
              placeholder="Invoice"
            />
          </FormGroup>

          <Button
            bsStyle="warning"
            className="btn btn-orange"
            type="submit">
            Add Product <i className="fa fa-angle-double-right"></i>
          </Button>
				</form>
    );
  }
}

export default Form
