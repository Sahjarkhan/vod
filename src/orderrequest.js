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
import { NavLink } from 'react-router-dom';
import { faBoxOpen, faUserCog, faShoppingBasket, faPowerOff, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
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


    fetch(`${config.Url}api/allrequestlist`).then((response) => response.json())
      .then((res) => {
        //alert(res);
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
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
  }; orders

  showAlert() {
    localStorage.setItem('logindata', null);
    window.location.assign("./")
  }

  showAlert1(e) {
    fetch(`${config.Url}api/allrequestlist1`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: e[0],
        id: e[1],
      }),
    }).then((response) => response.json())
      .then((res) => {
        //alert(res);
        if (res.status === 'FAILURE') {
          //toast.error(res.message);
        } else {
          window.location.reload();
        }
        //console.log(res);
      })
      .catch((error) => {
        console.log(error);
       
      });
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
      return 1;
    })

    // const rows = transformToArray(data, tableColumns);
    // deletedIndexes.map(index =>
    //     limitPromisecConcurrency(() => this.remoteDelete(rows[index]))
    // );
  }



  render() {
    const { expanded, selected } = this.state;
    const columns = [
      "ORDER ID",
      "BUYER",
      "ORDER DATE",
      "REASON",
      "DESCRIPTION",
      "REFUND MODE",
      "AMOUNT",
      {
        name: "STATUS",
        options: {
          filter: false,
          customBodyRender: (value, status, updateValue) => {

            return (

              <div><a onClick={() => { this.showAlert1(value) }}>{value[0]}</a></div>

            );

          }
        }
      }
    ];
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
                title={"Order Request List"}
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