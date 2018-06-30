import React from 'react';
import './index.css'
export default class Header extends React.Component {

    constructor(props){
        super(props);
        this.manager = this.props.manager
    }

    componentDidMount(){
        
    }


    render() {
        return (
            <div id="headerContainer" style={{left: this.props.hidden? '-100px' : '0px'}}>
                <button 
                onClick={()=>this.manager.onChangePos('home')}
                className={"headerButton " + (this.props.pos == 'home'? 'active':'')}>
                    <i className="fas fa-home"></i>
                </button>
                <button 
                onClick={()=>this.manager.onChangePos('room')}
                className={"headerButton " + (this.props.pos == 'room'? 'active':'')}>
                    <i className="fas fa-receipt"></i>
                </button>
                <button 
                onClick={()=>this.manager.onChangePos('package')}
                className={"headerButton " + (this.props.pos == 'package'? 'active':'')}>
                    <i className="fas fa-box"></i>
                </button>
                <button 
                onClick={()=>this.manager.logout()}
                className={"headerButton logoutButton"}>
                    <i className="fas fa-power-off"></i>
                </button>
            </div>
        );
      }
}