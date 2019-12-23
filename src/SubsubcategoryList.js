import React, { Component } from "react";
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import config from './config/config';
import Header from "./header";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

//1
const columns = [
    "Name",
    "Category",
    // {
    //     name: "ACTION",
    //     options: {
    //         filter: true,
    //         customBodyRender: (value, status, updateValue) => {
    //             return (
    //                 <div>
    //                     <Link to={{ "pathname": "/subsubcategory/" }} class="roundico">Edit</Link>
    //                 </div>
    //             );
    //         }
    //     }
    // }
];
class Subsubcategory extends Component {
    constructor(props) {
        super(props);
        // this.handleChange1 = this.handleChange1.bind(this);
        if (localStorage.getItem('logindata') === null) {
            window.location.assign("./");
        }
        this.state = { data: [] };
    }

    componentDidMount() {
        fetch(`${config.Url}api/subsubcatlist`).then((response) => response.json())
            .then((res) => {
                if (res.status === 'FAILURE') {
                    toast.error(res.message);
                } else {
                    this.setState({ data: res.subsubcatlist });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    handleDelete = deletedRows => {
        const { data, tableColumns } = this.props;
        const deletedIndexes = Object.keys(deletedRows.lookup);
        const data123 = this.state.data;
        deletedIndexes.map(function (name, index) {
            //.log(data123);
            fetch(`${config.Url}/api/productdelete/` + data123[name][6][1]).then((response) => response.json())
                .then((res) => {
                    if (res.status === 'FAILURE') {
                        toast.error(res.message);
                    } else {
                        toast.success(res.message);
                        //this.setState({data: res.response});

                        //localStorage.setItem('logindata', res.sellerlogin);
                        //this.props.history.push('/');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        })

    }
    render() {
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
                            height="80"
                            width="100"
                        /> :
                        'Sorry, no products yet.',
                },
            }
        };
        return <div class="dash-layout">
            <Header />
            <div class="bodylayouts-yod">
                <div >
                    <p><ToastContainer /></p>
                    <div class="productexp">
                        <div class="prdelements">
                            <Link to="/addSubsubCate" class="dashbtns"> Add Subsubcategory</Link>
                        </div>
                    </div>
                    <div class="yodadm-tablesthm uk-overflow-auto">
                        <MUIDataTable
                            title={"Subsubcategory List"}
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


export default Subsubcategory;