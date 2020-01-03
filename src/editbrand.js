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
import config from './config/config';
import 'react-toastify/dist/ReactToastify.css';

class Editbrand extends Component {
    notify = () => toast("Wow so easy !");
    constructor(props) {
        super(props);
        if (localStorage.getItem('logindata') === null) {
            window.location.assign("./");
        }
        this.state = {
            showStore: false,
            imagearray: [],
            image: "",
            pictures: '',
            pictures1: '',
            pictures2: '',
            pictures1: [],
            errors: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        const { match: { params } } = this.props;

        fetch(`${config.Url}api/brandviewforadmin/` + params.userId).then((response) => response.json())
            .then((res) => {
                if (res.status === 'FAILURE') {
                    toast.error(res.message);
                } else {
                    this.setState({ id: res.response.id });
                    this.setState({ name: res.response.name });
                    this.setState({ image: res.response.image });
                    this.setState({ description: res.response.description });
                    this.setState(res.response);
                }
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
                        console.log(this.state.image)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        };
        reader.readAsDataURL(file);
    }



    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        if (!fields.name) {
            formIsValid = false;
            errors["name"] = "Brand Name Cannot be empty";
        }



        if (!fields.Description) {
            formIsValid = false;
            errors["Description"] = "Description Cannot be empty";
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
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        var testing = {
            name: this.state.name,
            image: this.state.image,
            description: this.state.description,
        }
        console.log(testing)
        // if (this.handleValidation()) {
        fetch(`${config.Url}api/brandeditforadmin/` + this.state.id, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,
                image: this.state.image,
                description: this.state.description,
            }),
        }).then((response) => response.json())
            .then((res) => {
                console.log(res)
                if (res.status === 'FAILURE') {
                    toast.error(res.message);
                } else {
                    console.log('hello')
                    toast.success(res.message);
                    console.log(res);
                    // this.props.history.push('/brandlist');
                }
                console.log(res);
            })
            .catch((error) => {
                console.log(error)
                console.log(error);
            });

    }



    render() {
        console.log(this.state)
        return <div class="dash-layout">
            <Header />
            <div class="bodylayouts-yod">
                <div >
                    <form onSubmit={this.handleSubmit}>
                        <div class="productsgrid">
                            <p><ToastContainer /></p>
                            <div class="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
                                <img src="https://www.justori.com/justori/assets/images/11.gif" />
                            </div>
                            <div class="head-main"><h6>Brand Info</h6></div>
                            <div class="main-grid form-grd">

                                <div class="fullfrm">
                                    <div class="grpset">
                                        <label class="mandtry">Title</label>
                                        <div class="Inputs">
                                            <input name="name" class="uk-input" id="form-horizontal-text" type="text" placeholder="Title" value={this.state.name} onChange={this.handleChange} />
                                            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                        </div>
                                    </div>
                                    <div class="grpset">
                                        <label class="mandtry">Description</label>
                                        <div class="Inputs">
                                            <input name="description" class="uk-input" id="form-horizontal-text" type="text" placeholder="Description" value={this.state.description} onChange={this.handleChange} />
                                            <span style={{ color: "red" }}>{this.state.errors["namDescriptione"]}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="productsgrid">
                            <div class="head-main"><h6>Brand Image</h6></div>
                            <div class="main-grid form-grd">
                                <div class="halffrms">
                                    <div class="twoways">
                                        <div class="grpset">
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
                                </div>
                                <div class="twoways">
                                    <div class="Add_images">
                                        <article >
                                            <figcaption >
                                                <ul>
                                                    <li><img src={config.UrlImage + this.state.image} /></li>

                                                </ul>
                                            </figcaption>
                                            <div class="clear"></div>
                                        </article>
                                    </div>
                                </div>
                                <div class="halffrms updatebtns">
                                    <div class="twoways">
                                        <button type="submit" class="uk-button uk-button-default">Publish Now</button>
                                    </div>
                                    <div class="twoways">
                                        <Link to="/brandlist" class="uk-button uk-button-default">Back</Link>
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


export default Editbrand;