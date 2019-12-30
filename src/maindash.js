import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import { Link, withRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faArrowDown, faAngleDown, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import config from '../src/config/config';

class Maindash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastmonth: 6,state_records:[]
        }
        this.handleSort = this.handleSort.bind(this);
        this.Testing = this.Testing.bind(this);
    }
    Testing() {
        fetch(`${config.Url}api/dashoardforadmin?dateframe=${this.state.lastmonth}`).then((response) => response.json())
            .then((res) => {
                if (res.status === 'FAILURE') {
                    toast.error(res.message);
                } else {
                    console.log(res.dashoardforadmin)
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
    render() {
        return <div >
            <p><ToastContainer /></p>
            <div className="Time_view">
                <ul>
                    <li><FontAwesomeIcon icon={faCalendarAlt} /> Jan 01 - Jun 30</li>
                    <li>
                        last 6 month <span><FontAwesomeIcon icon={faAngleDown} /></span>
                        <ol>
                            <li onClick={() => this.handleSort(6)}><a>last 6 month</a></li>
                            <li onClick={() => this.handleSort(12)} ><a>last 12 month</a></li>
                            <li onClick={() => this.handleSort(18)}><a>last 18 month</a></li>
                            <li onClick={() => this.handleSort(24)}><a>last 24 month</a></li>
                            <li onClick={() => this.handleSort(30)}><a>last 30 month</a></li>
                        </ol>
                    </li>
                </ul>
            </div>
            <div className="grapscols">
                <div className="graph-grid">
                    <div className="graph-voilet">
                        <div className="ordersdtsa">
                            <h5>Orders</h5>
                            <p className="resul-dta">{this.state.orders}</p>
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
                            <p className="resul-dta">{this.state.revenue}</p>
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
                            <p className="resul-dta">Live {this.state.live_product}<br />
                                Non live   {this.state.nonlive_product}</p>
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

                <div className="halfdv-5">
                    <div className="world-mpa">
                        <h4>Transactions</h4>

                        <div id="chartContainer" ></div>

                    </div>
                </div>

            </div>
        </div>

    }
}


export default Maindash;

























// {this.state.detailss.map((item, i) => {
//     return (<tr key={i}>
//         <td>
//             <div className="mnde">
//                 <h6 className="prdname">{item.product_name}</h6>
//                 <div className="mrp-dr">
//                     <p><strong>Product SKU:</strong> {item.product_sku}</p>
//                     <p><strong>Product ID:</strong> {item.product_id}</p>
//                 </div>
//                 <p className="bgr-info">Kurta : Size 38</p>
//             </div>
//         </td>
//         <td>
//             <img style={{ width: 100, height: 100 }} src={`${config.UrlImage}` + item.product_image} />
//         </td>
//         <td>
//             <p>{item.quantity}</p>
//         </td>
//         <td>
//             <p>{item.color}</p>
//         </td>

//         <td>
//             <p>{item.sale_price}</p>
//         </td>
//         <td>
//             <p>{item.payment_status}</p>
//         </td>
//         <td>
//             <p>{item.total_price}</p>
//         </td>
//         <td>
//             <p>{item.dispatch_by}</p>
//         </td>
//         <td>
//             <div>
//                 <div>
//                     <select onChange={this.handleChange} value={item.payment_status}>
//                         <option>{item.status}</option>
//                         {options.map(items => (
//                             <option key={items.label} value={items.label + " " + item.order_id + " " + + item.product_id} >
//                                 {items.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>
//         </td>
//     </tr>
//     )
// })}