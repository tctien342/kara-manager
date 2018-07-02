import React from 'react';
import homeHanlder from '../../Handlers/homeHandler'
import './index.css'
export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {}
        this.handler = new homeHanlder(this,this.props.manager)
        this.handler.manager.update.home = true
    }

    componentDidMount(){
        this.calculateNowValue()
        this.updateValue()
        this.monthData()
    }

    componentWillUnmount(){
        this.handler.manager.update.home = false;
    }

    updateValue(){
        setTimeout(()=>{
            if (this.handler.manager.update.home){
                this.calculateNowValue()
                this.updateValue()
            }
        },2000)
    }

    monthData(){
        this.handler.manager.api.call_get('month',{},(data)=>{
            this.setState({
                this_month: parseInt(data.value).toLocaleString()
            })
        })
        let now = new Date().getMonth()
        let lastmonth = now - 1 < 0 ? 12 : now - 1;
        this.handler.manager.api.call_get('month',{month: lastmonth},(data)=>{
            this.setState({
                last_month: parseInt(data.value).toLocaleString()
            })
        })
    }

    calculateNowValue(){
        let bill = this.handler.manager.data.bill
        let value = 0
        bill.forEach(ele => {
            value += this.handler.manager.getValueOfBill(ele.id)
        });
        this.setState({value: value.toLocaleString()})
    }

    render() {
        return (
            <div id="HomeContainer">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>Thống kê</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 acard">
                            <div className="customCard activeRoom">
                                <h3>Số phòng đang hoạt động</h3>
                                <h1>{this.handler.manager.data.bill.length}</h1>
                            </div>
                        </div>
                        <div className="col-4 acard">
                            <div className="customCard emptyRoom">
                                <h3>Số phòng còn trống</h3>
                                <h1>{this.handler.manager.data.room.length - this.handler.manager.data.bill.length}</h1>
                            </div>
                        </div>
                        <div className="col-4 acard">
                            <div className="customCard product">
                                <h3>Số sản pẩm trong kho</h3>
                                <h1>{this.handler.manager.data.prod.length}</h1>
                            </div>
                        </div>
                        <div className="col-4 acard">
                            <div className="customCard activeRoom">
                                <h3>Dự thu hiện tại</h3>
                                <h2>{this.state.value} đ</h2>
                            </div>
                        </div>
                        <div className="col-4 acard">
                            <div className="customCard emptyRoom">
                                <h3>Thu nhập tháng này</h3>
                                <h2>{this.state.this_month} đ</h2>
                            </div>
                        </div>
                        <div className="col-4 acard">
                            <div className="customCard product">
                                <h3>Thu nhập tháng vừa rồi</h3>
                                <h2>{this.state.last_month} đ</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
      }
}