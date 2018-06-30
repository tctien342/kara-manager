import React from 'react';
import roomHandler from '../../Handlers/roomHandler'
import './index.css'
import Active from '../../Components/ActiveBar'
export default class Package extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            pos: 'status',
            render: []
        }
        this.handler = new roomHandler(this,this.props.manager)
    }

    componentDidMount(){
        this.handler.body = document.getElementById('roomContent')
        this.handler.statusRen()
    }

    render() {
        return (
            <div id="RoomContainer">
                <Active handler={this.handler} pos={this.state.pos}/>
                <div id='roomContent' className="container">
                    {this.state.render}
                </div>
            </div>
        );
      }
}