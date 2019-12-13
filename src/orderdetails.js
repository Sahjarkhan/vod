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

const options = [
	{ value: 'New Order', label: 'New Order' },
	{ value: 'Dispatched', label: 'Dispatched' },
	{ value: 'In Handoverd', label: 'In Handoverd' },
	{ value: 'Delivered', label: 'Delivered' },
	{ value: 'In Transit', label: 'In Transit' },
	{ value: 'Cancelled', label: 'Cancelled' },
];


class Ordersdetails extends Component {
	constructor(props) {
		super(props);
		if (localStorage.getItem('logindata') === null) {
			window.location.assign("./");
		}
		this.state = { data: [], selectedOption: "New Order",data:'' };

		const { match: { params } } = this.props;
		fetch(`${config.Url}api/orderdetails/` + params.userId).then((response) => response.json())
			.then((res) => {
				//alert(res);
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					toast.success(res.message);
					//alert(res);
					this.setState(res.response);
					// 1.this.setState({ selectedOption: res.response[0].status })
					//localStorage.setItem('logindata', res.sellerlogin);
					//this.props.history.push('/');
				}
			})
			.catch((error) => {
				console.log(error);
				alert('Oops, something went wrong. Please try again!');
			});


	}
	
	handleChange = selectedOption => {
		this.setState({ status: selectedOption.value });
		const { match: { params } } = this.props;
		fetch(`${config.Url}api/changethestatusoforder/` + params.userId + "/" + selectedOption.value).then((response) => response.json())
			.then((res) => {
				//alert(res);
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					toast.success(res.message);
					//alert(res);

					//localStorage.setItem('logindata', res.sellerlogin);
					//this.props.history.push('/');
				}

			})
			.catch((error) => {
				console.log(error);
				alert('Oops, something went wrong. Please try again!');
			});
		console.log(`Option selected:`, selectedOption);
	}
	render() {
		console.log(this.state)
		return <div class="dash-layout">
			<Header />
			<div class="bodylayouts-yod">
				<div >
					<p><ToastContainer /></p>
					<div class="productsgrid">
						<div class="rowprods">
							<div class="idr-shw">
								<div class="dltime">
									{this.state.dispatch_by}
								</div>
								<div class="dltime py">
									<p>Payment <br />Type</p>
									<p>{this.state.payment_type}</p>
								</div>
							</div>
							<div class="idr-shw">
								<p class="bld">Order No. <br /> {this.state.order_id}</p>
								<p class="addrs">{this.state.location}
								</p>
							</div>
							<div class="idr-shw">
								<div class="dispatch-yod">
									<strong>Dispatch By</strong>
									<p>{this.state.dispatch_by}</p>
								</div>

								<div class="dispatch-yod">
									<strong>Deliver By</strong>
									<p>{this.state.dispatch_by}</p>
								</div>

								<div class="dispatch-yod">
									<strong>Payout Rs. {this.state.amount}</strong>
								</div>

							</div>

							<div class="idr-shw">
								<div class="dispatch-yod">
									<strong>Payout <span class="exptag">Export</span></strong>
									<p>Days Passed : 0 Days</p>
								</div>

								<div class="dispatch-yod">
									<button class="uk-button uk-button-default">{this.state.status}</button>
									<Select
										value={this.state.selectedOption}
										onChange={this.handleChange}
										options={options}
									/>
									<button class="uk-button uk-button-default">Contact Seller Support</button>
								</div>
							</div>
						</div>
						<div class="ordeinfos-yds">
							<div class="uk-overflow-auto">
								<table class="uk-table uk-table-small uk-table-divider">
									<thead>
										<tr>
											<th>Item</th>
											<th>Image</th>
											<th>Quantity</th>
											<th>HSN Code</th>
											<th>Price</th>
											<th>Shipping</th>
											<th>Total Price</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<div class="mnde">
													<h6 class="prdname">{this.state.name}</h6>
													<div class="mrp-dr">
														<p><strong>Product SKU:</strong> {this.state.sku}</p>
														<p><strong>Product ID:</strong> {this.state.product_id}</p>
													</div>
													<p class="bgr-info">Kurta : Size 38</p>
												</div>
											</td>
											<td>
												<img style={{ width: 100, height: 100 }} src={"http://mobuloustech.com/yodapi/public" + this.state.images} />
											</td>
											<td>
												<p>{this.state.quantity}</p>
											</td>
											<td>
												<p>X</p>
											</td>

											<td>
												<p>{this.state.amount}</p>
											</td>
											<td>
												<p>X</p>
											</td>

											<td>
												<p>{this.state.amount}</p>
											</td>

										</tr>

									</tbody>
								</table>
							</div>

						</div>


					</div>

				</div>

			</div>

		</div>

	}
}


export default Ordersdetails;