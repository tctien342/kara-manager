import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import {Container, Row, Col} from 'reactstrap';
import Common from '../../Class/Common';
import language from '../../language';
import RoomDetail from '../RoomDetail'
export default class Rooms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            renderRoom: [],
            renderEmptyRoom: [],
            emptyR: [],
            selroom: 0,
            timeProd: [],
            renderTimeProd: [],
            seltime: 0,
            roomOpenRender: false,
            renderRoomOrder: []
        }
       // this._renderEmptyRoom = this._renderEmptyRoom.bind()
    }

    componentWillMount() {}
    
    componentDidMount(){
        this._dsPhong()
        this._renderEmptyRoom()
        this._renderTimeProd()
    }

    _dsPhong(state){
        Common.setLoad(1)
        Common.getData('api/ds_active_bill',(data)=>{
            this.setState({
                activeRoomData: data
            },()=>this._renderRooms())
            Common.setLoad(0)
        })
    }
    _renderRooms(){
        let result = []
        this.state.activeRoomData.forEach(ele=>{
            console.log(ele)
            let timeCreate = new Date(ele.created_at);
            let timeNow = new Date();
            let minus = Math.floor((timeNow.getTime() - timeCreate.getTime()) / 60000);
            let money = 0;
            ele.evens.forEach(even=>{
                money += even.prod.is_time == 0 && even.prod.value*even.number;
            })
            result.push(<Col xs='12' md='3' key={ele.id} className="a-room">
                <button className="a-room-card" onClick={()=>this._onClickRoom(ele)}>
                    <p><strong>{ele.room.name}</strong></p>
                    <p>Tạo bởi: {ele.staff.name}</p>
                    <p>Giờ vào: {ele.created_at}</p>
                    <p>Đã hát: {minus} Phút</p>
                    <p>Tạm tính: <strong>{parseInt(ele.value + minus*ele.evens[0].prod.value/60)*ele.room.type.ratio + money}đ</strong></p>
                    <p>Gói giá: {ele.evens[0].prod.name}</p>
                </button>
            </Col>)
        });
        this.setState({
            renderRoom: result
        })
    }

    
    _renderEmptyRoom(){
        Common.setLoad(1)
        Common.getData('api/ds_empty_room',(data)=>{
            this.setState({
                emptyR: data
            },()=>{
                let result = [];
                data.forEach(ele=>{
                    console.log(ele)
                    result.push(<Col xs='4' md='3' key={ele.id} className="a-empty-room">
                        <button onClick={()=>{this.setState({selroom: ele})}}>
                            <h3>{ele.name}</h3>
                            <h5>{ele.type.name}</h5>
                        </button>
                    </Col>)
                })
                this.setState({
                    renderEmptyRoom: result
                })
            })
            Common.setLoad(0)
        })
    }
    _renderTimeProd(){
        Common.setLoad(1)
        Common.getData('api/get_time_prod',(data)=>{
            this.setState({
                timeProd: data
            },()=>{
                let result = [];
                data.forEach(ele=>{
                    console.log(ele)
                    result.push(<Col xs='4' md='3' key={ele.id} className="a-empty-room">
                        <button onClick={()=>{this.setState({seltime: ele})}}>
                            <h3>{ele.name}</h3>
                            <h5>{ele.value}đ</h5>
                        </button>
                    </Col>)
                })
                this.setState({
                    renderTimeProd: result
                })
            })
            Common.setLoad(0)
        })
    }

    _makeRoom(){
        Common.setLoad(1)
        if(!this.state.selroom || !this.state.seltime) {
            Common.setLoad(0)
            return
        }
        Common.postData('api/post_make_bill',{
            room_id: this.state.selroom.id,
            time_id: this.state.seltime.id
        },(data)=>{
            this._renderEmptyRoom()
            this._dsPhong()
            Common.setLoad(0)
        })
    }

    _onClickRoom(room){
        this.setState({
            renderRoomOrder: <RoomDetail room={room} onBack={()=>this.setState({renderRoomOrder: []},()=>this._dsPhong())}/>
        })
    }

    render() {
        return (
            <Container id="main-container" className="body-main-container">
                {this.state.renderRoomOrder}
                <div className="body-main-container">
                    <button className="open-room" onClick={()=>this.setState({roomOpenRender: true},()=>{
                        this._renderEmptyRoom()
                    })}>Mở phòng</button>
                    <button onClick={()=>this.props.onBack()} className="back-menu">Về Menu</button>
                    <Container className="room-container">
                        <Row className="room-body">
                            <Col xs='12'><h2>Các phòng đang hoạt động</h2></Col>
                            {this.state.renderRoom}
                        </Row>
                    </Container>
                </div>
                {this.state.roomOpenRender && <div className="room-open-container">
                    <Container style={{height:'100%', padding: 0, margin: 0, maxWidth: '100%'}}>
                        <Row style={{height:'100%'}}>   
                            <Col xs='12' md='3' className="room-open-header-left">
                                <h1>Thông tin phòng</h1>
                                <p>Đang chọn: <strong>{this.state.selroom.name}</strong></p>
                                <p>Gói thời gian: <strong>{this.state.seltime.name}</strong></p>
                                <p>Loại phòng: <strong>{this.state.selroom&&this.state.selroom.type.name}</strong></p>
                                <p>Hệ số thời gian: <strong>{this.state.selroom && this.state.selroom.type.ratio}</strong></p>
                                <p>Giá tiền 1 giờ: <strong>{this.state.selroom && this.state.seltime.value*this.state.selroom.type.ratio}đ</strong></p>
                                <button className="create-button" onClick={()=>this._makeRoom()}>Tạo</button>
                                <button className="destroy-button" onClick={()=>{
                                    this.setState({
                                        roomOpenRender: false
                                    })
                                }}>Hủy</button>
                            </Col>
                            <Col xs='12' md='9' className="room-open-empty">
                                <Container style={{height:'100%', overflow: 'auto', paddingBottom: '100px'}}>
                                    <Row>
                                        <Col xs='12'><h3>Chọn phòng</h3></Col>
                                        {this.state.renderEmptyRoom}
                                    </Row>
                                    <Row>
                                        <Col xs='12'><h3>Chọn gói thời gian</h3></Col>
                                        {this.state.renderTimeProd}
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </div>}
            </Container>
        );
    }
}