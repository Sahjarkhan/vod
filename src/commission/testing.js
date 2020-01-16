import React from "react";
import Modal from "react-responsive-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faTachometerAlt, faUserCog, faShoppingBasket, faPowerOff, faRupeeSign } from '@fortawesome/free-solid-svg-icons'
import config from '../config/config';
import { ToastContainer, toast } from 'react-toastify';

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};
class Testing extends React.Component {
    constructor(props) {
        super();
        this.state = {
            pay_type: "",
            pay_date: "",
            pay_status: "",
            errors: {}

        }
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    state = {
        open: false
    };
    handleChange2(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        if (name === 'commission') {
            const re = /^[0-9]{0,8}$/i;
            if (value === '' || re.test(value)) {
                this.setState({ stock: value })
            } else {
                this.setState({
                    stock: '',
                });
            }
        }

    }
    handleSubmit = (event) => {
        console.log(this.state.modelValue[0]);
        event.preventDefault();
        if (this.handleValidation()) {
            var amount = this.state.commission;
            fetch(`${config.Url}api/updatecommission`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.modelValue[0],
                    commission: amount,
                }),
            }).then((response) => response.json())
                .then((res) => {
                    if (res.status === 'FAILURE') {
                        toast.error(res.message);
                    } else {
                        if (toast.success(res.message)) {
                            window.location.reload();

                            this.props.history.push('/sellerlist');
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    onOpenModal = (event) => {
        const value = event.target;
        this.setState(
            { modelValue: event },
            () => console.log("1")
        );
        this.setState(
            { commission: event[1] },
            () => console.log(this.state)
        );
        this.setState({ open: true });
    };

    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        if (!fields.commission) {
            formIsValid = false;
            errors["commission"] = "Please commission stock.";
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    onCloseModal = () => {
        this.setState({ open: false });
    };
    render() {
        const { open } = this.state;
        return (
            <div style={styles}>
                <div >
                    <img onClick={() => this.onOpenModal(this.props.greeting)} style={{ width: 20, marginLeft: 10 }} className="logoheader" alt="ok" src={require('../img/calculate.png')} />
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className="modal-body">
                        <form onSubmit={this.handleSubmit}>
                            <div class="productsgrid">
                                <div class="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
                                    <img alt="" src="https://www.justori.com/justori/assets/images/11.gif" />
                                </div>
                                <div class="head-main"><h6>Add Commission</h6></div>
                                <div class="main-grid form-grd">
                                    <div class="fullfrm">
                                        <div>
                                            <div class="twoways">
                                                <div class="grpset">
                                                    <label class="mandtry"> Add Commission</label>
                                                    <div class="Inputs">
                                                        <input pattern="[0-9]{0,10}" maxLength="10" name="commission" class="uk-input" id="form-horizontal-text" type="text" placeholder="Commission" value={this.state.commission} onChange={this.handleChange2} />
                                                    </div>
                                                </div>
                                                <span style={{ color: "red" }}>{this.state.errors["commission"]}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="main-grid form-grd">
                                <div class="halffrms updatebtns">
                                    <div class="twoways">
                                        <button type="submit" class="uk-button uk-button-default">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}
export default Testing;
