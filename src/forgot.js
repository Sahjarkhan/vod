import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import config from './config/config';
class Forgot extends Component{

    notify = () => toast("Wow so easy !");

    constructor(props) {
        super(props);
        this.state = {username: '',errors: {}};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        // alert(localStorage.getItem('logindata'));

        
      }

      handleValidation(){
        let fields = this.state;
        let errors = {};
        let formIsValid = true;


                //Email
                if(!fields.username){
                formIsValid = false;
                errors["username"] = "Email Id Cannot be empty";
                } else {
                    if(typeof fields.username !== "undefined"){
                        let lastAtPos = fields.username.lastIndexOf('@');
                        let lastDotPos = fields.username.lastIndexOf('.');
        
                        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields.username.indexOf('@@') == -1 && lastDotPos > 2 && (fields.username.length - lastDotPos) > 2)) {
                            formIsValid = false;
                            errors["username"] = "Email Id is not valid";
                            }
                    }  
                }

                

            this.setState({errors: errors});
            return formIsValid;
        }
    
      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
    
      handleSubmit(event) {
       // alert('A name was submitted: ' + this.state.username+' password '+ this.state.password);
        event.preventDefault();
        if(this.handleValidation()){
        fetch(`${config.Url}api/forgotpasswordseller`,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.state.username,
            }),
            }).then((response) => response.json())
            .then((res) => { 
             //alert(res);
             if(res.status === 'FAILURE'){
                toast.error(res.message);
             } else {
             toast.success(res.message);
             //localStorage.setItem('logindata', res.sellerlogin);
              //this.props.history.push('/');
             }
             console.log(res);
            })
            .catch((error) => {
            console.log(error);
            alert('Oops, something went wrong. Please try again!');
            });

            }
      }

    render(){
        return <div class="loginbgayod">
        <div class="formbgayod">
            <div class="holdlgo"><img alt="ok" src={require('./img/yodfull.png')} class="logoflyod"/></div>
            
            <div class="msgforms">
                <p>Please enter your email address so we can send you the <br/>
    password reset link.</p>
    <ToastContainer />
            </div>
            
        <div class="formsideod">
            <form onSubmit={this.handleSubmit}>
            <fieldset class="uk-fieldset">
                <div class="yodformdesigns">
                <div class="uk-margin">
                    <label class="yodinplabel">Email Address</label>
                    <input value={this.state.value} onChange={this.handleChange} name="username" class="uk-input" type="mail" placeholder="Enter Your Email Address"/>
                    <span style={{color: "red"}}>{this.state.errors["username"]}</span>
                </div>
                
                <button class="uk-button uk-button-primary yodprimary">Reset Password</button>
                <div style={{marginTop: "5px"}}><a href="./" class="uk-button uk-button-primary yodprimary">Login</a></div>
                
                </div>
            </fieldset>
            </form>
        </div>	
            
        </div>
    </div>


    }

}

export default Forgot;