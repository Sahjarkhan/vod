import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import Sidebar from "./sidebar";
import Header from "./header";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { ToastContainer, toast } from 'react-toastify';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CSVReader from "react-csv-reader";
import Loader from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog, faShoppingBasket, faPowerOff, faPenSquare, faPhoneSquareAlt, faRupeeSign, faPen, faPenAlt } from '@fortawesome/free-solid-svg-icons'
import config from './config/config';
import Modal from "react-responsive-modal";
import Selling from './sellingListModel';
import StockAdd from '../src/stockAdd/testing';
import Testing from '../src/productCommission/testing'

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modelValue: []
    }

    if (localStorage.getItem('logindata') === null) {
      window.location.assign("./");
    }
    this.state = { data: [] };
    this.handleChange2 = this.handleChange2.bind(this)
    this.onOpenModal = this.onOpenModal.bind(this);

    fetch(`${config.Url}api/productlistforadmin/` + JSON.parse(localStorage.getItem('logindata')).id).then((response) => response.json())
      .then((res) => {
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          this.setState({ data: res.response });
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        alert('Oops, something went wrong. Please try again!');
      });

  }
  handleChange2(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  onCloseModal = () => {
    this.setState({ open: false });
  };


  onOpenModal = (value) => {
    console.log(value[3])
    this.setState({
      modelValue: value, stock: value[3]
    }, () => console.log(this.state.modelValue));
    this.setState({ open: true });
  };



  handleForce = data => {
    console.log(data.length);
    fetch(`${config.Url}api/csv_uploade_for_product/` + JSON.parse(localStorage.getItem('logindata')).id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then((response) => response.json())
      .then((res) => {
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          toast.success(res.message);

          this.props.history.push('/product');
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        alert('Oops, something went wrong. Please try again!');
      });
  };

  handleDelete = deletedRows => {
    const { data, tableColumns } = this.props;
    const deletedIndexes = Object.keys(deletedRows.lookup);
    const data123 = this.state.data;
    deletedIndexes.map(function (name, index) {
      fetch(`${config.Url}api/productdelete/` + data123[name][6][1]).then((response) => response.json())
        .then((res) => {
          if (res.status === 'FAILURE') {
            toast.error(res.message);
          } else {
            toast.success(res.message);
          }
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          alert('Oops, something went wrong. Please try again!');
        });

    })

  }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.stock)
    var id = this.state.modelValue[0];
    console.log(id);
    fetch(`${config.Url}api/updatestock`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.modelValue[0],
        stock: this.state.stock,
      }),
    }).then((response) => response.json())
      .then((res) => {
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          if (toast.success(res.message)) {
            window.location.reload();
            this.props.history.push('/product');
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }



  render() {
    const columns = [
      "SKU",
      "PRODUCT",
      "Category",
      "Brand",
      {
        name: "PRICE",
        options: {
          filter: false,
          customBodyRender: (value, status, updateValue) => {
            return (
              <div class="prodts-tbs">
                <div >
                  <FontAwesomeIcon icon={faRupeeSign} /> {value}
                </div>
              </div>
            );
          }
        }
      },
      {
        name: "Mrp PRICE",
        options: {
          filter: false,
          customBodyRender: (value, status, updateValue) => {
            return (
              <div class="prodts-tbs">
                <div >
                  <FontAwesomeIcon icon={faRupeeSign} /> {value}
                </div>
              </div>
            );
          }
        }
      },

      "STOCK",
      {
        name: "STATUS",
        options: {
          filter: false,
          customBodyRender: (value, status, updateValue) => {
            return (
              <FormControlLabel
                label={value[0] ? "Active" : "Inactive"}
                value={value[0] ? "1" : ""}
                control={
                  <Switch color="primary" checked={value[0]} value={value[0] ? "1" : ""} />
                }
                onChange={event => {
                  fetch(`${config.Url}api/productstatuschange/` + value[1]).then((response) => response.json())
                    .then((res) => {
                      if (res.status === 'FAILURE') {
                        toast.error(res.message);
                      } else {
                        toast.success(res.message);
                        updateValue(res.response);
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              />
            );
          }
        }
      },
      {
        name: "Add STOCK",
        options: {
          filter: false, customBodyRender: (value, status, updateValue) => {
            return (
              <div className="prodts-tbs">
                <StockAdd greeting={value} />
              </div>
            );
          }
        }
      },
      {
        name: "Add Commission",
        options: {
          filter: false, customBodyRender: (value, status, updateValue) => {
            return (
              <div className="prodts-tbs">
                <Testing greeting={value} />
              </div>
            );
          }
        }
      },
      {
        name: "ACTION",
        options: {
          filter: true,
          customBodyRender: (value, status, updateValue) => {
            return (
              <div>
                <Link to={{ "pathname": "/editproduct/" + value, "id": value }} class="roundico">Edit</Link>
              </div>
            );
          }
        }
      }];
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      search: true,
      onRowsDelete: this.handleDelete,
      textLabels: {
        body: {
          noMatch: this.props.isLoading ?
            <Loader
              type="Puff"
              color="#00BFFF"
              height="100"
              width="100"
            /> :
            'Sorry, no products yet.',
        },
      }
    };

    return <div class="dash-layout">
      <Header />
      <div class="bodylayouts-yod">
        <div >
          <p><ToastContainer /></p>
          <div class="productexp">
            <div class="prdelements">
              <CSVReader
                cssClass="dashbtns"
                label="Upload Excel : "
                onFileLoaded={this.handleForce}
              />
            </div>
            <div class="prdelements">
              <Link to="/addproduct" class="dashbtns"> Add Product</Link>
            </div>

          </div>
          <div class="yodadm-tablesthm uk-overflow-auto">
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


export default Product;