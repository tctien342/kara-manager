import content from '../Assert/Js/content'
import setting from '../Assert/Js/setting'
import Status from '../Components/RoomStatus'
import Detail from '../Components/RoomDetail'
import React from 'react'
export default class RoomHandler{
    constructor(screen,manager){
        this.screen = screen
        this.manager = manager
        this.setting = setting
        this.content = content
        this.statusbar = {}
    }


    setPos(pos,callback){
        this.manager.update.statusRoom = false
        if (this.screen.state.pos != pos)
        this.screen.setState({
            pos: pos
        },()=>{
            if (pos != 'status') {
                this.roomRen(pos)
            }else{
                this.statusRen()
            }
            callback()
        })
    }

    statusRen(){
        this.render(<Status handler={this}/>)
    }

    roomRen(id){
        this.render(<Detail key={id} handler={this} id={id}/>)
    }

    render(screen,mode = 0){
        if (mode === 1){
            this.animationNext(()=>{
                this.screen.setState({
                    render: screen
                })
            })
        }else{
            this.animationBack(()=>{
                this.screen.setState({
                    render: screen
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
}