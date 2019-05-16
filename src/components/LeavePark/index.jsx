import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import Horn from '@/common/Horn/index.jsx';
import CenterHighLight from '@/common/CenterHighLight/index.jsx';
import { withRouter } from "react-router-dom";
import {Tool,Het} from 'exhibition-tool';
import Form from './Form';
import LeaveStatistics from './LeaveStatistics';
import Toast from '@/common/Toast/index';
import LeaveCondition from './LeaveCondition';
import './style/index.less';  

@inject('LeaveParkStore')
@observer
class LeavePark extends Component {
    render() {
        let className = Tool.getCookie('className');          
        let { formData, barData, leaveData, toast } = this.props.LeaveParkStore;
        return ( 
            <div className="leavePark-wrapper"> 
                <div className="leavePark-title">{className}离园数据情况</div>
                <div className="leavePark-wrapper-top">
                    <CenterHighLight />
                    <Horn /> 
                    <LeaveStatistics leaveData={leaveData}/>
                    <LeaveCondition barData={barData}/>
                </div>
                <div className="leavePark-wrapper-bottom">
                    <CenterHighLight />
                    <Horn />
                    <Form formData={formData} /> 
                </div>
                <Toast toast={toast}/>  
            </div>  
        )
    } 
}   
export default withRouter(LeavePark); 