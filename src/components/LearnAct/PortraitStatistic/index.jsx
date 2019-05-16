import React, { Component } from 'react';
import './index.less';
import StatisticBar from '../StatisticBar';
import { observer } from 'mobx-react';

@observer
class PortraitStatistic extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {statisticBarData, activeIndex } = this.props;
        const { staticData, dynamicData, singleData, broadData } = statisticBarData;

        return <div className="portrait-statistic-content">
            <StatisticBar {...staticData} activeIndex={activeIndex}/>
            <StatisticBar {...dynamicData} activeIndex={activeIndex}/> 
            <StatisticBar {...singleData} activeIndex={activeIndex}/> 
            <StatisticBar {...broadData} activeIndex={activeIndex}/>       
        </div> 
    } 
} 

export default PortraitStatistic; 