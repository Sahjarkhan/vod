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
import config from './config/config';

const columns = [
  "Title",
  "Description",
  {
    name: "Brand Image",
    options: {
      filter: false,
      customBodyRender: (value, status, updateValue) => {
        return (
          <div class="prodts-tbs">
            <div class="drs">
              <img src={`${config.UrlImage}` + value} />
            </div>
          </div>
        );
      }
    }
  },
  {
    name: "Approval",
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

              fetch(`${config.Url}api/brandapprovalstatuschange/` + value[1]).then((response) => response.json())
                .then((res) => {
                  //alert(res);
                  if (res.status === 'FAILURE') {
                    toast.error(res.message);
                  } else {
                    //toast.success(res.message);
                    updateValue(res.response);
                    //localStorage.setItem('logindata', res.sellerlogin);
                    //this.props.history.push('/');
                  }
                })
                .catch((error) => {
                  console.log(error);
                  alert('Oops, something went wrong. Please try again!');
                });
              console.log(value);
            }}
          />
        );

      }
    }
  },
  {
    name: "Infocus",
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

              fetch(`${config.Url}api/brandfocusstatuschange/` + value[1]).then((response) => response.json())
                .then((res) => {
                  if (res.status === 'FAILURE') {
                    toast.error(res.message);
                  } else {
                    updateValue(res.response);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
              console.log(value);
            }}
          />
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
            <Link to={{ "pathname": "/editbrand/" + value, "id": value }} class="roundico">Edit</Link>
          </div>
        );
      }
    }
  }
];



class Brandlist extends Component {

  constructor(props) {
    super(props);

    if (localStorage.getItem('logindata') === null) {
      window.location.assign("./");
    }

    this.state = { data: [] };

    fetch(`${config.Url}api/brandlistforadmin`).then((response) => response.json())
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
      });

  }

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
    //alert([0])
    const data123 = this.state.data;
    deletedIndexes.map(function (name, index) {
      fetch(`${config.Url}api/catdeletebrand/` + data123[name][5]).then((response) => response.json())
        .then((res) => {
          if (res.status === 'FAILURE') {
            toast.error(res.message);
          } else {
            toast.success("Brand deleted successfully");
          }
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          alert('Oops, something went wrong. Please try again!');
        });

    })
  }



  render() {
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      search: true,
      onRowsDelete: this.handleDelete,
    };

    return <div class="dash-layout">
      <Header />

      <div class="bodylayouts-yod">

        <div >
          <p><ToastContainer /></p>
          <div class="productexp">

            <div class="prdelements">
              <Link to="/addbrand" class="dashbtns"> Add New Brand</Link>
            </div>
          </div>

          <div class="yodadm-tablesthm uk-overflow-auto">
            <MUIDataTable
              title={"Brand List"}
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


export default Brandlist;