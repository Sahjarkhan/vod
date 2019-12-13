import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Header from "./header";
import { NavLink } from 'react-router-dom';
import { faBoxOpen, faUserCog, faShoppingBasket, faPowerOff, faAngleDown, faCalendarAlt, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const Main = styled.main`
    position: relative;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    margin-left: ${props => (props.expanded ? 240 : 64)}px;
`;


class Maindash extends Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem('logindata') === null) {
            this.props.history.push('/login');
        }

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
        return <div>
            <div
                style={{
                    marginLeft: expanded ? 240 : 64,
                    padding: '15px 20px 0 20px'
                }}
            >

            </div>
            <Header />
            <SideNav onSelect={this.onSelect} onToggle={this.onToggle} >
                <SideNav.Toggle />
                <SideNav.Nav selected={selected}>
                    <NavItem eventKey="home">
                        <NavIcon>
                            <NavLink to="/dashboard" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faTachometerAlt} /></NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
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
                            <NavLink to="/setting" ><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faUserCog} /></NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to="/setting" > Account</NavLink>
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
                <p><ToastContainer /></p>






                <h1>asgdhagsdgasgdja</h1>






            </Main>
        </div>

    }
}


export default Maindash;