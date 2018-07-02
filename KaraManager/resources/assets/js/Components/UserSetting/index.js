import React from 'react';
import './index.css'
export default class UserSetting extends React.Component {

    constructor(props){
        super(props);
        this.handler = this.props.handler
        this.state = {
           addType: false,
           editType: false,
        }
    }

    componentDidMount(){

    }

    componentWillUnmount(){
        
    }


    render() {
        return (
            <div id="roomStatus">
                <div className="row">
                    <div className="col-12 roomStatusTitle">
                        <h1>Quản lý nhân viên</h1>
                    </div>
                </div>
                <div className="centerSorry">
                <h1 className="sorryForThis">Chưa sẵn sàng...</h1>
                </div>
            </div>
        );
      }
}