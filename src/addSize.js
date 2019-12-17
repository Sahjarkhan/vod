
import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import './all.css';
import './fontawesome.css';
import './bootstrap.css';
import config from './config/config';
import Header from "./header";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const Main = styled.main`
    position: relative;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    margin-left: ${props => (props.expanded ? 240 : 64)}px;
`;
const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
        padding: 20,
    }),
    control: () => ({

        width: 200,
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }
}


class AddSize extends Component {

    notify = () => toast("Wow so easy !");

    constructor(props) {
        super(props);
        this.state = {
            showStore: false, multiValue: [], isDialogOpen: false,
            filterOptions: [
                { value: 'XS', label: 'XS' },
                { value: 'S', label: 'S' },
                { value: 'M', label: 'M' },
                { value: 'L', label: 'L' },
                { value: 'XL', label: 'XL' },
                { value: 'XXL', label: 'XXL' },
            ], multiValue1: [],
            filterOptions1: [
                { value: 'blue', label: 'Blue' },
                { value: 'yellow', label: 'Yellow' },
                { value: 'black', label: 'Black' },
                { value: 'white', label: 'White' },
                { value: 'brown', label: 'Brown' },
                { value: 'purple', label: 'Purple' },
            ], sperror: '', name: '', picturescolorchart: '', sp: '', data4: [], data3: [], data: [], data1: [], pictures: [], pictures1: [], errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onChange1 = this.onChange1.bind(this);
        this.handleMultiChange = this.handleMultiChange.bind(this);
        this.handleMultiChange1 = this.handleMultiChange1.bind(this);
        // alert(localStorage.getItem('logindata'));

        fetch(`${config.Url}api/brandlistforseller`).then((response) => response.json())
            .then((res) => {
                if (res.status === 'FAILURE') {
                    toast.error(res.message);
                } else {
                    this.setState({ data3: res.brandlistforseller });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        fetch(`${config.Url}api/themelistforseller`).then((response) => response.json())
            .then((res) => {
                if (res.status === 'FAILURE') {
                    toast.error(res.message);
                } else {
                    this.setState({ data4: res.themelistforseller });
                }
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

    handleMultiChange(option) {
        this.setState(state => {
            return {
                multiValue: option
            };
        });
    }

    openDialog = () => this.setState({ isDialogOpen: true })

    handleClose = () => this.setState({ isDialogOpen: false })

    handleMultiChange1(option) {
        this.setState(state => {
            return {
                multiValue1: option
            };
        });
    }
    onDrop(picture) {
        console.log(picture);
        this.createImage(picture[picture.length - 1]);
        this.setState({
            pictures1: picture,
            showStore: true,
        })

        this.setState({
            pictures: []
        })

        const main = this.state.pictures1;
        // console.log(main);
        for (var i = 0; i < main.length; i++) {
            this.createImage(main[i]);

        }
    }
    onChange1(e) {
        let files = e.target.files || e.dataTransfer.files;
        //alert(files);
        console.log(files[0]);
        if (!files.length)
            return;
        this.createImage1(files[0]);
    }
    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;


        //category_id

        if (!fields.category_id) {
            formIsValid = false;
            errors["category_id"] = "Please enter category.";
        }

        if (!fields.subcategory_id) {
            formIsValid = false;
            errors["description"] = "Please enter subcategory_id.";
        }
        if (!fields.subsubcategory_id) {
            formIsValid = false;
            errors["subsubcategory_id"] = "Please enter Product Type.";
        }
        if (!fields.size) {
            formIsValid = false;
            errors["size"] = "Please enter Size.";
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

        if (name === 'sp') {
            if (parseInt(value) > parseInt(this.state.mrp)) {

                this.setState({
                    sp: '',
                    sperror: 'Selling price can not be more than MRP.',
                });
            } else {
                this.setState({
                    sperror: '',
                });
            }
        }
    }

    handleChange1(event) {
        const target = event.target;
        const value = target.value;
        this.setState({
            category_id: value
        });
        
        fetch(`${config.Url}api/sublistbycat/` + value).then((response) => response.json())
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

    handleChange2(event) {
        const target = event.target;
        const value = target.value;
        this.setState({
            subcategory_id: value
        });
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
    showAlert() {
        localStorage.setItem('logindata', null);
        window.location.assign("./")
    }

    handleSubmit(event) {

        event.preventDefault();
        var testing = {
            catid: this.state.category_id,
            subcatid: this.state.subcategory_id,
            subsubcatid: this.state.subsubcategory_id,
            size: this.state.size
        };
        if (this.handleValidation()) {
            if (!this.state.sperror) {
                fetch(`${config.Url}api/addsize`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({
                        catid: this.state.category_id,
                        subcatid: this.state.subcategory_id,
                        subsubcatid: this.state.subsubcategory_id,
                        size: this.state.size

                    }),
                }).then((response) => response.json())
                    .then((res) => {
                        if (res.status === 'FAILURE') {
                            toast.error(res.message);
                        } else {
                            if (toast.success(res.message)) {
                                this.props.history.push('/product');
                            }
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }
    render() {
        const { expanded, selected } = this.state;
        //const { selectedOption } = this.state;
        return <div class="dash-layout">
            <Header />
            <div class="bodylayouts-yod">
                <Main expanded={expanded}>
                    <div >
                        <form onSubmit={this.handleSubmit}>
                            <div class="productsgrid">
                                <p><ToastContainer /></p>
                                <div class="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
                                    <img alt="" src="https://www.justori.com/justori/assets/images/11.gif" />
                                </div>
                                <div class="head-main"><h6>Add Size</h6></div>
                                <div class="main-grid form-grd">
                                    <div class="fullfrm">
                                        <div class="grpset">
                                            <label class="mandtry">Category</label>
                                            <div class="Inputs">
                                                <select class="uk-input" id="form-horizontal-text" name="category_id" value={this.state.value} onChange={this.handleChange1}>
                                                    <option >Select a category</option>
                                                    <option value="MEN">MEN</option>
                                                    <option value="WOMEN">WOMEN</option>
                                                    <option value="KIDS">KIDS</option>
                                                    <option value="ACCESSORIES">ACCESSORIES</option>
                                                    <option value="SPORTS">SPORTS</option>
                                                    <option value="SALE">SALE</option>
                                                </select>
                                                <span style={{ color: "red" }}>{this.state.errors["category_id"]}</span>
                                            </div>
                                        </div>

                                        <div class="grpset">
                                            <label class="mandtry">Subcategory</label>
                                            <select class="uk-input" id="form-horizontal-text" name="subcategory_id" value={this.state.value} onChange={this.handleChange2}>
                                                <option >Select a subcategory</option>
                                                {this.state.data.map((item, key) =>
                                                    <option value={item[0]}>{item[1]}</option>
                                                )}
                                                <span style={{ color: "red" }}>{this.state.errors["subcategory_id"]}</span>

                                            </select>
                                        </div>
                                        <div class="grpset">
                                            <label class="mandtry">Product Type</label>
                                            <select class="uk-input" id="form-horizontal-text" name="subsubcategory_id" value={this.state.value} onChange={this.handleChange}>
                                                <option >Select a sub-subcategory</option>
                                                {this.state.data1.map((item, key) =>
                                                    <option value={item[0]}>{item[1]}</option>
                                                )}

                                                <span style={{ color: "red" }}>{this.state.errors["subsubcategory_id"]}</span>
                                            </select>
                                        </div>
                                        <div>
                                            <div class="twoways">
                                                <div class="grpset">
                                                    <label class="mandtry">Size</label>
                                                    <div class="Inputs">
                                                        <input maxLength="8" name="size" class="uk-input" id="form-horizontal-text" type="text" placeholder="Size" value={this.state.value} onChange={this.handleChange} />
                                                        <span style={{ color: "red" }}>{this.state.errors["size"]}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="main-grid form-grd">
                                <div class="halffrms">
                                    <div class="twoways">
                                    </div>
                                </div>
                                <div class="halffrms updatebtns">
                                    <div class="twoways">
                                        <button type="submit" class="uk-button uk-button-default">Submit</button>
                                    </div>
                                    <div class="twoways">
                                        <Link to="/sizeList" class="uk-button uk-button-default">Back</Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Main>
            </div>
        </div>
    }
}


export default AddSize;