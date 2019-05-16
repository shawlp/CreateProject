import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class HeatStatistic extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="heat-statistic">
            <div className="heat-statistic-title">区域热力统计</div>
            <div className="heat-statistic-map"></div>
            <div className="heat-map-intro">
                <span>停留最久</span>
                <span></span>
                <span>停留最短</span> 
            </div>
        </div>
    }
}

export default HeatStatistic;