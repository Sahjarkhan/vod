import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import Header from "./header";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { ToastContainer, toast } from 'react-toastify';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CSVReader from "react-csv-reader";
import Loader from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faTachometerAlt, faUserCog, faShoppingBasket, faPowerOff, faRupeeSign } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const Main = styled.main`
    position: relative;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;  
    margin-left: ${props => (props.expanded ? 240 : 64)}px;
`;

const columns = ["SKU",
  "PRODUCT",
  "CATEGORY",
  "BRAND",
  {
    name: "PRICE",
    options: {
      filter: false, customBodyRender: (value, status, updateValue) => {

        return (
          <div className="prodts-tbs">
            <div >

              <FontAwesomeIcon icon={faRupeeSign} /> {value}
              <img style={{ width: 20, marginLeft: 10 }} className="logoheader" alt="ok" src={require('./img/calculate.png')} />
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

              fetch("http://mobuloustech.com/yodapi/api/productstatuschange/" + value[1]).then((response) => response.json())
                .then((res) => {
                  //alert(res);
                  if (res.status === 'FAILURE') {
                    toast.error(res.message);
                  } else {
                    toast.success(res.message);
                    updateValue(res.response);
                    //localStorage.setItem('logindata', res.sellerlogin);
                    //this.props.history.push('/');
                  }
                  // console.log(res);
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
  }
  ,
  {
    name: "ACTION",
    options: {
      filter: true,
      customBodyRender: (value, status, updateValue) => {
        return (
          <div>
            <Link to={{ "pathname": "/editproduct/" + value, "id": value }} className="roundico">Edit</Link>
          </div>
        );

      }
    }
  }];



class Product extends Component {

  constructor(props) {
    super(props);

    if (localStorage.getItem('logindata') === null) {
      window.location.assign("./");
    }

    this.state = { data: [] };


    fetch("http://mobuloustech.com/yodapi/api/productlistforseller/" + JSON.parse(localStorage.getItem('logindata')).id).then((response) => response.json())
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

  handleForce = data => {
    console.log(data.length);
    fetch("https://mobuloustech.com/yodapi/api/csv_uploade_for_product/" + JSON.parse(localStorage.getItem('logindata')).id, {
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
    // const { data, tableColumns } = this.props;
    const deletedIndexes = Object.keys(deletedRows.lookup);

    const data123 = this.state.data;

    deletedIndexes.map(function (name, index) {
      //.log(data123);
      fetch("http://mobuloustech.com/yodapi/api/productdelete/" + data123[name][6][1]).then((response) => response.json())
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

    return <div className="dash-layout">
      <Header />

      <div className="bodylayouts-yod">
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
                <NavLink to="/orders" ><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faShoppingBasket} /></NavLink>
              </NavIcon>
              <NavText>
                <NavLink to="/orders" > Orders</NavLink>
              </NavText>
            </NavItem>
            <NavItem eventKey="product">
              <NavIcon>
                <NavLink to="/product" activeclassName="active"><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faBoxOpen} /></NavLink>
              </NavIcon>
              <NavText>
                <NavLink to="/product" activeClassName="active">My Products</NavLink>
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


              <div className="prdelements">
                <CSVReader
                  cssClass="dashbtns"
                  label="Upload Excel : "
                  onFileLoaded={this.handleForce}
                />
                {/* <ReactFileReader fileTypes={'.csv'} handleFiles={this.handleFiles}><button class="dashbtns"><img src="img/uploadexcl.png"/> Upload Excel</button></ReactFileReader> */}
              </div>

              <div className="prdelements">
                <Link to="/addproduct" className="dashbtns"> Add Product</Link>
              </div>

            </div>

            <div className="yodadm-tablesthm uk-overflow-auto">
              <MUIDataTable
                title={"Product List"}
                data={this.state.data}
                columns={columns}
                options={options}
              />
            </div>
          </div>
        </Main>
      </div>
    </div>
  }
}


export default Product;