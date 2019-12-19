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
  "Cuponcode",
  "Min Price",
  "Discount",
  "Expiry Date"
];

class Cuponlist extends Component {

  notify = () => toast("Wow so easy !");

  constructor(props) {
    super(props);

    this.state = { min_price: '', discount: '', name: '', data: [], pictures: [], pictures1: [], errors: {}, date: new Date() };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onChange = this.onChange.bind(this);
    // alert(localStorage.getItem('logindata'));
    const { match: { params } } = this.props;



    fetch(`${config.Url}api/cuponlist`).then((response) => response.json())
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
    this.createImage(picture[picture.length - 1]);
    this.setState({
      pictures1: picture
    })

    this.setState({
      pictures: []
    })

    const main = this.state.pictures1;
    // console.log(main);
    for (var i = 0; i < main.length; i++) {
      this.createImage(main[i]);

    }


    // if (!picture.length)
    // return;
    // this.createImage(picture[0]);
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
      errors["name"] = "Name cannot be blank.";
    }

    if (!fields.discount) {
      formIsValid = false;
      errors["discount"] = "Discount cannot be blank.";
    }

    if (!fields.min_price) {
      formIsValid = false;
      errors["min_price"] = "Min Price cannot be blank.";
    }

    //category_id






    this.setState({ errors: errors });
    return formIsValid;
  }

  onChange = date => this.setState({ date })

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


    console.log(this.state.pictures);
    if (this.handleValidation()) {
      const { match: { params } } = this.props;
      //alert(params.userId)
      //console.warn()

      fetch(`${config.Url}api/createcode`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          discount: this.state.discount,
          min_price: this.state.min_price,
          expdate: this.state.date,
        }),
      }).then((response) => response.json())
        .then((res) => {
          //alert(res);
          if (res.status === 'FAILURE') {
            toast.error(res.message);
          } else {
            //	 toast.success(res.message);
            window.location.reload();
            console.log(res);
            //localStorage.setItem('logindata', res.sellerlogin);
            //this.props.history.push('/category');
          }
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          alert('Oops, something went wrong. Please try again!');
        });

    }
  }

  handleDelete = deletedRows => {
    console.log(deletedRows);
    const { data, tableColumns } = this.props;
    const deletedIndexes = Object.keys(deletedRows.lookup);
    //alert([0])
    const data123 = this.state.data;
    deletedIndexes.map(function (name, index) {
      fetch(`${config.Url}api/catdelete113/` + data123[name][1]).then((response) => response.json())
        .then((res) => {
          if (res.status === 'FAILURE') {
            toast.error(res.message);
          } else {
          }
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });

    })

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
              <div class="head-main"><h6>Create Cupon</h6></div>
              <div class="main-grid form-grd">

                <div class="fullfrm">
                  <div class="grpset">
                    <label class="mandtry">Code</label>
                    <input name="name" class="uk-input" id="form-horizontal-text" type="text" placeholder="Enter Code" value={this.state.value} onChange={this.handleChange} />

                  </div>
                  <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                  <div class="grpset">
                    <label class="mandtry">Discount</label>
                    <input name="discount" class="uk-input" id="form-horizontal-text" type="text" placeholder="Enter Discount" value={this.state.value} onChange={this.handleChange} />

                  </div>
                  <span style={{ color: "red" }}>{this.state.errors["discount"]}</span>
                  <div class="grpset">
                    <label class="mandtry">Minimum Price</label>
                    <input name="min_price" class="uk-input" id="form-horizontal-text" type="text" placeholder="Enter Min Price" value={this.state.value} onChange={this.handleChange} />

                  </div>
                  <span style={{ color: "red" }}>{this.state.errors["min_price"]}</span>
                  <div class="grpset">
                    <label class="mandtry">Expiry Date</label>

                    <DateTimePicker
                      format="y-MM-d h:m:sa"
                      onChange={this.onChange}
                      value={this.state.date}
                    />
                  </div>
                </div>
              </div>

              <div class="updatebtns">
                <div class="twoways">
                  <button type="submit" class="uk-button uk-button-default">Publish Now</button>
                </div>

              </div>

            </div>

          </form>
          <div class="productsgrid">
            <MUIDataTable
              title={"Cupon List"}
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


export default Cuponlist;