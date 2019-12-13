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
import { faBoxOpen, faUserCog, faShoppingBasket, faPowerOff, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

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


    fetch("http://mobuloustech.com/yodapi/api/orderlisting/" + JSON.parse(localStorage.getItem('logindata')).id).then((response) => response.json())
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
      fetch("http://mobuloustech.com/yodapi/api/deleteorder/" + data123[name][1]).then((response) => response.json())
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
      {
        name: "DETAILS",
        options: {
          filter: false,
          customBodyRender: (value, status, updateValue) => {

            return (
              <div className="prodts-tbs">
                <div className="drs">
                  <img alt="" src={value[0]} />
                </div>
                <div className="drs">
                  <span className="prne">{value[2]}</span>
                  <p>Seller SKU: {value[1]}</p>
                  <p>Product ID: {value[3]}</p>
                </div>
              </div>
            );

          }
        }
      },
      "ORDER ID",
      "BUYER",
      "LOCATION",
      "ORDER DATE",
      "DISPATCH BY",
      "PAYMENT TYPE",
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
      ,
      {
        name: "ACTION",
        options: {
          filter: true,
          customBodyRender: (value, status, updateValue) => {

            return (
              <div>

                <Link to={{ "pathname": "/ordersdetails/" + value, "id": value }} className="roundico"><FontAwesomeIcon icon={faEye} /></Link>

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

    return <div className="dash-layout">
      <Header />

      <div className="bodylayouts-yod">
        <div>
          <div
            style={{
              marginLeft: expanded ? 240 : 64,
              padding: '15px 20px 0 20px'
            }}
          >

          </div>
          <SideNav onSelect={this.onSelect} onToggle={this.onToggle} >
            <SideNav.Toggle />
            <SideNav.Nav selected={selected}>
              <NavItem eventKey="home">
                <NavIcon>
                  <NavLink to="/dashboard"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faTachometerAlt} /></NavLink>
                </NavIcon>
                <NavText>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </NavText>
              </NavItem>
              <NavItem eventKey="orders">
                <NavIcon>
                  <NavLink to="/orders" activeClassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faShoppingBasket} /></NavLink>
                </NavIcon>
                <NavText>
                  <NavLink to="/orders" activeClassName="active"> Orders</NavLink>
                </NavText>
              </NavItem>
              <NavItem eventKey="product">
                <NavIcon>
                  <NavLink to="/product" ><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faBoxOpen} /></NavLink>
                </NavIcon>
                <NavText>
                  <NavLink to="/product" >My Products</NavLink>
                </NavText>
              </NavItem>
              <NavItem eventKey="setting">
                <NavIcon>
                  <NavLink to="/setting" ><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faUserCog} /></NavLink>
                </NavIcon>
                <NavText>
                  <NavLink to="/setting" > Account</NavLink>
                </NavText>
              </NavItem>
              <NavItem eventKey="addsize">
                <NavIcon>
                  <NavLink to="/addsize" ><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faUserCog} /></NavLink>
                </NavIcon>
                <NavText>
                  <NavLink to="/addsize" > Add Size</NavLink>
                </NavText>
              </NavItem>
              <NavItem eventKey="addcolor">
                <NavIcon>
                  <NavLink to="/addcolor" ><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faUserCog} /></NavLink>
                </NavIcon>
                <NavText>
                  <NavLink to="/addcolor" > Add Color</NavLink>
                </NavText>
              </NavItem>
              <NavItem eventKey="logout">
                <NavIcon>
                  <NavLink onClick={this.showAlert}><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faPowerOff} /></NavLink>
                </NavIcon>
                <NavText>
                  <NavLink onClick={this.showAlert}>Logout</NavLink>
                </NavText>
              </NavItem>

            </SideNav.Nav>
          </SideNav>
          <Main expanded={expanded}>
            <div >
              <p><ToastContainer /></p>
              <div className="productexp">
                {/* <div class="prdelements">
			<Link to="/addproduct" class="dashbtns"> Add Product</Link>
		</div> */}
              </div>

              <div className="yodadm-tablesthm uk-overflow-auto">
                <MUIDataTable
                  title={"Order List"}
                  data={this.state.data}
                  columns={columns}
                  options={options}
                />
              </div>
            </div>
          </Main>
        </div>
      </div>
    </div>
  }
}


export default Orders;