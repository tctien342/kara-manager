import React from 'react';
import './index.css'
export default class TimeProd extends React.Component {

    constructor(props){
        super(props);
        this.handler = this.props.handler
        this.state = {
           add: false
        }
        this.handler.manager.update.timeprod = true
    }

    componentDidMount(){
        this.updateValue()
        this.initProd()
    }

    componentWillUnmount(){
        this.handler.manager.update.timeprod = false;
    }

    updateValue(){
        setTimeout(()=>{
            if (this.handler.manager.update.timeprod){
                this.initProd()
                this.updateValue()
            }
        },2000)
    }

    initProd(){
        let data = this.handler.manager.data
        let result = []
        data.time.forEach(ele => {
            result.push(
                <div key={ele.id} className="col-3 aDetail aProd"
                 onClick={()=>{
                        this.setState({
                            name: ele.name,
                            prod_id: ele.id,
                            value: ele.value,
                        },()=>this.showEdit())
                    }}>
                    <div>
                        <h1>{ele.name}</h1>
                        <h2>{ele.value.toLocaleString()} đ</h2>
                    </div>
                </div>
            )
        });
        this.setState({
            renderProd: result
        })
    }

    showForm(){
        this.setState({
            add: true,
            name: '',
            value: '',
            number: ''
        },()=>{
            setTimeout(() => {
                document.getElementById('settingForm').style.opacity = 1;
            }, 5);
        })
    }

    showEdit(){
        this.setState({
            edit: true
        },()=>{
            setTimeout(() => {
                document.getElementById('settingForm').style.opacity = 1;
            }, 5);
        })
    }

    addProd(){
        let api = this.handler.manager.api
        if (this.state.name && this.state.value > 0)
        api.call_post('add_prod',{
            name: this.state.name,
            value: this.state.value,
            is_time: 1
        },(data)=>{
            this.setState({
                add: false
            },()=>api.initApi(()=>this.initProd()))
        })
    }

    editProd(){
        let api = this.handler.manager.api
        if (this.state.name && this.state.value > 0)
        api.call_post('edit_prod',{
            prod_id: this.state.prod_id,
            name: this.state.name,
            value: parseInt(this.state.value),
            is_time: 1
        },(data)=>{
            this.setState({
                edit: false
            },()=>api.initApi(()=>this.initProd()))
        })
    }

    delProd(){
        let api = this.handler.manager.api
        if (this.state.name && this.state.value > 0)
        api.call_post('edit_prod',{
            prod_id: this.state.prod_id,
            name: this.state.name,
            value: 0,
            is_time: 0
        },(data)=>{
            this.setState({
                edit: false
            },()=>api.initApi(()=>this.initProd()))
        })
    }

    render() {
        return (
            <div id="roomStatus">
                {this.state.add && 
                <div id="settingForm" className="settingFormContainer">
                    <div className="settingForm bigger">
                            <h1 key="prodName" className='prodName'>Thêm gói thời gian</h1>
                            <div key="editField" className="editField container">
                                <div className="row">
                                    <div className="col-12 prodForm">
                                        <input type="text" placeholder="Tên gói..." value={this.state.name || ''}
                                        onChange={(eve)=>{this.setState({name: eve.target.value})}}/>
                                        <input type="number" placeholder="Giá tiền..." value={this.state.value}
                                        onChange={(eve)=>{!eve.target.value? this.setState({value: 0}) : this.setState({value: eve.target.value})}}/>
                                    </div>
                                </div>
                            </div>
                            <button key="ok" onClick={()=>this.addProd()} className="okButton settingButton">OK</button>,
                            <button key="cancle" onClick={()=>this.setState({add: false})} className="huyButton settingButton">Hủy</button>
                        </div>
                </div>}
                {this.state.edit && 
                <div id="settingForm" className="settingFormContainer">
                    <div className="settingForm bigger">
                            <h1 key="prodName" className='prodName'>Điều chỉnh sản phẩm</h1>
                            <div key="editField" className="editField container">
                                <div className="row">
                                    <div className="col-12 prodForm">
                                        <input type="text" placeholder="Tên sản phẩm..." value={this.state.name || ''}
                                        onChange={(eve)=>{this.setState({name: eve.target.value})}}/>
                                        <input type="number" placeholder="Giá tiền..." value={this.state.value}
                                        onChange={(eve)=>{!eve.target.value? this.setState({value: 0}) : this.setState({value: eve.target.value})}}/>
                                    </div>
                                </div>
                            </div>
                            <button key="ok" onClick={()=>this.editProd()} className="okButton settingButton">OK</button>,
                            <button key="del" onClick={()=>this.delProd()} className="delButton settingButton">Xóa</button>,
                            <button key="cancle" onClick={()=>this.setState({edit: false})} className="huyButton settingButton">Hủy</button>
                        </div>
                </div>}
                <div className="row">
                    <div className="col-12 roomStatusTitle">
                        <h1>Các gói thời gian</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 aDetail order" onClick={()=>this.showForm()}>
                        <div>
                            <h1 className="addProd">+</h1>
                        </div>
                    </div>
                    {this.state.renderProd}
                </div>
            </div>
        );
      }
}