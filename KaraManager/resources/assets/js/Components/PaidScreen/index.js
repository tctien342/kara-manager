import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import {Container, Row, Col} from 'reactstrap';
import Common from '../../Class/Common';
import language from '../../language';
export default class PaidScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            thisBill: this.props.room
        }

    }

    componentWillMount() {
        console.log(this.state.thisBill)
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <Container id="main-container" className="room-detail-body-main-container paidScreen">
                <Row style={{height: '100%'}}>
                    <Col xs='12' style={{height: '100%'}}>
                        <div className="bill-container">
                            <div className="bill-body">
                                <h1>Xác nhận thanh toán</h1>
                                <Container>
                                    <Row>
                                        <Col xs='4'><h5>Tên phòng:</h5></Col>
                                        <Col xs='8'><h5>{this.state.thisBill && this.state.thisBill.room.name}</h5></Col>
                                    </Row>
                                    <Row>
                                        <Col xs='4'><h5>Loại phòng:</h5></Col>
                                        <Col xs='8'><h5>{this.state.thisBill && this.state.thisBill.room.type.name}</h5></Col>
                                    </Row>
                                    <Row>
                                        <Col xs='4'><h5>Loại giá:</h5></Col>
                                        <Col xs='8'><h5>{this.state.thisBill && this.state.thisBill.evens[0].prod.name}</h5></Col>
                                    </Row>
                                    <Row>
                                        <Col xs='4'><h5>Giờ mở phòng:</h5></Col>
                                        <Col xs='8'><h5>{this.state.thisBill && new Date(this.state.thisBill.created_at).toLocaleString()}</h5></Col>
                                    </Row>
                                    <Row>
                                        <Col xs='4'><h5>Giờ thanh toán:</h5></Col>
                                        <Col xs='8'><h5>{new Date().toLocaleString()}</h5></Col>
                                    </Row>
                                </Container>
                                <button className="bill-accept">Xác nhận</button>
                                <button className="bill-denied" onClick={()=>{
                                    this.props.onBack()
                                }}>Hủy</button>
                            </div>
                        </div>
                    </Col>
                </Row>  
            </Container>
        );
    }
}