//     import React, { Component } from "react";
// import './uikit.css';
// import './yodadmincss.css';
// import './uikit-rtl.css';
// import './all.css';
// import './fontawesome.css';
// import './bootstrap.css';

// import Header from "./header";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import config from './config/config';


// const customStyles = {
//     option: (provided, state) => ({
//         ...provided,
//         borderBottom: '1px dotted pink',
//         color: state.isSelected ? 'red' : 'blue',
//         padding: 20,
//     }),
//     control: () => ({

//         width: 200,
//     }),
//     singleValue: (provided, state) => {
//         const opacity = state.isDisabled ? 0.5 : 1;
//         const transition = 'opacity 300ms';

//         return { ...provided, opacity, transition };
//     }
// }
// class AddCupen extends Component {
//     notify = () => toast("Wow so easy !");

//     constructor(props) {
//         super(props);
//         this.state = {
//             showStore: false, multiValue: [], isDialogOpen: false,
//             multiValue1: [],
//             filterOptions1: [], filterOptions: [], sperror: '', name: '', picturescolorchart: '', sp: '', data4: [], data3: [], data: [], data1: [], pictures: [], pictures1: [], errors: {}
//         };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleChange1 = this.handleChange1.bind(this);
//         this.handleChange2 = this.handleChange2.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.onDrop = this.onDrop.bind(this);
//         this.onChange1 = this.onChange1.bind(this);
//         this.handleMultiChange = this.handleMultiChange.bind(this);
//         this.handleMultiChange1 = this.handleMultiChange1.bind(this);
//         this.handleChange4 = this.handleChange4.bind(this)

//     }

//     handleMultiChange(option) {
//         this.setState(state => {
//             return {
//                 multiValue: option
//             };
//         });
//     }


//     handleMultiChange(option) {
//         this.setState(state => {
//             return {
//                 multiValue: option
//             };
//         });
//     }

//     openDialog = () => this.setState({ isDialogOpen: true })
//     handleClose = () => this.setState({ isDialogOpen: false })
//     handleMultiChange(option) {
//         this.setState(state => {
//             return {
//                 multiValue: option
//             };
//         });
//     }

//     onDrop(picture) {
//         this.createImage(picture[picture.length - 1]);
//         this.setState({
//             pictures1: picture,
//             showStore: true,
//         })
//         this.setState({
//             pictures: []
//         })
//         const main = this.state.pictures1;
//         for (var i = 0; i < main.length; i++) {
//             this.createImage(main[i]);

//         }
//         // if (!picture.length)
//         // return;
//         // this.createImage(picture[0]);
//     }

//     onChange1(e) {
//         let files = e.target.files || e.dataTransfer.files;
//         //alert(files);
//         console.log(files[0]);
//         if (!files.length)
//             return;
//         this.createImage1(files[0]);
//     }

//     createImage1(file) {
//         let reader = new FileReader();
//         reader.onload = (e) => {
//             console.log(e.target.result)
//             fetch(`${config.Url}api/fileuploade`, {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     gstnumfile: e.target.result,
//                 }),
//             }).then((response) => response.json())
//                 .then((res) => {
//                     //alert(res);
//                     if (res.status === 'FAILURE') {
//                         //toast.error(res.message);
//                     } else {
//                         //toast.success(res.message);
//                         this.setState({
//                             picturescolorchart: res.response
//                         })
//                         //this.props.picturemain = this.state.pictures
//                         console.log(res.response);
//                         //console.log(this.state.pictures);
//                         //localStorage.setItem('logindata', res.sellerlogin);
//                         //this.props.history.push('/product');
//                     }
//                     //console.log(res);
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         };
//         reader.readAsDataURL(file);
//         //return this.state.pictures;
//     }

//     createImage(file) {
//         let reader = new FileReader();
//         reader.onload = (e) => {
//             console.log(e.target.result)
//             fetch(`${config.Url}api/fileuploade`, {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     gstnumfile: e.target.result,
//                 }),
//             }).then((response) => response.json())
//                 .then((res) => {
//                     //alert(res);
//                     if (res.status === 'FAILURE') {
//                         //toast.error(res.message);
//                     } else {
//                         //toast.success(res.message);
//                         this.setState({
//                             pictures: this.state.pictures.concat(res.response),
//                             showStore: false,
//                         })
//                         //this.props.picturemain = this.state.pictures
//                         console.log(res.response);
//                         console.log(this.state.pictures);
//                         //localStorage.setItem('logindata', res.sellerlogin);
//                         //this.props.history.push('/product');
//                     }
//                     //console.log(res);
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                     alert('Oops, something went wrong. Please try again!');
//                 });

//         };
//         reader.readAsDataURL(file);
//         //return this.state.pictures;
//     }
//     handleMultiChange1(option) {
//         this.setState(state => {
//             return {
//                 multiValue1: option
//             };
//         });
//     }
//     handleValidation() {
//         let fields = this.state;
//         let errors = {};
//         let formIsValid = true;

//         //Name
//         if (!fields.name) {
//             formIsValid = false;
//             errors["name"] = "Please enter name.";
//         }

//         if (!fields.Offertype) {
//             formIsValid = false;
//             errors["Offertype"] = "Offer type.";
//         }

//         if (!fields.description) {
//             formIsValid = false;
//             errors["description"] = "Please enter description.";
//         }

//         this.setState({ errors: errors });
//         return formIsValid;
//     }

//     handleChange(event) {
//         const target = event.target;
//         const value = target.value;
//         const name = target.name;
//         this.setState({
//             [name]: value
//         });
//     }

//     handleChange1(event) {
//         const target = event.target;
//         const value = target.value;
//         const name = target.name;
//         console.log(value)
//         this.setState({
//             Offertype: value
//         });
//     }

//     handleChange4(event) {
//         const target = event.target;
//         const value = target.value;
//         const name = target.name;
//         //alert(value);
//         this.setState({
//             Discounttype: value
//         });
//     }

//     handleChange2(event) {
//         const target = event.target;
//         const value = target.value;
//         const name = target.name;
//         this.setState({
//             subcategory_id: value
//         });

//         fetch(`${config.Url}api/sublistbycatremark/` + value).then((response) => response.json())
//             .then((res) => {
//                 if (res.status === 'FAILURE') {
//                     toast.error(res.message);
//                 } else {
//                     this.setState({ data1: res.sublistbycatremark });
//                 }
//                 console.log(res.sublistbycatremark);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }

//     handleSubmit(event) {
//         console.log("Salmankhan*************")
//         event.preventDefault();
//         if (this.handleValidation()) {

//             if (!this.state.sperror) {
//                 var test = {
//                     name: this.state.name,
//                     offer_type: this.state.Offertype,
//                     image: this.state.picturescolorchart,
//                     discount: this.state.discount,
//                     description: this.state.description,
//                     discount_type: this.state.Discounttype,

//                 }
//                 console.log(test)
//                 fetch(`${config.Url}api/addoffer`, {
//                     method: 'POST',
//                     headers: {
//                         Accept: 'application/json',
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         name: this.state.name,
//                         offer_type: this.state.Offertype,
//                         image: this.state.picturescolorchart,
//                         discount: this.state.discount,
//                         description: this.state.description,
//                         discount_type: this.state.Discounttype,
//                     }),
//                 }).then((response) => response.json())
//                     .then((res) => {
//                         //alert(res);
//                         if (res.status === 'FAILURE') {
//                             toast.error(res.message);
//                         } else {
//                             //toast.success();
//                             //alert(res.message)
//                             console.log("~~~~~~~~~~~~~~~~~~~~~~~~", res);
//                             //localStorage.setItem('logindata', res.sellerlogin);
//                             if (toast.success(res.message)) {
//                                 this.props.history.push('/cupenList');
//                             }
//                         }
//                         console.log(res);
//                     })
//                     .catch((error) => {
//                         console.log(error);
//                     });
//             }
//         }
//     }

//     render() {
//         const { selectedOption } = this.state;
//         return <div className="dash-layout">
//             <Header />
//             <div className="bodylayouts-yod">
//                 <div >
//                     <form onSubmit={this.handleSubmit}>
//                         <div className="productsgrid">
//                             <p><ToastContainer /></p>
//                             <div className="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
//                                 <img src="https://www.justori.com/justori/assets/images/11.gif" />
//                             </div>
//                             <div className="head-main"><h6>Product Info</h6></div>
//                             <div className="main-grid form-grd">

//                                 <div className="fullfrm">
//                                     <div className="grpset">
//                                         <label className="mandtry">Name</label>
//                                         <div className="Inputs">
//                                             <input name="name" className="uk-input" id="form-horizontal-text" type="text" placeholder="Enter Product Name" value={this.state.value} onChange={this.handleChange} />
//                                             <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
//                                         </div>
//                                     </div>
//                                     <div className="grpset">
//                                         <label className="mandtry">Offer type</label>
//                                         <div className="Inputs">
//                                             <select className="uk-input" id="form-horizontal-text" name="Offertype" value={this.state.value} onChange={this.handleChange1}>
//                                                 <option >Offer type</option>
//                                                 <option value="1">Back Discount</option>
//                                                 <option value="2">By and Get</option>
//                                                 <option value="3">Hot Deals</option>
//                                             </select>
//                                             <span style={{ color: "red" }}>{this.state.errors["Offertype"]}</span>
//                                         </div>
//                                     </div>
//                                     <div className="grpset">
//                                         <label className="mandtry">Description</label>
//                                         <div className="Inputs">
//                                             <textarea maxLength="200" name="description" className="uk-input" id="form-horizontal-text" type="text" placeholder="Enter Description" value={this.state.value} onChange={this.handleChange} ></textarea>
//                                             <span style={{ color: "red" }}>{this.state.errors["description"]}</span>
//                                         </div>
//                                     </div>
//                                     <div className="grpset">
//                                         <label className="mandtry">discount</label>
//                                         <div className="Inputs">
//                                             <input maxLength="200" name="discount" className="uk-input" id="form-horizontal-text" type="text" placeholder="Enter Discount" value={this.state.value} onChange={this.handleChange} ></input>
//                                             <span style={{ color: "red" }}>{this.state.errors["discount"]}</span>
//                                         </div>
//                                     </div>
//                                     <div className="grpset">
//                                         <label className="mandtry">Discount type</label>
//                                         <div className="Inputs">
//                                             <select className="uk-input" id="form-horizontal-text" name="Discounttype" value={this.state.value} onChange={this.handleChange4}>
//                                                 <option >Offer type</option>
//                                                 <option value="Rupess">Rupess Discount</option>
//                                                 <option value="percentage">percentage Discount</option>
//                                             </select>
//                                             <span style={{ color: "red" }}>{this.state.errors["Discounttype"]}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="halffrms">
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="productsgrid">
//                             <div className="head-main"><h6>Image</h6></div>
//                             <div className="main-grid form-grd">
//                                 <div className="halffrms">
//                                     <div className="twoways">
//                                         <div className="grpset">
//                                             <label >Upload Size Chart</label>
//                                             <div className="measrtype">
//                                                 <div uk-form-custom>
//                                                     <input type="file" onChange={this.onChange1} />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="productsgrid">
//                             <div className="halffrms updatebtns">
//                                 <div className="twoways">
//                                     <button type="submit" className="uk-button uk-button-default">Submit</button>
//                                 </div>
//                                 <div className="twoways">
//                                     <Link to="/cupenList" className="uk-button uk-button-default">Back</Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>

//     }
// }


// export default AddCupen;








import React, { Component, Fragment } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import './all.css';
import './fontawesome.css';
import './bootstrap.css';

import Header from "./header";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from './config/config';


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
class AddCupen extends Component {
    notify = () => toast("Wow so easy !");

    constructor(props) {
        super(props);
        this.state = {
            showStore: false, multiValue: [], isDialogOpen: false,
            multiValue1: [],
            filterOptions1: [],
            filterOptions: [],
            sperror: '',
            name: '',
            picturescolorchart: '',
            sp: '',
            data4: [],
            data3: [],
            data: [],
            data1: [],
            pictures: [],
            pictures1: [],
            errors: {},
            StatusChange: '',
            subcategory_id: '',
            get: '',
            buy: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange4 = this.handleChange4.bind(this)
        this.handleChange3 = this.handleChange3.bind(this)

    }



    openDialog = () => this.setState({ isDialogOpen: true })
    handleClose = () => this.setState({ isDialogOpen: false })

    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        if (!fields.Offertype) {
            formIsValid = false;
            errors["Offertype"] = "Offer type.";
        }

        if (!fields.description) {
            formIsValid = false;
            errors["description"] = "Please enter description.";
        }


        this.setState({ errors: errors });
        return formIsValid;
    }

    handleValidation1() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        if (!fields.Offertype) {
            formIsValid = false;
            errors["Offertype"] = "Offer type.";
        }

        if (!fields.description) {
            formIsValid = false;
            errors["description"] = "Please enter description.";
        }

        if (!fields.buy) {
            formIsValid = false;
            errors["buy"] = " Invalid buy in. must be only numerical digits.";
        }

        if (!fields.get) {
            formIsValid = false;
            errors["get"] = "Invalid get in. must be only numerical digits.";
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
        if (name == 'buy') {
            const re = /^[0-9\b]+$/;
            if (value === '' || re.test(value)) {
                this.setState({ ships_in: value })
            } else {
                this.setState({
                    buy: '',
                });
            }
        }
        if (name == 'get') {
            const re = /^[0-9\b]+$/;
            if (value === '' || re.test(value)) {
                this.setState({ ships_in: value })
            } else {
                this.setState({
                    get: '',
                });
            }
        }
    }

    handleChange1(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            Offertype: value
        });
        this.setState({
            StatusChange: value
        });
    }

    handleChange4(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        //alert(value);
        this.setState({
            Discounttype: value
        });
    }

    handleChange2(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        //alert(value);
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
    }



    handleChange3(event) {
        const target = event.target;
        var value = target.value;
        var name = target.name;
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
            });
    }



    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.Offertype);
        console.log(this.state.get)
        if (this.state.Offertype == 2) {
            if (this.handleValidation1()) {
                if (!this.state.sperror) {
                    fetch(`${config.Url}api/addoffer`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            offer_type: this.state.Offertype,
                            description: this.state.description,
                            catid: this.state.subcategory_id,
                            get: this.state.get,
                            buy: this.state.buy
                        }),
                    }).then((response) => response.json())
                        .then((res) => {
                            //alert(res);
                            if (res.status === 'FAILURE') {
                                toast.error(res.message);
                            } else {
                                //toast.success();
                                //alert(res.message)
                                console.log("~~~~~~~~~~~~~~~~~~~~~~~~", res);
                                //localStorage.setItem('logindata', res.sellerlogin);
                                if (toast.success(res.message)) {
                                    this.props.history.push('/cupenList');
                                }
                            }
                            console.log(res);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            }
        }
        else {
            if (this.handleValidation()) {
                console.log(this.state.get)
                if (!this.state.sperror) {
                    fetch(`${config.Url}api/addoffer`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({

                            offer_type: this.state.Offertype,
                            description: this.state.description,
                            catid: this.state.subcategory_id,
                            get: this.state.get,
                            buy: this.state.buy
                        }),
                    }).then((response) => response.json())
                        .then((res) => {
                            if (res.status === 'FAILURE') {
                                toast.error(res.message);
                            } else {
                                console.log("~~~~~~~~~~~~~~~~~~~~~~~~", res);
                                if (toast.success(res.message)) {
                                    this.props.history.push('/cupenList');
                                }
                            }
                            console.log(res);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
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
                                        <label className="mandtry">Offer type</label>
                                        <div className="Inputs">
                                            <select className="uk-input" id="form-horizontal-text" name="Offertype" value={this.state.value} onChange={this.handleChange1}>
                                                <option value="">Offer type</option>
                                                <option value="1">Back Discount</option>
                                                <option value="2">By and Get</option>
                                            </select>
                                            <span style={{ color: "red" }}>{this.state.errors["Offertype"]}</span>
                                        </div>
                                    </div>
                                    <Fragment>
                                        {
                                            this.state.StatusChange === '2' ?
                                                <Fragment>
                                                    <div className="grpset">
                                                        <label className="mandtry">Category</label>
                                                        <div className="Inputs">
                                                            <select className="uk-input" id="form-horizontal-text" name="category_id" value={this.state.value} onChange={this.handleChange2}>
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
                                                        <select className="uk-input" id="form-horizontal-text" name="subcategory_id" value={this.state.value} onChange={this.handleChange3}>
                                                            <option >Select a subcategory</option>
                                                            {this.state.data.map((item, key) =>
                                                                <option value={item[0]}>{item[1]}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div className="grpset">
                                                        <label className="mandtry">Sub-subcategory</label>
                                                        <select className="uk-input" id="form-horizontal-text" name="subsubcategory_id" value={this.state.value} onChange={this.handleChange3}>
                                                            <option >Select a sub-subcategory</option>
                                                            {this.state.data1.map((item, key) =>
                                                                <option value={item[0]}>{item[1]}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <div className="grpset">
                                                            <label className="mandtry">Buy</label>
                                                            <div className="Inputs">
                                                                <input maxLength="200" name="buy" className="uk-input" id="form-horizontal-text" type="text" placeholder="Enter Buy" value={this.state.value} onChange={this.handleChange} ></input>
                                                                <span style={{ color: "red" }}>{this.state.errors["buy"]}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="grpset">
                                                            <label className="mandtry">Get</label>
                                                            <div className="Inputs">
                                                                <input maxLength="200" name="get" className="uk-input" id="form-horizontal-text" type="text" placeholder="Enter Get" value={this.state.value} onChange={this.handleChange} ></input>
                                                                <span style={{ color: "red" }}>{this.state.errors["get"]}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Fragment> : ''
                                        }
                                    </Fragment>
                                    <div className="grpset">
                                        <label className="mandtry">Description</label>
                                        <div className="Inputs">
                                            <textarea maxLength="200" name="description" className="uk-input" id="form-horizontal-text" type="text" placeholder="Enter Description" value={this.state.value} onChange={this.handleChange} ></textarea>
                                            <span style={{ color: "red" }}>{this.state.errors["description"]}</span>
                                        </div>
                                    </div>

                                </div>
                                <div className="halffrms">
                                </div>
                            </div>
                        </div>

                        <div className="productsgrid">
                            <div className="halffrms updatebtns">
                                <div className="twoways">
                                    <button type="submit" className="uk-button uk-button-default">Submit</button>
                                </div>
                                <div className="twoways">
                                    <Link to="/cupenList" className="uk-button uk-button-default">Back</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    }
}


export default AddCupen;






{/* <div>
                                        {this.state.occasion_status == true ? <div class="grpset">
                                            <label class="mandtry">Image</label>
                                            <div class="Inputs">
                                                <p> <input type="file" onChange={this.onDrop} /></p>
                                            </div>
                                        </div> : ''}
                                    </div> */}