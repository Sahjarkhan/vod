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
import 'react-toastify/dist/ReactToastify.css';
import MUIDataTable from "mui-datatables";
import DateTimePicker from 'react-datetime-picker';
import config from './config/config';

const columns = [
  "Name",
];

class Editsubcatg extends Component {

  notify = () => toast("Wow so easy !");

  constructor(props) {
    super(props);
    if (localStorage.getItem('logindata') === null) {
      window.location.assign("./");
    }
    this.state = { status: '', name: '', data: [], pictures: [], pictures1: [], errors: {}, date: new Date() };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    // alert(localStorage.getItem('logindata'));
    const { match: { params } } = this.props;



    fetch(`${config.Url}api/flashproductlist`).then((response) => response.json())
      .then((res) => {
        //alert(res);
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          //  toast.success(res.message);
          //alert(res);
          this.setState({ data: res.response.data, status: res.response.status, date: new Date(res.response.time) });

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

  onChange = date => this.setState({ date })

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
              pictures: this.state.pictures.concat(res.response)
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
        });

    };
    reader.readAsDataURL(file);
    //return this.state.pictures;
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
    alert(this.state.date);

    //console.log(this.state.pictures);

    //const { match: { params } } = this.props; 
    //alert(params.userId)
    //console.warn()

    fetch(`${config.Url}api/updateflashtime`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        time: this.state.date,
        status: this.state.status,
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
          this.props.history.push('/flashsale');
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);

      });


  }

  handleDelete = deletedRows => {
    const { data, tableColumns } = this.props;
    const deletedIndexes = Object.keys(deletedRows.lookup);
    //alert([0])
    const data123 = this.state.data;
    deletedIndexes.map(function (name, index) {
      fetch(`${config.Url}api/catdelete11pp/` + data123[name][1]).then((response) => response.json())
        .then((res) => {
          //alert(res);
          if (res.status === 'FAILURE') {
            toast.error(res.message);
          } else {
            toast.success(res.message);
            //alert(res);
            //this.setState({data: res.response});

            //localStorage.setItem('logindata', res.sellerlogin);
            //this.props.history.push('/');
          }
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          alert('Oops, something went wrong. Please try again!');
        });

    })

    // const rows = transformToArray(data, tableColumns);
    // deletedIndexes.map(index =>
    //     limitPromisecConcurrency(() => this.remoteDelete(rows[index]))
    // );
  }

  render() {
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      search: true,
      print: false,
      download: false,
      filter: false,
      onRowsDelete: this.handleDelete,
    };
    return <div class="dash-layout">
      <Header />

      <div class="bodylayouts-yod">

        <div >
          <form onSubmit={this.handleSubmit}>
            <div class="productsgrid">
              <p><ToastContainer /></p>
              <div class="head-main"><h6>Flash Sale</h6></div>
              <div class="main-grid form-grd">

                <div class="fullfrm">
                  <div class="grpset">
                    <label class="mandtry">Flash Sale End Time</label>
                    <DateTimePicker
                      format="y-MM-d h:m:sa"
                      onChange={this.onChange}
                      value={this.state.date}
                    />
                  </div>

                </div>

                <div class="fullfrm">
                  <div class="grpset">
                    <label class="mandtry">Flash Sale Status</label>
                    <select class="uk-input" id="form-horizontal-text" name="status" value={this.state.status} onChange={this.handleChange}>
                      <option >Select a status</option>
                      <option value="1">FLASH SALE START</option>
                      <option value="0">FLASH SALE STOP</option>
                    </select>
                  </div>

                </div>



                <div class="halffrms updatebtns">
                  <div class="twoways">
                    <button type="submit" class="uk-button uk-button-default">Update</button>
                  </div>

                  <div class="twoways">
                    <Link to="/addflashproduct" class="uk-button uk-button-default">Add New Product</Link>
                  </div>

                </div>



              </div>

            </div>





          </form>
          <div class="productsgrid">
            <MUIDataTable
              title={"Product List"}
              data={this.state.data}
              columns={columns}
              options={options}
            />
          </div>
        </div>


      </div>

    </div>

  }
}


export default Editsubcatg;