import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import Sidebar from "./sidebar";
import Header from "./header";
import Maindash from "./maindash";
import { ToastContainer, toast } from 'react-toastify';



class Dashboard extends Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem('logindata') === null) {
            this.props.history.push('/login');
        }

    }
    render() {
        return <div class="dash-layout">
            <Header />

            <div class="bodylayouts-yod">


                <Maindash />

            </div>

        </div>

    }
}


export default Dashboard;