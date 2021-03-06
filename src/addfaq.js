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



class Addfaq extends Component {

  notify = () => toast("Wow so easy !");

  constructor(props) {
    super(props);
    if (localStorage.getItem('logindata') === null) {
      window.location.assign("./");
    }
    this.state = { showStore: false, pictures: '', pictures1: '', pictures2: '', pictures1: [], errors: {} };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);

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
    //return this.state.pictures;
  }



  handleValidation() {
    let fields = this.state;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields.name) {
      formIsValid = false;
      errors["name"] = "Question cannot be empty.";
    }

    //category_id

    if (!fields.desc) {
      formIsValid = false;
      errors["desc"] = "Answer cannot be empty.";
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
    // alert('A name was submitted: ' + this.state.username+' password '+ this.state.password);
    event.preventDefault();
    //console.log(this.state.pictures1);


    console.log(this.state.errors);
    if (this.handleValidation()) {
      alert('Faq added successfully.')
      //console.warn()
      fetch(`${config.Url}yodapi/api/addfaq`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: this.state.name,
          ans: this.state.desc,
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
            this.props.history.push('/faqlist');
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
              <div class="head-main"><h6>Faq Info</h6></div>
              <div class="main-grid form-grd">

                <div class="fullfrm">
                  <div class="grpset">
                    <label class="mandtry">Question</label>
                    <div class="Inputs">
                      <input name="name" class="uk-input" id="form-horizontal-text" type="text" placeholder="Question" value={this.state.value} onChange={this.handleChange} />
                      <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                    </div>
                  </div>

                  <div class="grpset">
                    <label class="mandtry">Answer</label>
                    <div class="Inputs">
                      <input name="desc" class="uk-input" id="form-horizontal-text" type="text" placeholder="Answer" value={this.state.value} onChange={this.handleChange} />
                      <span style={{ color: "red" }}>{this.state.errors["desc"]}</span>
                    </div>
                  </div>

                </div>


                <div class="halffrms updatebtns">
                  <div class="twoways">
                    <button type="submit" class="uk-button uk-button-default">Publish Now</button>
                  </div>
                  <div class="twoways">
                    <Link to="/brandlist" class="uk-button uk-button-default">Back</Link>
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


export default Addfaq;