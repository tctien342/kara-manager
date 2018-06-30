import React from 'react';
import screenHandler from '../Handlers/screenHandler.js'
import './index.css'
import Header from '../Components/Header'
import Login from '../Components/Login'
export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {pos: 'home', header: false, login: true}
        this.handler = new screenHandler(this)
    }

    componentDidMount(){
        this.handler.initScreen()
    }

    render() {
        return (
            <div id="AppContainer">
                {this.state.login && <Login manager={this.handler}/>}
                <Header manager={this.handler} pos={this.state.pos} hidden={!this.state.header}/>
                <h1 className="systemClock">{new Date().getHours()}:{new Date().getMinutes()}</h1>
                <div id="BodyContainer">
                    {this.state.render}
                </div>
            </div>
        );
      }
}