import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import './all.css';
import './fontawesome.css';
import './bootstrap.css';
import Header from "./header";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import ImageUploader from 'react-images-upload';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import config from './config/config';
import Modal from '../src/Modal/Modal';
import ModalColor from '../src/Modal Color/Modal';


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
class AddProduct extends Component {
	notify = () => toast("Wow so easy !");

	constructor(props) {
		super(props);
		if (localStorage.getItem('logindata') === null) {
			window.location.assign("./");
		}
		this.state = {
			showStore: false, multiValue: [],
			isDialogOpen: false,
			multiValue1: [],
			filterOptions1: [],
			filterOptions: [],
			sperror: '',
			name: '',
			picturescolorchart: '',
			sp: '', data4: [],
			data3: [],
			data: [],
			data1: [],
			pictures: [],
			pictures1: [],
			errors: {}
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleChange1 = this.handleChange1.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.onChange1 = this.onChange1.bind(this);
		this.handleMultiChange = this.handleMultiChange.bind(this);
		this.handleMultiChange1 = this.handleMultiChange1.bind(this);
		this.handleChange3 = this.handleChange3.bind(this)


	}


	componentDidMount() {
		fetch(`${config.Url}api/getcolor`).then((response) => response.json())
			.then((res) => {
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					this.setState({ filterOptions1: res.getcolor });
				}
			})
			.catch((error) => {
				console.log(error);
			});

		fetch(`${config.Url}api/brandlistforseller`).then((response) => response.json())
			.then((res) => {
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					this.setState({ data3: res.brandlistforseller });
				}
			})
			.catch((error) => {
				console.log(error);
			});


		fetch(`${config.Url}api/brandlistforseller`).then((response) => response.json())
			.then((res) => {
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					this.setState({ data3: res.brandlistforseller });
				}
			})
			.catch((error) => {
				console.log(error);
			});


		fetch(`${config.Url}api/brandlistforseller`).then((response) => response.json())
			.then((res) => {
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					this.setState({ data3: res.brandlistforseller });
				}
			})
			.catch((error) => {
				console.log(error);
			});



		fetch(`${config.Url}api/themelistforseller`).then((response) => response.json())
			.then((res) => {
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					this.setState({ data4: res.themelistforseller });
				}
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
	openModalHandler = () => {
		this.setState({
			isShowing: true
		});
	}
	openModalHandlerSize = () => {
		this.setState({
			isshowingSize: true
		});
	}

	closeModalHandler = () => {
		this.setState({
			isShowing: false
		});
		if (this.state.category_id === undefined &&
			this.state.subcategory_id === undefined &&
			this.state.subsubcategory_id === undefined) {
			console.log('testing')
		} else {
			fetch(`${config.Url}api/getsize`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"catid": this.state.category_id,
					"subcatid": this.state.subcategory_id,
					"subsubcatid": this.state.subsubcategory_id
				}),
			}).then((response) => response.json())
				.then((res) => {
					if (res.status === 'FAILURE') {
						toast.error(res.message);
					}
					else {
						this.setState({ sizeDropDown: res.getsize });
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}
	closeModalHandlerSize = () => {
		this.setState({
			isshowingSize: false
		});
		fetch(`${config.Url}api/getcolor`).then((response) => response.json())
			.then((res) => {
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					this.setState({ filterOptions1: res.getcolor });
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
	handleChange3(event) {
		const target = event.target;
		const value = target.value;
		this.setState({
			subsubcategory_id: value
		});
		fetch(`${config.Url}api/getsize`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"catid": this.state.category_id,
				"subcatid": this.state.subcategory_id,
				"subsubcatid": event.target.value
			}),
		}).then((response) => response.json())
			.then((res) => {
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				}
				else {
					this.setState({ sizeDropDown: res.getsize });
				}
			})
			.catch((error) => {
				console.log(error);
			});
		fetch(`${config.Url}api/getcolor`).then((response) => response.json())
			.then((res) => {
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					this.setState({ filterOptions1: res.getcolor });
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}


	openDialog = () => this.setState({ isDialogOpen: true })
	handleClose = () => this.setState({ isDialogOpen: false })


	onDrop(picture) {
		this.createImage(picture[picture.length - 1]);

	}
	
	onChange1(e) {
		let files = e.target.files || e.dataTransfer.files;
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
					if (res.status === 'FAILURE') {
					} else {
						this.setState({
							picturescolorchart: res.response
						})
						console.log(res.response);
					}
				})
				.catch((error) => {
					console.log(error);
				});

		};
	}

	createImage(file) {
		let reader = new FileReader();
		reader.onload = (e) => {
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
					if (res.status === 'FAILURE') {

					}
					else {
						this.setState({
							pictures: this.state.pictures.concat(res.response),
							showStore: false,
						})
					}
				})
				.catch((error) => {
					console.log(error);
				});

		};
		if (file && file.type.match('image.*')) {
			reader.readAsDataURL(file);
		}
	}
	handleMultiChange1(option) {
		if (option !== null) {
			this.setState(state => {
				return {
					multiValue1: option
				};
			});
		}
		if (option == null) {
			console.log('testing3');
			this.setState({
				multiValue1: []
			});
		}
	}
	handleValidation() {
		let fields = this.state;
		let errors = {};
		let formIsValid = true;
		if (this.state.pictures.length <= 1) {
			formIsValid = false;
			errors["img"] = "please select at least two image.";
		}

		if (!fields.name) {
			formIsValid = false;
			errors["name"] = "Please enter name.";
		}

		if (!fields.dcolor) {
			formIsValid = false;
			errors["dcolor"] = "Please enter default color.";
		}


		if (!fields.category_id) {
			formIsValid = false;
			errors["category_id"] = "Please enter category.";
		}

		if (!fields.subcategory_id) {
			formIsValid = false;
			errors["subcategory_id"] = "Please enter Subcategory.";
		}

		if (!fields.subsubcategory_id) {
			formIsValid = false;
			errors["subsubcategory_id"] = "Please enter Subsubcategory_id.";
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

		if (!fields.fit) {
			formIsValid = false;
			errors["fit"] = "Please enter fit.";
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
		if (!fields.multiValue.length > 0) {
			formIsValid = false;
			errors["multiValue"] = "Please enter size.";
		}
		if (!fields.length) {
			formIsValid = false;
			errors["length"] = "Please enter length.";
		}

		if (!fields.ships_in) {
			formIsValid = false;
			errors["ships_in"] = "Invalid ships in. must be only numerical digits."
		}
		this.setState({ errors: errors });
		return formIsValid;
	}

	removeImageArray = (value) => {
		this.state.pictures.splice(value, 1);
		this.setState({
			pictures: this.state.pictures
		})
	}

	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});

		if (name === 'name') {
			const re = /^[a-zA-Z0-9 ,.'-]{3,30}$/i;
			if (value === '' || re.test(value)) {
				this.setState({ name: value })
			} else {
				this.setState({
					name: '',
				});
			}
		}
		if (name === 'mrp') {
			const re = /^[0-9]{0,10}$/i;
			if (value === '' || re.test(value)) {
				this.setState({ mrp: value })
			} else {
				this.setState({
					mrp: '',
				});
			}
		}

		if (name === 'width') {
			const re = /^[0-9]{0,4}$/i;
			if (value === '' || re.test(value)) {
				this.setState({ width: value })
			} else {
				this.setState({
					width: '',
				});
			}
		}
		if (name === 'weight') {
			const re = /^[0-9]{0,4}$/i;
			if (value === '' || re.test(value)) {
				this.setState({ weight: value })
			} else {
				this.setState({
					weight: '',
				});
			}
		}
		if (name === 'height') {
			const re = /^[0-9]{0,4}$/i;
			if (value === '' || re.test(value)) {
				this.setState({ height: value })
			} else {
				this.setState({
					height: '',
				});
			}
		}

		if (name === 'length') {
			const re = /^[0-9]{0,4}$/i;
			if (value === '' || re.test(value)) {
				this.setState({ length: value })
			} else {
				this.setState({
					length: '',
				});
			}
		}

		if (name === 'ships_in') {
			const re = /^[0-9\b]+$/;
			if (value === '' || re.test(value)) {
				this.setState({ ships_in: value })
			} else {
				this.setState({
					ships_in: '',
				});
			}
		}

		if (name === 'sp') {
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
		this.setState({
			category_id: value
		});
		fetch(`${config.Url}api/sublistbycat/` + value).then((response) => response.json())
			.then((res) => {
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					this.setState({ data: res.sublistbycat });
				}
			})
			.catch((error) => {
				console.log(error);
			});
		this.setState({
			data1: []
		});
		this.setState({
			data: []
		});
	}

	handleChange2(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			subcategory_id: value
		});
		fetch(`${config.Url}api/sublistbycat/` + this.state.category_id).then((response) => response.json())
			.then((res) => {
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					this.setState({ data: res.sublistbycat });
				}
			})
			.catch((error) => {
				console.log(error);
			});
		this.setState({
			data1: []
		});
		fetch(`${config.Url}api/sublistbycatremark/` + value).then((response) => response.json())
			.then((res) => {
				if (res.status === 'FAILURE') {
					toast.error(res.message);
				} else {
					this.setState({ data1: res.sublistbycatremark });
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	handleSubmit(event) {
	
		event.preventDefault();
		if (this.handleValidation()) {
			if (!this.state.sperror) {
				fetch(`${config.Url}api/addproductbyseller/` + JSON.parse(localStorage.getItem('logindata')).id, {
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
						color: this.state.multiValue1,
						size: this.state.multiValue,
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
						user_type: 'admin',
						defaultcolor: this.state.dcolor,
						fit: this.state.fit
					}),
					
				}).then((response) => response.json())
					.then((res) => {
						if (res.status === 'FAILURE') {
							toast.error(res.message);
						} else {
							if (toast.success(res.message)) {
								this.props.history.push('/product');
							}
						}
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}
	}

	render() {

		const { selectedOption } = this.state;
		return <div className="dash-layout">
			<Header />
			<div className="bodylayouts-yod">
				<div >
					<form onSubmit={this.handleSubmit}>
						<div className="productsgrid">
							<p><ToastContainer /></p>
							<div className="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
								<img src="https://www.justori.com/justori/assets/images/11.gif" />
							</div>
							<div className="head-main"><h6>Product Info</h6></div>
							<div className="main-grid form-grd">

								<div className="fullfrm">
									<div className="grpset">
										<label className="mandtry">Name</label>
										<div className="Inputs">
											<input name="name" className="uk-input" id="form-horizontal-text" type="text" placeholder="Enter Product Name" value={this.state.value} onChange={this.handleChange} />
											<span style={{ color: "red" }}>{this.state.errors["name"]}</span>
										</div>
									</div>

									<div className="grpset">
										<label className="mandtry">Category</label>
										<div className="Inputs">
											<select className="uk-input" id="form-horizontal-text" name="category_id" value={this.state.value} onChange={this.handleChange1}>
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

									<div className="grpset">
										<label className="mandtry">Subcategory</label>
										<div className="Inputs">
											<select className="uk-input" id="form-horizontal-text" name="subcategory_id" value={this.state.value} onChange={this.handleChange2}>
												<option >Select a subcategory</option>
												{this.state.data.map((item, key) =>
													<option value={item[0]}>{item[1]}</option>
												)}
											</select>
											<span style={{ color: "red" }}>{this.state.errors["subcategory_id"]}</span>
										</div>
									</div>
									<div className="grpset">
										<label className="mandtry">Sub-subcategory</label>
										<div className="Inputs">
											<select className="uk-input" id="form-horizontal-text" name="subsubcategory_id" value={this.state.value} onChange={this.handleChange3}>
												<option >Select a sub-subcategory</option>
												{this.state.data1.map((item, key) =>
													<option value={item[0]}>{item[1]}</option>
												)}
											</select>
											<span style={{ color: "red" }}>{this.state.errors["subsubcategory_id"]}</span>
										</div>
									</div>




									<div className="grpset">
										<label>Description</label>
										<div className="Inputs">
											<textarea maxLength="1000" name="description" className="uk-input" id="form-horizontal-text" type="text" placeholder="Enter Description" value={this.state.value} onChange={this.handleChange} ></textarea>
										</div>
									</div>
									<div className="grpset">
										<label className="mandtry">Fit</label>
										<div className="Inputs">
											<textarea maxLength="1000" name="fit" className="uk-input" id="form-horizontal-text" type="text" placeholder="Enter Fit" value={this.state.value} onChange={this.handleChange} ></textarea>
											<span style={{ color: "red" }}>{this.state.errors["fit"]}</span>
										</div>
									</div>
								</div>
								<div className="halffrms">
									<div className="twoways">
										<div className="grpset">
											<label className="mandtry">SKU</label>
											<div className="Inputs">
												<input maxLength="1000" name="sku" className="uk-input" id="form-horizontal-text" type="text" placeholder="SKU" value={this.state.value} onChange={this.handleChange} />
												<span style={{ color: "red" }}>{this.state.errors["sku"]}</span>
											</div>
										</div>
									</div>
									<div className="twoways">
										<div className="grpset">
											<label className="mandtry">HSN Code</label>
											<div className="Inputs">
												<input maxLength="8" name="hsn_code" className="uk-input" id="form-horizontal-text" type="text" placeholder="HSN Code" value={this.state.value} onChange={this.handleChange} />
												<span style={{ color: "red" }}>{this.state.errors["hsn_code"]}</span>
											</div>
										</div>
									</div>
								</div>

								<div className="halffrms">
									<div className="twoways">
										<div className="grpset">
											<label className="mandtry">Brand</label>
											<div className="Inputs">
												<select className="uk-input" id="form-horizontal-text" name="brand" value={this.state.value} onChange={this.handleChange}>
													<option>Select brand</option>
													{this.state.data3.map((item, key) =>
														<option value={item[1]}>{item[1]}</option>
													)}
												</select>
												<span style={{ color: "red" }}>{this.state.errors["brand"]}</span>
											</div>
										</div>

									</div>
									<div className="twoways">
										<div className="grpset">
											<label>Theme</label>
											<div className="Inputs">
												<select className="uk-input" id="form-horizontal-text" name="theme_id" value={this.state.value} onChange={this.handleChange}>
													<option>Select Theme</option>
													{this.state.data4.map((item, key) =>
														<option value={item[0]}>{item[1]}</option>
													)}
												</select>
												<span style={{ color: "red" }}>{this.state.errors["theme_id"]}</span>
											</div>
										</div>
									</div>

									<div className="twoways">
										<div className="grpset">
											<label className="mandtry">Quantity</label>
											<div className="Inputs">
												<input name="quantity" className="uk-input" id="form-horizontal-text" type="number" placeholder="Quantity" value={this.state.value} onChange={this.handleChange} />
												<span style={{ color: "red" }}>{this.state.errors["quantity"]}</span>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
						<div className="productsgrid">
							<div className="head-main"><h6>Pricing</h6></div>
							<div className="main-grid form-grd">
								<div className="halffrms">
									<div className="twoways">
										<div className="grpset">
											<label className="mandtry">MRP</label>
											<div className="Inputs">
												<div className="uk-inline">
													<span className="uk-form-icon"><img src="http://mobuloustech.com/yodapi/public/rssym.png" /></span>
													<input name="mrp" maxLength="10" className="uk-input" id="form-horizontal-text" type="text" placeholder="Max Retail Price" value={this.state.value} onChange={this.handleChange} />

												</div>
												<span style={{ color: "red" }}>{this.state.errors["mrp"]}</span>
											</div>
										</div>
									</div>

									<div className="twoways">
										<div className="grpset">
											<label>Selling Price</label>
											<div className="Inputs">
												<div className="uk-inline">
													<span className="uk-form-icon"><img src="http://mobuloustech.com/yodapi/public/rssym.png" /></span>
													{/* <span ><img src="img/rssym.png"/></span> */}
													<input name="sp" maxLength="10" className="uk-input" id="form-horizontal-text" type="text" placeholder="Selling Price.." value={this.state.sp} onChange={this.handleChange} />

												</div>

												<span style={{ color: "red" }}>{this.state.sperror}</span>
											</div>

										</div>
									</div>

								</div>
							</div>

						</div>


						<div className="productsgrid">
							<div className="head-main"><h6>Shipping</h6></div>
							<div className="main-grid form-grd">
								<div className="halffrms">
									<div className="twoways">
										<div className="grpset">
											<label className="mandtry">Weight</label>
											<div className="Inputs">
												<div className="measrtype">
													<input name="weight" maxLength="4" className="uk-input" id="form-horizontal-text" type="text" placeholder="Weight" value={this.state.value} onChange={this.handleChange} />

													<div className="typshw">
														<p>Kg</p>
													</div>

												</div>
												<span style={{ color: "red" }}>{this.state.errors["weight"]}</span>
											</div>

										</div>
									</div>

									<div className="twoways">
										<div className="grpset">
											<label className="mandtry">Ships In</label>
											<div className="Inputs">
												<div className="measrtype">
													<input name="ships_in" maxLength="4" className="uk-input" id="form-horizontal-text" type="text" placeholder="Ships In" value={this.state.value} onChange={this.handleChange} />
												</div>
												<span style={{ color: "red" }}>{this.state.errors["ships_in"]}</span>
											</div>
										</div>
									</div>

								</div>

								<div className="halffrms">
									<div className="twoways">
										<div className="grpset">
											<label className="mandtry">height</label>
											<div className="Inputs">
												<div className="measrtype">
													<input name="height" maxLength="4" className="uk-input" id="form-horizontal-text" type="text" placeholder="height" value={this.state.value} onChange={this.handleChange} />
													<div className="typshw">
														<p>cm</p>
													</div>
												</div>
												<span style={{ color: "red" }}>{this.state.errors["height"]}</span>
											</div>
										</div>
									</div>

									<div className="twoways">
										<div className="grpset">
											<label className="mandtry">Width</label>
											<div className="Inputs">
												<div className="measrtype">
													<input name="width" maxLength="4" className="uk-input" id="form-horizontal-text" type="text" placeholder="Width" value={this.state.value} onChange={this.handleChange} />
													<div className="typshw">
														<p>cm</p>
													</div>

												</div>
												<span style={{ color: "red" }}>{this.state.errors["width"]}</span>
											</div>
										</div>
									</div>

								</div>


								<div className="halffrms">
									<div className="twoways">
										<div className="grpset">
											<label className="mandtry">Length</label>
											<div className="Inputs">
												<div className="measrtype">
													<input name="length" maxLength="4" className="uk-input" id="form-horizontal-text" type="text" placeholder="Length" value={this.state.value} onChange={this.handleChange} />
													<div className="typshw">
														<p>cm</p>
													</div>
												</div>
												<span style={{ color: "red" }}>{this.state.errors["length"]}</span>
											</div>

										</div>
									</div>
									<div className="twoways">
									</div>

								</div>
							</div>
						</div>
						<div className="productsgrid">
							<div className="head-main"><h6>Variants</h6></div>
							<div className="main-grid form-grd">
								<div className="halffrms">
									<div className="twoways">
										<div className="grpset">
											<label >Upload Size Chart</label>
											<div className="measrtype">
												<div uk-form-custom>
													<input type="file" onChange={this.onChange1} />
												</div>
											</div>
										</div>
									</div>

								</div>

								<div className="halffrms">
									<div className="twoways">
										<div className="grpset">
											<label style={{ width: "340px" }}>Size</label>
											<div className="Inputs">
												<Select
													name="multiValue"
													styles={customStyles}
													placeholder="Select a size"
													value={this.state.multiValue}
													options={this.state.sizeDropDown}
													onChange={this.handleMultiChange}
													isMulti={true}
												/>
												<div>
													{this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null}
													<Link className="open-modal-btn" onClick={this.openModalHandler}>AddSize</Link>
												</div>
												<span style={{ color: "red" }}>{this.state.errors["multiValue"]}</span>
											</div>

										</div>
									</div>

									<div className="twoways">
										<div className="grpset">
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
											<div style={{ float: "right" }}>
												{this.state.isShowing ? <div onClick={this.closeModalHandlerSize} className="back-drop"></div> : null}
												<Link className="open-modal-btn" onClick={this.openModalHandlerSize}>AddColor</Link>
											</div>
										</div>
									</div>
								</div>
								<div className="halffrms">
									<div className="twoways">
										<div className="grpset">
											<label className="mandtry">Default color</label>
											<div className="Inputs">
												<select className="uk-input" id="form-horizontal-text" name="dcolor" value={this.state.value} onChange={this.handleChange}>
													<option value="">Default color</option>
													{/* {this.state.filterOptions1.map((item, key) =>
														<option value={item.value}>{item.label}</option>
													)} */}
													{this.state.multiValue1.map((item, key) =>
														<option value={item.value}>{item.label}</option>
													)}
												</select>
												<span style={{ color: "red" }}>{this.state.errors["dcolor"]}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="productsgrid">
							<div className="head-main"><h6>Images</h6></div>
							<div className="main-grid form-grd">
								<div className="halffrms">
									<div className="twoways">
										<div className="grpset">
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
											<article >
												<figcaption >
													<ul name="img">
														{this.state.pictures.map((item, key) =>
															<li><img src={config.UrlImage + item} /><span class="close" value={key} onClick={() => this.removeImageArray(key)}>x</span></li>
														)}
													</ul>
												</figcaption>
												<span style={{ color: "red" }}>{this.state.errors["img"]}</span>

												<div class="clear"></div>
											</article>
										</div>
									</div>
								</div>

								<div className="halffrms updatebtns">
									<div className="twoways">
										<button type="submit" className="uk-button uk-button-default">Submit</button>
									</div>
									<div className="twoways">
										<Link to="/product" className="uk-button uk-button-default">Back</Link>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>

			</div>
			{
				this.state.isShowing === true ? <Modal
					className="modal"
					show={this.state.isShowing}
					close={this.closeModalHandler}>
				</Modal> : ''

			}
			{

				this.state.isshowingSize === true ? <ModalColor className="modal"
					show={this.state.isshowingSize}
					close={this.closeModalHandlerSize}>
				</ModalColor> : ''
			}

		</div>

	}
}


export default AddProduct;



