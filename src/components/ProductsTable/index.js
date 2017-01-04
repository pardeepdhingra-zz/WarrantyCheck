import React,{ Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProductRow from 'components/ProductRow'

class ProductsTable extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Row className="res-table form-inner">
				<Col sm={12} className="no-padding">
					<table className="table table-striped reagents-table">
						<thead>
							<tr>
								<th width="18%">
									CATEGORY
								</th>
								<th width="15%">
									BARCODE
								</th>
                <th width="15%">
									MANUFACTURER
								</th>
								<th width="15%">
									SELLER
								</th>
								<th width="13%">
									SELLER_NAME
								</th>
								<th width="9%">
									TIN_SERVICE_TAG
								</th>
								<th width="9%" className="text-center">
									PURCHASE_DATE
								</th>
                <th width="9%" className="text-center">
									BRAND
								</th>
                <th width="9%" className="text-center">
									MODEL_NAME
								</th>
                <th width="9%" className="text-center">
									INVOICE
								</th>
							</tr>
						</thead>
						<tbody>
							<ProductRow />
						</tbody>
					</table>
				</Col>
			</Row>
		);
	}
}
export default ProductsTable
