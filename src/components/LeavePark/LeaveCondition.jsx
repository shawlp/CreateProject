import React, { Component } from 'react';
import { observer } from 'mobx-react';
import LeaveConditionBar from './LeaveConditionBar';

@observer
class LeaveCondition extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        let {barData} = this.props;
        let { smallClass, middleClass, bigClass } = barData
        return <div className="leave-condition-content">
            <LeaveConditionBar {...smallClass}/>
            <LeaveConditionBar {...middleClass}/>
            <LeaveConditionBar {...bigClass}/> 
        </div> 
    }
}

export default LeaveCondition;