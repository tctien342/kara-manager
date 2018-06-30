import React from 'react';
import './index.css'
export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email:'',
            password: ''
        }
        this.manager = this.props.manager
    }

    componentDidMount(){
        
    }


    render() {
        return (
            <div id="loginContainer">
                <img src={require('../../Assert/Images/loginB.jpg')}/>
                <div id="loginField">
                    <h3>Đăng nhập</h3>
                    <input type='email' placeholder='Tên tài khoản' onChange={(eve)=>{this.setState({email: eve.target.value})}}/>
                    <input type='password' placeholder='Mật khẩu' onChange={(eve)=>{this.setState({password: eve.target.value})}}/>
                    <button onClick={()=>this.manager.login(this.state.email,this.state.password)}>Đăng nhập</button>
                </div>
            </div>
        );
      }
}