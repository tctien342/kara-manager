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
            thisBill: this.props.room,
            renderOrder: [],
            money: 0
        }

    }

    componentWillMount() {
        console.log(this.state.thisBill)
    }

    componentDidMount() {
        let renOder = [];
        let money = 0;
        renOder.push(<Row key='title'>
            <Col xs='4'><h5>Tên mặt hàng</h5></Col>
            <Col xs='3'><h5>Đơn giá</h5></Col>
            <Col xs='1'><h5>SL</h5></Col>
            <Col xs='4'><h5>Thàng tiền</h5></Col>
        </Row>)
        renOder.push(<Row key='time'>
        <Col xs='4'><h5>{this.state.thisBill.evens[0].prod.name}</h5></Col>
        <Col xs='3'><h5>{this.state.thisBill.evens[0].prod.value*this.state.thisBill.room.type.ratio}</h5></Col>
        <Col xs='1'><h5>{parseInt(this.props.time/60)}:{this.props.time%60}</h5></Col>
        <Col xs='4'><h5>{parseInt(this.state.thisBill.evens[0].prod.value*this.state.thisBill.room.type.ratio/60) * this.props.time} đ</h5></Col>
    </Row>)
        money += parseInt(this.state.thisBill.evens[0].prod.value*this.state.thisBill.room.type.ratio/60) * this.props.time;
        this.state.thisBill.evens.forEach(element => {
            if (element.prod.is_time != 1){
            renOder.push(<Row key={element.id}>
            <Col xs='4'><h5>{element.prod.name}</h5></Col>
            <Col xs='3'><h5>{element.prod.value}</h5></Col>
            <Col xs='1'><h5>{element.number}</h5></Col>
            <Col xs='4'><h5>{element.number*element.prod.value} đ</h5></Col>
        </Row>);
            money += element.number*element.prod.value;}
        });
        renOder.push(
            <Row key="sum" style={{width: '100%', textAlign: 'center', marginTop: '20px', marginBottom: '20px'}}>
                <Col xs='6'><h4>Tổng tiền</h4></Col>
                <Col xs='6'><h4>{money} đ</h4></Col>
            </Row>
        )
        this.setState({
            renderOrder: renOder,
            money: money
        })
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
                                    <Row>
                                        <Col xs='12'><h4 style={{width: '100%', textAlign: 'center', marginTop: '20px', marginBottom: '20px'}}>Thông tin order</h4></Col>
                                    </Row>
                                    <Row>
                                        <Col xs='12'>
                                            <Container>
                                                {this.state.renderOrder}
                                            </Container>
                                        </Col>
                                    </Row>
                                </Container>
                                <button className="bill-accept" onClick={()=>{
                                    Common.setLoad(1)
                                    Common.postData('api/post_paid_bill',{
                                        bill_id: this.state.thisBill.id,
                                        value: this.state.money
                                    }, (data2) => {
                                        this.props.onPaid();
                                        Common.setLoad(0)
                                    })
                                }}>Xác nhận</button>
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