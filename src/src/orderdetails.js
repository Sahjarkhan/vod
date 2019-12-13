import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import Sidebar from "./sidebar";
import Header from "./header";
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';

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

		this.state = { data: [], selectedOption: "New Order" };
		const { match: { params } } = this.props;

		fetch("http://mobuloustech.com/yodapi/api/orderdetails/" + params.userId).then((response) => response.json())
			.then((res) => {
				//alert(res);
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					toast.success(res.message);
					//alert(res);
					this.setState(res.response[0]);
					this.setState({ selectedOption: res.response[0].status })
					//localStorage.setItem('logindata', res.sellerlogin);
					//this.props.history.push('/');
				}
				console.log(this.state);
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
				alert('Oops, something went wrong. Please try again!');
			});

	}

	handleChange = selectedOption => {
		this.setState({ status: selectedOption.value });
		const { match: { params } } = this.props;
		fetch("http://mobuloustech.com/yodapi/api/changethestatusoforder/" + params.userId + "/" + selectedOption.value).then((response) => response.json())
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
				console.log(this.state);
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
				alert('Oops, something went wrong. Please try again!');
			});
		console.log(`Option selected:`, selectedOption);
	}
	render() {
		const { selectedOption } = this.state.selectedOption
		return <div className="dash-layout">
			<Header />

			<div className="bodylayouts-yod">
				<Sidebar />
				<div className="pagecontentright">
					<p><ToastContainer /></p>

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
								<p className="bld">Order No. <br /> {this.state.order_id}</p>
								<p className="addrs">{this.state.location}
								</p>
							</div>

							<div className="idr-shw">
								<div className="dispatch-yod">
									<strong>Dispatch By</strong>
									<p>{this.state.dispatch_by}</p>
								</div>

								<div className="dispatch-yod">
									<strong>Deliver By</strong>
									<p>{this.state.dispatch_by}</p>
								</div>

								<div className="dispatch-yod">
									<strong>Payout Rs. {this.state.amount}</strong>
								</div>

							</div>

							<div className="idr-shw">
								<div className="dispatch-yod">
									<strong>Payout <span className="exptag">Export</span></strong>
									<p>Days Passed : 0 Days</p>
								</div>

								<div className="dispatch-yod">
									<button className="uk-button uk-button-default">{this.state.status}</button>
									<Select
										value={selectedOption}
										onChange={this.handleChange}
										options={options}

									/>

									<button className="uk-button uk-button-default">Contact Seller Support</button>
								</div>

							</div>

						</div>

						<div className="ordeinfos-yds">

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
											<th>Total Price</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<div className="mnde">
													<h6 className="prdname">{this.state.name}</h6>
													<div className="mrp-dr">
														<p><strong>Product SKU:</strong> {this.state.sku}</p>
														<p><strong>Product ID:</strong> {this.state.product_id}</p>
													</div>

													<p className="bgr-info">Kurta : Size 38</p>
												</div>
											</td>

											<td>
												<img alt="hello image" style={{ width: 100, height: 100 }} src={"http://mobuloustech.com/yodapi/public" + this.state.images} />
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