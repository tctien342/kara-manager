import React from 'react';
import './index.css'
export default class SettingBar extends React.Component {

    constructor(props){
        super(props);
        this.handler = this.props.handler
        this.handler.statusbar = this
        this.state = {}
    }

    componentDidMount(){
        this.handler.setPos('kho')
    }


    render() {
        return (
            <div id="activeBarContainer">
                 <button 
                    onClick={()=>{this.handler.setPos('kho')}}
                    className={"headerButton status " + (this.props.pos == 'kho'? 'activeThis':'')}>
                        <h1>KHO</h1>
                </button>
                <button 
                    onClick={()=>{this.handler.setPos('time')}}
                    className={"headerButton status " + (this.props.pos == 'time'? 'activeThis':'')}>
                        <h1>GIỜ</h1>
                </button>
                <button 
                    onClick={()=>{this.handler.setPos('room')}}
                    className={"headerButton status " + (this.props.pos == 'room'? 'activeThis':'')}>
                        <h1>PHÒNG</h1>
                </button>
                <button 
                    onClick={()=>{this.handler.setPos('staf')}}
                    className={"headerButton status " + (this.props.pos == 'staf'? 'activeThis':'')}>
                        <h1>NHÂN VIÊN</h1>
                </button>
            </div>
        );
      }
}