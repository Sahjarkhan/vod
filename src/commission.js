import React from "react";
import Modal from "react-responsive-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faTachometerAlt, faUserCog, faShoppingBasket, faPowerOff, faRupeeSign } from '@fortawesome/free-solid-svg-icons'

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};

class Commission extends React.Component {
    constructor(props) {
        super(props);
        console.log("Props", props)
        this.state = {
            open: false
        }
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleSubmit = (event) => {
        console.log(event)
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };
    onCloseModal = () => {
        this.setState({ open: false });
    };
    render() {
        const { open } = this.state;
        return (
            <div style={styles}>
                <div >
                    <FontAwesomeIcon icon={faRupeeSign} />
                    <img onClick={() => this.onOpenModal(open)} style={{ width: 20, marginLeft: 10 }} className="logoheader" alt="ok" src={require('./img/calculate.png')} />
                </div>
                <Modal open={open} onClose={this.onCloseModal}>
                    <div className="modal-body">
                        <form onSubmit={this.handleSubmit}>
                            <div class="productsgrid">
                                <div class="loaderintlos" id="showloadintlo" style={{ display: this.state.showStore ? 'block' : 'none' }}>
                                    <img alt="" src="https://www.justori.com/justori/assets/images/11.gif" />
                                </div>
                                <div class="head-main"><h6>Commission</h6></div>
                                <div class="main-grid form-grd">
                                    <div class="fullfrm">
                                        <div>
                                            <div class="twoways">
                                                <div class="grpset">
                                                    <label class="mandtry">Commission</label>
                                                    <div class="Inputs">
                                                        <input maxLength="8" name="commission" class="uk-input" id="form-horizontal-text" type="text" placeholder="Commission" value={this.state.value} onChange={this.handleChange} />
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
export default Commission;
