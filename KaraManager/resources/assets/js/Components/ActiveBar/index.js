import React from 'react';
import './index.css'
export default class ActiveBar extends React.Component {

    constructor(props){
        super(props);
        this.handler = this.props.handler
        this.handler.statusbar = this
        this.state = {}
    }

    componentDidMount(){
        this.renderRooms()
    }

    renderRooms(){
        let result = []
        let rooms = this.handler.manager.data.room
        rooms.forEach(ele => {
            result.push(
                <button 
                    key={ele.id}
                    onClick={()=>{this.handler.setPos(ele.id,()=>this.renderRooms())}}
                    className={"headerButton " + (this.props.pos == ele.id? 'activeThis':'') + (ele.state==1? ' opened' : ' open')}>
                        <h1>{ele.name}</h1>
                </button>
            )
        });
        this.setState({rooms: result})
    }


    render() {
        return (
            <div id="activeBarContainer">
                 <button 
                    onClick={()=>{this.handler.setPos('status',()=>this.renderRooms())}}
                    className={"headerButton status " + (this.props.pos == 'status'? 'activeThis':'')}>
                        <h1>STATUS</h1>
                </button>
               {this.state.rooms}
            </div>
        );
      }
}