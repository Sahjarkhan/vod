import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import config from '../config/config';

import './Modal.css';

class modal extends Component {
    constructor(props) {

        super(props);
        this.state = { data: [], data1: [], errors: {} }
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)

    }
    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;
        //category_id
        if (!fields.category_id) {
            formIsValid = false;
            errors["category_id"] = "Please enter category.";
        }
        if (!fields.subcategory_id) {
            formIsValid = false;
            errors["subcategory_id"] = "Please enter subcategory.";
        }

        if (!fields.subsubcategory_id) {
            formIsValid = false;
            errors["subsubcategory_id"] = "Please enter subsubcategory.";
        }

        if (!fields.size) {
            formIsValid = false;
            errors["size"] = "Please enter size.";
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
        if (name === 'sp') {
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
    handleSubmit(event) {
        event.preventDefault();
        if (this.handleValidation()) {
            var testing = {
                catid: this.state.category_id,
                subcatid: this.state.subcategory_id,
                subsubcatid: this.state.subsubcategory_id,
                size: this.state.size
            };
            console.log(testing);
            if (!this.state.sperror) {
                fetch(`${config.Url}api/addsize`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({
                        catid: this.state.category_id,
                        subcatid: this.state.subcategory_id,
                        subsubcatid: this.state.subsubcategory_id,
                        size: this.state.size

                    }),
                }).then((response) => response.json())
                    .then((res) => {
                        console.log(res, "****************************************8")
                        if (res.status === 'FAILURE') {
                            toast.error(res.message);
                        } else {
                            console.log(res);
                            if (toast.success(res.message)) {
                                this.props.history.push('/sizeList');
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
    handleChange1(event) {
        const target = event.target;
        const value = target.value;
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
                console.log(res.sublistbycat);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    handleChange2(event) {
        const target = event.target;
        const value = target.value;
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
                console.log(res.sublistbycatremark);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    render() {
        return (
            <div className="modal-wrapper addtocrsts"
                style={{
                    transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                <div className="ModalBox">
                    <span className="close-modal" onClick={this.props.close}>×</span>
                    <div className="modal-body">
                        <form onSubmit={this.handleSubmit}>
                            <div class="productsgrid">
                                <div class="head-main"><h6>Add Size</h6></div>
                                <div class="main-grid form-grd">
                                    <div class="fullfrm">
                                        <div class="grpset">
                                            <label class="mandtry">Category</label>
                                            <div class="Inputs">
                                                <select class="uk-input" id="form-horizontal-text" name="category_id" onChange={this.handleChange1}>
                                                    <option >Select a category</option>
                                                    <option value="MEN">MEN</option>
                                                    <option value="WOMEN">WOMEN</option>
                                                    <option value="KIDS">KIDS</option>
                                                    <option value="ACCESSORIES">ACCESSORIES</option>
                                                    <option value="SPORTS">SPORTS</option>
                                                    <option value="SALE">SALE</option>
                                                </select>
                                                <span style={{ color: "red" }}>{this.state.errors["category_id"]}</span>

                                            </div>
                                        </div>

                                        <div class="grpset">
                                            <label class="mandtry">Subcategory</label>
                                            <div class="Inputs">

                                                <select class="uk-input" id="form-horizontal-text" name="subcategory_id" onChange={this.handleChange2}>
                                                    <option >Select a subcategory</option>
                                                    {this.state.data.map((item, key) =>
                                                        <option value={item[0]}>{item[1]}</option>
                                                    )}
                                                </select>

                                                <span style={{ color: "red" }}>{this.state.errors["subcategory_id"]}</span>
                                            </div>
                                        </div>
                                        <div class="grpset">
                                            <label class="mandtry">Sub-subcategory</label>
                                            <div class="Inputs">
                                                <select class="uk-input" id="form-horizontal-text" name="subsubcategory_id" onChange={this.handleChange}>
                                                    <option >Select a sub-subcategory</option>
                                                    {
                                                        this.state.data1.map((item, key) =>
                                                            <option value={item[0]}>{item[1]}</option>
                                                        )}
                                                </select>
                                                <span style={{ color: "red" }}>{this.state.errors["subsubcategory_id"]}</span>

                                            </div>
                                        </div>
                                        <div>
                                            <div class="twoways">
                                                <div class="Inputs">
                                                    <div class="grpset">
                                                        <label class="mandtry">Size</label>
                                                        <div class="Inputs">
                                                            <input maxLength="8" name="size" class="uk-input" id="form-horizontal-text" type="text" placeholder="Size" value={this.state.value} onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <span style={{ color: "red" }}>{this.state.errors["size"]}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="main-grid form-grd">
                                <div class="halffrms">
                                    <div class="twoways">
                                    </div>
                                </div>
                                <div class="halffrms updatebtns">
                                    <div class="twoways">
                                        <button type="submit" class="uk-button uk-button-default">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default modal;
