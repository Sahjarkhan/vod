import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import './all.css';
import './fontawesome.css';
import Header from "./header";
import { ToastContainer, toast } from 'react-toastify';
import CoolTabs from 'react-cool-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faTachometerAlt, faUserCog, faShoppingBasket, faPowerOff, faEdit } from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const Main = styled.main`
    position: relative;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    margin-left: ${props => (props.expanded ? 240 : 64)}px;
`;

class Content11 extends Component {
  render() {
    return <div>
      <div className="full-10"><div className="prdinf-grd">
        <label>Business Name</label>
        <p>{JSON.parse(localStorage.getItem('logindata')).name}</p>
      </div>
        <div className="prdinf-grd">
          <label>Business Email Address</label>
          <p>{JSON.parse(localStorage.getItem('logindata')).email}</p>
        </div>

        <div className="prdinf-grd">
          <label>Profile Picture</label>
          <p><img alt="" style={{ width: 100, height: 100 }} src={JSON.parse(localStorage.getItem('logindata')).image} /></p>
        </div>

        <div className="prdinf-grd">
          <label> Business Phone</label>
          <p>{JSON.parse(localStorage.getItem('logindata')).phone}</p>
        </div>

        <div className="prdinf-grd">
          <label>Business Address</label>
          <p>{JSON.parse(localStorage.getItem('logindata')).address}</p>
        </div>

        <div className="prdinf-grd">
          <label>GST No.</label>
          <p>{JSON.parse(localStorage.getItem('logindata')).gstnum}</p>
        </div>

        <div className="prdinf-grd">
          <label>PAN No.</label>
          <p>{JSON.parse(localStorage.getItem('logindata')).pan_num}</p>
        </div>

        <div className="prdinf-grd">
          <label>Brands</label>
          <p>{JSON.parse(localStorage.getItem('logindata')).brand}</p>
        </div>

        <div className="prdinf-grd">
          <label>Categories Approved</label>
          <p>Yes</p>
        </div>
      </div>
    </div>

  }
}

class Content12 extends Component {

  constructor(props) {
    super(props);
    this.state = { name: JSON.parse(localStorage.getItem('logindata')).name, email: JSON.parse(localStorage.getItem('logindata')).email, phone: JSON.parse(localStorage.getItem('logindata')).phone, pictures: JSON.parse(localStorage.getItem('logindata')).image, errors: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    // alert(localStorage.getItem('logindata'));
  }

  onDrop(e) {

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
      console.log(e.target.result)
      fetch("https://mobuloustech.com/yodapi/api/fileuploade", {
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
          //alert(res);
          if (res.status === 'FAILURE') {
            //toast.error(res.message);
          } else {
            //toast.success(res.message);
            this.setState({
              pictures: res.response
            })
            //this.props.picturemain = this.state.pictures
            console.log(res.response);
            console.log(this.state.pictures);
            //localStorage.setItem('logindata', res.sellerlogin);
            //this.props.history.push('/product');
          }
          //console.log(res);
        })
        .catch((error) => {
          console.log(error);
          alert('Oops, something went wrong. Please try again!');
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

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields.email.indexOf('@@') === -1 && lastDotPos > 2 && (fields.email.length - lastDotPos) > 2)) {
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
    // alert('A name was submitted: ' + this.state.username+' password '+ this.state.password);
    event.preventDefault();
    //console.log(this.state.pictures1);


    console.log(this.state.pictures);
    if (this.handleValidation()) {
      //alert('jjd')
      //console.warn()
      //alert(this.state.pictures);
      fetch("https://mobuloustech.com/yodapi/api/updatesellerprofile/" + JSON.parse(localStorage.getItem('logindata')).id, {
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
          //alert(res);
          if (res.status === 'FAILURE') {
            toast.error(res.message);
          } else {
            toast.success(res.message);

            localStorage.setItem('logindata', JSON.stringify(res.response));
            window.location.reload();
            console.log(res);
            //window.location.assign("/setting")
            //this.setState({isEdit: false,nameofmodule:"Update Account Details"});
            //localStorage.setItem('logindata', res.sellerlogin);
            //this.props.history.push('/product');
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
    return <div >
      <form onSubmit={this.handleSubmit}>
        <div className="full-10">

          <div className="prdinf-grd">
            <label>Legal Business Name</label>
            <p><input name="name" className="uk-input" type="text" placeholder="Enter Business Name" value={this.state.name} onChange={this.handleChange} /></p>
          </div>
          <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
          <div className="prdinf-grd">
            <label>Legal Business Email Address</label>
            <p><input name="email" className="uk-input" type="text" placeholder="Enter Business Email Address" value={this.state.email} onChange={this.handleChange} /></p>
          </div>
          <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
          <div className="prdinf-grd">
            <label>Profile Picture</label>
            <p> <input type="file" onChange={this.onDrop} /></p>

          </div>



          <div className="prdinf-grd">
            <label>Legal Business Phone</label>
            <p><input name="phone" className="uk-input" type="number" placeholder="Enter Business Phone" value={this.state.phone} onChange={this.handleChange} /></p>
          </div>
          <span style={{ color: "red" }}>{this.state.errors["phone"]}</span>

        </div>

        <div className="halffrms updatebtns">
          <div className="twoways">
            <button className="uk-button uk-button-default">Update</button>
          </div>

        </div>
      </form>
    </div>


  }
}

class Content1 extends Component {

  constructor(props) {
    super(props);

    this.state = { isEdit: false, nameofmodule: "Profile Details" };
    //console.log(JSON.parse(localStorage.getItem('logindata')).id);
    this.showAlert = this.showAlert.bind(this);
  }

  showAlert() {
    //alert("dasgfsvfnvsdf");
    this.setState({ isEdit: true, nameofmodule: "Update Account Details" });
  }

  render() {
    return <div >
      <div className="promogrids">
        <div className="prof-pds">
          <div className="full-10">
            <div className="edihdrs">
              <h5 className="prod-nmes">{this.state.nameofmodule}</h5>
              <FontAwesomeIcon onClick={this.showAlert} icon={faEdit} />
            </div>
            {(!this.state.isEdit) ? <Content11 /> : <Content12 />}

            {/* <div class="prdinf-grd">
					<label>Vacation Plan</label>
					<p></p>
				</div>
				
				<div class="prdinf-grd">
					<label>Select Date</label>
					<p><div class="frmtods"><input type="date" /><button class="uk-button uk-button-default">Submit</button></div></p>
				</div>
				
				<div class="prdinf-grd">
					<label>Working Hours</label>
					<p><div class="frmtods"><span>From</span> <input type="time" width="276" /> 
					<span>To </span> <input type="time" width="276" /> <button class="uk-button uk-button-default">Submit</button></div></p>
				</div> */}



          </div>

        </div>
      </div></div>


  }
}
class Content2 extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // alert(localStorage.getItem('logindata'));


  }

  handleValidation() {
    let fields = this.state;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields.oldpassword) {
      formIsValid = false;
      errors["oldpassword"] = "Old Password Cannot be empty";
    }

    //category_id

    if (!fields.password) {
      formIsValid = false;
      errors["password"] = "New Password Cannot be empty";
    }

    if (!fields.cpassword) {
      formIsValid = false;
      errors["cpassword"] = "Confirm Password Cannot be empty";
    } else {
      if (fields.cpassword !== fields.password) {
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
    // alert('A name was submitted: ' + this.state.username+' password '+ this.state.password);
    event.preventDefault();
    //console.log(this.state.pictures1);


    console.log(this.state.pictures);
    if (this.handleValidation()) {
      //alert('jjd')
      //console.warn()
      fetch("https://mobuloustech.com/yodapi/api/changepasswordforseller/" + JSON.parse(localStorage.getItem('logindata')).id, {
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
            //localStorage.setItem('logindata',JSON.stringify(res.response));
            console.log(res);
            //window.location.assign("/setting")
            //this.setState({isEdit: false,nameofmodule:"Update Account Details"});
            //localStorage.setItem('logindata', res.sellerlogin);
            //this.props.history.push('/product');
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
    return <div className="changepswds" >
      <div className="formsideod">
        <form onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset">
            <div className="yodformdesigns">
              <div className="uk-margin">
                <label className="yodinplabel">Old Password</label>
                <input name="oldpassword" className="uk-input" type="password" placeholder="Enter Your Old Password" value={this.state.oldpassword} onChange={this.handleChange} />
                <span style={{ color: "red" }}>{this.state.errors["oldpassword"]}</span>
              </div>


              <div className="uk-margin">
                <label className="yodinplabel">New Password</label>
                <input name="password" className="uk-input" type="password" placeholder="Enter Your New Password" value={this.state.password} onChange={this.handleChange} />
                <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
              </div>

              <div className="uk-margin">
                <label className="yodinplabel">Confrim Password</label>
                <input name="cpassword" className="uk-input" type="password" placeholder="Enter Your Confirm Password" value={this.state.cpassword} onChange={this.handleChange} />
                <span style={{ color: "red" }}>{this.state.errors["cpassword"]}</span>
              </div>

              <button className="uk-button uk-button-primary yodprimary">Change Password</button>


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

  state = {
    selected: 'home',
    expanded: false
  };

  onSelect = (selected) => {
    this.setState({ selected: selected });
  };
  onToggle = (expanded) => {
    this.setState({ expanded: expanded });
  };


  navigate = (pathname) => () => {
    this.setState({ selected: pathname });
  };

  showAlert() {
    localStorage.setItem('logindata', null);
    window.location.assign("./")
  }

  render() {
    const { expanded, selected } = this.state;
    // const options = {
    //   filterType: "dropdown",
    //   responsive: "scroll",
    //   search:true,
    //   onRowsDelete: this.handleDelete,
    // };

    return <div className="dash-layout">
      <Header />

      <div className="bodylayouts-yod">
        <SideNav onSelect={this.onSelect} onToggle={this.onToggle} >
          <SideNav.Toggle />
          <SideNav.Nav selected={selected}>
            <NavItem eventKey="home">
              <NavIcon>
                <NavLink to="/dashboard"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faTachometerAlt} /></NavLink>
              </NavIcon>
              <NavText>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </NavText>
            </NavItem>
            <NavItem eventKey="orders">
              <NavIcon>
                <NavLink to="/orders" ><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faShoppingBasket} /></NavLink>
              </NavIcon>
              <NavText>
                <NavLink to="/orders" > Orders</NavLink>
              </NavText>
            </NavItem>
            <NavItem eventKey="product">
              <NavIcon>
                <NavLink to="/product" ><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faBoxOpen} /></NavLink>
              </NavIcon>
              <NavText>
                <NavLink to="/product" >My Products</NavLink>
              </NavText>
            </NavItem>
            <NavItem eventKey="setting">
              <NavIcon>
                <NavLink to="/setting" activeclassName="active" ><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faUserCog} /></NavLink>
              </NavIcon>
              <NavText>
                <NavLink to="/setting" activeclassName="active" > Account</NavLink>
              </NavText>
            </NavItem>
            <NavItem eventKey="addsize">
              <NavIcon>
                <NavLink to="/addsize" ><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faUserCog} /></NavLink>
              </NavIcon>
              <NavText>
                <NavLink to="/addsize" > Add Size</NavLink>
              </NavText>
            </NavItem>
            <NavItem eventKey="addcolor">
              <NavIcon>
                <NavLink to="/addcolor" ><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faUserCog} /></NavLink>
              </NavIcon>
              <NavText>
                <NavLink to="/addcolor" > Add Color</NavLink>
              </NavText>
            </NavItem>
            <NavItem eventKey="logout">
              <NavIcon>
                <NavLink onClick={this.showAlert}><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faPowerOff} /></NavLink>
              </NavIcon>
              <NavText>
                <NavLink onClick={this.showAlert}>Logout</NavLink>
              </NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
        <Main expanded={expanded}>
          <div >
            <p><ToastContainer /></p>
            <CoolTabs
              tabKey={'1'}
              style={{ width: 800, height: 900 }}
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
        </Main>
      </div>
    </div>
  }
}