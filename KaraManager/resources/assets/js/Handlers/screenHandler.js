import React from 'react';
import apiHandler from './apiHandler'
import content from '../Assert/Js/content'
import setting from '../Assert/Js/setting'
import Home from '../Screens/Home'
import Room from '../Screens/Room'
import Package from '../Screens/Package'
export default class ScreenHandler{
    constructor(screen){
        this.screen = screen
        this.setting = setting
        this.usertoken = window.token
        this.api = new apiHandler(this)
        this.content = content
        this.update = {
            statusRoom: false,
            detail: []
        }
        this.screens = {
           home: <Home manager={this}/>,
           room: <Room manager={this}/>,
           package: <Package manager={this}/>
        }
        this.data = {
            room: {
                active: [],
                empty: []
            },
            prod: [],
            time: [],
            bill: []
        }
    }

    render(namescreen,mode = 0){
        if (mode === 1){
            this.animationNext(()=>{
                this.screen.setState({
                    render: this.screens[namescreen]
                })
            })
        }else{
            this.animationBack(()=>{
                this.screen.setState({
                    render: this.screens[namescreen]
                })
            })
        }        
    }

    animationNext(callback){
        this.body.style.opacity = 0
        this.body.style.transition = 'none'
        setTimeout(() => {
            this.body.style.transform = 'translateX(100%)'
            setTimeout(()=>{
                this.body.style.opacity = 1
                this.body.style.transition = 'all .2s ease-in-out'
                callback()
                this.body.style.transform = 'translateX(0)'
            },100)
        }, 100);
    }
    animationBack(callback){
        this.body.style.opacity = 0
        this.body.style.transition = 'none'
        setTimeout(() => {
            this.body.style.transform = 'translateX(-100%)'
            setTimeout(()=>{
                this.body.style.opacity = 1
                this.body.style.transition = 'all .2s ease-in-out'
                callback()
                this.body.style.transform = 'translateX(0)'
            },100)
        }, 1);
    }

    initScreen(){
        this.body = document.getElementById('BodyContainer')
        if (this.usertoken.length > 0){
            this.api.initApi()
            document.getElementById('loginContainer').style.opacity = 0
            setTimeout(()=>{
                this.screen.setState({
                    login: false,
                    header: true,
                },()=>this.onChangePos('room'))
            },300)
        }
    }

    login(email,pass){
        this.api.loginFunction(email,pass,(data)=>{})
    }

    logout(){
        window.location = 'api/logout'
    }

    onChangePos(pos = 'home'){
        if (this.screen.state.pos !== pos)
        this.screen.setState({
            pos: pos
        },()=>{
            this.render(pos)
        })
    }

    getValueOfBillWithDot(id){
        let value = this.getValueOfBill(id).toLocaleString()
        return value
    }

    getValueOfBill(id){
        let bill = this.getBillByID(id)
        let result = 0
        let time = new Date()
        
        bill.evens.forEach(ele=>{
            if (ele.prod.is_time == 1){
                let valuePerMinute = ele.prod.value/60
                let minute = this.subTime(new Date(ele.created_at), time)
                result += Math.floor(valuePerMinute * minute)
            }else{
                result += ele.prod.value * ele.number
            }
        })
        return result
    }

    subTime(timeA, timeB){
        let miliseccond = timeA.getTime() - timeB.getTime()
        if (miliseccond < 0) miliseccond *= -1
        return miliseccond/(1000*60)
    }

    getBillByID(id){
        let result = {}
        this.data.bill.forEach(ele=>{
            if (ele.id == id) result = ele;else{
                return
            }
        })
        return result        
    }
}