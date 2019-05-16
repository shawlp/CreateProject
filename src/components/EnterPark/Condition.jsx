import React, { Component } from 'react';
import Horn from '../../common/Horn/index.jsx';
import CenterHighLight from '../../common/CenterHighLight/index.jsx';
import ConditionBar from './ConditionBar/index.jsx';
import { observer, inject } from 'mobx-react';  

@observer
class Condition extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { studentRecord, conditionBarData } = this.props;

        const { studentTotal, studentEnterTotal, tempertureAbnormalTotal, epidemicTotal } = studentRecord;

        const { enterData, tempertureData, bodyData, environmentData } = conditionBarData;

        return (   
            <div className="condition-wrapper">
                <CenterHighLight />
                <Horn />  
                <div className="condition-left">
                    <p>
                        <span className="margin53">入园学生:</span>
                        <span className="font">{studentEnterTotal}</span>
                        <span>人/</span>
                        <span className="font">{studentTotal}</span>
                        <span>人</span>
                    </p>
                    <p>
                        <span className="margin53">体温异常:</span>
                        <span className="font">{tempertureAbnormalTotal}</span>
                        <span>人</span> 
                    </p>
                    <p>
                        <span className="margin35">流行病登记:</span>
                        <span className="font">{epidemicTotal}</span>
                        <span>人</span>
                    </p>
                </div>     
                <div className="condition-right">  
                    <ConditionBar {...enterData}/>
                    <ConditionBar {...tempertureData}/>
                    <ConditionBar {...bodyData}/>
                    <ConditionBar {...environmentData}/> 
                </div>                              
            </div>
        ); 
    }        
}

export default Condition;