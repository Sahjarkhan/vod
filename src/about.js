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
import 'react-toastify/dist/ReactToastify.css';
import CKEditor from "react-ckeditor-component";



class About extends Component {

  notify = () => toast("Wow so easy !");

  constructor(props) {
    super(props);
    if (localStorage.getItem('logindata') === null) {
      window.location.assign("./");
    }
    this.updateContent = this.updateContent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.afterPaste = this.afterPaste.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.state = {
      content: 'content',
      type: 'about',
      showStore: false,
    }

    fetch(`${config.Url}api/getcontent/about`).then((response) => response.json())
      .then((res) => {
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          this.setState({ content: res.response });
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        alert('Oops, something went wrong. Please try again!');
      });

  }


  updateContent(newContent) {
    this.setState({
      content: newContent
    })
  }

  onChange(evt) {
    console.log("onChange fired with event info: ", evt);
    var newContent = evt.editor.getData();
    this.setState({
      content: newContent
    })

    fetch(`${config.Url}api/content`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: this.state.content,
        type: this.state.type,
      }),
    }).then((response) => response.json())
      .then((res) => {
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Oops, something went wrong. Please try again!');
      });
  }

  handleChange1(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      type: value,
      showStore: true,
    });

    fetch(`${config.Url}api/getcontent/` + value).then((response) => response.json())
      .then((res) => {
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          this.setState({ content: res.response, showStore: false });

        }
        console.log(res.sublistbycat);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onBlur(evt) {
    console.log("onBlur event called with event info: ", evt);
  }

  afterPaste(evt) {
    console.log("afterPaste event called with event info: ", evt);
  }




  render() {
    return <div class="dash-layout">
      <Header />

      <div class="bodylayouts-yod">
        <div class="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
          <img src="https://www.justori.com/justori/assets/images/11.gif" />
        </div>
        <div >
          <div class="CustomTollsabout">
            <div>
              <select style={{ width: 300 }} class="uk-input" id="form-horizontal-text" name="type" value={this.state.value} onChange={this.handleChange1}>

                <option value="about">About Us</option>
                <option value="tandc">Terms and Condition</option>
                <option value="privacypolicy">Privacy Policy</option>
                <option value="abar">Announcement Bar</option>
                <option value="manbar">Men Announcement Bar</option>
                <option value="womanbar">Women Announcement Bar</option>
                <option value="kidbar">Kids Announcement Bar</option>
                <option value="accessoriesbar">Accessories Announcement Bar</option>
                <option value="sportsbar">Sports Announcement Bar</option>
              </select>
            </div>
            <br />
            <CKEditor
              activeClass="p10"
              content={this.state.content}
              events={{
                "blur": this.onBlur,
                "afterPaste": this.afterPaste,
                "change": this.onChange
              }}
            />
          </div>
        </div>
      </div>
    </div>
  }
}


export default About;