import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import Header from "./header";
import Maindash from "./maindash";
import { ToastContainer } from 'react-toastify';



class Dashboard extends Component{

    constructor(props) {
        super(props);
       
        if(localStorage.getItem('logindata') === null){
            this.props.history.push('/login');
         }
        
      }
    render(){
        return <div className="dash-layout">
       <Header />
        
    <div className="bodylayouts-yod">	
       
        <p><ToastContainer /></p>
        <Maindash/>
        
    </div>
        
    </div>

    }
}


export default Dashboard;