import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import {Container, Row, Col} from 'reactstrap';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Common from '../../Class/Common';
import language from '../../language';
export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass:'',
            method: 0
        }
        this.loginFunction = this.loginFunction.bind(this);
    }

    componentWillMount() {
    }

    loginFunction(){
        Common.setLoad(1);
        Common.postData('api/auth/login',{
            tp_type: 'email',
            email: this.state.email,
            password: this.state.pass
        },(data)=>{
            if (data.data.token){
                let locate = "redirect/"+data.data.token;
                window.location=locate;
            }
            console.log(data)
            Common.setLoad(0);
        })
    }
    // regFunctionNormal(){
    //     Common.setLoad(1);
    //     Common.postData('api/reg',{
    //         tp_type: 'email',
    //         email: this.state.email,
    //     },(data)=>{
    //         if(data.error_code == 0){
    //             document.getElementById('reg-info-error').style.display = 'none';
    //             document.getElementById('reg-info').style.display = 'block';
    //         }else{
    //             document.getElementById('reg-info-error').style.display = 'block';
    //             document.getElementById('reg-info').style.display = 'none';
    //         }
    //         Common.setLoad(0);
    //     })
    // }

    // forgotFunction(){
    //     if (!this.state.email) {
    //         document.getElementById('email-info').style.display = 'block';
    //         document.getElementById('email-info-success').style.display = 'none';
    //         return;
    //     }
    //     Common.setLoad(1);
    //     Common.postData('api/forgot',{
    //         email: this.state.email,
    //     },(data)=>{
    //         if(data.error_code == 0){
    //             document.getElementById('email-wr').style.display = 'none';
    //             document.getElementById('email-info-success').style.display = 'block';
    //         }else{
    //             document.getElementById('email-wr').style.display = 'block';
    //             document.getElementById('email-info-success').style.display = 'none';
    //         }
    //         Common.setLoad(0);
    //     })
    // }

    render() {
        return (
            <Container id="login-container" className="body-container">
                <p>Karaoke<strong>Manager</strong></p>
                <input type='text'  placeholder='Email...' name='email' value={this.state.email} onChange={(event)=>this.setState({email: event.target.value})}/>
                <input type='password' name='pass' placeholder='Password...' value={this.state.pass} onChange={(event)=>this.setState({pass: event.target.value})}/>
                <button onClick={()=>this.loginFunction()}>Đăng Nhập</button>
            </Container>
        );
    }
}