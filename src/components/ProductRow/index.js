import React from 'react'
import { Row, Col } from 'react-bootstrap'

const ProductRow = ({product}) => {
		return (
				<Row>
					<Col sm={1}>
						{product.category}
					</Col>
					<Col sm={1}>
						{product.barcode}
					</Col>
          <Col sm={1}>
						{product.manufacturer}
					</Col>
					<Col sm={1}>
						{product.seller_id}
					</Col>
					<Col sm={1}>
						{product.seller_name}
					</Col>
					<Col sm={1}>
						{product.tin_service_tag}
					</Col>
					<Col sm={1}>
						{product.purchase_date}
					</Col>
          <Col sm={1}>
						{product.brand}
					</Col>
          <Col sm={1}>
						{product.model_name}
					</Col>
          <Col sm={1}>
					</Col>
				</Row>
		)
}

export default ProductRow
