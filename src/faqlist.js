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
  "Question",
  "Answer",
];



class Faqlist extends Component {

  constructor(props) {
    super(props);

    if (localStorage.getItem('logindata') === null) {
      window.location.assign("./");
    }

    this.state = { data: [] };


    fetch(`${config.Url}api/faqlist`).then((response) => response.json())
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
        //alert(res);
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          toast.success(res.message);

          //console.log(res);
          //localStorage.setItem('logindata', res.sellerlogin);
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
      fetch(`${config.Url}api/deletefaq/` + data123[name][2]).then((response) => response.json())
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
      onRowsDelete: this.handleDelete,
    };

    return <div class="dash-layout">
      <Header />

      <div class="bodylayouts-yod">

        <div >
          <p><ToastContainer /></p>
          <div class="productexp">
            <div class="prdelements">
              <Link to="/addfaq" class="dashbtns">Create FAQ</Link>
            </div>

          </div>

          <div class="yodadm-tablesthm uk-overflow-auto">
            <MUIDataTable
              title={"Faq List"}
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


export default Faqlist;