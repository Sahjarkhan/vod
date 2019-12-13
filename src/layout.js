import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import './all.css';
import './fontawesome.css';
import './bootstrap.css';
import Header from "./header";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-toastify/dist/ReactToastify.css';
import uniqueId from 'lodash/uniqueId';
import Sortable from 'react-sortablejs';
import config from './config/config';

class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      simpleList: JSON.parse(localStorage.getItem('layoutdata')),
      data: []
    }

    this.sayHello = this.sayHello.bind(this);

  }
  componentWillMount() {
    console.log('First this called');

  }

  getData() {
    setTimeout(() => {
      console.log('Our data is fetched');
      fetch(`${config.Url}api/themeorder`).then((response) => response.json())
        .then((res) => {
          //alert(res);
          if (res.status === 'FAILURE') {
            // toast.error(res.message);
          } else {
            // toast.success(res.message);
            //alert(res);
            //alert(res.response);
            this.setState({ data: res.response });



          }
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          alert('Oops, something went wrong. Please try again!');
        });
    }, 1000)
  }

  componentDidMount() {
    this.getData();
  }

  sayHello() {
    // alert(this.state.simpleList);
    fetch(`${config.Url}api/setthemeorder`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        simpleList: this.state.simpleList,
      }),
    }).then((response) => response.json())
      .then((res) => {
        //alert(res);
        if (res.status === 'FAILURE') {
          //toast.error(res.message);
        } else {
          //toast.success(res.message);
          // alert(res.response);
          localStorage.setItem('layoutdata', JSON.stringify(res.response));
          //this.props.picturemain = this.state.pictures
          console.log(res.response);
          //console.log(this.state.pictures);
          //localStorage.setItem('logindata', res.sellerlogin);
          //this.props.history.push('/product');
        }
        //console.log(res);
      })
      .catch((error) => {
        console.log(error);
        alert('Oops, something went wrong. Please try again!');
      });
  }

  render() {
    const simpleList = this.state.simpleList.map((val, key) => (
      <li key={uniqueId()} data-id={val}><img style={{ width: 500, height: 100 }} src={val} /></li>
    ));
    return (
      <div class="dash-layout">
        <Header />

        <div class="bodylayouts-yod">
          <div>
            <div style={{ marginTop: 50 }}>
              <div class="LayoutHead">
                <a onClick={this.sayHello}>Update Layout</a>
                <h3>Layout Section</h3>
                <div class="clear"></div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <Sortable
                    options={{
                      animation: 150
                    }}
                    className="block-list"
                    ref={c => {
                      if (c) {
                        this.simpleList = c.sortable;
                      }
                    }}
                    tag="ul"
                    onChange={(order, sortable, evt) => {
                      this.setState({ simpleList: order });
                    }}
                  >
                    {simpleList}
                  </Sortable>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>
    )
  }
}

export default Layout;