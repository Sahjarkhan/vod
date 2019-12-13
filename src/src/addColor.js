import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import './all.css';
import './fontawesome.css';
import './bootstrap.css';
import Header from "./header";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import ImageUploader from 'react-images-upload';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faTachometerAlt, faUserCog, faShoppingBasket, faPowerOff } from '@fortawesome/free-solid-svg-icons'
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


class AddColor extends Component {

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

        fetch("http://mobuloustech.com/yodapi/api/brandlistforseller").then((response) => response.json())
            .then((res) => {
                //alert(res);
                if (res.status === 'FAILURE') {
                    toast.error(res.message);
                } else {
                    //toast.success(res.message);
                    //alert(res);
                    this.setState({ data3: res.brandlistforseller });

                    //localStorage.setItem('logindata', res.sellerlogin);
                    //this.props.history.push('/');
                }
                console.log(res.brandlistforseller);
            })
            .catch((error) => {
                console.log(error);
                alert('Oops, something went wrong. Please try again!');
            });

        fetch("http://mobuloustech.com/yodapi/api/themelistforseller").then((response) => response.json())
            .then((res) => {
                //alert(res);
                if (res.status === 'FAILURE') {
                    toast.error(res.message);
                } else {
                    //toast.success(res.message);
                    //alert(res);
                    this.setState({ data4: res.themelistforseller });

                    //localStorage.setItem('logindata', res.sellerlogin);
                    //this.props.history.push('/');
                }
                console.log(res.themelistforseller);
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
        if (!fields.color) {
            formIsValid = false;
            errors["color"] = "Please enter color.";
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
            //alert(value);
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
        // const name = target.name;
        //alert(value);
        this.setState({
            category_id: value
        });

        fetch("http://mobuloustech.com/yodapi/api/sublistbycat/" + value).then((response) => response.json())
            .then((res) => {
                //alert(res);
                if (res.status === 'FAILURE') {
                    toast.error(res.message);
                } else {
                    //toast.success(res.message);
                    //alert(res);
                    this.setState({ data: res.sublistbycat });
                    //localStorage.setItem('logindata', res.sellerlogin);
                    //this.props.history.push('/');
                }
                console.log(res.sublistbycat);
            })
            .catch((error) => {
                console.log(error);
                alert('Oops, something went wrong. Please try again!');
            });
    }

    handleChange2(event) {
        const target = event.target;
        const value = target.value;
        /// const name = target.name;
        //alert(value);
        this.setState({
            subcategory_id: value
        });
        fetch("http://mobuloustech.com/yodapi/api/sublistbycatremark/" + value).then((response) => response.json())
            .then((res) => {
                //alert(res);
                if (res.status === 'FAILURE') {
                    toast.error(res.message);
                } else {
                    // toast.success(res.message);
                    //alert(res);
                    this.setState({ data1: res.sublistbycatremark });
                    //localStorage.setItem('logindata', res.sellerlogin);
                    //this.props.history.push('/');
                }
                console.log(res.sublistbycatremark);
            })
            .catch((error) => {
                console.log(error);
                alert('Oops, something went wrong. Please try again!');
            });
    }
    showAlert() {
        localStorage.setItem('logindata', null);
        window.location.assign("./")
    }

    handleSubmit(event) {

        console.log("***********************", this.state.color)
        // alert('A name was submitted: ' + this.state.username+' password '+ this.state.password);
        event.preventDefault();
        console.log("***********");
        console.log(this.handleValidation());
        if (this.handleValidation()) {
            if (!this.state.sperror) {
                //console.warn()    
                fetch("http://mobuloustech.com/yodapi/api/addcolor", {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        color: this.state.color,
                    }),
                }).then((response) => response.json())
                    .then((res) => {
                        console.log(res, "****************************************8")
                        if (res.status === 'FAILURE') {
                            toast.error(res.message);
                        } else {
                            //toast.success();
                            //alert(res.message)
                            console.log("**********************", res.message);
                            toast.success(res.message);
                            //localStorage.setItem('logindata', res.sellerlogin);
                            if (toast.success(res.message)) {
                                this.props.history.push('/dashboard');
                            }
                        }
                        console.log(res);
                    })
                    .catch((error) => {
                        console.log(error);
                        alert('Oops, something went wrong. Please try again!');
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
                                <NavLink to="/product" ><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faBoxOpen} /></NavLink>
                            </NavIcon>
                            <NavText>
                                <NavLink to="/product" >My Products</NavLink>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="setting">
                            <NavIcon>
                                <NavLink to="/setting"  ><FontAwesomeIcon style={{ width: 23, marginRight: 10 }} icon={faUserCog} /></NavLink>
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
                        <form onSubmit={this.handleSubmit}>
                            
                            <div class="productsgrid">
                                <p><ToastContainer /></p>
                                <div class="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
                                    <img alt="" src="https://www.justori.com/justori/assets/images/11.gif" />
                                </div>
                                <div class="head-main"><h6>Add Color</h6></div>
                                <div class="main-grid form-grd">
                                    <div class="fullfrm">
                                        <div>
                                            <div class="twoways">
                                                <div class="grpset">
                                                    <label class="mandtry">Color</label>
                                                    <div class="Inputs">
                                                        <input maxLength="8" name="color" class="uk-input" id="form-horizontal-text" type="text" placeholder="Color" value={this.state.value} onChange={this.handleChange} />
                                                        <span style={{ color: "red" }}>{this.state.errors["color"]}</span>
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
                                        <Link to="/dashboard" class="uk-button uk-button-default">Back</Link>
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
export default AddColor;