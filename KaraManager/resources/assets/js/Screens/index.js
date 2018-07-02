import React from 'react';
import screenHandler from '../Handlers/screenHandler.js'
import './index.css'
import Header from '../Components/Header'
import Login from '../Components/Login'
export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {pos: '', header: false, login: true, hours: new Date().getHours(), minutes: new Date().getMinutes()}
        this.handler = new screenHandler(this)
    }

    componentDidMount(){
        this.handler.initScreen()
        this.updateTimer()
    }

    updateTimer(){
        setTimeout(() => {
            this.setState({
                hours: new Date().getHours(), 
                minutes: new Date().getMinutes()
            })
            this.updateTimer()
        }, 1000);
    }

    

    render() {
        return (
            <div id="AppContainer">
                {this.state.login && <Login manager={this.handler}/>}
                <Header manager={this.handler} pos={this.state.pos} hidden={!this.state.header}/>
                <h1 className="systemClock">{this.state.hours}:{this.handler.checkTime(this.state.minutes)}</h1>
                <div id="BodyContainer">
                    {this.state.render}
                </div>
            </div>
        );
      }
}