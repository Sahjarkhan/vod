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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import config from './config/config';

const columns = [
    "Name",
];

class Editsubsubcatg extends Component {

    notify = () => toast("Wow so easy !");

    constructor(props) {
        super(props);

        this.state = { showStore: false, image11: '', occasion_status: '', name1: '', category_id: '', name: '', data: [], pictures: [], pictures1: [], errors: {}, errors1: {} };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.onDrop = this.onDrop.bind(this);
        // alert(localStorage.getItem('logindata'));
        const { match: { params } } = this.props;



        fetch(`${config.Url}api/catlistforadmin1/` + params.userId).then((response) => response.json())
            .then((res) => {
                //alert(res);
                if (res.status === 'FAILURE') {
                    toast.error(res.message);
                } else {
                    // toast.success(res.message);
                    //alert(res);
                    this.setState({ image11: res.response.list1.image, occasion_status: res.response.list1.occasion_status, data: res.response.list, name1: res.response.list1.name, category_id: res.response.list1.category_id });
                    // console.log(this.state.category_id);
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

    onDrop(e) {

        let files = e.target.files || e.dataTransfer.files;
        //alert(files);
        console.log(files[0]);
        this.setState({
            showStore: true,
        })
        if (!files.length)
            return;
        this.createImage(files[0]);

    }


    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            console.log(e.target.result)
            fetch(`${config.Url}api/fileuploade1`, {
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
                            image11: res.response,
                            showStore: false,
                        });
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
            errors["name"] = "Name Cannot be empty";
        }

        //category_id






        this.setState({ errors: errors });
        return formIsValid;
    }

    handleValidation1() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields.name1) {
            formIsValid = false;
            errors["name"] = "Name cannot be empty.";
        }

        if (!fields.category_id) {
            formIsValid = false;
            errors["category_id"] = "Category_id cannot be empty.";
        }

        //category_id






        this.setState({ errors1: errors });
        return formIsValid;
    }

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

            fetch(`${config.Url}api/addsubcatg1`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    subcategory_id: params.userId,
                }),
            }).then((response) => response.json())
                .then((res) => {
                    //alert(res);
                    if (res.status === 'FAILURE') {
                        toast.error(res.message);
                    } else {
                        //	 toast.success(res.message);

                        console.log(res);
                        //localStorage.setItem('logindata', res.sellerlogin);
                        this.props.history.push('/category');
                    }
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }

    handleSubmit1(event) {
        // alert('A name was submitted: ' + this.state.username+' password '+ this.state.password);
        event.preventDefault();
        //console.log(this.state.pictures1);


        console.log(this.state.pictures);
        if (this.handleValidation1()) {
            const { match: { params } } = this.props;
            //alert(params.userId)
            //console.warn()

            fetch(`${config.Url}api/subcategorydetailsupdate/` + params.userId, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name1,
                    category_id: this.state.category_id,
                    image: this.state.image11,
                    occasion_status: this.state.occasion_status,
                }),
            }).then((response) => response.json())
                .then((res) => {
                    //alert(res);
                    if (res.status === 'FAILURE') {
                        toast.error(res.message);
                    } else {
                        toast.success(res.message);

                        console.log(res);
                        //localStorage.setItem('logindata', res.sellerlogin);
                        //  this.props.history.push('/category');
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
        const { data, tableColumns } = this.props;
        const deletedIndexes = Object.keys(deletedRows.lookup);
        //alert([0])
        const data123 = this.state.data;
        deletedIndexes.map(function (name, index) {
            fetch(`${config.Url}api/catdelete11/` + data123[name][1]).then((response) => response.json())
                .then((res) => {
                    //alert(res);
                    if (res.status === 'FAILURE') {
                        toast.error(res.message);
                    } else {
                        //  toast.success(res.message);
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
            print: false,
            download: false,
            filter: false,
            onRowsDelete: this.handleDelete,
        };
        return <div class="dash-layout">
            <Header />

            <div class="bodylayouts-yod">
                <div class="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
                    <img src="https://www.justori.com/justori/assets/images/11.gif" />
                </div>
                <div >
                    <form onSubmit={this.handleSubmit1}>
                        <div class="productsgrid">
                            <p><ToastContainer /></p>
                            <div class="head-main"><h6>Subcategory Info</h6></div>
                            <div class="main-grid form-grd">

                                <div class="fullfrm">
                                    <div class="grpset">
                                        <label class="mandtry">Name</label>
                                        <input name="name1" class="uk-input" id="form-horizontal-text" type="text" placeholder="Enter Product Name" value={this.state.name1} onChange={this.handleChange} />

                                    </div>
                                    <span style={{ color: "red" }}>{this.state.errors1["name"]}</span>
                                    <div class="grpset">
                                        <label class="mandtry">Category</label>
                                        <select class="uk-input" id="form-horizontal-text" name="category_id" value={this.state.category_id} onChange={this.handleChange}>
                                            <option >Select Category</option>
                                            <option value="MEN">MEN</option>
                                            <option value="WOMEN">WOMEN</option>
                                            <option value="KIDS">KIDS</option>
                                            <option value="ACCESSORIES">ACCESSORIES</option>
                                            <option value="SPORTS">SPORTS</option>
                                            <option value="OTHERS">OTHERS</option>
                                        </select>
                                    </div>
                                    <span style={{ color: "red" }}>{this.state.errors1["category_id"]}</span>

                                    <div class="grpset">
                                        <label class="mandtry">Image</label>
                                        <div class="Inputs">
                                            <p> <input type="file" onChange={this.onDrop} /></p>

                                        </div>

                                    </div>
                                    {this.state.image11 ? (<div class="grpset">
                                        <div class="Add_images">
                                            <article>
                                                <figcaption>
                                                    <img style={{ width: 200, height: 100 }} src={this.state.image11} />
                                                </figcaption>
                                                <div class="clear"></div>
                                            </article>
                                        </div>
                                    </div>) : (<div></div>)}


                                    <div class="grpset">
                                        <label class="mandtry">Occasion Status</label>
                                        <div class="Inputs">

                                            <FormControlLabel
                                                label={this.state.occasion_status ? "Active" : "Inactive"}
                                                value={this.state.occasion_status ? "1" : ""}
                                                control={
                                                    <Switch color="primary" checked={this.state.occasion_status} value={this.state.occasion_status ? "1" : ""} />
                                                }
                                                onChange={event => {
                                                    this.setState({ occasion_status: !this.state.occasion_status })

                                                }}
                                            />
                                        </div>
                                    </div>



                                </div>

                                <div class="halffrms updatebtns">
                                    <div class="twoways">
                                        <button type="submit" class="uk-button uk-button-default">Update</button>
                                    </div>

                                </div>


                            </div></div>
                    </form>	<form onSubmit={this.handleSubmit}>
                        <div class="productsgrid">
                            <div class="head-main"><h6>Add New Remark</h6></div>
                            <div class="main-grid form-grd">

                                <div class="fullfrm">
                                    <div class="grpset">
                                        <label class="mandtry">Name</label>
                                        <input name="name" class="uk-input" id="form-horizontal-text" type="text" placeholder="Enter Product Name" value={this.state.value} onChange={this.handleChange} />

                                    </div>
                                    <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                </div>







                            </div>

                        </div>


                        <div class="productsgrid">

                            <div class="main-grid form-grd">


                                <div class="halffrms updatebtns">
                                    <div class="twoways">
                                        <button type="submit" class="uk-button uk-button-default">Publish Now</button>
                                    </div>
                                    <div class="twoways">
                                        <Link to="/category" class="uk-button uk-button-default">Back</Link>
                                    </div>
                                </div>

                            </div>

                        </div>


                    </form>
                    <div class="productsgrid">
                        <MUIDataTable
                            title={"Remark List"}
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


export default Editsubsubcatg;