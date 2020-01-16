// import React, { Component } from "react";
// import './uikit.css';
// import './yodadmincss.css';
// import './uikit-rtl.css';
// import Sidebar from "./sidebar";
// import Header from "./header";
// import { Link } from "react-router-dom";
// import MUIDataTable from "mui-datatables";
// import { ToastContainer, toast } from 'react-toastify';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
// import CSVReader from "react-csv-reader";
// import config from './config/config';
// import Commission from './commission'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBoxOpen, faTachometerAlt, faUserCog, faShoppingBasket, faPowerOff, faRupeeSign } from '@fortawesome/free-solid-svg-icons'
// import Modal from "react-responsive-modal";
// import Testing from '../src/commission/testing';

// class Sellerlist extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       open: false,
//       modelValue: [],errors: {},commission:""
//     }

//     this.handleChange2 = this.handleChange2.bind(this)
//     this.onOpenModal = this.onOpenModal.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//     if (localStorage.getItem('logindata') === null) {
//       window.location.assign("./");
//     }
//     this.state = { data: [] };

//     fetch(`${config.Url}api/sellerlistforadmin`).then((response) => response.json())
//       .then((res) => {
//         if (res.status === 'FAILURE') {
//           toast.error(res.message);
//         } else {
//           this.setState({ data: res.response });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   handleValidation() {
// 		let fields = this.state;
// 		let errors = {};
// 		let formIsValid = true;
//     if (!fields.commission) {
// 			formIsValid = false;
// 			errors["commission"] = "Please enter commission.";
// 		}

		
// 		this.setState({ errors: errors });
// 		return formIsValid;
// 	}
//   handleSubmit = (event) => {
//     event.preventDefault();
//     if (this.handleValidation()) {
//     var amount = this.state.commission;
//     fetch(`${config.Url}api/updatecommission`, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         id: this.state.modelValue[0],
//         commission: amount,
//       }),
//     }).then((response) => response.json())
//       .then((res) => {
//         if (res.status === 'FAILURE') {
//           toast.error(res.message);
//         } else {
//           if (toast.success(res.message)) {
//             window.location.reload();

//             this.props.history.push('/sellerlist');
//           }
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     }
//   }

//   onOpenModal = (value) => {
//     console.log("value",value[1]);
//     this.setState({modelValue: value ,
//     commission:value[1]},() => console.log(this.state.modelValue) );
//     this.setState({ open: true });
//   };
//   handleChange2(event) {
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;
//     this.setState({
//       [name]: value
//     });
//     if (name === 'commission') {
// 			const re = /^[0-9]{0,10}$/i;
// 			if (value === '' || re.test(value)) {
// 				this.setState({ commission: value })
// 			} else {
// 				this.setState({
// 					commission: '',
// 				});
// 			}
// 		}
//   }

//   onCloseModal = () => {
//     this.setState({ open: false });
//   };

//   handleForce = data => {
//     console.log(data.length);
//     fetch(`${config.Url}api/csv_uploade_for_product/` + JSON.parse(localStorage.getItem('logindata')).id, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         data: data,
//       }),
//     }).then((response) => response.json())
//       .then((res) => {
//         //alert(res);
//         if (res.status === 'FAILURE') {
//           toast.error(res.message);
//         } else {
//           toast.success(res.message);
//           this.props.history.push('/product');
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         alert('Oops, something went wrong. Please try again!');
//       });
//   };

//   handleDelete = deletedRows => {
//     const { data, tableColumns } = this.props;
//     const deletedIndexes = Object.keys(deletedRows.lookup);
//     const data123 = this.state.data;
//     if (window.confirm("Delete the item?")) {
//       deletedIndexes.map(function (name, index) {
//         fetch(`${config.Url}api/sellerdelete/` + data123[name][5]).then((response) => response.json())
//           .then((res) => {
//             if (res.status === 'FAILURE') {
//               toast.error(res.message);
//             } else {
//               toast.success(res.message);
//             }
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       })
//     }
//   }

//   render() {
//     const options = {
//       filterType: "dropdown",
//       responsive: "scroll",
//       search: true,
//       onRowsDelete: this.handleDelete,
//     };
//     const columns = [
//       {
//         name: "Image",
//         options: {
//           filter: false,
//           customBodyRender: (value, status, updateValue) => {
//             return (
//               <div class="prodts-tbs">
//                 <div class="drs">
//                   <img alt="ok" src={value} />
//                 </div>
//               </div>
//             );
//           }
//         }
//       },
//       "Name",
//       "Email",
//       "Phone",
//       {
//         name: "STATUS",
//         options: {
//           filter: false,
//           customBodyRender: (value, status, updateValue) => {
//             return (
//               <FormControlLabel
//                 label={value[0] ? "Active" : "Inactive"}
//                 value={value[0] ? "1" : ""}
//                 control={
//                   <Switch color="primary" checked={value[0]} value={value[0] ? "1" : ""} />
//                 }

//                 onChange={event => {
//                   fetch(`${config.Url}api/productstatuschange11/` + value[1]).then((response) => response.json())
//                     .then((res) => {
//                       if (res.status === 'FAILURE') {
//                         toast.error(res.message);
//                       } else {
//                         updateValue(res.response);
//                       }
//                     })
//                     .catch((error) => {
//                       console.log(error);
//                       alert('Oops, something went wrong. Please try again!');
//                     });
//                   console.log(value);
//                 }}
//               />
//             );

//           }
//         }
//       },
//       {
//         name: "Commission",
//         options: {
//           filter: false,
//           customBodyRender: (value, status, updateValue) => {
//             return (
//               <div class="prodts-tbs">
//                 <div class="drs">
//                 <FontAwesomeIcon icon={faRupeeSign} />{value}
//                 </div>
//               </div>
//             );
//           }
//         }
//       },
//       {
//         name: "Add Commission",
//         options: {
//           filter: false, customBodyRender: (value, status, updateValue) => {
//             return (
//               <div className="prodts-tbs">
//                 <div >
//                   <img onClick={() => this.onOpenModal(value)} style={{ width: 20, marginLeft: 10 }} className="logoheader" alt="ok" src={require('./img/calculate.png')} />
//                 </div>
//                 {
//                   this.state.open === true ? <Modal open={this.state.open} onClose={this.onCloseModal}>
//                     <div className="modal-body">
//                       <form onSubmit={this.handleSubmit}>
//                         <div class="productsgrid">
//                           <div class="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
//                             <img alt="" src="https://www.justori.com/justori/assets/images/11.gif" />
//                           </div>
//                           <div class="head-main"><h6>Add Commission</h6></div>
//                           <div class="main-grid form-grd">
//                             <div class="fullfrm">
//                               <div>
//                                 <div class="twoways">
//                                   <div class="grpset">
//                                     <label class="mandtry"> Add Commission</label>
//                                     <div class="Inputs">
//                                       <input pattern="[0-9]{0,10}" maxLength="10" name="commission" class="uk-input" id="form-horizontal-text" type="text" placeholder="Commission" value={this.state.commission} onChange={this.handleChange2} />
//                                     </div>
//                                     <span style={{ color: "red" }}></span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div class="main-grid form-grd">
//                           <div class="halffrms updatebtns">
//                             <div class="twoways">
//                               <button type="submit" class="uk-button uk-button-default">Submit</button>
//                             </div>
//                           </div>
//                         </div>
//                       </form>
//                     </div>
//                   </Modal> : ""
//                 }
//               </div>
//             );
//           }
//         }
//       },
//     ];
//     return <div class="dash-layout">
//       <Header />
//       <div class="bodylayouts-yod">
//         <div >
//           <p><ToastContainer /></p>
//           <div class="productexp">
//           </div>
//           <div class="yodadm-tablesthm uk-overflow-auto">
//             <MUIDataTable
//               title={"Seller List"}
//               data={this.state.data}
//               columns={columns}
//               options={options}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   }
// }


// export default Sellerlist;









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
import Commission from './commission'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faTachometerAlt, faUserCog, faShoppingBasket, faPowerOff, faRupeeSign } from '@fortawesome/free-solid-svg-icons'
import Modal from "react-responsive-modal";
import Testing from '../src/commission/testing';

class Sellerlist extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      modelValue: [],errors: {},commission:""
    }

    this.handleChange2 = this.handleChange2.bind(this)
    this.onOpenModal = this.onOpenModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    if (localStorage.getItem('logindata') === null) {
      window.location.assign("./");
    }
    this.state = { data: [] };

    fetch(`${config.Url}api/sellerlistforadmin`).then((response) => response.json())
      .then((res) => {
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          this.setState({ data: res.response });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleValidation() {
		let fields = this.state;
		let errors = {};
		let formIsValid = true;
    if (!fields.commission) {
			formIsValid = false;
			errors["commission"] = "Please enter commission.";
		}

		
		this.setState({ errors: errors });
		return formIsValid;
	}
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.handleValidation()) {
    var amount = this.state.commission;
    fetch(`${config.Url}api/updatecommission`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.modelValue[0],
        commission: amount,
      }),
    }).then((response) => response.json())
      .then((res) => {
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          if (toast.success(res.message)) {
            window.location.reload();

            this.props.history.push('/sellerlist');
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  onOpenModal = (value) => {
    console.log("value",value[1]);
    this.setState({modelValue: value ,
    commission:value[1]},() => console.log(this.state.modelValue) );
    this.setState({ open: true });
  };
  handleChange2(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    if (name === 'commission') {
			const re = /^[0-9]{0,10}$/i;
			if (value === '' || re.test(value)) {
				this.setState({ commission: value })
			} else {
				this.setState({
					commission: '',
				});
			}
		}
  }

  onCloseModal = () => {
    this.setState({ open: false });
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
        //alert(res);
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          toast.success(res.message);
          this.props.history.push('/product');
        }
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
    if (window.confirm("Delete the item?")) {
      deletedIndexes.map(function (name, index) {
        fetch(`${config.Url}api/sellerdelete/` + data123[name][5]).then((response) => response.json())
          .then((res) => {
            if (res.status === 'FAILURE') {
              toast.error(res.message);
            } else {
              toast.success(res.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
    }
  }

  render() {
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      search: true,
      onRowsDelete: this.handleDelete,
    };
    const columns = [
      {
        name: "Image",
        options: {
          filter: false,
          customBodyRender: (value, status, updateValue) => {
            return (
              <div class="prodts-tbs">
                <div class="drs">
                  <img alt="ok" src={value} />
                </div>
              </div>
            );
          }
        }
      },
      "Name",
      "Email",
      "Phone",
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
                  fetch(`${config.Url}api/productstatuschange11/` + value[1]).then((response) => response.json())
                    .then((res) => {
                      if (res.status === 'FAILURE') {
                        toast.error(res.message);
                      } else {
                        updateValue(res.response);
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
        name: "Commission",
        options: {
          filter: false,
          customBodyRender: (value, status, updateValue) => {
            return (
              <div class="prodts-tbs">
                <div class="drs">
                {value}
                </div>
              </div>
            );
          }
        }
      },
      // {
      //   name: "Add Commission",
      //   options: {
      //     filter: false, customBodyRender: (value, status, updateValue) => {
      //       return (
      //         <div className="prodts-tbs">
      //           <div >
      //             <img onClick={() => this.onOpenModal(value)} style={{ width: 20, marginLeft: 10 }} className="logoheader" alt="ok" src={require('./img/calculate.png')} />
      //           </div>
      //           {
      //             this.state.open === true ? <Modal open={this.state.open} onClose={this.onCloseModal}>
      //               <div className="modal-body">
      //                 <form onSubmit={this.handleSubmit}>
      //                   <div class="productsgrid">
      //                     <div class="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
      //                       <img alt="" src="https://www.justori.com/justori/assets/images/11.gif" />
      //                     </div>
      //                     <div class="head-main"><h6>Add Commission</h6></div>
      //                     <div class="main-grid form-grd">
      //                       <div class="fullfrm">
      //                         <div>
      //                           <div class="twoways">
      //                             <div class="grpset">
      //                               <label class="mandtry"> Add Commission</label>
      //                               <div class="Inputs">
      //                                 <input pattern="[0-9]{0,10}" maxLength="10" name="commission" class="uk-input" id="form-horizontal-text" type="text" placeholder="Commission" value={this.state.commission} onChange={this.handleChange2} />
      //                               </div>
      //                               <span style={{ color: "red" }}></span>
      //                             </div>
      //                           </div>
      //                         </div>
      //                       </div>
      //                     </div>
      //                   </div>
      //                   <div class="main-grid form-grd">
      //                     <div class="halffrms updatebtns">
      //                       <div class="twoways">
      //                         <button type="submit" class="uk-button uk-button-default">Submit</button>
      //                       </div>
      //                     </div>
      //                   </div>
      //                 </form>
      //               </div>
      //             </Modal> : ""
      //           }
      //         </div>
      //       );
      //     }
      //   }
      // },
      {
        name: "Add Commission",
        options: {
          filter: false, customBodyRender: (value, status, updateValue) => {
            return (
              <div  className="prodts-tbs">
                <Testing greeting={value}/>
              </div>
            );
          }
        }
      },
    ];
    return <div class="dash-layout">
      <Header />
      <div class="bodylayouts-yod">
        <div >
          <p><ToastContainer /></p>
          <div class="productexp">
          </div>
          <div class="yodadm-tablesthm uk-overflow-auto">
            <MUIDataTable
              title={"Seller List"}
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


export default Sellerlist;
