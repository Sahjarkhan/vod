import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import './all.css';
import './fontawesome.css';
import './bootstrap.css';
import config from './config/config';
import Header from "./header";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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
class addSubsubCategory extends Component {

    notify = () => toast("Wow so easy !");
    constructor(props) {
        super(props);
        if (localStorage.getItem('logindata') === null) {
            window.location.assign("./");
        }
        this.state = {
            showStore: false, multiValue: [], isDialogOpen: false,
            multiValue1: [], occasion_status: '', pictures: '',
            filterOptions1: [], filterOptions: [], sperror: '',
            name: '', picturescolorchart: '', sp: '', data4: [],
            data3: [], data: [], data1: [], pictures: [], pictures1: [],
            errors: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this)
        this.onDrop = this.onDrop.bind(this);

    }

    openDialog = () => this.setState({ isDialogOpen: true })
    handleClose = () => this.setState({ isDialogOpen: false })

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
        if (!fields.subcategory_id) {
            errors["subcategory_id"] = "Please enter subcategory.";
        }
        this.setState({ errors: errors });
        return formIsValid;
    }
    onDrop(e) {
        let files = e.target.files || e.dataTransfer.files;
        this.setState({
            showStore: true,
        })
        if (!files.length)
            return;
        this.createImage(files[0]);

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
                        //toast.error(res.message);
                    } else {
                        this.setState({
                            pictures: res.response,
                            showStore: false,
                        })
                        console.log("response", res.response);
                        console.log("pictures", this.state.pictures);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        reader.readAsDataURL(file);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
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
        fetch(`${config.Url}api/sublistbycat/` + value).then((response) => response.json()).then((res) => {
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
    handleSubmit(event) {
        event.preventDefault();
        if (this.handleValidation()) {
            if (this.state.pictures.length !== 0) {
                this.state.pictures = `${config.UrlImage}` + this.state.pictures;
            } else {
                this.state.pictures = ''
            }
            if (this.state.occasion_status == false) {
                this.state.occasion_status = 0

            } else {
                this.state.occasion_status = 1
            }
            fetch(`${config.Url}api/addsubsubcat`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    subcategory_id: this.state.subcategory_id,
                    occasion_status: this.state.occasion_status,
                    image: this.state.pictures,
                    category_id: this.state.category_id
                }),
            }).then((response) => response.json())
                .then((res) => {
                    console.log(res)
                    if (res.status === 'FAILURE') {
                        toast.error(res.message);
                    } else {
                        if (toast.success(res.message)) {
                            this.props.history.push('/subsubcategory');
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    handleChange2(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            subcategory_id: value
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
                            <div className="head-main"><h6>Add Subsubcategory</h6></div>
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
                                            <select className="uk-input" id="form-horizontal-text" name="category_id" value={this.state.value} onChange={this.handleChange}>
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
                                    <div class="grpset">
                                        <label class="mandtry">Occasion Status</label>
                                        <div class="Inputs">

                                            <FormControlLabel
                                                label={this.state.occasion_status ? "Active" : "Inactive"}
                                                value={this.state.occasion_status ? "1" : "0"}
                                                control={
                                                    <Switch color="primary" checked={this.state.occasion_status} value={this.state.occasion_status ? "1" : ""} />
                                                }
                                                onChange={event => {
                                                    this.setState({ occasion_status: !this.state.occasion_status })

                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                    <div>
                                        {this.state.occasion_status == true ? <div class="grpset">
                                            <label class="mandtry">Image</label>
                                            <div class="Inputs">
                                                <p> <input type="file" onChange={this.onDrop} /></p>
                                            </div>
                                        </div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="halffrms updatebtns">
                            <div className="twoways">
                                <button type="submit" className="uk-button uk-button-default">Submit</button>
                            </div>
                            <div className="twoways">
                                <Link to="/subsubcategory" className="uk-button uk-button-default">Back</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    }
}


export default addSubsubCategory;




