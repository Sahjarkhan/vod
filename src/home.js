import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import config from './config/config';
class Home extends Component {

  notify = () => toast("Wow so easy !");

  constructor(props) {
    super(props);
    this.state = { username: '', password: '', errors: {}, checked: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    // alert(localStorage.getItem('logindata'));

    fetch(`${config.Url}api/themeorder`).then((response) => response.json())
      .then((res) => {
        //alert(res);
        if (res.status === 'FAILURE') {
          // toast.error(res.message);
        } else {
          // toast.success(res.message);
          //alert(res);
          //alert(res.response);
          localStorage.setItem('layoutdata', JSON.stringify(res.response));
          //this.setState({data: res.response});



        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      
      });
  }

  handleValidation() {
    let fields = this.state;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields.password) {
      formIsValid = false;
      errors["password"] = "Password Cannot be empty";
    }

    //Email
    if (!fields.username) {
      formIsValid = false;
      errors["username"] = "Username Cannot be empty";
    } else {
      if (typeof fields.username !== "undefined") {
        let lastAtPos = fields.username.lastIndexOf('@');
        let lastDotPos = fields.username.lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields.username.indexOf('@@') == -1 && lastDotPos > 2 && (fields.username.length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["username"] = "Username is not valid";
        }
      }
    }



    this.setState({ errors: errors });
    return formIsValid;
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
        this.setState({ username: localStorage.getItem('loginemail1') });
        this.setState({ password: localStorage.getItem('loginpass1') });
      } else {
        localStorage.setItem('loginemail1', this.state.username);
        localStorage.setItem('loginpass1', this.state.password);
      }
    }
    // alert("hello");
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.username+' password '+ this.state.password);
    event.preventDefault();
    if (this.handleValidation()) {
      fetch(`${config.Url}api/adminlogin`, {
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

            localStorage.setItem('logindata', JSON.stringify(res.adminlogin));
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
    return <div class="loginbgayod">
      <div class="formbgayod">
        <div class="holdlgo"><img src={require('./img/yodfull.png')} class="logoflyod" /></div>

        <p><ToastContainer /></p>

        <div class="formsideod">
          <form onSubmit={this.handleSubmit}>
            <fieldset class="uk-fieldset">
              <div class="yodformdesigns">
                <div class="uk-margin">
                  <label class="yodinplabel">User Name</label>
                  <input name="username" class="uk-input" type="text" placeholder="Enter Your Email Address" value={this.state.username} onChange={this.handleChange} />
                  <span style={{ color: "red" }}>{this.state.errors["username"]}</span>

                </div>

                <div class="uk-margin">
                  <label class="yodinplabel">Password</label>
                  <input name="password" class="uk-input" type="password" placeholder="Enter Your Email Address" value={this.state.password} onChange={this.handleChange} />
                  <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                </div>

                <button class="uk-button uk-button-primary yodprimary">Login</button>
                <div class="forrems">
                  <label>
                    <input class="uk-checkbox" type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked} />

                    <p>Remember  me</p>
                  </label>

                </div>
              </div>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  }
}


export default Home;