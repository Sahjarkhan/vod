import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import './all.css';
import './fontawesome.css';
import './bootstrap.css';
import Sidebar from "./sidebar";
import Header from "./header";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import ImageUploader from 'react-images-upload';
import config from './config/config';
import 'react-toastify/dist/ReactToastify.css';


class ViewBuyer extends Component {
    notify = () => toast("Wow so easy !");
    constructor(props) {
        super(props);
        if (localStorage.getItem('logindata') === null) {
            window.location.assign("./");
        }
        this.state = { showStore: false, imagearray: [], image: [], pictures: '', pictures1: '', pictures2: '', pictures1: [], errors: {} };
        const { match: { params } } = this.props;

        fetch(`${config.Url}api/userviewforadmin/` + params.userId).then((response) => response.json())
            .then((res) => {
                console.log(res.status)
                if (res.status === 'FAILURE') {
                    console.log("****************88", res.status);
                    toast.error(res.message);
                } else {
                    console.log("****************88", res.userviewforadmin);
                    this.setState(res.userviewforadmin);
                }
            })
    }



    render() {
        console.log(this.state)
        return <div class="dash-layout">
            <Header />
            <div class="pagecontentright">
                <div class="yodadm-tablesthm">
                    <div class="productimages">
                        <img src={`${config.UrlImage}` + this.state.image} />
                    </div>

                    <div class="product-infors">
                        <div class="prcs">
                            <div class="slprc">
                                <h6>Name</h6>
                                <p><strong>{this.state.name}</strong></p>
                            </div>
                            <div class="slprc">
                                <h6>email</h6>
                                <p>{this.state.email}</p>
                            </div>
                            <div class="slprc rightbtns">
                                <Link class="uk-button uk-button-default" to="/buyer" class="Back">Back</Link>
                            </div>
                        </div>

                        <div class="half-5">
                            <div class="prdinf-grd">
                                <label>phone</label>
                                <p>{this.state.phone}</p>
                            </div>
                            <div class="prdinf-grd">
                                <label>Dob</label>
                                <p>{this.state.dob}</p>
                            </div>

                            <div class="prdinf-grd">
                                <label>gender</label>
                                <p>{this.state.gender}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    }
}


export default ViewBuyer;