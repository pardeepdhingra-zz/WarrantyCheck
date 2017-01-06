import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ProductRow from '../ProductRow'

const ProductsTable = ({products}) => {
	return (
		<Row className="res-table form-inner">
			<Col sm={12} className="no-padding">
				<Row>
					<Col sm={1}>
						CATEGORY
					</Col>
					<Col sm={1}>
						BARCODE
					</Col>
          <Col sm={1}>
						MANUFACTURER
					</Col>
					<Col sm={1}>
						SELLER
					</Col>
					<Col sm={1}>
						SELLER_NAME
					</Col>
					<Col sm={1}>
						TIN_SERVICE_TAG
					</Col>
					<Col sm={1}>
						PURCHASE_DATE
					</Col>
          <Col sm={1}>
						BRAND
					</Col>
          <Col sm={1}>
						MODEL_NAME
					</Col>
          <Col sm={1}>
						INVOICE
					</Col>
				</Row>
				{products.map((product, i) =>
						<ProductRow product={product} key={i} />
				)}
			</Col>
		</Row>
	)
}

export default ProductsTable
