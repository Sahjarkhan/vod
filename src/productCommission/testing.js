import React from "react";
import Modal from "react-responsive-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faTachometerAlt, faUserCog, faShoppingBasket, faPowerOff, faRupeeSign, faNetworkWired } from '@fortawesome/free-solid-svg-icons'
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
            errors: {},
            commission: "",
            test: ""
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

        if (name === 'selling_price') {
            const re = /^[0-9]{0,10}$/i;
            if (value === '' || re.test(value)) {
                this.setState({ selling_price: value })
            } else {
                this.setState({
                    selling_price: '',
                }, () => {
                    this.setState(
                        { commissionPrice: '' },
                        () => console.log("this.state")
                    );
                    this.setState(
                        { tax: '' },
                        () => console.log("this.state")
                    );
                    this.setState(
                        { finalcommission: '' },
                        () => console.log("this.state1", this.state.finalcommission)
                    );
                    console.log(this.state)
                });

            }
        }
        if (name === 'selling_price' || value === 0 || value === '') {

            console.log("hello123" + "***************" + this.state.finalcommission)
            this.setState(
                { commissionPrice: '' },
                () => console.log("this.state")
            );
            this.setState(
                { tax: '' },
                () => console.log("this.state")
            );
            this.setState(
                { finalcommission: '' },
                () => console.log("this.finalcommission", "adfadf" + this.state.finalcommission)
            );
            console.log(this.state)



        }
        if (value == '') {
            this.setState({
                commissionPrice: '',
            });
            this.setState(
                { commissionPrice: '' },
                () => console.log("this.state")
            );
            this.setState(
                { tax: '' },
                () => console.log("this.state")
            );
            this.setState(
                { finalcommission: '' },
                () => console.log("this.state.finalcommission", this.state.finalcommission)
            );
        }

        if (name === 'selling_price' && value > 0) {
            this.setState({ test: 1 }, () => {
                var selling_price = this.state.selling_price;
                var Commission = this.state.Commission;
                var commissionPrice = ((selling_price * Commission) / 100);
                var tax = ((18 * commissionPrice) / 100);
                var final_commission = tax + selling_price + commissionPrice;
                this.setState(
                    { finalcommission: final_commission },
                    () => { console.log("this.state") }
                );
                this.setState({ commissionPrice: commissionPrice }, () => {
                    this.setState({ tax: tax }, () => {
                    })
                });
                this.setState({ test: "1" }, () => {
                    var finalcommission = (parseInt(selling_price) + parseInt(commissionPrice) + parseInt(tax));
                    this.setState(
                        { finalcommission: finalcommission },
                        () => console.log("this.state", finalcommission)
                    );
                });
            })
        }
    }
    handleSubmit = (event) => {
        var testing2 = {
            id: this.state.modelValue[0],
            commission: this.state.commissionPrice,
            gst: Math.floor(this.state.tax),
            sp: Math.floor(this.state.selling_price)
        }
        console.log(testing2)
        event.preventDefault();
        if (this.handleValidation()) {
            var amount = this.state.commission;
            fetch(`${config.Url}api/updateprice`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.modelValue[0],
                    gst: Math.floor(this.state.tax),
                    sp: Math.floor(this.state.selling_price),
                    sp: this.state.selling_price

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
        console.log(this.state.finalcommission)
        this.setState(
            { modelValue: event },
            () => console.log("this.state")
        );

        this.setState(
            { selling_price: event[1] },
            () => console.log("this.state")
        );
        this.setState(
            { Commission: event[2] },
            () => {
                // var selling_price = this.state.selling_price;
                // var Commission = this.state.Commission;
                // var commissionPrice = ((selling_price * Commission) / 100);
                // this.setState(
                //     { commissionPrice: commissionPrice },
                //     () => console.log(this.state)
                // );
                // var tax = ((18 * commissionPrice) / 100);
                // this.setState(
                //     { tax: tax },
                //     () => console.log(this.state)
                // );
                // var finalcommission = (selling_price + commissionPrice + tax);
                // this.setState(
                //     { finalcommission: finalcommission },
                //     () => console.log(this.state)
                // );

                var selling_price = this.state.selling_price;
                var Commission = this.state.Commission;
                console.log("selling_price", selling_price);
                console.log("Commission", Commission)
                var commissionPrice = ((selling_price * Commission) / 100);
                console.log("commissionPrice", commissionPrice)
                this.setState(
                    { commissionPrice: commissionPrice },
                    () => console.log("this.state")
                );

                console.log("commissionPrice", commissionPrice)
                var tax = ((18 * commissionPrice) / 100);
                console.log("tax", tax);

                this.setState(
                    { tax: tax },
                    () => console.log('helo')
                );
                this.setState({ test: "1" }, () => {
                    console.log("selling_priceQ", selling_price);
                    console.log("commissionPriceQ", commissionPrice);
                    console.log("taxQ", tax);
                    var finalcommission = selling_price + commissionPrice + tax;

                    this.setState(
                        { finalcommission: finalcommission },
                        () => console.log("this.state", finalcommission)
                    );
                });
            }
        );
        this.setState({ open: true });
    };

    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        if (!fields.selling_price) {
            formIsValid = false;
            errors["selling_price"] = "Please selling price stock.";
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
                                                    <label class="mandtry">Selling Price</label>
                                                    <div class="Inputs">
                                                        <input pattern="[0-9]{0,10}" maxLength="10" name="selling_price" class="uk-input" id="form-horizontal-text" type="text" value={this.state.selling_price} placeholder="Selling Price" onChange={this.handleChange2} />
                                                    </div>
                                                </div>
                                                <span style={{ color: "red" }}>{this.state.errors["selling_price"]}</span>
                                            </div>
                                            <div class="twoways">
                                                <div class="grpset">
                                                    <label class="mandtry">Commission</label>
                                                    <div class="Inputs">
                                                        <input disabled name="commission" class="uk-input" id="form-horizontal-text" type="text" placeholder="Commission" value={this.state.Commission} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="twoways">
                                                <div class="grpset">
                                                    <label class="mandtry">Tax</label>
                                                    <div class="Inputs">
                                                        <input disabled name="tax" class="uk-input" id="form-horizontal-text" type="text" value={this.state.tax} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="twoways">
                                                <div class="grpset">
                                                    <label class="mandtry">Final Amount</label>
                                                    <div class="Inputs">
                                                        <input disabled name="final_amount" class="uk-input" id="form-horizontal-text" type="text" value={this.state.finalcommission} />
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
