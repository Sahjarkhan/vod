import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog, faShoppingBasket, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';




class Sidebar extends Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem('logindata') === null) {
            window.location.assign("./")
        }
        //console.log(JSON.parse(localStorage.getItem('logindata')).id);
    }

    showAlert() {
        localStorage.setItem('logindata', null);
        window.location.assign("./")
    }

    render() {
        console.log('*********************8')
        return <div >
            <SideNav
                onSelect={(selected) => {
                    // Add your code here
                }}
                componentClass={"sidebarleft"}
            >
                {/* <div class="sidebarleft">
          
          <img class="logoheader" alt="ok" src={require('./img/yodfull.png')} />
          <ul>
          <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              </ul> 
             </div> */}
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <img alt="hhjj" src={require('./img/dashico.png')} />
                        </NavIcon>
                        <NavText>
                            <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="orders">
                        <NavIcon>
                            <FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faShoppingBasket} />
                        </NavIcon>
                        <NavText>
                            <NavLink to="/orders" activeClassName="active"> Orders</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="product">
                        <NavIcon>
                            <img alt="hhjj" src={require('./img/myprod.png')} />
                        </NavIcon>
                        <NavText>
                            <NavLink to="/product" activeClassName="active">My Products</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="setting">
                        <NavIcon>
                            <FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faUserCog} />
                        </NavIcon>
                        <NavText>
                            <NavLink to="/setting" activeClassName="active"> Account</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="logout">
                        <NavIcon>
                            <FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faPowerOff} />
                        </NavIcon>
                        <NavText>
                            <NavLink onClick={this.showAlert}>Logout</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Size">
                        <NavIcon>
                            <FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faPowerOff} />
                        </NavIcon>
                        <NavText>
                            <NavLink to="/setting">Size</NavLink>
                        </NavText>
                    </NavItem>  
                </SideNav.Nav>
            </SideNav>
        </div>
    }
}


export default Sidebar;