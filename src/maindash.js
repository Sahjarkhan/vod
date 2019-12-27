import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import { Link, withRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faArrowDown, faAngleDown, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

class Maindash extends Component {

    constructor(props) {
        super(props);

      

    }
    render() {
        return <div >
            <p><ToastContainer /></p>
            <div class="Time_view">
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
            <div class="grapscols">
                <div class="graph-grid">
                    <div class="graph-voilet">
                        <div class="ordersdtsa">
                            <h5>Orders</h5>
                            <p class="resul-dta">105</p>
                        </div>

                        <div class="dataanalys">
                            <img alt="hhjj" src={require('./img/spinechar.png')} />
                        </div>

                    </div>

                </div>

                <div class="graph-grid">
                    <div class="graph-voilet">
                        <div class="ordersdtsa">
                            <h5>Revenue</h5>
                            <p class="resul-dta">Rs.1200.00</p>
                        </div>

                        <div class="dataanalys">
                            <img alt="hhjj" src={require('./img/spinechar.png')} />
                        </div>

                    </div>

                </div>


                <div class="graph-grid">
                    <div class="graph-voilet">
                        <div class="ordersdtsa">
                            <h5>Products</h5>
                            <p class="resul-dta">Live	400<br />
                                Non live   128</p>
                        </div>

                        <div class="dataanalys">
                            <img alt="hhjj" src={require('./img/spinechar.png')} />
                        </div>

                    </div>

                </div>
            </div>



            <div class="background-wht map-wrap ">
                <div class="halfdv-5">

                    <div class="world-mpa">
                        <h4>Top Locations</h4>
                        <img alt="hhjj" src={require('./img/wordmap.png')} /></div>
                    <div class="mapgraph-analysis">

                        <div class="mapset-count">
                            <p>USA</p>
                            <p class="percentachive">51%</p>

                        </div>
                        <progress id="js-progressbar" class="uk-progress" value="10" max="50"></progress>

                        <div class="mapset-count">
                            <p>Australia</p>
                            <p class="percentachive">29%</p>
                        </div>

                        <progress id="js-progressbar" class="uk-progress" value="29" max="100"></progress>

                        <div class="mapset-count">
                            <p>France</p>
                            <p class="percentachive">11%</p>
                        </div>

                        <progress id="js-progressbar" class="uk-progress" value="11" max="100"></progress>

                        <div class="mapset-count">
                            <p>Turkey</p>
                            <p class="percentachive">10%</p>
                        </div>

                        <progress id="js-progressbar" class="uk-progress" value="10" max="100"></progress>

                    </div>
                </div>

                <div class="halfdv-5">
                    <div class="world-mpa">
                        <h4>Transactions</h4>

                        <div id="chartContainer" ></div>

                    </div>
                </div>

            </div>


            <div class="promotionsparts">
                <div class="background-wht map-wrap ">
                    <div class="linpromos">
                        <div class="prms">
                            <a href="/">Yod Promotions</a>
                        </div>
                        <div class="prms">
                            <a href="/">Extra 10 % Off On Men”s  Cloths</a>
                        </div>
                        <div class="prms">
                            <a href="/">Extra 20% Off On Babay Suits</a>
                        </div>
                        <div class="prms">
                            <a href="/">Extra 20% Off On Babay Suits</a>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    }
}


export default Maindash;