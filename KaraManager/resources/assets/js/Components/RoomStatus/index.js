import React from 'react';
import './index.css'
export default class RoomStatus extends React.Component {

    constructor(props){
        super(props);
        this.handler = this.props.handler
        this.state = {
           
        }
        this.handler.manager.update.statusRoom = true
    }

    componentDidMount(){
        this.renderBill()
        this.renderEmpty()
        this.updateValue()
    }

    componentWillUnmount(){
        this.handler.manager.update.statusRoom = false;
    }

    updateValue(){
        setTimeout(()=>{
            if (this.handler.manager.update.statusRoom){
                this.renderBill()
                this.updateValue()
            }
        },2000)
    }


    renderBill(){
        let result = []
        let bill = this.handler.manager.data.bill
        bill.forEach(ele => {
            let date = new Date(ele.created_at)
            result.push(
                <div key={ele.id} className="col-4 aroomContainer"
                    onClick={()=>this.handler.setPos(ele.room.id,()=>{this.handler.statusbar.renderRooms()})}
                >
                    <div className="roomActive container">
                        <div className="row">
                            <div className="col-12 contentInfo">
                                <h1>{ele.room.name}</h1>
                                <h2>{this.handler.manager.getValueOfBillWithDot(ele.id)} đ</h2>
                                <h3>{date.getHours()}:{this.handler.manager.checkTime(date.getMinutes())}</h3>
                                <h1 className="timeProdCardIndex">{ele.evens[0].prod.name}</h1>
                                <h1 className="roomType">{ele.room.type.name}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
        this.setState({roomActive: result})
    }

    renderEmpty(){
        let result = []
        let room = this.handler.manager.data.room
        room.forEach(ele => {
            if (ele.state != 1)
            result.push(
                <div key={ele.id} className="col-4 aroomContainer"
                    onClick={()=>this.handler.setPos(ele.id,()=>{this.handler.statusbar.renderRooms()})}
                >
                    <div className="roomEmpty container">
                        <div className="row">
                            <div className="col-12 contentInfo">
                                <h1>{ele.name}</h1>
                                <i className="fas fa-plus"></i>
                                <h1 className="roomType">{ele.type.name}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
        this.setState({roomEmpty: result})
    }

    render() {
        return (
            <div id="roomStatus">
                <div className="row">
                    <div className="col-12 roomStatusTitle">
                        <h1>Trạng thái các phòng</h1>
                    </div>
                </div>
                <div className="row">
                    {this.state.roomActive}
                    {this.state.roomEmpty}
                </div>
            </div>
        );
      }
}