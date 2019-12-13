import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
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
            <SideNav onSelect={this.onSelect} onToggle={this.onToggle} >
                <SideNav.Toggle />
                <SideNav.Nav selected={selected}>
                    <NavItem eventKey="home">
                        <NavIcon>
                            <NavLink to="/dashboard" activeclassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faTachometerAlt} /></NavLink>
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

                <div className="Time_view">
                    <ul>
                        <li><FontAwesomeIcon icon={faCalendarAlt} /> Jan 01 - Jun 30</li>
                        <li>
                            last 6 month <span><FontAwesomeIcon icon={faAngleDown} /></span>
                            <ol>
                                <li><a href="#">last 6 month</a></li>
                                <li><a href="#">last 12 month</a></li>
                                <li><a href="#">last 18 month</a></li>
                                <li><a href="#">last 24 month</a></li>
                                <li><a href="#">last 30 month</a></li>
                            </ol>
                        </li>
                    </ul>
                </div>
                <div className="grapscols">
                    <div className="graph-grid">
                        <div className="graph-voilet">
                            <div className="ordersdtsa">
                                <h5>Orders</h5>
                                <p className="resul-dta">105</p>
                            </div>

                            <div className="dataanalys">
                                <img alt="hhjj" src={require('./img/spinechar.png')} />
                            </div>

                        </div>

                    </div>

                    <div className="graph-grid">
                        <div className="graph-voilet">
                            <div className="ordersdtsa">
                                <h5>Revenue</h5>
                                <p className="resul-dta">Rs.1200.00</p>
                            </div>

                            <div className="dataanalys">
                                <img alt="hhjj" src={require('./img/spinechar.png')} />
                            </div>

                        </div>

                    </div>


                    <div className="graph-grid">
                        <div className="graph-voilet">
                            <div className="ordersdtsa">
                                <h5>Products</h5>
                                <p className="resul-dta">Live	400<br />
                                    Non live   128</p>
                            </div>

                            <div className="dataanalys">
                                <img alt="hhjj" src={require('./img/spinechar.png')} />
                            </div>

                        </div>

                    </div>
                </div>



                <div className="background-wht map-wrap ">
                    <div className="halfdv-5">

                        <div className="world-mpa">
                            <h4>Top Locations</h4>
                            <img alt="hhjj" src={require('./img/wordmap.png')} /></div>
                        <div className="mapgraph-analysis">

                            <div className="mapset-count">
                                <p>USA</p>
                                <p className="percentachive">51%</p>

                            </div>
                            <progress id="js-progressbar" className="uk-progress" value="10" max="50"></progress>

                            <div className="mapset-count">
                                <p>Australia</p>
                                <p className="percentachive">29%</p>
                            </div>

                            <progress id="js-progressbar" className="uk-progress" value="29" max="100"></progress>

                            <div className="mapset-count">
                                <p>France</p>
                                <p className="percentachive">11%</p>
                            </div>

                            <progress id="js-progressbar" className="uk-progress" value="11" max="100"></progress>

                            <div className="mapset-count">
                                <p>Turkey</p>
                                <p className="percentachive">10%</p>
                            </div>
                            <progress id="js-progressbar" className="uk-progress" value="10" max="100"></progress>
                        </div>
                    </div>

                    <div className="halfdv-5">
                        <div className="world-mpa">
                            <h4>Transactions</h4>
                            <img alt="hhjj" src={require('./img/graph.png')} />
                        </div>
                    </div>

                </div>


                <div className="promotionsparts">
                    <div className="background-wht map-wrap ">
                        <div className="linpromos">
                            <div className="prms">
                                <a href="/">Yod Promotions</a>
                            </div>
                            <div className="prms">
                                <a href="/">Extra 10 % Off On Men”s  Cloths</a>
                            </div>
                            <div className="prms">
                                <a href="/">Extra 20% Off On Babay Suits</a>
                            </div>
                            <div className="prms">
                                <a href="/">Extra 20% Off On Babay Suits</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Main>
        </div>
    }
}


export default Maindash;