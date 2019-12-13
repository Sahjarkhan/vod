import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
const url = "https://mobuloustech.com/yodapi/api/sellerlogin";

class Home extends Component {

    notify = () => toast("Wow so easy !");

    constructor(props) {
        super(props);
        this.state = { username: '', password: '', errors: {}, checked: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        // alert(localStorage.getItem('logindata'));


    }

    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields.password) {
            formIsValid = false;
            errors["password"] = "Password cannot be empty.";
        }

        //Email
        if (!fields.username) {
            formIsValid = false;
            errors["username"] = "Username cannot be empty.";
        } else {
            if (typeof fields.username !== "undefined") {
                let lastAtPos = fields.username.lastIndexOf('@');
                let lastDotPos = fields.username.lastIndexOf('.');

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields.username.indexOf('@@') === -1 && lastDotPos > 2 && (fields.username.length - lastDotPos) > 2)) {
                    formIsValid = false;
                    errors["username"] = "Username is not valid.";
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

    getInitialState() {
        return { checked: true }
    }

    handleCheck() {
        this.setState({ checked: !this.state.checked });
        console.log(this.state.checked);
        if (!this.state.checked) {
            // alert("dfhsagdsf");
            if (!this.state.username || !this.state.password) {

                this.setState({ username: localStorage.getItem('loginemail') });
                this.setState({ password: localStorage.getItem('loginpass') });
            } else {
                localStorage.setItem('loginemail', this.state.username);
                localStorage.setItem('loginpass', this.state.password);
            }
        }
        // alert("hello");
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.username+' password '+ this.state.password);
        event.preventDefault();
        if (this.handleValidation()) {
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                }),
            }).then((response) => response.json())
                .then((res) => {
                    //alert(res);
                    if (res.status === 'FAILURE') {
                        toast.error(res.message);
                    } else {
                        toast.success(res.message);

                        localStorage.setItem('logindata', JSON.stringify(res.sellerlogin));
                        this.props.history.push('/dashboard');
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
        return <div className="loginbgayod loginonl">
            <div className="yod-container">
                <div uk-grid>
                    <div className="rightside-yod">
                        <div className="formbgayod">
                            <div className="holdlgo">
                                <img alt="hhjj" src={require('./img/yodfull.png')} className="logoflyod" />
                            </div>
                            <div className="msgforms">
                                <p><ToastContainer /></p>
                            </div>
                            <div className="formsideod">
                                <form onSubmit={this.handleSubmit}>
                                    <fieldset className="uk-fieldset">
                                        <div className="yodformdesigns">
                                            <div className="uk-margin">
                                                <label className="yodinplabel">User Name</label>
                                                <input name="username" className="uk-input" type="text" placeholder="Enter Your Email Address" value={this.state.username} onChange={this.handleChange} />
                                                <span style={{ color: "red" }}>{this.state.errors["username"]}</span>
                                            </div>
                                            <div className="uk-margin">
                                                <label className="yodinplabel">Password</label>
                                                <input name="password" className="uk-input" type="password" placeholder="Enter Your Password" value={this.state.password} onChange={this.handleChange} />
                                                <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                                            </div>
                                            <button type="submit" className="uk-button uk-button-primary yodprimary">Log In</button>
                                            <div className="forrems">
                                                <label>
                                                    <input className="uk-checkbox" type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked} />

                                                    <p>Remember  me</p>
                                                </label>
                                                <Link to="/forgot">Forget Password</Link>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                            <div className="formsideod becomeseller">
                                <h6>Become a Seller</h6>
                                <form>
                                    <fieldset className="uk-fieldset">
                                        <div className="yodformdesigns">
                                            <p>Not a Member Yet ?</p>

                                            <Link to="/signup" className="uk-button uk-button-primary yodprimary1">Sign Up</Link>

                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="leftside-yod">
                        <div className="icohda">
                            <h2>doing business on Yard of deals is really easy</h2>
                        </div>
                        <div className="row-yod">
                            <div className="col-5-yd">
                                <div className="ydosteps">
                                    <h4>Step 1</h4>
                                    <div className="lstproyd">
                                        <h6>List Your Products</h6>
                                        <p>Uploading your products is really simple through our
                                            self-serve tool.We also help you put together an attractive
                                            catalog by connecting you with industry experts.
                                </p>
                                        <div className="iconsetsydo">
                                            <div className="iconareayod-vd">
                                                <div className="icovoiletod">
                                                    <img alt="hhjj" src={require('./img/list.png')} />
                                                </div>
                                                <p>Easy to use<br />
                                                    self-serve portal
                                        </p>
                                            </div>
                                            <div className="iconareayod-vd">
                                                <div className="icovoiletod">
                                                    <img alt="hhjj" src={require('./img/camera.png')} />
                                                </div>
                                                <p>Catalog & photo-shoot<br />
                                                    partners across India
                                        </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-5-yd">
                                <div className="ydosteps">
                                    <h4>Step 2</h4>
                                    <div className="lstproyd">
                                        <h6>Sell across India</h6>
                                        <p>Maximise your online sales; attract more buyers and
                                            achieve higher conversion rates.
                                </p>
                                        <div className="iconsetsydo">
                                            <div className="iconareayod-vd">
                                                <div className="icovoiletod">
                                                    <img alt="hhjj" src={require('./img/easy.png')} />
                                                </div>
                                                <p>Easy <br />
                                                    Dashboard
                                        </p>
                                            </div>
                                            <div className="iconareayod-vd">
                                                <div className="icovoiletod">
                                                    <img alt="hhjj" src={require('./img/horn.png')} />
                                                </div>
                                                <p>Promotions<br />
                                                    and advertising
                                        </p>
                                            </div>
                                            <div className="iconareayod-vd">
                                                <div className="icovoiletod">
                                                    <img alt="hhjj" src={require('./img/analytics.png')} />
                                                </div>
                                                <p>Analytics<br />
                                                    support
                                        </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-5-yd">
                                <div className="ydosteps">
                                    <h4>Step 3</h4>
                                    <div className="lstproyd">
                                        <h6>Sell across India</h6>
                                        <p>Enjoy hassle-free pick-up and delivery across India
                                            through our logistics services and sell across the nation!
                                </p>
                                        <div className="iconsetsydo">
                                            <div className="iconareayod-vd">
                                                <div className="icovoiletod">
                                                    <img alt="hhjj" src={require('./img/dedicated.png')} />
                                                </div>
                                                <p>Dedicated<br />
                                                    pick-up service
                                        </p>
                                            </div>
                                            <div className="iconareayod-vd">
                                                <div className="icovoiletod">
                                                    <img alt="hhjj" src={require('./img/packaging.png')} />
                                                </div>
                                                <p>Packaging support</p>
                                            </div>
                                            <div className="iconareayod-vd">
                                                <div className="icovoiletod">
                                                    <img alt="hhjj" src={require('./img/map.png')} />
                                                </div>
                                                <p>Pan-India reach</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-5-yd">
                                <div className="ydosteps">
                                    <h4>Step 4</h4>
                                    <div className="lstproyd">
                                        <h6>Earn Big</h6>
                                        <p>Make use of the host of services that we offer and earn
                                            more. Our payments process is the fastest in the
                                            industry - get your payments within 7-15 days of sales!
                                </p>
                                        <div className="iconsetsydo">
                                            <div className="iconareayod-vd">
                                                <div className="icovoiletod">
                                                    <img alt="hhjj" src={require('./img/fastpay.png')} />
                                                </div>
                                                <p>Fastest payments <br />
                                                    settlementsin the industry
                                        </p>
                                            </div>
                                            <div className="iconareayod-vd">
                                                <div className="icovoiletod">
                                                    <img alt="hhjj" src={require('./img/globe.png')} />
                                                </div>
                                                <p>Lending partner<br /> network</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="registerinless">
                            <h6>Register in less than 15 minutes <br />View these incredible stories of how Yod can fulfil your business wishes</h6>
                            <p>All you need is to have a business of your own</p>
                            <p className="andsgnd"> & </p>
                            <div className="stptxt">
                                <ul>
                                    <li>GSTIN <br />ID</li>
                                    <li>Pan <br />Card</li>
                                    <li>Bank <br />Account</li>
                                    <li>Address <br />proof</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}


export default Home;