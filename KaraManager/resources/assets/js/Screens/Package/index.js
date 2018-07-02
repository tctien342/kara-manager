import React from 'react';
import packageHanlder from '../../Handlers/packageHandler'
import './index.css'
import SettingBar from '../../Components/SettingBar'
export default class Package extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            pos: 'kho'
        }
        this.handler = new packageHanlder(this,this.props.manager)
    }

    componentDidMount(){
        this.handler.body = document.getElementById('roomContent')
    }

    render() {
        return (
            <div id="PackageContainer">
                <SettingBar key="settingBar" handler={this.handler} pos={this.state.pos}/>
                <div id='roomContent' className="container">
                    {this.state.render}
                </div>
            </div>
        );
      }
}