import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import './all.css';
import './fontawesome.css';
import Sidebar from "./sidebar";
import Header from "./header";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import CoolTabs from 'react-cool-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import ImageUploader from 'react-images-upload';
import 'react-toastify/dist/ReactToastify.css';
import config from './config/config';

class Content11 extends Component {
  
  render() {
    return <div>
      <div class="full-10"><div class="prdinf-grd">
        <label>Business Name</label>
        <p>{JSON.parse(localStorage.getItem('logindata')).name}</p>
      </div>
        <div class="prdinf-grd">
          <label>Business Email Address</label>
          <p>{JSON.parse(localStorage.getItem('logindata')).email}</p>
        </div>

        <div class="prdinf-grd">
          <label>Profile Picture</label>
          <p><img style={{ width: 100, height: 100 }} src={JSON.parse(localStorage.getItem('logindata')).image} /></p>
        </div>

        <div class="prdinf-grd">
          <label> Business Phone</label>
          <p>{JSON.parse(localStorage.getItem('logindata')).phone}</p>
        </div>


      </div>
    </div>

  }
}

class Content12 extends Component {

  constructor(props) {
    super(props);
    if (localStorage.getItem('logindata') === null) {
      window.location.assign("./");
    }
    this.state = { showStore: false, name: JSON.parse(localStorage.getItem('logindata')).name, email: JSON.parse(localStorage.getItem('logindata')).email, phone: JSON.parse(localStorage.getItem('logindata')).phone, pictures: JSON.parse(localStorage.getItem('logindata')).image, errors: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    // alert(localStorage.getItem('logindata'));


  }

  onDrop(e) {

    let files = e.target.files || e.dataTransfer.files;
    //alert(files);
    console.log(files[0]);
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
              pictures: res.response,
              showStore: false,
            })
          }
        })
        .catch((error) => {
          console.log(error);
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
      errors["name"] = "Legal Business Name Cannot be empty";
    }

    //category_id

    if (!fields.phone) {
      formIsValid = false;
      errors["phone"] = "Phone Cannot be empty";
    }

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

  handleSubmit(event) {
    event.preventDefault();


    console.log(this.state.pictures);
    if (this.handleValidation()) {
      fetch(`${config.Url}api/updateadminprofile/` + JSON.parse(localStorage.getItem('logindata')).id, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          image: this.state.pictures,
        }),
      }).then((response) => response.json())
        .then((res) => {
          if (res.status === 'FAILURE') {
            toast.error(res.message);
          } else {
            toast.success(res.message);

            localStorage.setItem('logindata', JSON.stringify(res.response));
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });

    }
  }

  render() {
    return <div >
      <div class="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
        <img src="https://www.justori.com/justori/assets/images/11.gif" />
      </div>
      <form onSubmit={this.handleSubmit}>
        <div class="full-10">

          <div class="prdinf-grd">
            <label>Legal Business Name</label>
            <p><input name="name" class="uk-input" type="text" placeholder="Enter Business Name" value={this.state.name} onChange={this.handleChange} /></p>
          </div>
          <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
          <div class="prdinf-grd">
            <label>Legal Business Email Address</label>
            <p><input name="email" class="uk-input" type="text" placeholder="Enter Business Email Address" value={this.state.email} onChange={this.handleChange} /></p>
          </div>
          <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
          <div class="prdinf-grd">
            <label>Profile Picture</label>
            <p> <input type="file" onChange={this.onDrop} /></p>

          </div>



          <div class="prdinf-grd">
            <label>Legal Business Phone</label>
            <p><input name="phone" class="uk-input" type="number" placeholder="Enter Business Phone" value={this.state.phone} onChange={this.handleChange} /></p>
          </div>
          <span style={{ color: "red" }}>{this.state.errors["phone"]}</span>

        </div>

        <div class="halffrms updatebtns">
          <div class="twoways">
            <button class="uk-button uk-button-default">Update</button>
          </div>

        </div>
      </form>
    </div>


  }
}

class Content1 extends Component {

  constructor(props) {
    super(props);
    if (localStorage.getItem('logindata') === null) {
      window.location.assign("./");
    }
    this.state = { isEdit: false, nameofmodule: "Profile Details" };
    //console.log(JSON.parse(localStorage.getItem('logindata')).id);
    this.showAlert = this.showAlert.bind(this);
  }

  showAlert() {
    this.setState({ isEdit: true, nameofmodule: "Update Account Details" });
  }

  render() {
    return <div >
      <div class="promogrids">
        <div class="prof-pds">
          <div class="full-10">
            <div class="edihdrs">
              <h5 class="prod-nmes">{this.state.nameofmodule}</h5>
              <FontAwesomeIcon onClick={this.showAlert} icon={faEdit} />
            </div>
            {(!this.state.isEdit) ? <Content11 /> : <Content12 />}
          </div>

        </div>
      </div></div>


  }
}
class Content2 extends Component {
  constructor(props) {
    
    super(props);
    if (localStorage.getItem('logindata') === null) {
      window.location.assign("./");
    }
    this.state = { errors: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleValidation() {
    let fields = this.state;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields.oldpassword) {
      formIsValid = false;
      errors["oldpassword"] = "Old Password cannot be empty";
    }

    //category_id

    if (!fields.password) {
      formIsValid = false;
      errors["password"] = "New Password cannot be empty";
    }

    if (!fields.cpassword) {
      formIsValid = false;
      errors["cpassword"] = "Confirm Password cannot be empty";
    } else {
      if (fields.cpassword != fields.password) {
        formIsValid = false;
        errors["cpassword"] = "Password & Confirm Password does not match.";
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

  handleSubmit(event) {
    event.preventDefault();


    console.log(this.state.pictures);
    if (this.handleValidation()) {
      fetch(`${config.Url}api/changepasswordforadmin/` + JSON.parse(localStorage.getItem('logindata')).id, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldpassword: this.state.oldpassword,
          password: this.state.password,
        }),
      }).then((response) => response.json())
        .then((res) => {
          //alert(res);
          if (res.status === 'FAILURE') {
            toast.error(res.message);
          } else {
            toast.success(res.message);
            this.setState({
              oldpassword: '',
              password: '',
              cpassword: '',
            });
          
          }
          console.log(res);
        })
        .catch((error) => {
          //console.log(error);
          alert('Oops, something went wrong. Please try again!');
        });

    }
  }
  render() {
    return <div class="changepswds" >
      <div class="formsideod">
        <form onSubmit={this.handleSubmit}>
          <fieldset class="uk-fieldset">
            <div class="yodformdesigns">
              <div class="uk-margin">
                <label class="yodinplabel">Old Password</label>
                <input name="oldpassword" class="uk-input" type="password" placeholder="Enter Your Old Password" value={this.state.oldpassword} onChange={this.handleChange} />
                <span style={{ color: "red" }}>{this.state.errors["oldpassword"]}</span>
              </div>


              <div class="uk-margin">
                <label class="yodinplabel">New Password</label>
                <input name="password" class="uk-input" type="password" placeholder="Enter Your New Password" value={this.state.password} onChange={this.handleChange} />
                <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
              </div>

              <div class="uk-margin">
                <label class="yodinplabel">Confrim Password</label>
                <input name="cpassword" class="uk-input" type="password" placeholder="Enter Your Confirm Password" value={this.state.cpassword} onChange={this.handleChange} />
                <span style={{ color: "red" }}>{this.state.errors["cpassword"]}</span>
              </div>

              <button class="uk-button uk-button-primary yodprimary">Change Password</button>


            </div>
          </fieldset>
        </form>
      </div>
    </div>
  }
} export default class Setting extends Component {

  constructor(props) {
    super(props);

    if (localStorage.getItem('logindata') === null) {
      this.props.history.push('/login');
    }

    this.state = { data: [] };
  }



  render() {
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      search: true,
      onRowsDelete: this.handleDelete,
    };

    return <div class="dash-layout">
      <Header />

      <div class="bodylayouts-yod">

        <div >
          <p><ToastContainer /></p>



          <CoolTabs
            tabKey={'1'}
            style={{ width: 1000, height: 900 }}
            activeTabStyle={{ background: '#bb61dc', color: 'white' }}
            unActiveTabStyle={{ background: '#722a8c', color: 'white' }}
            activeLeftTabBorderBottomStyle={{ background: '#dd3ea0', height: 4 }}
            activeRightTabBorderBottomStyle={{ background: '#dd3ea0', height: 4 }}
            tabsBorderBottomStyle={{ background: '#dd3ea0', height: 4 }}
            leftContentStyle={{}}
            rightContentStyle={{}}
            leftTabTitle={'Profile'}
            rightTabTitle={'Change Password'}
            leftContent={<Content1 />}
            rightContent={<Content2 />}
            contentTransitionStyle={'transform 0.6s ease-in'}
            borderTransitionStyle={'all 0.6s ease-in'} />
        </div>

      </div>

    </div>

  }
}