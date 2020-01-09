// import React, { Component } from "react";
// import './uikit.css';
// import './yodadmincss.css';
// import './uikit-rtl.css';
// import './all.css';
// import './fontawesome.css';
// import './bootstrap.css';
// import Sidebar from "./sidebar";
// import Header from "./header";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import ImageUploader from 'react-images-upload';
// import 'react-toastify/dist/ReactToastify.css';
// import config from './config/config';



// class Banneruploade extends Component {
//   notify = () => toast("Wow so easy !");
//   constructor(props) {
//     super(props);
//     if (localStorage.getItem('logindata') === null) {
//       window.location.assign("./");
//     }
//     this.state = {
//       showStore: false,
//       name: '',
//       pictures: '',
//       pictures1: [],
//       errors: {},
//       data: [],
//       data1: [],
//       category: '',
//       subcatlist: [],
//       subsubcatlist: []
//     };


//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange1 = this.handleChange1.bind(this);
//     this.handleChange2 = this.handleChange2.bind(this);
//     this.handleChange3 = this.handleChange3.bind(this);
//     this.onDrop = this.onDrop.bind(this);

//     fetch(`${config.Url}api/catlistforadmin1234`).then((response) => response.json())
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

//     const { match: { params } } = this.props;
//     fetch(`${config.Url}api/bannerdetailsbyid/` + params.userId).then((response) => response.json())
//       .then((res) => {
//         if (res.status === 'FAILURE') {
//           toast.error(res.message);
//         } else {
//           console.log("Testing", res.response);
//           this.setState({
//             pictures: res.response.bannerdetails.image,
//             bannertype: res.response.bannerdetails.type,
//             category: res.response.bannerdetails.category_id,
//             subcategory_id: res.response.bannerdetails.subcategory_id,
//             subsubcategory_id: res.response.bannerdetails.subsubcategory_id,
//             subcatlist: res.response.subcatlist,
//             subsubcatlist: res.response.subsubcatlist,
//             subcat: res.response.bannerdetails.subcategory_id,
//             subsubcat: res.response.bannerdetails.subsubcategory_id,
//             sub: res.response.bannerdetails.subcategory_id,
//             subsub: res.response.bannerdetails.subsubcategory_id
//           });





//           for (let i = 0; i <= this.state.subcatlist.length - 1; i++) {
//             if (this.state.subcatlist[i][0] === this.state.subcategory_id) {
//               this.setState({
//                 sub: `${this.state.subcatlist[i][1]}`
//               })
//             }
//           }

//           for (let i = 0; i <= this.state.subsubcatlist.length - 1; i++) {

//             if (this.state.subsubcatlist[i][1] == this.state.subsubcategory_id) {
//               this.setState({
//                 subsub: `${this.state.subsubcatlist[i][1]}`
//               });
//               console.log("Hello", this.state.subsub)
//             }
//           }
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   handleChange1(event) {
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;
//     this.setState({
//       category: value
//     });

//     fetch(`${config.Url}api/sublistbycat/` + value).then((response) => response.json())
//       .then((res) => {
//         if (res.status === 'FAILURE') {
//           toast.error(res.message);
//         } else {
//           this.setState({ subcatlist: res.sublistbycat });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     this.setState({
//       subsubcatlist: []
//     })
//     this.setState({
//       subcatlist: []
//     })

//   }


//   onDrop(picture) {
//     this.setState({
//       showStore: true,
//     })
//     this.createImage(picture[0]);
//   }

//   createImage(file) {
//     let reader = new FileReader();
//     reader.onload = (e) => {
//       console.log(e.target.result)
//       fetch(`${config.Url}api/fileuploade`, {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           gstnumfile: e.target.result,
//         }),
//       }).then((response) => response.json())
//         .then((res) => {
//           if (res.status === 'FAILURE') {
//           } else {
//             console.log(res.response)
//             this.setState({
//               pictures: res.response,
//               showStore: false,
//             })
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//           alert('Oops, something went wrong. Please try again!');
//         });

//     };
//     reader.readAsDataURL(file);
//   }

//   handleValidation() {
//     let fields = this.state;
//     let errors = {};
//     let formIsValid = true;

//     //Name
//     if (!fields.bannertype) {
//       formIsValid = false;
//       errors["bannertype"] = "Please select banner type.";
//     }
//     this.setState({ errors: errors });
//     return formIsValid;
//   }

//   handleChange(event) {
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;

//     this.setState({
//       [name]: value
//     });
//   }


//   handleChange3(event) {
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;

//     this.setState({
//       subsub: value
//     });
//   }


//   handleSubmit(event) {
//     event.preventDefault();
//     const { match: { params } } = this.props;
//     var test = {
//       type: this.state.bannertype,
//       image: this.state.pictures,
//       idm: params.userId,
//       category_id: this.state.sub,
//       subcategory_id: this.state.subsub,
//       subsubcategory_id: this.state.subsubcategory_id
//     }
//     console.log(test);

//     if (this.handleValidation()) {
//       alert('Banner updated successfully');
//       fetch(`${config.Url}api/createbanner`, {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           type: this.state.bannertype,
//           image: this.state.pictures,
//           idm: params.userId,
//           category_id: this.state.category,
//           subcategory_id: this.state.sub,
//           subsubcategory_id: this.state.subsub

//         }),
//       }).then((response) => response.json())
//         .then((res) => {
//           console.log("res", res);
//           if (res.status === 'FAILURE') {
//             toast.error(res.message);
//           } else {
//             toast.success(res.message);
//             console.log(res);
//             this.props.history.push('/bannerlist');
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   }
//   handleChange2(event) {
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;
//     console.log(value);
//     this.setState({
//       sub: value
//     });
//     fetch(`${config.Url}api/sublistbycatremark/` + value).then((response) => response.json())
//       .then((res) => {
//         if (res.status === 'FAILURE') {
//           toast.error(res.message);
//         } else {
//           console.log(res.sublistbycatremark)
//           this.setState({ subsubcatlist: res.sublistbycatremark });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   render() {
//     return <div className="dash-layout">
//       <Header />
//       <div className="bodylayouts-yod">
//         <div >
//           <form onSubmit={this.handleSubmit}>
//             <div className="productsgrid">
//               <p><ToastContainer /></p>
//               <div className="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
//                 <img src="https://www.justori.com/justori/assets/images/11.gif" />
//               </div>
//               <div className="head-main"><h6>Banner Info</h6></div>
//               <div className="main-grid form-grd">

//                 <div className="fullfrm">
//                   <div className="grpset">
//                     <label className="mandtry">Banner Type</label>
//                     <select className="uk-input" id="form-horizontal-text" name="bannertype" value={this.state.bannertype} onChange={this.handleChange}>
//                       <option value="homeslider">Home Slider</option>
//                       <option value="stylefeed">Style feed</option>
//                       <option value="banner1">Banner 1</option>
//                       <option value="slider1">Slider 1</option>
//                       <option value="banner2">Banner 2</option>
//                       <option value="slider2">Slider 2</option>
//                       <option value="hotdeal">Hotdeal</option>
//                       <option value="handpicked">Handpicked</option>
//                       <option value="WOMEN_inner">Woman Inner Page Banner</option>
//                       <option value="MEN_inner">Man Inner Page Banner</option>
//                       <option value="KIDS_inner">Kids Inner Page Banner</option>
//                       <option value="SPORTS_inner">Sports Inner Page Banner</option>
//                       <option value="ACCESSORIES_inner">Accessories Inner Page Banner</option>
//                     </select>
//                     <span style={{ color: "red" }}>{this.state.errors["bannertype"]}</span>
//                   </div>

//                   <div className="grpset">
//                     <label className="mandtry">category</label>
//                     <select className="uk-input" id="form-horizontal-text" name="category" value={this.state.category} onChange={this.handleChange1}>
//                       <option value="MEN">MEN</option>
//                       <option value="WOMEN">WOMEN</option>
//                       <option value="KIDS">KIDS</option>
//                       <option value="ACCESSORIES">ACCESSORIES</option>
//                       <option value="SPORTS">SPORTS</option>
//                       <option value="OTHERS">OTHERS</option>
//                     </select>
//                     <span style={{ color: "red" }}>{this.state.errors["category"]}</span>
//                   </div>

//                   <div className="grpset">
//                     <label className="mandtry">Subcategory</label>
//                     <select className="uk-input" id="form-horizontal-text" name="category_id"
//                       value={this.state.sub} onChange={this.handleChange2}>
//                       {this.state.subcatlist.map((item, key) =>
//                         <option value={item[0]}>{item[1]}</option>
//                       )}
//                     </select>
//                   </div>
//                   <div className="grpset">
//                     <label className="mandtry">Sub-subcategory</label>
//                     <select className="uk-input" id="form-horizontal-text" name="subsubcategory_id" value={this.state.subsub}
//                       onChange={this.handleChange3}>
//                       <option >Select a Subcategory</option>
//                       {this.state.subsubcatlist.map((item, key) =>
//                         <option value={item[0]}>{item[1]}</option>
//                       )}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="productsgrid">
//               <div className="head-main"><h6>Images</h6></div>
//               <div className="main-grid form-grd">
//                 <div className="halffrms">
//                   <div className="twoways">
//                     <div className="grpset">
//                       <ImageUploader
//                         withIcon={true}
//                         singleImage={true}
//                         buttonText='Choose images'
//                         onChange={this.onDrop}
//                         imgExtension={['.jpg', '.gif', '.png', '.gif']}
//                         maxFileSize={5242880}
//                       />
//                     </div>
//                   </div>
//                   <div className="twoways">
//                     <div className="Add_images">
//                       <article>
//                         <figcaption>
//                           <ul>
//                             <li><img style={{ width: 100, height: 50 }} src={`${config.UrlImage}` + this.state.pictures} /></li>
//                           </ul>
//                         </figcaption>
//                         <div className="clear"></div>
//                       </article>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="halffrms updatebtns">
//                   <div className="twoways">
//                     <button type="submit" className="uk-button uk-button-default">Publish Now</button>
//                   </div>
//                   <div className="twoways">
//                     <Link to="/bannerlist" className="uk-button uk-button-default">Back</Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   }
// }


// export default Banneruploade;
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
import ImageUploader from 'react-images-upload';
import 'react-toastify/dist/ReactToastify.css';
import config from './config/config';


class Banneruploade extends Component {
  notify = () => toast("Wow so easy !");
  constructor(props) {
    super(props);
    if (localStorage.getItem('logindata') === null) {
      window.location.assign("./");
    }
    this.state = {
      showStore: false,
      name: '',
      pictures: '',
      pictures1: [],
      errors: {},
      data: [],
      data1: [],
      category: '',
      subcatlist: [],
      subsubcatlist: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.onDrop = this.onDrop.bind(this);
    const { match: { params } } = this.props;
    fetch(`${config.Url}api/bannerdetailsbyid/` + params.userId).then((response) => response.json())
      .then((res) => {
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          console.log(res.response.bannerdetails)
          this.setState(res.response.bannerdetails);
          this.setState(function () {
            fetch(`${config.Url}api/sublistbycatremark/` + res.response.bannerdetails.subcategory_id).then((response) => response.json())
              .then((res) => {
                if (res.status === 'FAILURE') {
                  toast.error(res.message);
                } else {
                  console.log("res.sublistbycatremark", res.sublistbycatremark)
                  this.setState({ data1: res.sublistbycatremark });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          })

          fetch(`${config.Url}api/sublistbycat/` + res.response.bannerdetails.category_id).then((response) => response.json())
            .then((res) => {
              if (res.status === 'FAILURE') {
                toast.error(res.message);
              } else {
                this.setState({ data: res.sublistbycat });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange1(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });

    fetch(`${config.Url}api/sublistbycat/` + value).then((response) => response.json())
      .then((res) => {
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          if (res.sublistbycat.length >= 0) {
            for (let i = 0; i <= res.sublistbycat.length - 1; i++) {
              if (res.sublistbycat[i][0] == this.state.subcategory_id) {
                fetch(`${config.Url}api/sublistbycatremark/` + this.state.subcategory_id).then((response) => response.json())
                  .then((res) => {
                    if (res.status === 'FAILURE') {
                      toast.error(res.message);
                    } else {
                      this.setState({ data1: res.sublistbycatremark });
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            }
          }
          this.setState({ data: res.sublistbycat });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      data1: []
    })
  }


  onDrop(picture) {
    this.setState({
      showStore: true,
    })
    this.createImage(picture[0]);
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
          if (res.status === 'FAILURE') {
          } else {
            console.log(res.response)
            this.setState({
              image: res.response,
              showStore: false,
            })
          }
        })
        .catch((error) => {
          console.log(error);
          alert('Oops, something went wrong. Please try again!');
        });

    };
    reader.readAsDataURL(file);
  }

  handleValidation() {
    let fields = this.state;
    let errors = {};
    let formIsValid = true;


    if (!fields.type) {
      formIsValid = false;
      errors["type"] = "Please enter banner type.";
    }
    if (!fields.category_id) {
      formIsValid = false;
      errors["category_id"] = "Please enter category .";
    }
    if (!fields.subsubcategory_id) {
      formIsValid = false;
      errors["subsubcategory_id"] = "Please enter subsubcategory_id .";
    }
    if (!fields.subcategory_id) {
      formIsValid = false;
      errors["subcategory_id"] = "Please enter subcategory .";
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    if (name === 'subcategory_id') {
      console.log(name);
      if (value === '') {
        this.setState({ subcategory_id: value })
      } else {
        this.setState({
          subcategory_id: '',
        });
      }
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const { match: { params } } = this.props;
    console.log(this.handleValidation());
    var testing = {
      type: this.state.type,
      image: this.state.image,
      idm: params.userId,
      category_id: this.state.category_id,
      subcategory_id: this.state.subcategory_id,
      subsubcategory_id: this.state.subsubcategory_id
    }
    console.log(testing)
    if (this.handleValidation()) {
      alert('Banner updated successfully');
      fetch(`${config.Url}api/createbanner`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: this.state.type,
          image: this.state.image,
          idm: params.userId,
          category_id: this.state.category_id,
          subcategory_id: this.state.subcategory_id,
          subsubcategory_id: this.state.subsubcategory_id

        }),
      }).then((response) => response.json())
        .then((res) => {
          console.log("res", res);
          if (res.status === 'FAILURE') {
            toast.error(res.message);
          } else {
            toast.success(res.message);
            console.log(res);
            this.props.history.push('/bannerlist');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  handleChange2(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });

    if (name === 'subsubcategory_id') {
      console.log(name);
      if (value === '') {
        this.setState({ subsubcategory_id: value })
      } else {
        this.setState({
          subsubcategory_id: '',
        });
      }
    }
    fetch(`${config.Url}api/sublistbycatremark/` + value).then((response) => response.json())
      .then((res) => {
        if (res.status === 'FAILURE') {
          toast.error(res.message);
        } else {
          this.setState({ data1: res.sublistbycatremark });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return <div className="dash-layout">
      <Header />
      <div className="bodylayouts-yod">
        <div >
          <form onSubmit={this.handleSubmit}>
            <div className="productsgrid">
              <p><ToastContainer /></p>
              <div className="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
                <img alt="Ok" src="https://www.justori.com/justori/assets/images/11.gif" />
              </div>
              <div className="head-main"><h6>Banner Info</h6></div>
              <div className="main-grid form-grd">

                <div className="fullfrm">
                  <div className="grpset">
                    <label className="mandtry">Banner Type</label>
                    <select className="uk-input" id="form-horizontal-text" name="type" value={this.state.type} onChange={this.handleChange}>
                      <option value="homeslider">Home Slider</option>
                      <option value="stylefeed">Style feed</option>
                      <option value="banner1">Banner 1</option>
                      <option value="slider1">slider1</option>
                      <option value="banner2">Banner 2</option>
                      <option value="slider2">Slider 2</option>
                      <option value="hotdeal">Hotdeal</option>
                      <option value="handpicked">Handpicked</option>
                      <option value="WOMEN_inner">Woman Inner Page Banner</option>
                      <option value="MEN_inner">Man Inner Page Banner</option>
                      <option value="KIDS_inner">Kids Inner Page Banner</option>
                      <option value="SPORTS_inner">Sports Inner Page Banner</option>
                      <option value="ACCESSORIES_inner">Accessories Inner Page Banner</option>
                    </select>
                    <span style={{ color: "red" }}>{this.state.errors["type"]}</span>
                  </div>

                  <div class="grpset">
                    <label class="mandtry">Category</label>
                    <div class="Inputs">
                      <select class="uk-input" id="form-horizontal-text" name="category_id" value={this.state.category_id} onChange={this.handleChange1}>
                        <option value="MEN">MEN</option>
                        <option value="WOMEN">WOMEN</option>
                        <option value="KIDS">KIDS</option>
                        <option value="ACCESSORIES">ACCESSORIES</option>
                        <option value="SPORTS">SPORTS</option>
                        <option value="OTHERS">OTHERS</option>
                      </select>
                      <span style={{ color: "red" }}>{this.state.errors["category_id"]}</span>
                    </div>
                  </div>
                  <div className="grpset">
                    <label className="mandtry">Subcategory</label>
                    <div class="Inputs">
                      <select className="uk-input" id="form-horizontal-text" name="subcategory_id"
                        value={this.state.subcategory_id} onChange={this.handleChange2}>
                        <option value="">Select a subcategory</option>
                        {this.state.data.map((item, key) =>
                          <option value={item[0]}>{item[1]}</option>
                        )}
                      </select>
                    </div>
                    <span style={{ color: "red" }}>{this.state.errors["subcategory_id"]}</span>
                  </div>
                  <div className="grpset">
                    <label className="mandtry">Sub-subcategory</label>
                    <select className="uk-input" id="form-horizontal-text" name="subsubcategory_id"
                      value={this.state.subsubcategory_id}
                      onChange={this.handleChange}>
                      <option value="">Select a Subcategory</option>
                      {this.state.data1.map((item, key) =>
                        <option value={item[0]}>{item[1]}</option>
                      )}
                    </select>
                    <span style={{ color: "red" }}>{this.state.errors["subsubcategory_id"]}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="productsgrid">
              <div className="head-main"><h6>Images</h6></div>
              <div className="main-grid form-grd">
                <div className="halffrms">
                  <div className="twoways">
                    <div className="grpset">
                      <ImageUploader
                        withIcon={true}
                        singleImage={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                      />
                    </div>
                  </div>
                  <div className="twoways">
                    <div className="Add_images">
                      <article>
                        <figcaption>
                          <ul>
                            <li><img alt="Ok" style={{ width: 100, height: 50 }} src={`${config.UrlImage}` + this.state.image} /></li>
                          </ul>
                        </figcaption>
                        <div className="clear"></div>
                      </article>
                    </div>
                  </div>
                </div>

                <div className="halffrms updatebtns">
                  <div className="twoways">
                    <button type="submit" className="uk-button uk-button-default">Publish Now</button>
                  </div>
                  <div className="twoways">
                    <Link to="/bannerlist" className="uk-button uk-button-default">Back</Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
}


export default Banneruploade;