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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from './config/config';


class Addcategory extends Component {
  notify = () => toast("Wow so easy !");
  constructor(props) {
    super(props);
    if (localStorage.getItem('logindata') === null) {
      window.location.assign("./");
    }
    this.state = { showStore: false, name: '', pictures: '', pictures1: [], errors: {}, occasion_status: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    // alert(localStorage.getItem('logindata'));


  }

  onDrop(e) {
    let files = e.target.files || e.dataTransfer.files;
    //alert(files);
    console.log(files[0]);
    this.setState({
      showStore: true,
    })
    if (!files.length)
      return;
    this.createImage(files[0]);

  }


  createImage(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
      console.log("SSSSSSSSSSSSSSSSSSSSSS", e.target.result)
      fetch(`${config.Url}api/fileuploadecat`, {
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
          } else {
            this.setState({
              pictures: res.response,
              showStore: false,
            })
            console.log(res.response);
            console.log(this.state.pictures);
          }
        })
        .catch((error) => {
          console.log(error);
          alert('Oops, something went wrong. Please try again!');
        });
    };
    reader.readAsDataURL(file);
  }

  handleValidation() {
    let fields = this.state;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields.name) {
      formIsValid = false;
      errors["name"] = "Name Cannot be empty";
    }

    //category_id

    if (!fields.category_id) {
      formIsValid = false;
      errors["category_id"] = "Category Cannot be empty";
    }
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
    event.preventDefault();
    console.log(this.state.pictures);
    if (this.handleValidation()) {
      var testing = {
        name: this.state.name,
        category_id: this.state.category_id,
        image: `${config.UrlImage}` + this.state.pictures,
        occasion_status: this.state.occasion_status
      }
      console.log("testing", testing)
      fetch(`${config.Url}api/addsubcatg`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name: this.state.name,
          category_id: this.state.category_id,
          image:this.state.pictures,
        }),
      }).then((response) => response.json())
        .then((res) => {
          //alert(res);
          if (res.status === 'FAILURE') {
            toast.error(res.message);
          } else {
            toast.success(res.message);

            console.log(res);
            //localStorage.setItem('logindata', res.sellerlogin);
            this.props.history.push('/category');
          }
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          alert('Oops, something went wrong. Please try again!');
        });

    }
  }

  render() {
    return <div class="dash-layout">
      <Header />

      <div class="bodylayouts-yod">
        <div class="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
          <img src="https://www.justori.com/justori/assets/images/11.gif" />
        </div>
        <div >
          <form onSubmit={this.handleSubmit}>
            <div class="productsgrid">
              <p><ToastContainer /></p>
              <div class="head-main"><h6>Subcategory Info</h6></div>
              <div class="main-grid form-grd">

                <div class="fullfrm">
                  <div class="grpset">
                    <label class="mandtry">Name</label>
                    <div class="Inputs">
                      <input name="name" class="uk-input" id="form-horizontal-text" type="text" placeholder="Enter Product Name" value={this.state.value} onChange={this.handleChange} />
                      <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                    </div>
                  </div>

                  <div class="grpset">
                    <label class="mandtry">Category</label>
                    <div class="Inputs">
                      <select class="uk-input" id="form-horizontal-text" name="category_id" value={this.state.value} onChange={this.handleChange}>
                        <option value="MEN">Select Category</option>
                        <option value="MEN">MEN</option>
                        <option value="WOMEN">WOMEN</option>
                        <option value="KIDS">KIDS</option>
                        <option value="ACCESSORIES">ACCESSORIES</option>
                        <option value="SPORTS">SPORTS</option>
                        <option value="OTHERS">OTHERS</option>
                      </select>
                      <span style={{ color: "red" }}>{this.state.errors["category_id"]}</span>
                    </div>
                  </div>

                  <div class="grpset">
                    <label class="mandtry">Image</label>
                    <div class="Inputs">
                      <p> <input type="file" onChange={this.onDrop} /></p>

                    </div>
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

                    <Link to="/category" class="uk-button uk-button-default">Back</Link>
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


export default Addcategory;