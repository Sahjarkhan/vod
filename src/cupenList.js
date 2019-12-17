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
import styled from 'styled-components';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


const Main = styled.main`
    position: relative;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;  
    margin-left: ${props => (props.expanded ? 240 : 64)}px;
`;

const columns = [
    "OFFER TYPE",
    "NAME",
    "DESCRIPTION",
    "DISCOUNT   ",
    "COLOR",
    {
        name: "IMAGE",
        options: {
            filter: false,
            customBodyRender: (value, status, updateValue) => {
                return (
                    <div class="prodts-tbs">
                        <div class="drs">
                            <img src={`${config.UrlImage}` + value} />
                        </div>
                    </div>
                );

            }
        }
    },
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
            fetch(`${config.Url}api/colordelete/` + data123[name][2]).then((response) => response.json())
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
        return <div class="dash-layout">
            <Header />
            <div class="bodylayouts-yod">
                <div >
                    <p><ToastContainer /></p>
                    <div class="productexp">
                        <div class="prdelements">
                            <Link to="/AddCupen" class="dashbtns"> Add Offer</Link>
                        </div>
                    </div>
                    <div class="yodadm-tablesthm uk-overflow-auto">
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