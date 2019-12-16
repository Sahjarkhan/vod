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
		const { match: { params } } = this.props;
		fetch(`${config.Url}api/orderdetails/` + params.userId).then((response) => response.json())
			.then((res) => {
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					toast.success(res.message);
					this.setState(res.response);
					this.setState({ detailss: res.response.details });
					console.log(res.response.details)
					// 1.this.setState({ selectedOption: res.response[0].status })
					//localStorage.setItem('logindata', res.sellerlogin);
					//this.props.history.push('/');
				}
			})
			.catch((error) => {
				console.log(error);
			});
		this.state = {
			data: [], selectedOption: "New Order", data: '', details: [],
			detailss: []
		};
	}

	handleChange = selectedOption => {
		this.setState({ status: selectedOption.value });
		const { match: { params } } = this.props;
		fetch(`${config.Url}api/changethestatusoforder/` + params.userId + "/" + selectedOption.value).then((response) => response.json())
			.then((res) => {
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				}else {
					toast.success(res.message);
					//localStorage.setItem('logindata',res.sellerlogin);
					//this.props.history.push('/');
				}
			})
			.catch((error) => {
				console.log(error);
			});
		console.log(`Option selected:`, selectedOption);
	}
	render() {
		console.log("this.state.selectedOption", this.state.selectedOption);
		const details = (this.state.details);
		return (<div class="dash-layout">
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
								{/* <div class="dispatch-yod">
									<button class="uk-button uk-button-default">{this.state.status}</button>
									<Select
										value={this.state.selectedOption}
										onChange={this.handleChange}
										options={options}
									/>
									<button class="uk-button uk-button-default">Contact Seller Support</button>
								</div> */}
							</div>
						</div>
						<div class="ordeinfos-yds OrderTable">
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
										{this.state.detailss.map((item, i) => {
											return (<tr key={i}>
												<td>
													<div class="mnde">
														<h6 class="prdname">{item.product_name}</h6>
														<div class="mrp-dr">
															<p><strong>Product SKU:</strong> {item.product_sku}</p>
															<p><strong>Product ID:</strong> {item.product_id}</p>
														</div>
														<p class="bgr-info">Kurta : Size 38</p>
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
													<p>{10}</p>
												</td>
												<td>
													<p>X</p>
												</td>
												<td>
													<p>{item.total_price}</p>
												</td>
												<td>
													<Select
														placeholder={item.payment_status}
														value={this.state.selectedOption}
														onChange={this.handleChange}
														options={options}
													/>
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

		</div>)

	}
}


export default Ordersdetails;