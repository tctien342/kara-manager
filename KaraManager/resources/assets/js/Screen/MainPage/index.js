import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import {Container, Row, Col} from 'reactstrap';
import Common from '../../Class/Common';
import language from '../../language';
import Rooms from '../../Components/Rooms'
import setting from '../../setting'
export default class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            renderComponent: [],
            activeRoomData: [],
            renderRoom: []
        }
        this._main = this._main.bind(this)
    }

    componentWillMount() {}
    
    componentDidMount(){
        this.setState({
            renderComponent: this._main()
        })
    }

    _main(){
        return(
            <div className="body-main-container">
                    <Row><Col xs='12'><p className="header-Text-main">Kara<strong>Manager</strong></p></Col></Row>
                    <Row className="mainRow">
                        {setting.screen.graph && <Col xs='12' md='3'>
                            <button>
                                <i className="fas fa-chart-line"></i>
                                <h2>Thống kê</h2>
                            </button>
                        </Col>}
                        {setting.screen.state && <Col xs='12' md='3'>
                            <button onClick={()=>{
                                this.setState({
                                    renderComponent: <Rooms onBack={()=>{
                                        this.setState({
                                            renderComponent: this._main()
                                        })
                                    }}/>
                                })
                            }}>
                                <i className="fas fa-location-arrow"></i>
                                <h2>Trạng thái các phòng</h2>
                            </button>
                        </Col>}
                        {setting.screen.staff && <Col xs='12' md='3'>
                            <button>
                                <i className="fas fa-users"></i>
                                <h2>Nhân viên</h2>
                            </button>
                        </Col>}
                        {setting.screen.container && <Col xs='12' md='3'>
                            <button>
                                <i className="fas fa-clone"></i>
                                <h2>Kho hàng</h2>
                            </button>
                        </Col>}
                    </Row>
                </div>
        )
    }

    render() {
        return (
            <Container id="main-container" className="body-main-container">
                <button className="logout-button" onClick={()=>window.location = 'api/logout'}>Đăng xuất</button>
                {this.state.renderComponent}
            </Container>
        );
    }
}