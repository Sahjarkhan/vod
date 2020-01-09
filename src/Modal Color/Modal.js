import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import config from '../config/config';

import './Modal.css';

class modal extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], data1: [], errors: {} }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    }
    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;
        //category_id
        if (!fields.color) {
            formIsValid = false;
            errors["color"] = "Please enter color.";
        }
        if (!fields.hexcode) {
            formIsValid = false;
            errors["hexcode"] = "Please enter Hexcode.";
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    showAlert() {
        localStorage.setItem('logindata', null);
        window.location.assign("./")
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.handleValidation()) {
            if (!this.state.sperror) {
                fetch(`${config.Url}api/addcolor`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        color: this.state.color,
                        hexcode: this.state.hexcode,
                    }),
                }).then((response) => response.json())
                    .then((res) => {
                        if (res.status === 'FAILURE') {
                            toast.error(res.message);
                        } else {
                            if (toast.success(res.message)) {
                                this.props.history.push('/colorList');
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
                                <div class="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
                                    <img alt="" src="https://www.justori.com/justori/assets/images/11.gif" />
                                </div>
                                <div class="head-main"><h6>Add Color</h6></div>
                                <div class="main-grid form-grd">
                                    <div class="fullfrm">
                                        <div>
                                            <div class="twoways">
                                                <div class="grpset">
                                                    <label class="mandtry">Color</label>
                                                    <div class="Inputs">
                                                        <input maxLength="8" name="color" class="uk-input" id="form-horizontal-text" type="text" placeholder="Color" value={this.state.value} onChange={this.handleChange} />
                                                        <span style={{ color: "red" }}>{this.state.errors["color"]}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="twoways">
                                                <div class="grpset">
                                                    <label class="mandtry">Hexcode</label>
                                                    <div class="Inputs">
                                                        <input maxLength="8" name="hexcode" class="uk-input" id="form-horizontal-text" type="text" placeholder="Hexcode" value={this.state.value} onChange={this.handleChange} />
                                                        <span style={{ color: "red" }}>{this.state.errors["hexcode"]}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="main-grid form-grd">
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
