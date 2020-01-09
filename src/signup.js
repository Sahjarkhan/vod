import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import config from './config/config';

class Signup extends Component {

    constructor(props) {
        super(props);
        
        this.state = { pan_numfile: '', gstnumfile: '', name: '', password: '', email: '', gstnum: '', pan_num: '', phone: '', errors: {} };

        this.handleChange = this.handleChange.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChange1 = this.onChange1.bind(this);

        // alert(localStorage.getItem('logindata'));


    }

    getInitialState() {
        return { checked: true }
    }
    
    handleCheck() {
        this.setState({ checked: !this.state.checked });
    }

    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        // Company Name
        if (!fields.name) {
            formIsValid = false;
            errors["name"] = "Company Name Cannot be empty";
        }

        // phone

        if (!fields.phone) {
            formIsValid = false;
            errors["phone"] = "Phone Number Cannot be empty";
        }
        // gst number

        if (!fields.gstnum) {
            formIsValid = false;
            errors["gstnum"] = "Gst Number Cannot be empty";
        } else {
            var reggst = /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z]){1}([0-9]){1}?$/;
            if (!reggst.test(fields.gstnum)) {

                errors["gstnum"] = "GST Identification Number is not valid.";
            }
        }

        // pancard number

        if (!fields.pan_num) {
            formIsValid = false;
            errors["pan_num"] = "Pan Number Cannot be empty";
        } else {
            var reggst = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
            if (!reggst.test(fields.pan_num)) {

                errors["pan_num"] = "PAN is not valid.";
            }
        }


        //Password
        if (!fields.password) {
            formIsValid = false;
            errors["password"] = "Password Cannot be empty";
        }

        if (!this.state.checked) {
            formIsValid = false;
            errors["checked"] = "Please Check it";
        }

        //Email
        if (!fields.email) {
            formIsValid = false;
            errors["email"] = "Email Cannot be empty";
        } else {
            if (typeof fields.email !== "undefined") {
                let lastAtPos = fields.email.lastIndexOf('@');
                let lastDotPos = fields.email.lastIndexOf('.');

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields.email.indexOf('@@') == -1 && lastDotPos > 2 && (fields.email.length - lastDotPos) > 2)) {
                    formIsValid = false;
                    errors["email"] = "Email is not valid";
                }
            }
        }

        if (!fields.cemail) {
            formIsValid = false;
            errors["cemail"] = "Re-enterd Email Cannot be empty";
        } else {
            if (typeof fields.cemail !== "undefined") {
                let lastAtPos = fields.cemail.lastIndexOf('@');
                let lastDotPos = fields.cemail.lastIndexOf('.');

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields.cemail.indexOf('@@') == -1 && lastDotPos > 2 && (fields.cemail.length - lastDotPos) > 2)) {
                    formIsValid = false;
                    errors["cemail"] = "Re-enterd Email is not valid";
                } else {
                    if (fields.email != fields.cemail) {
                        errors["cemail"] = "Re-enterd and Email are not match";
                    }
                }
            }
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
    }

    onChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        //alert(files);
        console.log(files[0]);
        if (!files.length)
            return;
        this.createImage(files[0]);
    }

    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {

            this.setState({
                gstnumfile: e.target.result
            })
        };
        reader.readAsDataURL(file);
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

            this.setState({
                pan_numfile: e.target.result
            })
        };
        reader.readAsDataURL(file);
    }

    handleSubmit(event) {
        event.preventDefault();


        if (this.handleValidation()) {
            fetch(`${config.Url}api/sellersignup`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    password: this.state.password,
                    email: this.state.email,
                    gstnum: this.state.gstnum,
                    pan_num: this.state.pan_num,
                    phone: this.state.phone,
                    gstnumfile: this.state.gstnumfile,
                    pan_numfile: this.state.pan_numfile
                }),
            }).then((response) => response.json())
                .then((res) => {
                    if (res.status === 'FAILURE') {
                        toast.error(res.message);
                    } else {
                        toast.success(res.message);
                        this.props.history.push('/');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }

    render() {
        return <div class="loginbgayod loginonl">
            <div class="formbgayod signuppart">
                <div class="holdlgo"><img alt="vasdvsa" src={require('./img/yodfull.png')} class="logoflyod" /></div>

                <div class="msgforms">
                    <p>Please enter your email address so we can send you the <br />
                        password reset link.</p>
                </div>

                <div class="formsideod">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset class="uk-fieldset">
                            <div class="yodformdesigns">
                                <div class="uk-margin">
                                    <label class="yodinplabel">Business Name</label>
                                    <input name="name" class="uk-input" type="text" placeholder="ABC Company" value={this.state.name} onChange={this.handleChange} />
                                    <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                </div>

                                <div class="uk-margin">
                                    <label class="yodinplabel">Business Email Address</label>
                                    <input name="email" class="uk-input" type="mail" placeholder="emailaddress@gmail.com" value={this.state.email} onChange={this.handleChange} />
                                    <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                </div>

                                <div class="uk-margin">
                                    <label class="yodinplabel">Re-enter Email address</label>
                                    <input name="cemail" class="uk-input" type="mail" placeholder="emailaddress@gmail.com" value={this.state.cemail} onChange={this.handleChange} />
                                    <span style={{ color: "red" }}>{this.state.errors["cemail"]}</span>
                                </div>

                                <div class="uk-margin">
                                    <label class="yodinplabel">Password</label>
                                    <input name="password" class="uk-input" type="mail" placeholder="********" value={this.state.password} onChange={this.handleChange} />
                                    <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                                </div>

                                <div class="uk-margin">
                                    <label class="yodinplabel">Business Phone</label>
                                    <input name="phone" class="uk-input" type="text" placeholder="********" value={this.state.phone} onChange={this.handleChange} />
                                    <span style={{ color: "red" }}>{this.state.errors["phone"]}</span>
                                </div>

                                <div class="uk-margin">
                                    <label class="yodinplabel">GST Number</label>
                                    <input name="gstnum" class="uk-input" type="text" placeholder="*********" value={this.state.gstnum} onChange={this.handleChange} />
                                    <span style={{ color: "red" }}>{this.state.errors["gstnum"]}</span>
                                    <div class="forrems">
                                        <label><input class="uk-checkbox" type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked} /><p>Select this if you sell GST EXEMpted Goods</p></label>
                                        <br />
                                        <span style={{ color: "red" }}>{this.state.errors["checked"]}</span>
                                        <div uk-form-custom="" class="uk-form-custom">
                                            <input type="file" onChange={this.onChange} />

                                        </div>

                                    </div>

                                </div>

                                <div class="uk-margin">
                                    <label class="yodinplabel">Pan Number</label>
                                    <input name="pan_num" class="uk-input" type="mail" placeholder="*********" value={this.state.pan_num} onChange={this.handleChange} />
                                    <span style={{ color: "red" }}>{this.state.errors["pan_num"]}</span>
                                    <div class="forrems">

                                        <div uk-form-custom="" class="uk-form-custom">
                                            <input type="file" onChange={this.onChange1} />

                                        </div>

                                    </div>

                                </div>


                                <div class="uk-margin full">


                                    <div class="forrems temsrbfr">
                                        <label><input class="uk-checkbox" type="checkbox" /><p>Be creating an account you agree to our<br />
                                            <a href="#modal-center" uk-toggle>Terms of services</a> and <a href="#modal-center" uk-toggle>privacy policy</a> </p></label>

                                        <div id="modal-center" class="uk-flex-top uk-modal" uk-modal="">
                                            <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

                                                <button class="uk-modal-close-default uk-icon uk-close" type="button" uk-close=""><svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" data-svg="close-icon"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line></svg></button>

                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                                            </div>
                                        </div>
                                    </div>

                                    <button class="uk-button uk-button-primary yodprimary">Sign UP</button>

                                    <div class="formsideod becomeseller">

                                        <form>
                                            <fieldset class="uk-fieldset">
                                                <div class="yodformdesigns">
                                                    <p>Already a seller?</p>
                                                    <a href="./" class="uk-button uk-button-primary yodprimary">Sign In</a>


                                                </div>
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </fieldset>
                    </form>
                </div>

            </div>
        </div>
    }
}


export default Signup;

//<input type="text" placeholder="Type" onfocus="this.placeholder=''" onblur="this.placeholder='Type'">