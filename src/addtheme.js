import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import './all.css';
import './fontawesome.css';
import './bootstrap.css';
import config from './config/config';

import Header from "./header";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import ImageUploader from 'react-images-upload';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-toastify/dist/ReactToastify.css';



class Addtheme extends Component {

  notify = () => toast("Wow so easy !");

  constructor(props) {
    super(props);
    if (localStorage.getItem('logindata') === null) {
      window.location.assign("./");
    }
    this.state = { showStore: false, name: '', pictures: '', pictures1: '', pictures2: '', pictures1: [], errors: {} };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDrop1 = this.onDrop1.bind(this);
    this.onDrop2 = this.onDrop2.bind(this);
    // alert(localStorage.getItem('logindata'));

    // this.state = {data:[]};


    //  fetch("http://mobuloustech.com/yodapi/api/catlistforadmin1234").then((response) => response.json())
    //     .then((res) => { 
    //      //alert(res);
    //      if(res.status === 'FAILURE'){
    //         toast.error(res.message);
    //      } else {
    //      toast.success(res.message);
    //      //alert(res);
    //      this.setState({data: res.response});

    //      //localStorage.setItem('logindata', res.sellerlogin);
    //       //this.props.history.push('/');
    //      }
    //      console.log(res);
    //     })
    //     .catch((error) => {
    //     console.log(error);
    //     alert('Oops, something went wrong. Please try again!');
    //     });
  }

  onDrop(picture) {
    console.log(picture);
    this.setState({
      showStore: true,
    })
    this.createImage(picture[0]);
  }

  onDrop1(picture) {
    console.log(picture);
    this.setState({
      showStore: true,
    })
    this.createImage1(picture[0]);
  }

  onDrop2(picture) {
    console.log(picture);
    this.setState({
      showStore: true,
    })
    this.createImage2(picture[0]);
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
          if (res.status === 'FAILURE') {
          } else {
            this.setState({
              pictures: res.response,
              showStore: false,
            })
          }
        })
        .catch((error) => {
          console.log(error);
          alert('Oops, something went wrong. Please try again!');
        });

    };
    reader.readAsDataURL(file);
  }

  createImage1(file) {
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
          if (res.status === 'FAILURE') {
          } else {
            this.setState({
              pictures1: res.response,
              showStore: false,
            })
          }
        })
        .catch((error) => {
          console.log(error);
          alert('Oops, something went wrong. Please try again!');
        });

    };
    reader.readAsDataURL(file);
  }

  createImage2(file) {
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
          if (res.status === 'FAILURE') {
          } else {
            this.setState({
              pictures2: res.response,
              showStore: false,
            })
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
    if (!fields.title) {
      formIsValid = false;
      errors["title"] = "Title Cannot be empty";
    }

    //category_id

    if (!fields.desc) {
      formIsValid = false;
      errors["desc"] = "Description Cannot be empty";
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
    if (this.handleValidation()) {
      alert('Theme uploaded successdully')
      //console.warn()
      fetch(`${config.Url}api/createtheme`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.state.title,
          imagemain: this.state.pictures,
          herimage: this.state.pictures1,
          himimage: this.state.pictures2,
          description: this.state.desc,
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
            this.props.history.push('/themelist');
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

        <div >
          <form onSubmit={this.handleSubmit}>
            <div class="productsgrid">
              <p><ToastContainer /></p>
              <div class="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
                <img src="https://www.justori.com/justori/assets/images/11.gif" />
              </div>
              <div class="head-main"><h6>Theme Info</h6></div>
              <div class="main-grid form-grd">

                <div class="fullfrm">
                  <div class="grpset">
                    <label class="mandtry">Title</label>
                    <div class="Inputs">
                      <input name="title" class="uk-input" id="form-horizontal-text" type="text" placeholder="Title" value={this.state.value} onChange={this.handleChange} />
                      <span style={{ color: "red" }}>{this.state.errors["title"]}</span>
                    </div>
                  </div>

                  <div class="grpset">
                    <label class="mandtry">Description</label>
                    <div class="Inputs">
                      <input name="desc" class="uk-input" id="form-horizontal-text" type="text" placeholder="Description" value={this.state.value} onChange={this.handleChange} />
                      <span style={{ color: "red" }}>{this.state.errors["desc"]}</span>
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
                      <label class="mandtry">Main Banner</label>
                      <ImageUploader
                        withIcon={true}
                        singleImage={true}
                        withPreview={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                      />
                    </div>
                  </div>
                  <div class="twoways">
                    <div class="grpset">
                      <label class="mandtry">Him Banner</label>
                      <ImageUploader
                        withIcon={true}
                        singleImage={true}
                        withPreview={true}
                        buttonText='Choose images'
                        onChange={this.onDrop2}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                      />
                    </div>
                  </div>
                  <div class="twoways">
                    <div class="grpset">
                      <label class="mandtry">Her Banner</label>
                      <ImageUploader
                        withIcon={true}
                        singleImage={true}
                        withPreview={true}
                        buttonText='Choose images'
                        onChange={this.onDrop1}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                      />
                    </div>
                  </div>
                </div>

                <div class="halffrms updatebtns">
                  <div class="twoways">
                    <button type="submit" class="uk-button uk-button-default">Publish Now</button>
                  </div>
                  <div class="twoways">
                    <Link to="/themelist" class="uk-button uk-button-default">Back</Link>
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


export default Addtheme;