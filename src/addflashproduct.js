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
import 'react-toastify/dist/ReactToastify.css';
import config from './config/config';



class Addflashproduct extends Component {

  notify = () => toast("Wow so easy !");

  constructor(props) {
    super(props);
    if (localStorage.getItem('logindata') === null) {
      window.location.assign("./");
    }
    this.state = { pictures: '', pictures1: '', pictures2: '', pictures1: [], errors: {} };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);

    // alert(localStorage.getItem('logindata'));

    this.state = { data: [] };


    fetch(`${config.Url}api/productids`).then((response) => response.json())
      .then((res) => {
        //alert(res);
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          // toast.success(res.message);
          //alert(res);
          this.setState({ data: res.response });

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

  onDrop(picture) {
    console.log(picture);
    this.createImage(picture[0]);
  }



  createImage(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target.result)
      fetch(`${config.Url}api/fileuploade`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gstnumfile: e.target.result,
        }),
      }).then((response) => response.json())
        .then((res) => {
          //alert(res);
          if (res.status === 'FAILURE') {
            //toast.error(res.message);
          } else {
            //toast.success(res.message);
            this.setState({
              pictures: res.response
            })
            //this.props.picturemain = this.state.pictures
            console.log(res.response);
            console.log(this.state.pictures);
            //localStorage.setItem('logindata', res.sellerlogin);
            //this.props.history.push('/product');
          }
          //console.log(res);
        })
        .catch((error) => {
          console.log(error);
          alert('Oops, something went wrong. Please try again!');
        });

    };
    reader.readAsDataURL(file);
    //return this.state.pictures;
  }



  handleValidation() {
    let fields = this.state;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields.product_id) {
      formIsValid = false;
      errors["product_id"] = "Product Cannot be empty";
    }

    //category_id





    this.setState({ errors: errors });
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
    //console.log(this.state.pictures1);

    console.log(this.state.errors);
    if (this.handleValidation()) {
      alert('jjd')
      //console.warn()
      fetch(`${config.Url}api/addptoflash`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: this.state.product_id,
        }),
      }).then((response) => response.json())
        .then((res) => {
          //alert(res);
          if (res.status === 'FAILURE') {
            toast.error(res.message);
          } else {
            // toast.success(res.message);

            console.log(res);
            //localStorage.setItem('logindata', res.sellerlogin);
            this.props.history.push('/flashsale');
          }
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });

    }
  }



  render() {
    return <div class="dash-layout">
      <Header />

      <div class="bodylayouts-yod">

        <div >
          <form onSubmit={this.handleSubmit}>
            <div class="productsgrid">
              <p><ToastContainer /></p>
              <div class="head-main"><h6>Add product to flash sale</h6></div>
              <div class="main-grid form-grd">

                <div class="fullfrm">
                  <div class="grpset">
                    <label class="mandtry">Product Id</label>
                    <select class="uk-input" id="form-horizontal-text" name="product_id" value={this.state.value} onChange={this.handleChange}>
                      <option >Select a product</option>
                      {this.state.data.map((item, key) =>
                        <option value={item[1]}>{item[0]}</option>
                      )}
                    </select>
                  </div>

                </div>






              </div>

            </div>


            <div class="productsgrid">

              <div class="main-grid form-grd">


                <div class="halffrms updatebtns">
                  <div class="twoways">
                    <button type="submit" class="uk-button uk-button-default">Publish Now</button>
                  </div>
                  <div class="twoways">
                    <Link to="/flashsale" class="uk-button uk-button-default">Back</Link>
                  </div>
                </div>

              </div>

            </div>


          </form>
        </div>

      </div>

    </div>

  }
}


export default Addflashproduct;