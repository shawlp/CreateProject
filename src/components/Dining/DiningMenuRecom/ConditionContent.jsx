import React, { Component } from 'react';
import ConditionList from './ConditionList';

export default class ConditionContent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {conditionListData, weather} = this.props;
        let { growth, sport, agriculture } = conditionListData;

        return <div className="condition-content"> 
            <ConditionList {...growth}/>
            <ConditionList {...sport}/>
            <ConditionList {...weather}/>
            <ConditionList {...agriculture}/>
        </div>
    }
}