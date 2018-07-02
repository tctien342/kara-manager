import React from 'react';
import './index.css'
export default class SettingRoom extends React.Component {

    constructor(props){
        super(props);
        this.handler = this.props.handler
        this.state = {
           addType: false,
           editType: false,
        }
        this.handler.manager.update.roomSetting = true
    }

    componentDidMount(){
        this.updateValue()
        this.initProd()
        this.initType()
    }

    componentWillUnmount(){
        this.handler.manager.update.roomSetting = false;
    }

    updateValue(){
        setTimeout(()=>{
            if (this.handler.manager.update.roomSetting){
                this.initProd()
                this.updateValue()
            }
        },2000)
    }

    initProd(){
        let data = this.handler.manager.data
        let result = []
        data.room.forEach(ele => {
            result.push(
                <div key={ele.id} className="col-3 aDetail aProd"
                 onClick={()=>{
                        this.setState({
                            room_name: ele.name,
                            room_id: ele.id,
                            room_type: ele.type.id,
                        },()=>this.showEditRoom())
                    }}>
                    <div>
                        <h1>{ele.name}</h1>
                        <h2>Loại {ele.type.name}</h2>
                    </div>
                </div>
            )
        });
        this.setState({
            renderRoom: result
        })
    }

    initType(){
        this.handler.manager.api.call_get('room_type',{},(data)=>{
            let result = []
            this.type = data
            data.forEach(ele => {
                result.push(
                    <div key={ele.id} className="col-3 aDetail aProd"
                     onClick={()=>{
                            this.setState({
                                type_id: ele.id,
                                type_name: ele.name,
                                type_ratio: ele.ratio
                            },()=>this.showEditType())
                        }}>
                        <div>
                            <h1>{ele.name}</h1>
                            <h2>x{ele.ratio} Giá</h2>
                        </div>
                    </div>
                )
            });
            this.setState({
                renderType: result
            })
        })
    }

    showFormType(){
        this.setState({
            addType: true,
            type_name: '',
            type_ratio: '',
        },()=>{
            setTimeout(() => {
                document.getElementById('settingForm').style.opacity = 1;
            }, 5);
        })
    }

    showEditType(){
        this.setState({
            editType: true
        },()=>{
            setTimeout(() => {
                document.getElementById('settingForm').style.opacity = 1;
            }, 5);
        })
    }
    showFormRoom(){
        this.setState({
            addRoom: true,
            room_name: '',
            room_type: 1,
        },()=>{
            this.renderTypeOfRoom()
            setTimeout(() => {
                document.getElementById('settingForm').style.opacity = 1;
            }, 5);
        })
    }
    renderTypeOfRoom(){
        let result = []
        this.type.forEach(ele => {
            result.push(
                <div key={ele.id} className={"col-3 aDetail aProd "+(this.state.room_type == ele.id? 'activeAProd':'')}
                     onClick={()=>{
                            this.setState({
                                room_type: ele.id
                            },()=>this.renderTypeOfRoom())
                        }}>
                        <div>
                            <h1>{ele.name}</h1>
                            <h2>x{ele.ratio} Giá</h2>
                        </div>
                    </div>
            )
        });
        this.setState({
            typeofroom: result
        })

    }

    showEditRoom(){
        this.setState({
            editRoom: true
        },()=>{
            this.renderTypeOfRoom()
            setTimeout(() => {
                document.getElementById('settingForm').style.opacity = 1;
            }, 5);
        })
    }

    addType(){
        let api = this.handler.manager.api
        if (this.state.type_name && this.state.type_ratio > 0)
        api.call_post('add_type_room',{
            name: this.state.type_name,
            ratio: parseFloat(this.state.type_ratio),
        },(data)=>{
            this.setState({
                addType: false
            },()=>this.initType())
        })
    }

    editType(){
        let api = this.handler.manager.api
        console.log(this.state)
        if (this.state.type_id && this.state.type_ratio > 0)
        api.call_post('edit_room_type',{
            type_id: this.state.type_id,
            name: this.state.type_name,
            ratio: parseFloat(this.state.type_ratio),
            del: false
        },(data)=>{
            this.setState({
                editType: false
            },()=>this.initType())
        })
    }

    delType(){
        let api = this.handler.manager.api
        if (this.state.type_id)
        api.call_post('edit_room_type',{
            type_id: this.state.type_id,
            del: true
        },(data)=>{
            this.setState({
                editType: false
            },()=>this.initProd())
        })
    }

    addRoom(){
        let api = this.handler.manager.api
        if (this.state.room_name && this.state.room_type > 0)
        api.call_post('add_room',{
            name: this.state.room_name,
            type_id: this.state.room_type,
        },(data)=>{
            this.setState({
                addRoom: false
            },()=>api.initApi(()=>this.initProd()))
        })
    }

    editRoom(){
        let api = this.handler.manager.api
        if (this.state.room_id && this.state.room_type > 0)
        api.call_post('edit_room',{
            room_id: this.state.room_id,
            name: this.state.room_name,
            type_id: this.state.room_type,
            del: false
        },(data)=>{
            this.setState({
                editRoom: false
            },()=>api.initApi(()=>this.initProd()))
        })
    }

    delRoom(){
        let api = this.handler.manager.api
        if (this.state.room_id)
        api.call_post('edit_room',{
            room_id: this.state.room_id,
            del: true
        },(data)=>{
            this.setState({
                editRoom: false
            },()=>api.initApi(()=>this.initProd()))
        })
    }

    render() {
        return (
            <div id="roomStatus">
                {this.state.addType && 
                <div id="settingForm" className="settingFormContainer">
                    <div className="settingForm bigger">
                            <h1 key="prodName" className='prodName'>Thêm loại phòng</h1>
                            <div key="editField" className="editField container">
                                <div className="row">
                                    <div className="col-12 prodForm">
                                        <input type="text" placeholder="Tên loại..." value={this.state.type_name || ''}
                                        onChange={(eve)=>{this.setState({type_name: eve.target.value})}}/>
                                        <input type="number" placeholder="Tỷ giá..." value={this.state.type_ratio}
                                        onChange={(eve)=>{!eve.target.value? this.setState({type_ratio: 0}) : this.setState({type_ratio: eve.target.value})}}/>
                                    </div>
                                </div>
                            </div>
                            <button key="ok" onClick={()=>this.addType()} className="okButton settingButton">OK</button>,
                            <button key="cancle" onClick={()=>this.setState({addType: false})} className="huyButton settingButton">Hủy</button>
                        </div>
                </div>}
                {this.state.editType && 
                <div id="settingForm" className="settingFormContainer">
                    <div className="settingForm bigger">
                            <h1 key="prodName" className='prodName'>Điều chỉnh loại</h1>
                            <div key="editField" className="editField container">
                                <div className="row">
                                    <div className="col-12 prodForm">
                                        <input type="text" placeholder="Tên loại..." value={this.state.type_name || ''}
                                        onChange={(eve)=>{this.setState({name: eve.target.value})}}/>
                                        <input type="number" placeholder="Tỷ giá..." value={this.state.type_ratio}
                                        onChange={(eve)=>{!eve.target.value? this.setState({type_ratio: 0}) : this.setState({type_ratio: eve.target.value})}}/>
                                    </div>
                                </div>
                            </div>
                            <button key="ok" onClick={()=>this.editType()} className="okButton settingButton">OK</button>,
                            <button key="del" onClick={()=>this.delType()} className="delButton settingButton">Xóa</button>,
                            <button key="cancle" onClick={()=>this.setState({editType: false})} className="huyButton settingButton">Hủy</button>
                        </div>
                </div>}
                {this.state.addRoom && 
                <div id="settingForm" className="settingFormContainer">
                    <div className="settingForm bigger">
                            <h1 key="prodName" className='prodName'>Thêm phòng</h1>
                            <div key="editField" className="editField container">
                                <div className="row">
                                    <div className="col-12 prodForm">
                                        <input type="text" placeholder="Tên phòng..." value={this.state.room_name || ''}
                                        onChange={(eve)=>{this.setState({room_name: eve.target.value})}}/>
                                    </div>
                                    {this.state.typeofroom}
                                </div>
                            </div>
                            <button key="ok" onClick={()=>this.addRoom()} className="okButton settingButton">OK</button>,
                            <button key="cancle" onClick={()=>this.setState({addRoom: false})} className="huyButton settingButton">Hủy</button>
                        </div>
                </div>}
                {this.state.editRoom && 
                <div id="settingForm" className="settingFormContainer">
                    <div className="settingForm bigger">
                            <h1 key="prodName" className='prodName'>Điều chỉnh phòng</h1>
                            <div key="editField" className="editField container">
                                <div className="row">
                                    <div className="col-12 prodForm">
                                        <input type="text" placeholder="Tên phòng..." value={this.state.room_name || ''}
                                        onChange={(eve)=>{this.setState({room_name: eve.target.value})}}/>
                                    </div>
                                    {this.state.typeofroom}
                                </div>
                            </div>
                            <button key="ok" onClick={()=>this.editRoom()} className="okButton settingButton">OK</button>,
                            <button key="del" onClick={()=>this.delRoom()} className="delButton settingButton">Xóa</button>,
                            <button key="cancle" onClick={()=>this.setState({editRoom: false})} className="huyButton settingButton">Hủy</button>
                        </div>
                </div>}
                <div className="row">
                    <div className="col-12 roomStatusTitle">
                        <h1>Cài đặt phòng</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 roomSettingTypeTitle">
                        <h1>Các loại phòng</h1>
                    </div>
                    <div className="col-3 aDetail order" onClick={()=>this.showFormType()}>
                        <div>
                            <h1 className="addProd">+</h1>
                        </div>
                    </div>
                    {this.state.renderType}
                </div>
                <div className="row">
                    <div className="col-12 roomSettingTypeTitle">
                        <h1>Các phòng hiện có</h1>
                    </div>
                    <div className="col-3 aDetail order" onClick={()=>this.showFormRoom()}>
                        <div>
                            <h1 className="addProd">+</h1>
                        </div>
                    </div>
                    {this.state.renderRoom}
                </div>
            </div>
        );
      }
}