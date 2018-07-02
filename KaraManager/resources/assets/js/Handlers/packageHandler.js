import content from '../Assert/Js/content'
import setting from '../Assert/Js/setting'
import InStock from '../Components/InStock'
import TimeProd from '../Components/TimeProd'
import React from 'react'
export default class PackageHandler{
    constructor(screen,manager){
        this.screen = screen
        this.manager = manager
        this.setting = setting
        this.content = content
        this.screenlist = {
            kho: <InStock handler={this}/>,
            time: <TimeProd handler={this}/>,
            room: <InStock handler={this}/>,
            staf: <InStock handler={this}/>
        }
    }

    setPos(pos,callback = ()=>{}){
        this.screen.setState({
            pos: pos
        },()=>{
            this.render(this.screenlist[pos])
            callback()
        }) 
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