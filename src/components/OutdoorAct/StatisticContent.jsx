import React, { Component } from 'react';
import { observer } from 'mobx-react';
import HeatStatistic from './HeatStatistic/index';
import NumberStatistics from './NumberStatistics/index';
import './style/index.less';

@observer
class StatisticContent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {activeIndex, barData} = this.props;
        return <div className="statistic-content">
            <HeatStatistic />
            <NumberStatistics activeIndex={activeIndex} barData={barData}/> 
        </div>
    }
}

export default StatisticContent;