import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import LineExample from './line';
import { Link, withRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faArrowDown, faAngleDown, faSearch, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import config from '../src/config/config';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class Maindash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            startDate: new Date(),
            endDate: new Date(),
            lastmonth: 6, state_records: []
        }
        this.Testing = this.Testing.bind(this);

    }
    Testing() {

        fetch(`${config.Url}api/dashoardforadmin?dateframe=${this.state.lastmonth}`).then((response) => response.json())
            .then((res) => {
                if (res.status === 'FAILURE') {
                    toast.error(res.message);
                } else {
                    this.setState(res.dashoardforadmin);
                }
            })
            .catch((error) => {
                console.log(error);
                alert('Oops, something went wrong. Please try again!');
            });
    }

    componentDidMount() {
        this.Testing();

    }
    handleSort(value) {
        this.setState({
            lastmonth: value
        })
        this.Testing();
    }
    handleChange = date => {
        this.setState({
            startDate: date
        });
    };
    handleChange2 = date => {
        console.log(date)
        if(date ===null){
            this.setState(
                { endDate: new Date() },
                () => console.log('hello111')
            );
        }
        

        function convert(str) {
            var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
            return [mnth, day, date.getFullYear()].join("/");
        }
        var secondEndDate = convert(date);


        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var today = mm + '/' + dd + '/' + yyyy;



        var date1 = new Date(today);
        var date2 = new Date(secondEndDate);
        var Difference_In_Time = date2.getTime() - date1.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        if (Difference_In_Days > 0) {
            this.setState(
                { endDate: new Date() },
                () => console.log('hello1')
            );
            
        } else {
            this.setState({
                endDate: date
            });
           
        }

    };
    handleSubmit = (event) => {
        function convert(str) {
            var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
            return [mnth, day, date.getFullYear()].join("/");
        }
        var secondEndDate = convert(this.state.endDate);


        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var today = mm + '/' + dd + '/' + yyyy;


        var date1 = new Date(today);
        var date2 = new Date(secondEndDate);
        var Difference_In_Time = date2.getTime() - date1.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        if (Difference_In_Days > 0) {
            this.setState(
                { endDate: new Date() },
                () => console.log('Testing')
            );
        } else {
            this.setState({
                endDate: this.state.endDate
            });
        }

        event.preventDefault();
        fetch(`${config.Url}api/dashoardforadmin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startdate: this.state.startDate,
                enddate: this.state.endDate,
            }),
        }).then((response) => response.json())
            .then((res) => {
                if (res.status === 'FAILURE') {
                    toast.error(res.message);
                } else {
                    console.log('helo')
                    if (toast.success(res.message)) {
                        this.setState(res.dashoardforadmin);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }
    handleChange1 = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            lastmonth: value
        });
        this.setState(
            { lastmonth: value },
            () => console.log(this.state.lastmonth)
        );

        this.Testing();

    };

    onChange = date => this.setState({ date });

    render() {
        return <div >
            <p><ToastContainer /></p>
            <div className="Time_view">
                <ul>
                    <li>
                        <form onSubmit={this.handleSubmit}>
                            <div className="Calender">
                                <span>To :</span>
                                <div>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                    <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}

                                    />
                                </div>
                            </div>

                            <div className="Calender">
                                <span>From : </span>
                                <div>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                    <DatePicker
                                        selected={this.state.endDate}
                                        onChange={this.handleChange2}
                                    />
                                </div>
                            </div>
                            <button className="submit"><FontAwesomeIcon icon={faSearch} /></button>
                        </form>
                    </li>
                    <li>
                        <select className="uk-input" id="form-horizontal-text" name="category_id" onChange={this.handleChange1}>
                            <option value="6">last 6 month</option>
                            <option value="12">last 12 month</option>
                            <option value="18">last 18 month</option>
                            <option value="24">last 24 month</option>
                            <option value="30">last 30 month</option>
                        </select>
                    </li>
                </ul>
            </div>
            <div className="grapscols">
                <div className="graph-grid">
                    <Link to="/orders" className="graph-voilet">
                        <div className="ordersdtsa">
                            <h5>Orders</h5>
                            <p className="resul-dta">{this.state.orders}</p>
                        </div>
                        <div className="dataanalys">
                            <img alt="hhjj" src={require('./img/spinechar.png')} />
                        </div>
                    </Link>
                </div>
                <div className="graph-grid">
                    <Link to="/product" className="graph-voilet">
                        <div className="ordersdtsa">
                            <h5>Revenue</h5>
                            <p className="resul-dta">{this.state.revenue}</p>
                        </div>
                        <div className="dataanalys">
                            <img alt="hhjj" src={require('./img/spinechar.png')} />
                        </div>
                    </Link>
                </div>


                <div className="graph-grid">
                    <Link to="/product" className="graph-voilet">
                        <div className="ordersdtsa">
                            <h5>Products</h5>
                            <p className="resul-dta">Live {this.state.live_product}<br />
                                Non live   {this.state.nonlive_product}</p>
                        </div>
                        <div className="dataanalys">
                            <img alt="hhjj" src={require('./img/spinechar.png')} />
                        </div>
                    </Link>
                </div>
            </div>

            <div className="background-wht map-wrap ">
                <div className="halfdv-5">
                    <div className="world-mpa">
                        <h4>Top Locations</h4>
                        <img alt="hhjj" src={require('./img/wordmap.png')} /></div>
                    <div className="mapgraph-analysis">
                        {this.state.state_records.map((item, i) => {
                            return (<div>
                                <div className="mapset-count">
                                    <p>{item.name}</p>
                                    <p className="percentachive">{item.percent} %</p>
                                </div>
                                <progress id="js-progressbar" className="uk-progress" value={item.percent} max="100"></progress>
                            </div>
                            )
                        })}

                    </div>
                </div>

                {<div className="halfdv-5">
                    <div className="world-mpa">
                        <h4>Transactions</h4>
                        <LineExample Graph={this.state} />
                    </div>
                </div>}
            </div>
        </div>

    }
}


export default Maindash;
