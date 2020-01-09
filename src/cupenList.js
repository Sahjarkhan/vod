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
import '@trendmicro/react-sidenav/dist/react-sidenav.css';



const columns = [
    "OFFER TYPE",
    "DESCRIPTION",
    "BUY",
    "GET",
    "CATEGORY",

];

class SizeCollor extends Component {
    constructor(props) {
        super(props);

        if (localStorage.getItem('logindata') === null) {
            window.location.assign("./");
        }

        this.state = { data: [] };
        fetch(`${config.Url}api/offerlist`).then((response) => response.json())
            .then((res) => {
                if (res.status === 'FAILURE') {
                    toast.error(res.message);
                } else {
                    this.setState({ data: res.offerlist });
                }
            })
            .catch((error) => {
                console.log(error);
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

    handleDelete = deletedRows => {
        const { data, tableColumns } = this.props;
        const deletedIndexes = Object.keys(deletedRows.lookup);
        const data123 = this.state.data;

        deletedIndexes.map(function (name, index) {
            fetch(`${config.Url}api/offerdelete/` + data123[name][2]).then((response) => response.json())
                .then((res) => {
                    if (res.status === 'FAILURE') {
                        toast.error(res.message);
                    } else {
                        toast.success(res.message);
                        this.setState({ data: res.colorlist });
                    }
                })
                .catch((error) => {
                    console.log("error", error);
                });
            return 1;
        })
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
                <div >
                    <p><ToastContainer /></p>
                    <div class="Addsize">
                        <Link to="/AddCupen" className="dashbtns"> Add Offer</Link>
                    </div>
                    {/* <p><ToastContainer /></p>
                    <div className="productexp">
                        <div className="prdelements">
                            <Link to="/AddCupen" className="dashbtns"> Add Offer</Link>
                        </div>
                    </div> */}
                    <div className="yodadm-tablesthm uk-overflow-auto">
                        <MUIDataTable
                            title={"Offer List"}
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


export default SizeCollor;