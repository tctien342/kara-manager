import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import {Container, Row, Col} from 'reactstrap';
import Common from '../../Class/Common';
import language from '../../language';
export default class RoomDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            giaTien: 0,
            giaTienOrder: 0,
            thoiGianHat: 0,
            renderEven: [],
            renderProd: [],
            selEven: 0,
            count: 0,
            orderView: false,
            addOrderView: false,
            thisRoom: this.props.room
        }

    }

    componentWillMount() {
        let timeCreate = new Date(this.state.thisRoom.created_at);
        let timeNow = new Date();
        let minus = Math.floor((timeNow.getTime() - timeCreate.getTime()) / 60000);
        let money = 0;
        this
            .state
            .thisRoom
            .evens
            .forEach(even => {
                money += even.prod.is_time == 0 && even.prod.value * even.number;
            })
        this.setState({
            thoiGianHat: minus,
            giaTien: parseInt(
                this.state.thisRoom.value + this.state.thisRoom.room.type.ratio * minus * this.state.thisRoom.evens[0].prod.value / 60
            ) + money
        })
    }

    componentDidMount() {
        setTimeout(() => {
            let timeCreate = new Date(this.state.thisRoom.created_at);
            let timeNow = new Date();
            let minus = Math.floor((timeNow.getTime() - timeCreate.getTime()) / 60000);
            this.setState({
                thoiGianHat: minus,
                giaTien: parseInt(
                    this.state.thisRoom.value + this.state.thisRoom.room.type.ratio * minus * this.state.thisRoom.evens[0].prod.value / 60
                ) + this.state.giaTienOrder
            })
        }, 1000);
        this._renderEven();
        this._renderProd();
    }

    _renderEven() {
        let result = [];
        let money = 0;
        this
            .state
            .thisRoom
            .evens
            .forEach(ele => {
                if (ele.prod.is_time == 0) {
                    money += ele.prod.is_time == 0 && ele.prod.value * ele
                        .number
                        result
                        .push(
                            <Col xs='4' md='3' key={ele.id} className="a-empty-room">
                                <button
                                    onClick={() => {
                                        this.setState({selEven: ele.id, count: ele.number, orderView: true})
                                    }}>
                                    <h3>{ele.prod.name}</h3>
                                    <h5>{ele.number}
                                        cái</h5>
                                    <h5>{ele.prod.value*ele.number} đ</h5>
                                </button>
                            </Col>
                        )
                };
            });
        this.setState({renderEven: result, giaTienOrder: money},()=>{
            let timeCreate = new Date(this.state.thisRoom.created_at);
            let timeNow = new Date();
            let minus = Math.floor((timeNow.getTime() - timeCreate.getTime()) / 60000);
            this.setState({
                giaTien: parseInt(
                    this.state.thisRoom.value + this.state.thisRoom.room.type.ratio * minus * this.state.thisRoom.evens[0].prod.value / 60
                ) + this.state.giaTienOrder
            })
        })
    }

    _renderProd() {
        Common.setLoad(1)
        Common.getData('api/get_all_prod', (data) => {
            let result = [];
            data.forEach(ele => {
                console.log(ele)
                result.push(
                    <Col xs='4' md='3' key={ele.id} className="a-empty-room">
                        <button
                            onClick={() => {
                                this.setState({selEven: ele.id, count: 0, addOrderView: true})
                            }}>
                            <h3>{ele.name}</h3>
                            <h5>Còn {ele.count}
                                cái</h5>
                            <h5>{ele.value} đ/cái</h5>
                        </button>
                    </Col>
                )
            })
            this.setState({renderProd: result})
            Common.setLoad(0)
        })
    }

    _evenEditor() {
        Common.setLoad(1)
        Common.postData('api/post_edit_even', {
            even_id: this.state.selEven,
            number: this.state.count
        }, (data) => {
            Common.getData('api/get_bill?bill_id=' + this.state.thisRoom.id, (data2) => {
                this.setState({
                    thisRoom: data2,
                    orderView: false
                }, () => {
                    this._renderEven()
                    this._renderProd()
                    Common.setLoad(0)
                })
            })
        })
    }
    _evenAdd() {
        Common.setLoad(1)
        Common.postData('api/post_add_even', {
            prod_id: this.state.selEven,
            number: this.state.count,
            bill_id: this.state.thisRoom.id
        }, (data) => {
            Common.getData('api/get_bill?bill_id=' + this.state.thisRoom.id, (data2) => {
                this.setState({
                    thisRoom: data2,
                    addOrderView: false
                }, () => {
                    this._renderEven()
                    this._renderProd()
                    Common.setLoad(0)
                })
            })
        })
    }

    _paid(){
        Common.setLoad(1)
        Common.postData('api/post_paid_bill',{
            bill_id: this.state.thisRoom.id,
            value: this.state.giaTien
        }, (data2) => {
            this.props.onBack();
            Common.setLoad(0)
        })
    }

    render() {
        return (
            <Container id="main-container" className="room-detail-body-main-container">
                {
                    this.state.addOrderView && <div className="order-view">
                            <div className="order-view-child">
                                <Container
                                    style={{
                                        height: '100%'
                                    }}
                                    className='order-view-container'>
                                    <Row
                                        style={{
                                            width: '100%'
                                        }}>
                                        <Col xs='2'>
                                            <i
                                                className="fas fa-plus"
                                                onClick={() => this.setState({
                                                    count: this.state.count + 1
                                                })}></i>
                                        </Col>
                                        <Col xs='8'>
                                            <input
                                                type='number'
                                                name='number'
                                                value={this.state.count}
                                                onChange={(event) => this.setState({count: event.target.value})}/>
                                        </Col>
                                        <Col xs='2'>
                                            <i
                                                className="fas fa-minus"
                                                onClick={() => this.setState({
                                                    count: this.state.count > 0 && this.state.count - 1
                                                })}></i>
                                        </Col>
                                    </Row>
                                    <Row
                                        style={{
                                            width: '100%'
                                        }}>
                                        <Col xs='6'>
                                            <button
                                                style={{
                                                    color: 'green'
                                                }}
                                                onClick={() => this._evenAdd()}>Xác nhận</button>
                                        </Col>
                                        <Col xs='6'>
                                            <button
                                                style={{
                                                    color: 'red'
                                                }}
                                                onClick={() => this.setState({addOrderView: false})}>Hủy</button>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                }
                {
                    this.state.orderView && <div className="order-view">
                            <div className="order-view-child">
                                <Container
                                    style={{
                                        height: '100%'
                                    }}
                                    className='order-view-container'>
                                    <Row
                                        style={{
                                            width: '100%'
                                        }}>
                                        <Col xs='2'>
                                            <i
                                                className="fas fa-plus"
                                                onClick={() => this.setState({
                                                    count: this.state.count + 1
                                                })}></i>
                                        </Col>
                                        <Col xs='8'>
                                            <input
                                                type='number'
                                                name='number'
                                                value={this.state.count}
                                                onChange={(event) => this.setState({count: event.target.value})}/>
                                        </Col>
                                        <Col xs='2'>
                                            <i
                                                className="fas fa-minus"
                                                onClick={() => this.setState({
                                                    count: this.state.count > 0 && this.state.count - 1
                                                })}></i>
                                        </Col>
                                    </Row>
                                    <Row
                                        style={{
                                            width: '100%'
                                        }}>
                                        <Col xs='6'>
                                            <button
                                                style={{
                                                    color: 'green'
                                                }}
                                                onClick={() => this._evenEditor()}>Xác nhận</button>
                                        </Col>
                                        <Col xs='6'>
                                            <button
                                                style={{
                                                    color: 'red'
                                                }}
                                                onClick={() => this.setState({orderView: false})}>Hủy</button>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                }
                <Row className="room-detail-container">
                    <Col xs='12' md='3' className="room-open-header-left">
                        <h1>Thông tin phòng</h1>
                        <p>Mở lúc:
                            <strong>{this.state.thisRoom.created_at}</strong>
                        </p>
                        <p>Phòng:
                            <strong>{this.state.thisRoom.room.name}</strong>
                        </p>
                        <p>Gói thời gian:
                            <strong>{
                                    this
                                        .props
                                        .room
                                        .evens[0]
                                        .prod
                                        .name
                                }</strong>
                        </p>
                        <p>Loại phòng:
                            <strong>{this.state.thisRoom.room.type.name}</strong>
                        </p>
                        <p>Hệ số thời gian:
                            <strong>{this.state.thisRoom.room.type.ratio}</strong>
                        </p>
                        <p>Giá tiền 1 giờ:
                            <strong>{
                                    this
                                        .props
                                        .room
                                        .evens[0]
                                        .prod
                                        .value * this.state.thisRoom.room.type.ratio
                                }đ</strong>
                        </p>
                        <p className="big-value">Giá tiền hiện tại:
                            <strong>{this.state.giaTien}đ</strong>
                        </p>
                        <p>Đã hát:
                            <strong>{this.state.thoiGianHat}
                                phút</strong>
                        </p>
                        <button className="create-button" onClick={() => this._paid()}>Thanh toán</button>
                        <button className="destroy-button" onClick={() => this.props.onBack()}>Trở lại</button>
                    </Col>
                    <Col xs='12' md='9' className="room-open-empty">
                        <Container
                            style={{
                                height: '100%',
                                overflow: 'auto'
                            }}>
                            <Row>
                                <Col xs='12'>
                                    <h3>Các món đã gọi</h3>
                                </Col>
                                {this.state.renderEven}
                            </Row>
                            <Row>
                                <Col xs='12'>
                                    <h3>Gọi thêm</h3>
                                </Col>
                                {this.state.renderProd}
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}