import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import { withRouter } from "react-router-dom";
import LoginModule , { loginStore } from 'exhibition-login';
import './style/index.less';
import DiningContent from './DiningContent';
import Toast from './Toast';

@inject('DiningStore')
@observer
class DiningMenuRecom extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        if (loginStore.loginCheck()) {
            // 获取外部环境数据
            this.props.DiningStore.getExternaldata('shenzhen');     
        }           
    }
    render() { 
        let { conditionListData, kindergartenData, toast, weather } = this.props.DiningStore;
        return (
            <div className="dining">
                <p className="dining-title">智能菜谱推荐</p>
                <DiningContent weather={weather} conditionListData={conditionListData} kindergartenData={kindergartenData}/>
                <Toast toast={toast}/>    
            </div>
        )
    }
}   
export default withRouter(DiningMenuRecom);