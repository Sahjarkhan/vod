import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog, faPowerOff, faUserPlus, faBars, faFan, faImage, faCodeBranch, faFlask, faInfo, faQuestion } from '@fortawesome/free-solid-svg-icons'
import Drawer from 'react-motion-drawer';
import { NavLink } from 'react-router-dom';


class Sidebar extends Component {

  constructor(props) {
    super(props);



    this.state = {
      openLeft: false,
      openRight: false,
      drawerStyle: `
        {
          "background": "#F9F9F9",
          "boxShadow": "rgba(0, 0, 0, 0.188235) 0px 10px 20px, rgba(0, 0, 0, 0.227451) 0px 6px 6px"
        }`,
      relativeWidth: false,
      width: 300,
      noTouchOpen: false,
      noTouchClose: false,
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
      <div class="yodcontainer-dash">
        {!openRight &&
          <Drawer
            {...drawerProps}
            width={this.state.width}
            fadeOut
            open={openLeft}
            onChange={open => this.setState({ openLeft: open })}
            noTouchOpen={noTouchOpen}
            noTouchClose={noTouchClose}
          >
            <div style={{ width: "100%" }}>
              <div class="sidebarleft">

                <img class="logoheader" alt="ok" src={require('./img/yodfull.png')} />
                <ul>
                  <li><NavLink to="/dashboard" activeClassName="active"><img alt="hhjj" src={require('./img/dashico.png')} />Dashboard</NavLink></li>
                  <li><NavLink to="/buyer" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faUserPlus} /> Buyer Management</NavLink></li>
                  <li><NavLink to="/sellerlist" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faUserPlus} /> Seller Management</NavLink></li>
                  <li><NavLink to="/product" activeClassName="active"><img alt="hhjj" src={require('./img/myprod.png')} />My Products</NavLink></li>
                  <li><NavLink to="/orders" activeClassName="active"><img alt="hhjj" src={require('./img/myprod.png')} />My Orders</NavLink></li>
                  <li><NavLink to="/orderrequest" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faCodeBranch} /> Orders Request</NavLink></li>
                  <li><NavLink to="/bannerlist" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faImage} />Banner Management</NavLink></li>
                  <li><NavLink to="/themelist" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faFan} /> Theme Management</NavLink></li>
                  <li><NavLink to="/flashsale" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faFlask} /> Flash Sale Management</NavLink></li>
                  <li><NavLink to="/brandlist" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faCodeBranch} /> Brand Management</NavLink></li>
                  <li><NavLink to="/category" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faBars} /> Subcategory Management</NavLink></li>
                  <li><NavLink to="/subsubcategory" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faBars} /> Subsubcategory Management</NavLink></li>
                  <li><NavLink to="/cupon" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faBars} /> Cuponcode Management</NavLink></li>
                  <li><NavLink to="/about" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faInfo} />Content Management</NavLink></li>
                  <li><NavLink to="/layout" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faInfo} />Layout Management</NavLink></li>
                  <li><NavLink to="/sizeList" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faBars} />Manage Size</NavLink></li>
                  <li><NavLink to="/cupenList" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faBars} />Offer Management</NavLink></li>
                  <li><NavLink to="/colorList" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faBars} />Manage Color</NavLink></li>
                  <li><NavLink to="/faqlist" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faQuestion} />FAQ Management</NavLink></li>
                  <li><NavLink to="/setting" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faUserCog} /> Account</NavLink></li>
                  <li><NavLink onClick={this.showAlert}><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faPowerOff} />Logout</NavLink></li>
                </ul>
              </div>
            </div>
          </Drawer>}
        {!openLeft &&
          <Drawer
            right
            width={this.state.width}
            {...drawerProps}
            open={openRight}
            onChange={open => this.setState({ openRight: open })}
            noTouchOpen={noTouchOpen}
            noTouchClose={noTouchClose}
          >
            {val => {
              var per = val / 300;
              return (
                <div
                  style={{
                    backgroundColor: `rgba(0, 184, 212, ${per})`,
                    width: "100%",
                    height: "100%"
                  }}
                />
              );
            }}
          </Drawer>}
    
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