import React from 'react';
import homeHanlder from '../../Handlers/homeHandler'
import './index.css'
export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {}
        this.handler = new homeHanlder(this,this.props.manager)
    }

    componentDidMount(){
        
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
                    </div>
                </div>
            </div>
        );
      }
}