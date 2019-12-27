import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog, faPowerOff, faUserPlus, faCross, faTimes, faFan, faBars, faImage, faCodeBranch, faFlask, faInfo, faQuestion } from '@fortawesome/free-solid-svg-icons'
import Drawer from 'react-motion-drawer';
import { NavLink } from 'react-router-dom';


class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sideMenuOpen: false,
      openLeft: false,
      openRight: false,
      drawerStyle: `
        {
          "background": "#F9F9F9",
          "boxShadow": "rgba(0, 0, 0, 0.188235) 0px 10px 20px, rgba(0, 0, 0, 0.227451) 0px 6px 6px"
        }`,
      relativeWidth: false,
      width: 300,
      // noTouchOpen: false,
      // noTouchClose: false,
    };

    this.setWidth = this.setWidth.bind(this);
    this.setTouch = this.setTouch.bind(this);
    this.setDrawerStyle = this.setDrawerStyle.bind(this);
  }

  setWidth = e => {
    this.setState({
      width: Number(e.target.value) || e.target.value
    });
  };

  setTouch = e => {
    this.setState({
      [e.target.name]: !e.target.checked
    })
  }

  setDrawerStyle = e => {
    e.preventDefault()
    this.setState({
      drawerStyle: this.drawerStyleRef.value
    })
  }

  showAlert() {
    localStorage.setItem('logindata', null);
    window.location.assign("./")
  }

  addHeaderClass = () => {
    if (this.state.sideMenuOpen === true) {
      this.setState({
        sideMenuOpen: false
      })
    } else {
      this.setState({
        sideMenuOpen: true
      })
    }

  }

  render() {
    const {
      drawerStyle: stringDrawerStyle,
      openLeft,
      openRight,
      noTouchOpen,
      noTouchClose
    } = this.state;

    let drawerStyle = {}
    try {
      drawerStyle = JSON.parse(stringDrawerStyle)
    } catch (err) {
      console.error('Error parsing JSON: ', err)
    }

    const drawerProps = {
      overlayColor: "rgba(255,255,255,0.6)",
      drawerStyle
    };
    return <header class="yodamin-hd">
      <div onClick={() => this.addHeaderClass()} className="mentoggle">
        {this.state.sideMenuOpen === false ? <FontAwesomeIcon onClick={() => this.addHeaderClass()} style={{ width: 23, marginRight: 10 }} icon={faBars} /> : <FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faTimes} />}

      </div>
      <img class="logoheader" alt="ok" src={require('./img/yodfull.png')} />
      <div class="yodcontainer-dash">


        {this.state.sideMenuOpen === true ? <div class="sidebarleft">
          <ul>
            <li ><NavLink to="/dashboard" activeClassName="active" ><img alt="hhjj" src={require('./img/dashico.png')} />Dashboard</NavLink></li>
            <li ><NavLink to="/buyer" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faUserPlus} /> <p>Buyer Management</p></NavLink></li>
            <li ><NavLink to="/sellerlist" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faUserPlus} /> <p>Seller Management</p></NavLink></li>
            <li ><NavLink to="/product" activeClassName="active"><img alt="hhjj" src={require('./img/myprod.png')} /><p>My Products</p></NavLink></li>
            <li ><NavLink to="/orders" activeClassName="active"><img alt="hhjj" src={require('./img/myprod.png')} /><p>My Orders</p></NavLink></li>
            <li><NavLink to="/orderrequest" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faCodeBranch} /> <p>Orders Request</p></NavLink></li>
            <li><NavLink to="/bannerlist" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faImage} /><p>Banner Management</p></NavLink></li>
            <li><NavLink to="/themelist" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faFan} /> <p>Theme Management</p></NavLink></li>
            <li><NavLink to="/flashsale" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faFlask} /><p>Flash Sale Management</p></NavLink></li>
            <li><NavLink to="/brandlist" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faCodeBranch} /> <p>Brand Management</p></NavLink></li>
            <li><NavLink to="/category" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faBars} /> <p>Subcategory Management</p></NavLink></li>
            <li><NavLink to="/subsubcategory" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faBars} /><p>SubSubcategory Management</p></NavLink></li>
            <li><NavLink to="/cupon" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faBars} /> <p>Coupon code Management</p></NavLink></li>
            <li><NavLink to="/about" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faInfo} /><p>Content Management</p></NavLink></li>
            <li><NavLink to="/layout" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faInfo} /><p>Layout Management</p></NavLink></li>
            <li><NavLink to="/sizeList" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faBars} /><p>Manage Size</p></NavLink></li>
            <li><NavLink to="/cupenList" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faBars} /><p>Offer Management</p></NavLink></li>
            <li><NavLink to="/colorList" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faBars} /><p>Manage Color</p></NavLink></li>
            <li><NavLink to="/faqlist" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faQuestion} /><p>FAQ Management</p></NavLink></li>
            <li><NavLink to="/setting" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faUserCog} /> <p>Account</p></NavLink></li>
            <li><NavLink onClick={this.showAlert}><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faPowerOff} /><p>Logout</p></NavLink></li>
          </ul>
        </div> : <div className="openmenu"> </div>}


        <div class="logomenumanage">
          <ul className="left">
            <li style={{ cursor: "pointer", height: "100%" }}>
              <a
                style={{ padding: 15 }}
                className=""
                onClick={() =>
                  this.setState({ openLeft: !openLeft, openRight: false })}
              >
                <FontAwesomeIcon icon={faBars} />
              </a>
            </li>
          </ul>
          <img alt="ok" src={require('./img/yodfull.png')} />
        </div>

        <div class="logge-usrdata">
          <div class="userinf-yd">
            <div class="usr-pic">
              <img alt="hhjj" src={JSON.parse(localStorage.getItem('logindata')).image} />
            </div>
            <div class="usr-nme">
              <h6>Welcome</h6>
              <p class="prt-nm">{JSON.parse(localStorage.getItem('logindata')).name}</p>
            </div>
          </div>

          <div class="drop-opns">
            <ul>
              <li>syrah43@gmail.com</li>
              <li><a href="/">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  }
}


export default Sidebar;