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


class AddColor extends Component {
    notify = () => toast("Wow so easy !");

    constructor(props) {
        super(props);
        if (localStorage.getItem('logindata') === null) {
            window.location.assign("./");
          }
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onChange1 = this.onChange1.bind(this);
        this.handleMultiChange = this.handleMultiChange.bind(this);
        this.handleMultiChange1 = this.handleMultiChange1.bind(this);

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
        this.createImage(picture[picture.length - 1]);
        this.setState({
            pictures1: picture,
            showStore: true,
        })

        this.setState({
            pictures: []
        })

        const main = this.state.pictures1;
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
        if (!fields.hexcode) {
            formIsValid = false;
            errors["hexcode"] = "Please enter Hexcode.Only 6 characters allowed.";
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
        if (name == 'hexcode') {
            const re = /^[a-zA-Z0-9]{0,6}$/;
            if (value === '' || re.test(value)) {
                this.setState({ hexcode: value })
            } else {
                this.setState({
                    hexcode: '',
                });
            }
        }
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


    showAlert() {
        localStorage.setItem('logindata', null);
        window.location.assign("./")
    }


    handleSubmit(event) {
        event.preventDefault();
        if (this.handleValidation()) {
            if (!this.state.sperror) {
                fetch(`${config.Url}api/addcolor`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        color: this.state.color,
                        hexcode: this.state.hexcode,
                    }),
                }).then((response) => response.json())
                    .then((res) => {
                        if (res.status === 'FAILURE') {
                            toast.error(res.message);
                        } else {
                            toast.success(res.message);
                            if (toast.success(res.message)) {
                                this.props.history.push('/colorList');
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
        return <div class="dash-layout">
            <Header />
            <div class="bodylayouts-yod">

                <Main className="AddSize" expanded={expanded}>
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
                                            <div class="twoways">
                                                <div class="grpset">
                                                    <label class="mandtry">Hexcode</label>
                                                    <div class="Inputs">
                                                        <input maxLength="8" name="hexcode" class="uk-input" id="form-horizontal-text" type="text" placeholder="Hexcode" value={this.state.value} onChange={this.handleChange} />
                                                        <span style={{ color: "red" }}>{this.state.errors["hexcode"]}</span>
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
                                        <Link to="/colorList" class="uk-button uk-button-default">Back</Link>
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