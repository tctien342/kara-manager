import React from 'react';
import './index.css'
export default class RoomDetail extends React.Component {

    constructor(props){
        super(props);
        this.handler = this.props.handler
        this.state = {
            room: {},
            bill: {},
            prod: {},
            form: false,
            sel: 0, //0 - prod, 1-bill
            number: 0,
            ele: [],
            timeSel: -1,
            paid: false
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
            prod: prod,
            renderTimeProd: []
        },()=>{
            if (bill.evens){
                this.renderOrder()
                this.renderUsed()
            }else{
                this.renderTimeProd()
            }
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
                <div key={ele.id} className="col-3 aDetail used"
                    onClick={()=>{
                        this.setState({
                            sel: 1,
                            ele: ele,
                            number: ele.number
                        },()=>this.showForm())}}>
                    <div>
                        <h1>{ele.prod.name}</h1>
                        <h2>{(ele.prod.value * ele.number).toLocaleString()} đ</h2>
                        <h3>{ele.number} cái</h3>
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
                <div key={ele.id} className="col-3 aDetail order"
                    onClick={()=>{
                            this.setState({
                                sel: 0,
                                ele: ele,
                                number: 0
                            },()=>this.showForm())}}>
                    <div>
                        <h1>{ele.name}</h1>
                        <h2>{ele.value.toLocaleString()} đ</h2>
                        <h3>Còn {ele.count} cái</h3>
                    </div>
                </div>
            )
        })
        this.setState({
            renderOrder: result
        })
    }

    renderTimeProd(){
        let result= []
        let timeProd = this.handler.manager.data.time
        timeProd.forEach(ele => {
            if (this.state.timeSel == ele.id){
                result.push(
                    <div key={ele.id} className="col-4">
                        <button key={ele.id+'button'} className="timeSelect timeActive">
                            <h1>{ele.name}</h1>
                            <h2>{(ele.value * this.state.room.type.ratio).toLocaleString()} đ</h2>
                        </button>
                    </div>
                )
            }else
            result.push(
                <div key={ele.id} className="col-4">
                    <button key={ele.id+'button'} className="timeSelect" onClick={()=>{
                        this.setState({
                            timeSel: ele.id
                        },()=>{this.renderTimeProd()})
                    }}>
                        <h1>{ele.name}</h1>
                        <h2>{(ele.value * this.state.room.type.ratio).toLocaleString()} đ</h2>
                    </button>
                </div>
            )
        });
        this.setState({
            renderTimeProd: result
        })
    }
    
    showForm(){
        this.setState({
            form: true
        },()=>{
            console.log(this.state)
            setTimeout(() => {
                document.getElementById('settingForm').style.opacity = 1;
            }, 5);
        })
    }

    showPaid(){
        //usedInBill
        let result = []
        let prod = this.state.bill.evens
        prod.forEach(ele=>{
            if (!ele.prod.is_time)
            result.push(
                <div key={ele.id} className="col-3 ainfoOfRoom">
                    <div className="aPaidInfo">
                        <h3>{ele.prod.name}</h3>
                        <h4>{(ele.number*ele.prod.value).toLocaleString()} đ</h4>
                        <h1>{ele.number} cái</h1>
                    </div>
                </div>
            )
        })
        this.setState({
            paid: true,
            usedInBill: result
        },()=>{
            console.log(this.state)
            setTimeout(() => {
                document.getElementById('settingForm').style.opacity = 1;
            }, 5);
        })
    }

    updateBill(){
        let api = this.handler.manager.api
        api.call_post('edit_even',{
            even_id: this.state.ele.id,
            number: this.state.number
        },(data)=>{
            api.initApi(()=>this.renderUsed())
            this.setState({form: false})
        })
    }

    openRoom(){
        let api = this.handler.manager.api
        api.call_post('make_bill',{
            room_id: this.state.room.id,
            time_id: this.state.timeSel
        },(data)=>{
            api.initApi(()=>{
                this.initData()
                this.updateValue()
            })
        })
    }

    addProd(){
        let api = this.handler.manager.api
        api.call_post('add_even',{
            bill_id: this.state.bill.id,
            prod_id: this.state.ele.id,
            number: this.state.number
        },(data)=>{
            api.initApi(()=>this.renderUsed())
            this.setState({form: false})
        })
    }

    paidThis(){
        this.handler.manager.update.detail[this.props.id] = false
        let api = this.handler.manager.api
        api.call_post('paid_bill',{
            bill_id: this.state.bill.id,
            value: this.handler.manager.getValueOfBill(this.state.bill.id)
        },(data)=>{
            this.setState({bill: {}, paid: false},()=>api.initApi(()=>this.initData()))
        })
    }

    render() {
        return (
            <div id="roomStatus" className="paddingBottom">
                {this.state.bill.evens && <button className="buttonPaid" onClick={()=>this.showPaid()}><i className="fas fa-money-bill"></i></button>}
                {this.state.form && <div id="settingForm" className="settingFormContainer">
                    <div className="settingForm">
                        {this.state.sel==1 && [
                        <h1 key="prodName" className='prodName'>{this.state.ele.prod.name}</h1>,
                        <h1 key="prodCount" className='prodCount'>Còn {this.state.ele.prod.count} cái</h1>,
                        <div key="editField" className="editField">
                            <button 
                            onClick={()=>this.setState({number: this.state.number + 1 < this.state.ele.prod.count? (this.state.number + 1) : this.state.number})}>+</button>
                            <input type='number' value={this.state.number} onChange={(eve)=>{!eve.target.value? this.setState({number: 0}) : this.setState({number: eve.target.value > this.state.ele.prod.count? parseInt(this.state.ele.prod.count) : parseInt(eve.target.value)})}}/>
                            <button
                            onClick={()=>this.setState({number: this.state.number - 1 >= 0? (this.state.number - 1) : this.state.number})}
                            >-</button>
                        </div>,
                        <button key="ok" onClick={()=>this.updateBill()} className="okButton settingButton">OK</button>,
                        <button key="del" onClick={()=>{
                            this.setState({number: 0},()=>this.updateBill())
                        }} className="delButton settingButton">Xóa</button>,
                        <button key="cancle" onClick={()=>{this.setState({form: false})}} className="huyButton settingButton">Hủy</button>
                        ]}
                        {this.state.sel==0 && [
                        <h1 key="prodName" className='prodName'>{this.state.ele.name}</h1>,
                        <h1 key="prodCount" className='prodCount'>Còn {this.state.ele.count} cái</h1>,
                        <div key="editField" className="editField">
                            <button 
                            onClick={()=>this.setState({number: this.state.number + 1 < this.state.ele.count? (this.state.number + 1) : this.state.number})}>+</button>
                            <input type='number' value={this.state.number} onChange={(eve)=>{!eve.target.value? this.setState({number: 0}) :this.setState({number: eve.target.value > this.state.ele.count? parseInt(this.state.ele.count) : parseInt(eve.target.value)})}}/>
                            <button
                            onClick={()=>this.setState({number: this.state.number - 1 >= 0? (this.state.number - 1) : this.state.number})}
                            >-</button>
                        </div>,
                        <button key="ok" onClick={()=>this.addProd()} className="okButton settingButton">OK</button>,
                        <button key="cancle" onClick={()=>{this.setState({form: false})}} className="huyButton settingButton">Hủy</button>
                        ]}
                    </div>
                </div>}
                {this.state.paid && <div id="settingForm" className="settingFormContainer">
                    <div className="settingForm bigger">
                        <h1 key="prodName" className='prodName'>Kiểm tra lại thanh toán</h1>
                        <div key="editField" className="editField container">
                            <div className="row">
                                <div className="col-3 ainfoOfRoom">
                                    <div className="aPaidInfo">
                                        <h3>Giờ vào</h3>
                                        <h4>{new Date(this.state.bill.created_at).getHours()}:{this.handler.manager.checkTime(new Date(this.state.bill.created_at).getMinutes())}</h4>
                                    </div>
                                </div>
                                <div className="col-3 ainfoOfRoom">
                                    <div className="aPaidInfo">
                                        <h3>Giờ ra</h3>
                                        <h4>{this.handler.manager.screen.state.hours}:{this.handler.manager.checkTime(this.handler.manager.screen.state.minutes)}</h4>
                                    </div>
                                </div>
                                <div className="col-3 ainfoOfRoom">
                                    <div className="aPaidInfo">
                                        <h3>Loại phòng</h3>
                                        <h4>{this.state.room.type.name}</h4>
                                    </div>
                                </div>
                                <div className="col-3 ainfoOfRoom">
                                    <div className="aPaidInfo">
                                        <h3>Tổng tiền</h3>
                                        <h4>{this.handler.manager.getValueOfBillWithDot(this.state.bill.id)} đ</h4>
                                    </div>
                                </div>
                                {this.state.usedInBill}
                            </div>
                        </div>
                        <button key="ok" onClick={()=>this.paidThis()} className="okButton settingButton">OK</button>,
                        <button key="cancle" onClick={()=>{this.setState({paid: false})}} className="huyButton settingButton">Hủy</button>
                    </div>
                </div>}
                {!this.state.bill.evens && <div id="openForm" className="openFormContainer container">
                        <div className="row">
                            <div className="col-12"><h1 className="timeSelectTitle">Chọn gói giờ</h1></div>
                        </div>
                        <div className="row centerItems">
                            {this.state.renderTimeProd}
                        </div>
                        <div className="row"><button 
                        onClick={()=>{if (this.state.timeSel != -1) this.openRoom()}}
                        className={this.state.timeSel>=0?"timeSelectButton" : 'timeSelectButtonHide'}>Mở phòng</button></div>
                </div>}
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
                                <h2>{new Date(this.state.bill.created_at).getDate()}/{new Date(this.state.bill.created_at).getMonth()+1}  {new Date(this.state.bill.created_at).getHours()}:{this.handler.manager.checkTime(new Date(this.state.bill.created_at).getMinutes())}</h2>
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