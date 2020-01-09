import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import './all.css';
import './fontawesome.css';
import './bootstrap.css';
import Header from "./header";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import ImageUploader from 'react-images-upload';
import 'react-toastify/dist/ReactToastify.css';
import config from './config/config';




class Banneruploade extends Component {

  notify = () => toast("Wow so easy !");

  constructor(props) {
    super(props);
    if (localStorage.getItem('logindata') === null) {
      window.location.assign("./");
    }
    this.state = { showStore: false, name: '', data2: [], data1: [], pictures: '', pictures1: [], errors: {}, data: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange2 = this.handleChange2.bind(this)
    this.handleChange3 = this.handleChange3.bind(this)
    this.handleChange4 = this.handleChange4.bind(this)
    this.onDrop = this.onDrop.bind(this);
    // alert(localStorage.getItem('logindata'));

    fetch(`${config.Url}api/catlistforadmin1234`).then((response) => response.json())
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
        // alert('Oops, something went wrong. Please try again!');
      });
  }

  onDrop(picture) {
    console.log(picture);
    this.setState({
      showStore: true,
    })
    this.createImage(picture[0]);
  }

  createImage(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
      fetch(`${config.Url}api/fileuploadebanner`, {
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
          // alert('Oops, something went wrong. Please try again!');
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
    if (!fields.bannertype) {
      formIsValid = false;
      errors["bannertype"] = "Please select banner type.";
    }

    //category_id

    if (!fields.category_id) {
      formIsValid = false;
      errors["category_id"] = "Please select Category.";
    }
    if (!fields.subcategory_id) {
      formIsValid = false;
      errors["subcategory_id"] = "Please select Subcategory.";
    }
    if (!fields.subsubcategory_id) {
      formIsValid = false;
      errors["subsubcategory_id"] = "Please select Sub-subcategory";
    }
    // Please select subcategory.
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

    var testing = {
      type: this.state.bannertype,
      image: this.state.pictures,
      category_id: this.state.category_id,
      subcategory_id: this.state.subcategory_id,
      subsubcategory_id: this.state.subsubcategory_id
    }
    console.log(testing)
    // alert('A name was submitted: ' + this.state.username+' password '+ this.state.password);
    event.preventDefault();
    //console.log(this.state.pictures1);


    console.log(this.state.pictures);
    if (this.handleValidation()) {
      //console.warn()
      fetch(`${config.Url}api/createbanner`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: this.state.bannertype,
          image: this.state.pictures,
          category_id: this.state.category_id,
          subcategory_id: this.state.subcategory_id,
          subsubcategory_id: this.state.subsubcategory_id
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
            this.props.history.push('/bannerlist');
          }
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          // alert('Oops, something went wrong. Please try again!');
        });

    }
  }

  handleChange3(event) {
    const target = event.target;
    var value = target.value;
    var name = target.name;
    this.setState({
      subcategory_id: value
    });
    fetch(`${config.Url}api/sublistbycatremark/` + value).then((response) => response.json())
      .then((res) => {
        //alert(res);
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          // toast.success(res.message);
          //alert(res);
          this.setState({ data1: res.sublistbycatremark });

          //localStorage.setItem('logindata', res.sellerlogin);
          //this.props.history.push('/');
        }
        console.log(res.sublistbycatremark);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleChange4(event) {
    const target = event.target;
    const value = target.value;
    this.setState({
      subsubcategory_id: value
    });
  }
  handleChange2(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    //alert(value);
    this.setState({
      category_id: value
    });
    fetch(`${config.Url}api/sublistbycat/` + value).then((response) => response.json())
      .then((res) => {
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          this.setState({ data2: res.sublistbycat });
        }
      })
      .catch((error) => {
        console.log(error);
      });
      this.setState({
        data2: []
      });
      this.setState({
        data1: []
      });
  }


  render() {
    return <div class="dash-layout">
      <Header />
      <div class="bodylayouts-yod">

        <div >
          <form onSubmit={this.handleSubmit}>
            <div class="productsgrid">
              <p><ToastContainer /></p>
              <div class="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
                <img src="https://www.justori.com/justori/assets/images/11.gif" />
              </div>
              <div class="head-main"><h6>Banner Info</h6></div>
              <div class="main-grid form-grd">

                <div class="fullfrm">
                  <div class="grpset">
                    <label class="mandtry">Banner Type</label>
                    <div class="Inputs">
                      <select class="uk-input" id="form-horizontal-text" name="bannertype" value={this.state.value} onChange={this.handleChange}>
                        <option>Select banner type</option>
                        <option value="homeslider">Home Slider</option>
                        <option value="stylefeed">Style feed</option>
                        <option value="banner1">Banner 1</option>
                        <option value="slider1">Slider 1</option>
                        <option value="banner2">Banner 2</option>
                        <option value="slider2">Slider 2</option>
                        <option value="hotdeal">Hotdeal</option>
                        <option value="handpicked">Handpicked</option>
                        <option value="WOMEN_inner">Woman Inner Page Banner</option>
                        <option value="MEN_inner">Man Inner Page Banner</option>
                        <option value="KIDS_inner">Kids Inner Page Banner</option>
                        <option value="SPORTS_inner">Sports Inner Page Banner</option>
                        <option value="ACCESSORIES_inner">Accessories Inner Page Banner</option>
                      </select>
                      <span style={{ color: "red" }}>{this.state.errors["bannertype"]}</span>
                    </div>
                  </div>
                  <div>
                    <div className="grpset">
                      <label className="mandtry">Category</label>
                      <div className="Inputs">
                        <select className="uk-input" id="form-horizontal-text" name="category_id" value={this.state.value} onChange={this.handleChange2}>
                          <option >Select a category</option>
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
                    <div>
                      <div className="grpset">
                        <label className="mandtry">Subcategory</label>
                        <div className="Inputs">
                          <select className="uk-input" id="form-horizontal-text" name="subcategory_id" value={this.state.value} onChange={this.handleChange3}>
                            <option >Select a subcategory</option>
                            {this.state.data2.map((item, key) =>
                              <option value={item[0]}>{item[1]}</option>
                            )}
                          </select><span style={{ color: "red" }}>{this.state.errors["subcategory_id"]}</span>
                        </div>
                      </div>
                    </div>
                    <div className="grpset">
                      <label className="mandtry">Sub-subcategory</label>
                      <div className="Inputs">
                        <select className="uk-input" id="form-horizontal-text" name="subsubcategory_id" value={this.state.value} onChange={this.handleChange4}>
                          <option >Select a sub-subcategory</option>
                          {this.state.data1.map((item, key) =>
                            <option value={item[0]}>{item[1]}</option>
                          )}
                        </select>
                        <span style={{ color: "red" }}>{this.state.errors["subsubcategory_id"]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="productsgrid">
              <div class="head-main"><h6>Images</h6></div>
              <div class="main-grid form-grd">
                <div class="halffrms">
                  <div class="twoways">
                    <div class="grpset">
                      <ImageUploader
                        withIcon={true}
                        singleImage={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                      />
                    </div>
                  </div>
                  <div class="twoways">

                  </div>
                </div>

                <div class="halffrms updatebtns">
                  <div class="twoways">
                    <button type="submit" class="uk-button uk-button-default">Publish Now</button>
                  </div>
                  <div class="twoways">
                    <Link to="/bannerlist" class="uk-button uk-button-default">Back</Link>
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


export default Banneruploade;