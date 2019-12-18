import React, { Component } from "react";
import config from './config/config';
import './uikit.css';
import './yodadmincss.css';
import './uikit-rtl.css';
import Header from "./header";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';



const columns = [
    "CATEGORY",
    "SUBCATEGORY",
    "PRODUCT TYPE",
    "SIZE"
];

class SizeList extends Component {
    constructor(props) {
        super(props);

        if (localStorage.getItem('logindata') === null) {
            window.location.assign("./");
        }

        this.state = { data: [] };
        fetch(`${config.Url}api/sizelist`).then((response) => response.json())
            .then((res) => {
                if (res.status === 'FAILURE') {
                    toast.error(res.message);
                } else {
                    this.setState({ data: res.sizelist });
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
            fetch(`${config.Url}api/sizedelete/` + data123[name][4]).then((response) => response.json())
                .then((res) => {
                    if (res.status === 'FAILURE') {
                        toast.error(res.message);
                    } else {
                        toast.success(res.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert('Oops, something went wrong. Please try again!');
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
                            height="20"
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
                            <Link to="/addsize" class="dashbtns"> Add Size</Link>
                        </div>
                    </div>
                    <div class="yodadm-tablesthm uk-overflow-auto">
                        <MUIDataTable
                            title={"Size List"}
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
export default SizeList;