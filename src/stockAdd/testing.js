import React from "react";
import Modal from "react-responsive-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faTachometerAlt, faUserCog, faShoppingBasket, faPowerOff, faRupeeSign } from '@fortawesome/free-solid-svg-icons'
import config from './config/config';
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
        }
        this.handleChange2 = this.handleChange2.bind(this)
    }

    state = {
        open: false
    };

    onOpenModal = (event) => {
        const value = event.target;
        console.log(event);
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
    handleChange2(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
  
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.stock)
        var id = this.state.modelValue[0];
        console.log(id);
        fetch(`${config.Url}api/updatestock`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.modelValue[0],
                stock: this.state.stock,
            }),
        }).then((response) => response.json())
            .then((res) => {
                if (res.status === 'FAILURE') {
                    toast.error(res.message);
                } else {
                    if (toast.success(res.message)) {
                        window.location.reload();
                        this.props.history.push('/product');
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { open } = this.state;
        return (
            <div style={styles}>
                <div >
                    <FontAwesomeIcon icon={faRupeeSign} />
                    {this.props.greeting}
                    <img onClick={() => this.onOpenModal(this.props.greeting)} style={{ width: 20, marginLeft: 10 }} className="logoheader" alt="ok" src={require('./img/calculate.png')} />
                </div>
                <Modal open={open} onClose={this.onCloseModal}>
                    <div className="modal-body">
                        <form onSubmit={this.handleSubmit}>
                            <div class="productsgrid">
                                <div class="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
                                    <img alt="" src="https://www.justori.com/justori/assets/images/11.gif" />
                                </div>
                                <div class="head-main"><h6>Add STOCK</h6></div>
                                <div class="main-grid form-grd">
                                    <div class="fullfrm">
                                        <div>
                                            <div class="twoways">
                                                <div class="grpset">
                                                    <label class="mandtry">STOCK</label>
                                                    <div class="Inputs">
                                                        <input maxLength="10" name="stock" class="uk-input" id="form-horizontal-text" type="text" placeholder="STOCK" value={this.state.stock} onChange={this.handleChange2} />
                                                    </div>
                                                </div>
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
