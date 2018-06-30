import React from 'react';
import packageHanlder from '../../Handlers/packageHandler'
import './index.css'
export default class Package extends React.Component {

    constructor(props){
        super(props);
        this.state = {}
        this.handler = new packageHanlder(this,this.props.manager)
    }

    componentDidMount(){
        
    }

    render() {
        return (
            <div id="PackageContainer">

            </div>
        );
      }
}