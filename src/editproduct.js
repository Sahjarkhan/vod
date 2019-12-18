import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import './all.css';
import './fontawesome.css';
import './bootstrap.css';
import Header from "./header";
import config from './config/config';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import ImageUploader from 'react-images-upload';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const customStyles = {
	option: (provided, state) => ({
		...provided,
		borderBottom: '1px dotted pink',
		color: state.isSelected ? 'red' : 'blue',
		padding: 20,
	}),
	control: () => ({

		width: 200,
	}),
	singleValue: (provided, state) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = 'opacity 300ms';

		return { ...provided, opacity, transition };
	}
}

class Dashboard extends Component {

	notify = () => toast("Wow so easy !");

	constructor(props) {
		super(props);
		this.state = {
			imagearray: [], showStore: false, multiValue: [], isDialogOpen: false,
			filterOptions: [
				{ value: 'XS', label: 'XS' },
				{ value: 'S', label: 'S' },
				{ value: 'M', label: 'M' },
				{ value: 'L', label: 'L' },
				{ value: 'XL', label: 'XL' },
				{ value: 'XXL', label: 'XXL' },
			], multiValue1: [],
			filterOptions1: [
				{ value: 'blue', label: 'Blue' },
				{ value: 'yellow', label: 'Yellow' },
				{ value: 'black', label: 'Black' },
				{ value: 'white', label: 'White' },
				{ value: 'brown', label: 'Brown' },
				{ value: 'purple', label: 'Purple' },
			], sperror: '', data: [], name: '', picturescolorchart: '', data4: [], data3: [], data: [], data1: [], pictures: [], pictures1: [], errors: {}
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleChange1 = this.handleChange1.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.onChange1 = this.onChange1.bind(this);
		this.handleMultiChange = this.handleMultiChange.bind(this);
		this.handleMultiChange1 = this.handleMultiChange1.bind(this);

		// alert(localStorage.getItem('logindata'));
		// console.log();
		const { match: { params } } = this.props;
		//console.log();
		fetch(`${config.Url}api/getproductdetails/` + params.userId).then((response) => response.json())
			.then((res) => {
				//alert(res);
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					//toast.success(res.message);
					//alert(res);

					this.setState(res.response);

					this.setState(function () {
						fetch(`${config.Url}api/sublistbycatremark/` + res.response.subcategory_id).then((response) => response.json())
							.then((res) => {
								//alert(res);
								if (res.status === 'FAILURE') {
									toast.error(res.message);
								} else {
									// toast.success(res.message);
									//alert(res);
									this.setState({ data1: res.sublistbycatremark });

									//localStorage.setItem('logindata', res.sellerlogin);
									//this.props.history.push('/');
								}
								console.log(res.sublistbycatremark);
							})
							.catch((error) => {
								console.log(error);
								alert('Oops, something went wrong. Please try again!');
							});
					})

					//alert();
					this.setState({ multiValue: res.response.size1, multiValue1: res.response.color1 }, function () {
						fetch(`${config.Url}api/sublistbycat/` + res.response.category_id).then((response) => response.json())
							.then((res) => {
								//alert(res);
								if (res.status === 'FAILURE') {
									toast.error(res.message);
								} else {
									//toast.success(res.message);
									//alert(res);
									this.setState({ data: res.sublistbycat });
									//debugger
									//localStorage.setItem('logindata', res.sellerlogin);
									//this.props.history.push('/');
								}
								console.log(res.sublistbycat);
							})
							.catch((error) => {
								console.log(error);
							});
					})

					//console.log(res.response);
					//localStorage.setItem('logindata', res.sellerlogin);
					//this.props.history.push('/');
				}
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
				alert('Oops, something went wrong. Please try again!');
			});

		fetch(`${config.Url}api/brandlistforseller`).then((response) => response.json())
			.then((res) => {
				//alert(res);
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					//toast.success(res.message);
					//alert(res);
					this.setState({ data3: res.brandlistforseller });

					//localStorage.setItem('logindata', res.sellerlogin);
					//this.props.history.push('/');
				}
				console.log(res.brandlistforseller);
			})
			.catch((error) => {
				console.log(error);
				alert('Oops, something went wrong. Please try again!');
			});

		fetch(`${config.Url}api/themelistforseller`).then((response) => response.json())
			.then((res) => {
				//alert(res);
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					//toast.success(res.message);
					//alert(res);
					this.setState({ data4: res.themelistforseller });

					//localStorage.setItem('logindata', res.sellerlogin);
					//this.props.history.push('/');
				}
				console.log(res.themelistforseller);
			})
			.catch((error) => {
				console.log(error);
			});


	}

	handleMultiChange(option) {
		this.setState(state => {
			return {
				multiValue: option
			};
		});
	}

	openDialog = () => this.setState({ isDialogOpen: true })

	handleClose = () => this.setState({ isDialogOpen: false })

	handleMultiChange1(option) {
		this.setState(state => {
			return {
				multiValue1: option
			};
		});
	}



	onDrop(picture) {
		console.log(picture);
		this.createImage(picture[picture.length - 1]);
		this.setState({
			pictures1: picture,
			showStore: true,
		})

		this.setState({
			pictures: []
		})

		const main = this.state.pictures1;
		// console.log(main);
		for (var i = 0; i < main.length; i++) {
			this.createImage(main[i]);

		}


		// if (!picture.length)
		// return;
		// this.createImage(picture[0]);
	}

	onChange1(e) {
		let files = e.target.files || e.dataTransfer.files;
		//alert(files);
		console.log(files[0]);
		if (!files.length)
			return;
		this.createImage1(files[0]);
	}

	createImage1(file) {
		let reader = new FileReader();
		reader.onload = (e) => {
			console.log(e.target.result)
			fetch(`${config.Url}api/fileuploade`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					gstnumfile: e.target.result,
				}),
			}).then((response) => response.json())
				.then((res) => {
					//alert(res);
					if (res.status === 'FAILURE') {
						//toast.error(res.message);
					} else {
						//toast.success(res.message);
						this.setState({
							picturescolorchart: res.response
						})
						//this.props.picturemain = this.state.pictures
						console.log(res.response);
						//console.log(this.state.pictures);
						//localStorage.setItem('logindata', res.sellerlogin);
						//this.props.history.push('/product');
					}
					//console.log(res);
				})
				.catch((error) => {
					console.log(error);
					alert('Oops, something went wrong. Please try again!');
				});

		};
		reader.readAsDataURL(file);
		//return this.state.pictures;
	}

	createImage(file) {
		let reader = new FileReader();
		reader.onload = (e) => {
			console.log(e.target.result)
			fetch(`${config.Url}api/fileuploade`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					gstnumfile: e.target.result,
				}),
			}).then((response) => response.json())
				.then((res) => {
					//alert(res);
					if (res.status === 'FAILURE') {
						//toast.error(res.message);
					} else {
						//toast.success(res.message);
						this.setState({
							pictures: this.state.pictures.concat(res.response),
							showStore: false,
						})
						//this.props.picturemain = this.state.pictures
						//console.log(res.response);
						//console.log(this.state.pictures);
						//localStorage.setItem('logindata', res.sellerlogin);
						//this.props.history.push('/product');
					}
					//console.log(res);
				})
				.catch((error) => {
					console.log(error);
					alert('Oops, something went wrong. Please try again!');
				});

		};
		reader.readAsDataURL(file);
		//return this.state.pictures;
	}

	handleValidation() {
		let fields = this.state;
		let errors = {};
		let formIsValid = true;

		//Name
		if (!fields.name) {
			formIsValid = false;
			errors["name"] = "Please enter name.";
		}

		//category_id

		if (!fields.category_id) {
			formIsValid = false;
			errors["category_id"] = "Please enter category.";
		}

		if (!fields.description) {
			formIsValid = false;
			errors["description"] = "Please enter description.";
		}
		if (!fields.sku) {
			formIsValid = false;
			errors["sku"] = "Please enter SKU.";
		}

		if (!fields.hsn_code) {
			formIsValid = false;
			errors["hsn_code"] = "Please enter HSN Code.";
		}
		if (!fields.brand) {
			formIsValid = false;
			errors["brand"] = "Please enter brand.";
		}
		if (!fields.quantity) {
			formIsValid = false;
			errors["quantity"] = "Please enter quantity.";
		}
		if (!fields.mrp) {
			formIsValid = false;
			errors["mrp"] = "Please enter MRP.";
		}

		if (!fields.sp) {
			formIsValid = false;
			//errors["sp"] = "";
			this.setState({
				sperror: 'Please enter selling price.',
			});
		}
		if (!fields.weight) {
			formIsValid = false;
			errors["weight"] = "Please enter weight.";
		}
		if (!fields.height) {
			formIsValid = false;
			errors["height"] = "Please enter height.";
		}
		if (!fields.width) {
			formIsValid = false;
			errors["width"] = "Please enter width.";
		}
		if (!fields.length) {
			formIsValid = false;
			errors["length"] = "Please enter length.";
		}
		if (!fields.ships_in) {
			formIsValid = false;
			errors["ships_in"] = "Please enter ships in.";
		}




		this.setState({ errors: errors });
		return formIsValid;
	}

	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});

		if (name == 'sp') {
			//alert(value);
			if (parseInt(value) > parseInt(this.state.mrp)) {

				this.setState({
					sp: '',
					sperror: 'Selling price can not be more than MRP.',
				});
			} else {
				this.setState({
					sperror: '',
				});
			}
		}
	}

	handleChange1(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		//alert(value);
		this.setState({
			category_id: value
		});

		fetch(`${config.Url}api/sublistbycat/` + value).then((response) => response.json())
			.then((res) => {
				//alert(res);
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					//toast.success(res.message);
					//alert(res);
					this.setState({ data: res.sublistbycat });
					debugger
					//localStorage.setItem('logindata', res.sellerlogin);
					//this.props.history.push('/');
				}
				console.log(res.sublistbycat);
			})
			.catch((error) => {
				console.log(error);
				alert('Oops, something went wrong. Please try again!');
			});
	}

	handleChange2(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		//alert(value);
		this.setState({
			subcategory_id: value
		});

		fetch(`${config.Url}api/sublistbycatremark/` + value).then((response) => response.json())
			.then((res) => {
				//alert(res);
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					// toast.success(res.message);
					//alert(res);
					this.setState({ data1: res.sublistbycatremark });

					//localStorage.setItem('logindata', res.sellerlogin);
					//this.props.history.push('/');
				}
				console.log(res.sublistbycatremark);
			})
			.catch((error) => {
				console.log(error);
				alert('Oops, something went wrong. Please try again!');
			});
	}

	handleSubmit(event) {
		// alert('A name was submitted: ' + this.state.username+' password '+ this.state.password);
		event.preventDefault();
		console.log(this.state.pictures1);


		const { match: { params } } = this.props;
		//console.log(this.state.pictures);
		if (this.handleValidation()) {
			fetch(`${config.Url}api/editproductbyseller/` + params.userId, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: this.state.name,
					images: this.state.pictures,
					category_id: this.state.category_id,
					mrp: this.state.mrp,
					sp: this.state.sp,
					subcategory_id: this.state.subcategory_id,
					subsubcategory_id: this.state.subsubcategory_id,
					color: this.state.color,
					size: this.state.size,
					sizechart: this.state.picturescolorchart,
					description: this.state.description,
					brand: this.state.brand,
					quantity: this.state.quantity,
					hsn_code: this.state.hsn_code,
					weight: this.state.weight,
					height: this.state.height,
					width: this.state.width,
					length: this.state.length,
					ships_in: this.state.ships_in,
					sku: this.state.sku,
					theme_id: this.state.theme_id,
				}),
			}).then((response) => response.json())
				.then((res) => {
					//alert(res);
					if (res.status === 'FAILURE') {
						toast.error(res.message);
					} else {
						toast.success(res.message);

						console.log(res);
						//localStorage.setItem('logindata', res.sellerlogin);
						this.props.history.push('/product');
					}
					console.log(res);
				})
				.catch((error) => {
					console.log(error);
					alert('Oops, something went wrong. Please try again!');
				});

		}
	}

	render() {
		const { selectedOption } = this.state;
		return <div class="dash-layout">
			<Header />

			<div class="bodylayouts-yod">

				<div >
					<form onSubmit={this.handleSubmit}>
						<div class="productsgrid">
							<p><ToastContainer /></p>
							<div class="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
								<img src="https://www.justori.com/justori/assets/images/11.gif" />
							</div>
							<div class="head-main"><h6>Product Info</h6></div>
							<div class="main-grid form-grd">

								<div class="fullfrm">
									<div class="grpset">
										<label class="mandtry">Name</label>
										<div class="Inputs">
											<input name="name" class="uk-input" id="form-horizontal-text" type="text" placeholder="Enter Product Name" value={this.state.name} onChange={this.handleChange} />
											<span style={{ color: "red" }}>{this.state.errors["name"]}</span>
										</div>
									</div>

									<div class="grpset">
										<label class="mandtry">Category</label>
										<div class="Inputs">
											<select class="uk-input" id="form-horizontal-text" name="category_id" value={this.state.category_id} onChange={this.handleChange1}>
												<option >Select a category</option>
												<option value="MEN">MEN</option>
												<option value="WOMEN">WOMEN</option>
												<option value="KIDS">KIDS</option>
												<option value="ACCESSORIES">ACCESSORIES</option>
												<option value="SPORTS">SPORTS</option>
												<option value="OTHERS">OTHERS</option>
											</select>
											<span style={{ color: "red" }}>{this.state.errors["category_id"]}</span>
										</div>
									</div>

									<div class="grpset">
										<label class="mandtry">Subcategory</label>
										<select class="uk-input" id="form-horizontal-text" name="subcategory_id" value={this.state.subcategory_id} onChange={this.handleChange2}>
											<option >Select a subcategory</option>
											{this.state.data.map((item, key) =>
												<option value={item[0]}>{item[1]}</option>
											)}
										</select>
									</div>
									<div class="grpset">
										<label class="mandtry">Sub-subcategory</label>
										<select class="uk-input" id="form-horizontal-text" name="subsubcategory_id" value={this.state.subsubcategory_id} onChange={this.handleChange}>
											<option >Select a sub-subcategory</option>
											{this.state.data1.map((item, key) =>
												<option value={item[0]}>{item[1]}</option>
											)}
										</select>
									</div>
									<span style={{ color: "red" }}>{this.state.errors["category_id"]}</span>
									<div class="grpset">
										<label class="mandtry">Description</label>
										<div class="Inputs">
											<input name="description" class="uk-input" id="form-horizontal-text" type="text" placeholder="Enter Description" value={this.state.description} onChange={this.handleChange} />
											<span style={{ color: "red" }}>{this.state.errors["description"]}</span>
										</div>
									</div>

								</div>

								<div class="halffrms">
									<div class="twoways">
										<div class="grpset">
											<label class="mandtry">SKU</label>
											<div class="Inputs">
												<input name="sku" class="uk-input" id="form-horizontal-text" type="text" placeholder="SKU" value={this.state.sku} onChange={this.handleChange} />
												<span style={{ color: "red" }}>{this.state.errors["sku"]}</span>
											</div>
										</div>

									</div>

									<div class="twoways">
										<div class="grpset">
											<label class="mandtry">HSN Code</label>
											<div class="Inputs">
												<input name="hsn_code" class="uk-input" id="form-horizontal-text" type="text" placeholder="HSN Code" value={this.state.hsn_code} onChange={this.handleChange} />
												<span style={{ color: "red" }}>{this.state.errors["hsn_code"]}</span>
											</div>
										</div>

									</div>

								</div>

								<div class="halffrms">
									<div class="twoways">
										<div class="grpset">
											<label>Brand</label>
											<div class="Inputs">
												<select class="uk-input" id="form-horizontal-text" name="brand" value={this.state.brand} onChange={this.handleChange}>
													<option>Select brand</option>
													{this.state.data3.map((item, key) =>
														<option value={item[1]}>{item[1]}</option>
													)}
												</select>
												<span style={{ color: "red" }}>{this.state.errors["brand"]}</span>
											</div>
										</div>

									</div>
									<div class="twoways">
										<div class="grpset">
											<label>Theme</label>
											<select class="uk-input" id="form-horizontal-text" name="theme_id" value={this.state.theme_id} onChange={this.handleChange}>
												<option>Select Theme</option>
												{this.state.data4.map((item, key) =>
													<option value={item[0]}>{item[1]}</option>
												)}
											</select>
										</div>
									</div>

									<div class="twoways">
										<div class="grpset">
											<label class="mandtry">Quantity</label>
											<div class="Inputs">
												<input name="quantity" class="uk-input" id="form-horizontal-text" type="number" placeholder="Quantity" value={this.state.quantity} onChange={this.handleChange} />
												<span style={{ color: "red" }}>{this.state.errors["quantity"]}</span>
											</div>
										</div>

									</div>
								</div>



							</div>

						</div>

						<div class="productsgrid">
							<div class="head-main"><h6>Pricing</h6></div>
							<div class="main-grid form-grd">
								<div class="halffrms">
									<div class="twoways">
										<div class="grpset">
											<label class="mandtry">MRP</label>
											<div class="Inputs">
												<div class="uk-inline">
													<span class="uk-form-icon"><img src="http://mobuloustech.com/yodapi/public/rssym.png" /></span>
													<input name="mrp" class="uk-input" id="form-horizontal-text" type="text" placeholder="Max Retail Price" value={this.state.mrp} onChange={this.handleChange} />

												</div>
												<span style={{ color: "red" }}>{this.state.errors["mrp"]}</span>
											</div>
										</div>
									</div>

									<div class="twoways">
										<div class="grpset">
											<label>Selling Price</label>
											<div class="Inputs">
												<div class="uk-inline">
													<span class="uk-form-icon"><img src="http://mobuloustech.com/yodapi/public/rssym.png" /></span>
													<input name="sp" class="uk-input" id="form-horizontal-text" type="text" placeholder="Selling Price.." value={this.state.sp} onChange={this.handleChange} />

												</div>
												<span style={{ color: "red" }}>{this.state.sperror}</span>
											</div>

										</div>
									</div>

								</div>
							</div>

						</div>


						<div class="productsgrid">
							<div class="head-main"><h6>Shipping</h6></div>
							<div class="main-grid form-grd">
								<div class="halffrms">
									<div class="twoways">
										<div class="grpset">
											<label class="mandtry">Weight</label>
											<div class="Inputs">
												<div class="measrtype">
													<input name="weight" class="uk-input" id="form-horizontal-text" type="text" placeholder="Selling Price.." value={this.state.weight} onChange={this.handleChange} />

													<div class="typshw">
														<p>Kg</p>
													</div>
												</div>
												<span style={{ color: "red" }}>{this.state.errors["weight"]}</span>
											</div>
										</div>
									</div>

									<div class="twoways">
										<div class="grpset">
											<label class="mandtry">Ships In</label>
											<div class="Inputs">
												<div class="measrtype">
													<input name="ships_in" class="uk-input" id="form-horizontal-text" type="text" placeholder="Selling Price.." value={this.state.ships_in} onChange={this.handleChange} />

												</div>
												<span style={{ color: "red" }}>{this.state.errors["ships_in"]}</span>
											</div>
										</div>
									</div>

								</div>

								<div class="halffrms">
									<div class="twoways">
										<div class="grpset">
											<label class="mandtry">height</label>
											<div class="Inputs">
												<div class="measrtype">
													<input name="height" class="uk-input" id="form-horizontal-text" type="text" placeholder="Selling Price.." value={this.state.height} onChange={this.handleChange} />


													<div class="typshw">
														<p>cm</p>
													</div>
												</div>
												<span style={{ color: "red" }}>{this.state.errors["height"]}</span>
											</div>
										</div>
									</div>

									<div class="twoways">
										<div class="grpset">
											<label class="mandtry">Width</label>

											<div class="Inputs">
												<div class="measrtype">
													<input name="width" class="uk-input" id="form-horizontal-text" type="text" placeholder="Selling Price.." value={this.state.width} onChange={this.handleChange} />

													<div class="typshw">
														<p>cm</p>
													</div>
												</div>
												<span style={{ color: "red" }}>{this.state.errors["width"]}</span>
											</div>
										</div>
									</div>

								</div>


								<div class="halffrms">
									<div class="twoways">
										<div class="grpset">
											<label class="mandtry">Length</label>

											<div class="Inputs">
												<div class="measrtype">
													<input name="length" class="uk-input" id="form-horizontal-text" type="text" placeholder="Selling Price.." value={this.state.length} onChange={this.handleChange} />


													<div class="typshw">
														<p>cm</p>
													</div>
												</div>
												<span style={{ color: "red" }}>{this.state.errors["length"]}</span>
											</div>
										</div>
									</div>

									<div class="twoways">

									</div>

								</div>




							</div>

						</div>


						<div class="productsgrid">
							<div class="head-main"><h6>Variants</h6></div>
							<div class="main-grid form-grd">
								<div class="halffrms">


									<div class="twoways">
										<div class="grpset">
											<label >Upload Size Chart</label>
											<div class="measrtype">
												<div uk-form-custom>
													<input type="file" onChange={this.onChange1} />
												</div>
											</div>
										</div>
									</div>

								</div>




								<div class="halffrms">
									<div class="twoways">
										<div class="grpset">
											<label>Size</label>
											<div class="measrtype">
												<Select
													name="filters"
													styles={customStyles}
													placeholder="Select a size"
													value={this.state.multiValue}
													options={this.state.filterOptions}
													onChange={this.handleMultiChange}
													isMulti={true}
												/>
											</div>
										</div>
									</div>

									<div class="twoways">
										<div class="grpset">
											<label>Color</label>
											<Select
												name="filters"
												styles={customStyles}
												placeholder="Select a color"
												value={this.state.multiValue1}
												options={this.state.filterOptions1}
												onChange={this.handleMultiChange1}
												isMulti={true}
											/>

										</div>
									</div>

								</div>



							</div>

						</div>


						<div class="productsgrid">
							<div class="head-main"><h6>Images</h6></div>
							<div class="main-grid form-grd">
								<div class="halffrms">
									<div class="twoways">
										<div class="grpset">
											<ImageUploader
												withIcon={true}
												withPreview={true}
												buttonText='Choose images'
												onChange={this.onDrop}
												imgExtension={['.jpg', '.gif', '.png', '.gif']}
												maxFileSize={5242880}
											/>
										</div>
									</div>
									<div class="twoways">
										<div class="Add_images">
											<article>
												<figcaption>
													<ul>
														{this.state.imagearray.map((item, key) =>
															<li><img src={item} /><span class="close" >&times;</span></li>
														)}

													</ul>
												</figcaption>
												<div class="clear"></div>
											</article>
										</div>
									</div>
								</div>

								<div class="halffrms updatebtns">
									<div class="twoways">
										<button type="submit" class="uk-button uk-button-default">Update</button>
									</div>
									<div class="twoways">
										<Link to="/product" class="uk-button uk-button-default">Back</Link>
									</div>
								</div>

							</div>

						</div>


					</form>
				</div>

			</div>

		</div>

	}
}


export default Dashboard;