import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const url = "https://mobuloustech.com/yodapi/api/sellersignup";

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = { passwordtype: true, pan_numerror: '', gstnumerror: '', branderror: '', phoneerror: '', emailerror: '', brandfile: '', pan_numfile: '', brand: '', gstnumfile: '', name: '', password: '', email: '', gstnum: '', pan_num: '', phone: '', errors: {} };

    this.handleChange = this.handleChange.bind(this);
    this.handleChange333 = this.handleChange333.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChange1 = this.onChange1.bind(this);
    this.onChange12 = this.onChange12.bind(this);
    this.handleChange69 = this.handleChange69.bind(this);
    this.handleChange690 = this.handleChange690.bind(this);

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
      errors["name"] = "Company Name cannot be empty.";
    } else {
      if (fields.name.length > 100) {
        formIsValid = false;
        errors["name"] = "Company Name cannot be greater than 100 character.";
      }
    }

    // phone

    if (!fields.phone) {
      formIsValid = false;
      this.setState({ phoneerror: "Phone Number cannot be empty." });

    }

    if (!this.state.checked) {
      formIsValid = false;
      errors["checked"] = "Please Check it";
    }
    // gst number

    if (!fields.gstnum) {
      formIsValid = false;
      this.setState({ gstnumerror: 'Gst Number cannot be empty.' });
      //errors["gstnum"] = "";
    }

    // pancard number

    if (!fields.pan_num) {
      formIsValid = false;
      this.setState({ pan_numerror: 'Pan Number cannot be empty.' });
      //errors["pan_num"] = "";
    }


    //Password
    if (!fields.password) {
      formIsValid = false;
      errors["password"] = "Password cannot be empty.";
    }

    if (!fields.brand) {
      formIsValid = false;
      errors["brand"] = "Brand cannot be empty.";
    }



    //Email
    if (!fields.email) {
      formIsValid = false;
      this.setState({ emailerror: "Email cannot be empty." });

    } else {
      if (typeof fields.email !== "undefined") {
        let lastAtPos = fields.email.lastIndexOf('@');
        let lastDotPos = fields.email.lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields.email.indexOf('@@') === -1 && lastDotPos > 2 && (fields.email.length - lastDotPos) > 2)) {
          formIsValid = false;
          this.setState({ emailerror: "Email is not valid." });

        }
      }
    }



    if (!fields.cemail) {
      formIsValid = false;
      errors["cemail"] = "Re-entered Email cannot be empty.";
    } else {
      if (typeof fields.cemail !== "undefined") {
        let lastAtPos = fields.cemail.lastIndexOf('@');
        let lastDotPos = fields.cemail.lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields.cemail.indexOf('@@') === -1 && lastDotPos > 2 && (fields.cemail.length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["cemail"] = "Re-entered Email is not valid.";
        } else {
          if (fields.email !== fields.cemail) {
            errors["cemail"] = "Re-entered and Email are not match.";
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

    if (name === 'pan_num') {
      var reggst = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
      if (reggst.test(this.state.pan_num)) {
        this.setState({ pan_numerror: "PAN Number is not valid." });
        // errors["gstnum"] = "GST Number is not valid.";
      } else {
        this.setState({ pan_numerror: '' });
      }
    }
  }

  handleChange333(event) {
    const target = event.target;
    const value = target.value;

    var reggst = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

    // var s=reggst.test(this.state.gstnum)

    // debugger
    if (!reggst.test(value)) {
      this.setState({ gstnumerror: "GST Number is not valid." });
      // errors["gstnum"] = "GST Number is not valid.";
    } else {
      this.setState({ gstnumerror: '' });
    }
  }

  handleChange69(event) {
    const target = event.target;
    const value = target.value;


    this.setState({
      email: value
    });

    fetch("https://mobuloustech.com/yodapi/api/checkemailseller", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: value,
      }),
    }).then((response) => response.json())
      .then((res) => {
        // alert(res);
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          //toast.success(res.message);
          //localStorage.setItem('logindata', res.sellerlogin);
          // this.props.history.push('/');
          if (res.checkemailseller.status === '1') {

            this.setState({ emailerror: "Email Id already exist." });
          } else {
            this.setState({ emailerror: '' });
          }
        }
        //console.log(errors);
      })
      .catch((error) => {
        console.log(error);
        alert('Oops, something went wrong. Please try again!');
      });
  }

  handleChange690(event) {
    const target = event.target;
    const value = target.value;


    this.setState({
      phone: value
    });

    fetch("https://mobuloustech.com/yodapi/api/checkphoneseller", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: value, }),
    }).then((response) => response.json())
      .then((res) => {
        // alert(res);
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          //toast.success(res.message);
          //localStorage.setItem('logindata', res.sellerlogin);
          // this.props.history.push('/');
          if (res.checkphoneseller.status === '1') {

            this.setState({ phoneerror: "Phone number already exist." });
          } else {
            this.setState({ phoneerror: '' });
          }
        }
        //console.log(errors);
      })
      .catch((error) => {
        console.log(error);
        alert('Oops, something went wrong. Please try again!');
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

  onChange12(e) {
    let files = e.target.files || e.dataTransfer.files;
    //alert(files);
    console.log(files[0]);
    if (!files.length)
      return;
    this.createImage12(files[0]);
  }

  createImage12(file) {
    let reader = new FileReader();
    reader.onload = (e) => {

      this.setState({
        brandfile: e.target.result
      })
    };
    reader.readAsDataURL(file);
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.username+' password '+ this.state.password);
    event.preventDefault();


    if (this.handleValidation()) {
      // var isMyObjectEmpty = !Object.keys(this.state.errors).length;
      console.log(Object.keys(this.state.errors).length);

      if (!this.state.emailerror) {
        if (!this.state.phoneerror) {
          if (!this.state.gstnumerror) {
            if (!this.state.pan_numerror) {
              fetch(url, {
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
                  pan_numfile: this.state.pan_numfile,
                  brand: this.state.brand,
                  brandfile: this.state.brandfile,
                }),
              }).then((response) => response.json())
                .then((res) => {
                  // alert(res);
                  if (res.status === 'FAILURE') {
                    toast.error(res.message);
                  } else {
                    toast.success(res.message);
                    //localStorage.setItem('logindata', res.sellerlogin);
                    this.props.history.push('/');
                  }
                  console.log(res);
                })
                .catch((error) => {
                  console.log(error);
                  alert('Oops, something went wrong. Please try again!');
                });
            }
          }
        }
      }
    }




  }

  render() {
    return <div className="loginbgayod loginonl">
      <div className="formbgayod signuppart">
        <div className="holdlgo"><img alt="vasdvsa" src={require('./img/yodfull.png')} className="logoflyod" /></div>
        <div className="msgforms">
        </div>
        <div className="formsideod">
          <form onSubmit={this.handleSubmit}>
            <fieldset className="uk-fieldset">
              <div className="yodformdesigns">
                <div className="uk-margin">
                  <label className="yodinplabel">Business Name</label>
                  <input name="name" className="uk-input" type="text" placeholder="ABC Company" value={this.state.name} onChange={this.handleChange} />
                  <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                </div>

                <div className="uk-margin">
                  <label className="yodinplabel">Business Email Address</label>
                  <input name="email" className="uk-input" type="mail" placeholder="abc@gmail.com" value={this.state.email} onChange={this.handleChange69} />
                  <span style={{ color: "red" }}>{this.state.emailerror}</span>
                </div>

                <div className="uk-margin">
                  <label className="yodinplabel">Re-enter Email address</label>
                  <input name="cemail" className="uk-input" type="mail" placeholder="abc@gmail.com" value={this.state.cemail} onChange={this.handleChange} />
                  <span style={{ color: "red" }}>{this.state.errors["cemail"]}</span>
                </div>

                <div className="uk-margin">
                  <label className="yodinplabel">Password</label>
                  <div className="Password">
                    <input name="password" className="uk-input" type={this.state.passwordtype ? "password" : "text"} placeholder="********" value={this.state.password} onChange={this.handleChange} />
                    <a href="#" onClick={event => {
                      this.setState({ passwordtype: !this.state.passwordtype })

                    }}> <span className="Info" >{this.state.passwordtype ? (<FontAwesomeIcon icon={faEye} />) : (<FontAwesomeIcon icon={faEyeSlash} />)}</span>
                    </a> </div>
                  <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                </div>

                <div className="uk-margin">
                  <label className="yodinplabel">Business Phone</label>
                  <input name="phone" className="uk-input" type="text" placeholder="9143291432" value={this.state.phone} onChange={this.handleChange690} />
                  <span style={{ color: "red" }}>{this.state.phoneerror}</span>
                </div>

                <div className="uk-margin">
                  <label className="yodinplabel">GST Number</label>
                  <input maxlength="15" name="gstnum" className="uk-input" type="text" placeholder="07AAACB5343E1Z3" value={this.state.gstnum} onChange={(event) => this.handleChange(event)} onBlur={(event) => this.handleChange333(event)} />
                  <span style={{ color: "red" }}>{this.state.gstnumerror}</span>
                  <div className="forrems">
                    <label><input className="uk-checkbox" type="checkbox" /><p>Select this if you sell GST EXEMPTED GOODS</p></label>
                    <br />

                    <div uk-form-custom="" class="uk-form-custom">
                      <input type="file" onChange={this.onChange} />

                    </div>

                  </div>

                </div>

                <div className="uk-margin">
                  <label className="yodinplabel">Pan Number</label>
                  <input name="pan_num" className="uk-input" type="mail" placeholder="ABCDE1234F" value={this.state.pan_num} onChange={this.handleChange} />
                  <span style={{ color: "red" }}>{this.state.pan_numerror}</span>
                  <div className="forrems">

                    <div uk-form-custom="" className="uk-form-custom">
                      <input type="file" onChange={this.onChange1} />

                    </div>

                  </div>

                </div>

                <div className="uk-margin">
                  <label className="yodinplabel">Brand</label>
                  <input name="brand" className="uk-input" type="mail" placeholder="Puma" value={this.state.brand} onChange={this.handleChange} />
                  <span style={{ color: "red" }}>{this.state.errors["brand"]}</span>
                  <div className="forrems">

                    <div uk-form-custom="" className="uk-form-custom">
                      <input type="file" onChange={this.onChange12} />
                      <span style={{ color: "red" }}>{this.state.branderror}</span>
                    </div>
                    <label><input className="uk-checkbox" type="checkbox" /><p>Select this if you sell generic products</p></label>
                    <br />
                  </div>

                </div>


                <div className="uk-margin full">


                  <div className="forrems temsrbfr">
                    <label><input className="uk-checkbox" type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked} />
                      <span style={{ color: "red" }}>{this.state.errors["checked"]}</span>
                      <p>Be creating an account you agree to our<br />
                        <a href="#modal-center" uk-toggle>Terms of Services</a> and <a href="#modal-center" uk-toggle>Privacy Policy</a> </p></label>
                    <div id="modal-center" className="uk-flex-top uk-modal" uk-modal="">
                      <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
                        <button className="uk-modal-close-default uk-icon uk-close" type="button" uk-close=""><svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" data-svg="close-icon"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line></svg></button>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                      </div>
                    </div>
                  </div>

                  <button className="uk-button uk-button-primary yodprimary">Sign UP</button>
                  <div className="formsideod becomeseller">
                    <form>
                      <fieldset className="uk-fieldset">
                        <div className="yodformdesigns">
                          <p>Already a seller?</p>
                          <a href="./" className="uk-button uk-button-primary yodprimary">Sign In</a>
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