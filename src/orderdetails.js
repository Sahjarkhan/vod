import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import Sidebar from "./sidebar";
import Header from "./header";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import config from './config/config';
import { Button } from "@material-ui/core";


const options = [
	{ value: 'dispatched', label: 'dispatched' },
	{ value: 'delivered', label: 'delivered' },
	{ value: 'transit', label: 'transit' },
	{ value: 'cancelled', label: 'cancelled' },
	{ value: 'accepted', label: 'accepted' },
	{ value: 'shipped', label: 'shipped' },
	{ value: 'packed', label: 'packed' },

];


class Ordersdetails extends Component {
	constructor(props) {
		super(props);
		if (localStorage.getItem('logindata') === null) {
            window.location.assign("./");
        }
		this.state = {
			value: '?',
		}
		if (localStorage.getItem('logindata') === null) {
			window.location.assign("./");
		}
		const { match: { params } } = this.props;
		fetch(`${config.Url}api/orderdetails/` + params.userId).then((response) => response.json())
			.then((res) => {
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					toast.success(res.message);
					this.setState(res.response);
					this.setState({ detailss: res.response.details });
				}
			})
			.catch((error) => {
				console.log(error);
			});
		this.state = {
			data: [], selectedOption: "New Order", data: '', details: [],
			detailss: [], paramsid: params.userId
		};
	}

	handleChange = (event, selectedOption, id) => {
		this.setState({ value: event.target.value });
		var str = "" + event.target.value + "";
		const { match: { params } } = this.props;
		var words = str.split(' ');
		fetch(`${config.Url}api/changethestatusoforder/` + words[1] + "/" + words[2] + "/" + words[0]).then((response) => response.json())
			.then((res) => {
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					toast.success(res.message);
				}
			})
			.catch((error) => {
				console.log(error);
			});
		fetch(`${config.Url}api/orderdetails/` + this.state.paramsid).then((response) => response.json())
			.then((res) => {
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					this.setState(res.response);
					this.setState({ detailss: res.response.details });
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
	render() {
		return (<div className="dash-layout">
			<Header />
			<p><ToastContainer /></p>
			<div className="bodylayouts-yod">
				<Link to="/orders" class="Back">Back</Link>
				<div >
					<div className="productsgrid">
						<div className="rowprods">
							<div className="idr-shw">
								<div className="dltime">
									{this.state.dispatch_by}
								</div>
								<div className="dltime py">
									<p>Payment <br />Type</p>
									<p>{this.state.payment_type}</p>
								</div>
							</div>
							<div className="idr-shw">
								<p className="bld"> Order No:  <br /> {this.state.order_number}</p>
								<p className="bld"> Address:<br />{this.state.location}</p>
								<p className="bld"> coupen_code:<br />{this.state.coupen_code}</p>
							</div>
							<div className="idr-shw">
								<p className="bld">Name: <br /> {this.state.user_name}</p>
								<p className="bld">Email:<br />{this.state.user_email}</p>
								<p className="bld"> Phone Number:<br />{this.state.phone}</p>
							</div>
						</div>
						<div className="ordeinfos-yds OrderTable">
							<div className="uk-overflow-auto">
								<table className="uk-table uk-table-small uk-table-divider">
									<thead>
										<tr>
											<th>Item</th>
											<th>Image</th>
											<th>Quantity</th>
											<th>HSN Code</th>
											<th>Price</th>
											<th>Shipping</th>
											<th>Amount</th>
											<th>Dispatch By</th>
											<th>Status</th>
										</tr>
									</thead>
									<tbody>
										{this.state.detailss.map((item, i) => {
											return (<tr key={i}>
												<td>
													<div className="mnde">
														<h6 className="prdname">{item.product_name}</h6>
														<div className="mrp-dr">
															<p><strong>Product SKU:</strong> {item.product_sku}</p>
															<p><strong>Product ID:</strong> {item.product_id}</p>
														</div>
														<p className="bgr-info">Kurta : Size 38</p>
													</div>
												</td>
												<td>
													<img style={{ width: 100, height: 100 }} src={`${config.UrlImage}` + item.product_image} />
												</td>
												<td>
													<p>{item.quantity}</p>
												</td>
												<td>
													<p>{item.color}</p>
												</td>

												<td>
													<p>{item.sale_price}</p>
												</td>
												<td>
													<p>{item.payment_status}</p>
												</td>
												<td>
													<p>{item.total_price}</p>
												</td>
												<td>
													<p>{item.dispatch_by}</p>
												</td>
												<td>
													<div>
														<div>
															<select onChange={this.handleChange} value={item.payment_status}>
																<option>{item.status}</option>
																{options.map(items => (
																	<option key={items.label} value={items.label + " " + item.order_id + " " + + item.product_id} >
																		{items.label}
																	</option>
																))}
															</select>
														</div>
													</div>
												</td>
											</tr>
											)
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >)
	}
}


export default Ordersdetails;