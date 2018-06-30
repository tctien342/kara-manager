import React from 'react';
import './index.css'
export default class RoomDetail extends React.Component {

    constructor(props){
        super(props);
        this.handler = this.props.handler
        this.state = {
            room: {},
            bill: {},
            prod: {}
        }
        this.handler.manager.update.detail[this.props.id] = true
    }

    componentWillMount(){
        this.handler.manager.update.detail[this.props.id] = true
        this.initData()
    }

    componentDidMount(){
        if (this.state.bill.evens){
            this.updateValue()
            this.renderOrder()
            this.renderUsed()
        }
    }

    componentWillUnmount(){
        this.handler.manager.update.detail[this.props.id] = false
    }

    initData(){
        let data = this.handler.manager.data
        let room = {}
        let bill = {}
        let prod = []
        data.room.forEach(ele => {
            if (ele.id == this.props.id) room = ele;
            return
        });
        if (room.state == 1){
            data.bill.forEach(ele=>{
                if (ele.room.id == this.props.id)  bill = ele;
                return
            })
            bill.evens.forEach(ele=>{
                prod.push(ele.prod.id)
            })
        }
        this.setState({
            room: room,
            bill: bill,
            prod: prod
        })
    }

    updateValue(){
        setTimeout(()=>{
            if (this.handler.manager.update.detail[this.props.id] || false){
                this.initData()
                this.updateValue()
            }
        },2000)
    }

    renderUsed(){
        let prod = this.state.bill.evens
        let result = []
        prod.forEach(ele=>{
            if (!ele.prod.is_time)
            result.push(
                <div key={ele.id} className="col-3 aDetail">
                    <div>
                        <h1>{ele.prod.name}</h1>
                        <h2>{ele.number} cái</h2>
                    </div>
                </div>
            )
        })
        this.setState({
            renderUsed: result
        })
    }

    renderOrder(){
        let prod = this.handler.manager.data.prod
        let result = []
        prod.forEach(ele=>{
            if (!this.state.prod.includes(ele.id))
            result.push(
                <div key={ele.id} className="col-3 aDetail order">
                    <div>
                        <h1>{ele.name}</h1>
                        <h2>{ele.value.toLocaleString()} đ</h2>
                    </div>
                </div>
            )
        })
        this.setState({
            renderOrder: result
        })
    }
    

    render() {
        return (
            <div id="roomStatus">
                <div className="row">
                    <div className="col-12 roomStatusTitle">
                        <h1>Thông tin phòng {this.state.room.name}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 aDetail">
                        <div>
                            <h1>Loại phòng</h1>
                            <h2>{this.state.room.type.name}</h2>
                        </div>
                    </div>
                    {
                    this.state.bill.evens &&[
                        <div key="type" className="col-3 aDetail">
                            <div>
                                <h1>Loại gói giờ</h1>
                                <h2>{this.state.bill.evens[0].prod.name}</h2>
                            </div>
                        </div>,
                        <div key="time" className="col-3 aDetail">
                            <div>
                                <h1>Giờ mở cửa</h1>
                                <h2>{new Date(this.state.bill.created_at).getHours()}:{new Date(this.state.bill.created_at).getMinutes()}</h2>
                            </div>
                        </div>,
                        <div key="value" className="col-3 aDetail">
                            <div>
                                <h1>Thu nhập hiện tại</h1>
                                <h2>{this.handler.manager.getValueOfBillWithDot(this.state.bill.id)} đ</h2>
                            </div>
                        </div>
                        ]
                    }
                </div>
                {
                    this.state.bill.evens &&[
                        <div key="used" className="row">
                            <div className="col-12 roomStatusTitle">
                                <h1>Đã sử dụng</h1>
                            </div>
                        </div>, 
                        <div key="usedChild" className="row">
                            {this.state.renderUsed}
                        </div>
                        ,
                        <div key="order" className="row">
                            <div className="col-12 roomStatusTitle">
                                <h1>Gọi thêm</h1>
                            </div>
                        </div>, 
                        <div key="orderChild" className="row">
                            {this.state.renderOrder}
                        </div>
                    ]
                }
            </div>
        );
      }
}