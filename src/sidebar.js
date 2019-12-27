import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog, faShoppingBasket, faPowerOff, faUserPlus, faBars, faFan, faImage, faCodeBranch, faFlask, faInfo, faQuestion } from '@fortawesome/free-solid-svg-icons'

class Sidebar extends Component {
  constructor(props) {
    super(props);
    
    if (localStorage.getItem('logindata') === null) {
      window.location.assign("./")
    }

  }
  showAlert() {
    localStorage.setItem('logindata', null);
    window.location.assign("./")
  }
  render() {
    return <div>

    </div>
  }
}


export default Sidebar;