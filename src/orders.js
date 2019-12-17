import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import Header from "./header";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import config from './config/config';


const Main = styled.main`
    position: relative;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    margin-left: ${props => (props.expanded ? 240 : 64)}px;
`;

class Orders extends Component {

  constructor(props) {
    super(props);

    if (localStorage.getItem('logindata') === null) {
      window.location.assign("./");
    }

    this.state = { data: [] };




  }

  componentDidMount() {
    fetch(`${config.Url}api/orderlisting/admin`).then((response) => response.json())
      .then((res) => {
        //alert(res);
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          console.log(res.message);
          //toast.success(res.message);

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
  state = {
    selected: 'home',
    expanded: false
  };

  onSelect = (selected) => {
    this.setState({ selected: selected });
  };
  onToggle = (expanded) => {
    this.setState({ expanded: expanded });
  };


  navigate = (pathname) => () => {
    this.setState({ selected: pathname });
  };

  showAlert() {
    localStorage.setItem('logindata', null);
    window.location.assign("./")
  }

  showAlert1(e) {
    alert("Order status change successfully.");
  }



  handleDelete = deletedRows => {
    // const { data, tableColumns } = this.props;
    const deletedIndexes = Object.keys(deletedRows.lookup);
    //alert([0])
    const data123 = this.state.data;
    console.log(data123);
    deletedIndexes.map(function (name, index) {
      fetch(`${config.Url}api/deleteorder/` + data123[name][1]).then((response) => response.json())
        .then((res) => {
          //alert(res);
          if (res.status === 'FAILURE') {
            toast.error(res.message);
          } else {
            toast.success(res.message);
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
      return 1;
    })

    // const rows = transformToArray(data, tableColumns);
    // deletedIndexes.map(index =>
    //     limitPromisecConcurrency(() => this.remoteDelete(rows[index]))
    // );
  }



  render() {
    console.log(this.state.data)
    const { expanded, selected } = this.state;
    const columns = [
      // {
      //   name: "DETAILS",
      //   options: {
      //     filter: false,
      //     customBodyRender: (value, status, updateValue) => {

      //       return (
      //         <div class="prodts-tbs">
      //           <div class="drs">
      //             <img alt="" src={value[0]} />
      //           </div>
      //           <div class="drs">
      //             <span class="prne">{value[2]}</span>
      //             <p>Seller SKU: {value[1]}</p>
      //             <p>Product ID: {value[3]}</p>
      //           </div>
      //         </div>
      //       );

      //     }
      //   }
      // },
      "ORDER ID",
      "BUYER",
      "LOCATION",
      "PAYMENT TYPE",
      "NUMBER OF QUANTITY",
       "DISPATCH BY",
      "ORDER DATE",
      {
        name: "ACTION",
        options: {
          filter: true,
          customBodyRender: (value, status, updateValue) => {

            return (
              <div>
                <Link to={{ "pathname": "/ordersdetails/" + value, "id": value }} class="roundico"><FontAwesomeIcon icon={faEye} /></Link>
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
            'Sorry, no orders yet.',
        },
      },
    };

    return <div class="dash-layout">
      <Header />

      <div class="bodylayouts-yod">
        <div>
          <div
            style={{
              marginLeft: expanded ? 240 : 64,
              padding: '15px 20px 0 20px'
            }}
          >

          </div>


          <div >
            <p><ToastContainer /></p>

            <div class="productexp">


              {/* <div class="prdelements">
			<Link to="/addproduct" class="dashbtns"> Add Product</Link>
		</div> */}

            </div>

            <div class="yodadm-tablesthm uk-overflow-auto">
              <MUIDataTable
                title={"Order List"}
                data={this.state.data}
                columns={columns}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}


export default Orders;