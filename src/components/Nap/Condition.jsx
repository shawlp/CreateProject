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
        const { studentRecord, conditionBarData, sleepData, environment } = this.props; 

        const { enterData, tempertureData, bodyData, environmentData } = conditionBarData;

        let data1 = sleepData[0], data2 = sleepData[1];

        return (   
            <div className="condition-wrapper">
                <CenterHighLight />
                <Horn />  
                <div className="condition-left">
                    <div className="condition-item">
                        <span className="condition-item-top green">{data1.paramValue}</span>
                        <span className="condition-item-bottom">{data1.paramName}</span>
                    </div>
                    <div className="condition-item">
                        <span className="condition-item-top blue">{data2.paramValue}</span>
                        <span className="condition-item-bottom">{data2.paramName}</span>                    
                    </div>
                </div>     
                <div className="condition-center">      
                    <ConditionBar {...tempertureData}/> 
                    <ConditionBar {...bodyData}/>
                    <ConditionBar {...environmentData}/> 
                </div>
                <div className="condition-right">
                    {
                        environment.map((item, index) => {
                            return  <div className="environment-item" key={'item-'+index}>
                                <span>{item.paramName}：</span>
                                <span>{item.paramValue}{item.paramUnit}</span>
                                <span>{item.modelType}</span>
                            </div> 
                        })
                    }                               
                </div>                               
            </div>
        ); 
    }        
}

export default Condition;