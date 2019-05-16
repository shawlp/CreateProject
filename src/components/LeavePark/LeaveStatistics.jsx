import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class LeaveStatistics extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        let {totalStudent, leaveNum} = this.props.leaveData;
        return <div className="leave-statistic-content">
            <div className="statistic-title">
                离园人数统计
            </div>
            <div className="statistic-wrapper clearfix">
                <div className="statistic-content">
                    <div className="statistic-top">
                        <span>{totalStudent}</span>
                        <span>人</span>
                    </div>
                    <div className="statistic-bottom">
                        校园总学生
                    </div>
                </div>
                <div className="statistic-content">
                    <div className="statistic-top">
                        <span>{leaveNum}</span>
                        <span>人</span>
                    </div> 
                    <div className="statistic-bottom">
                        已离园学生
                    </div>
                </div>
            </div>            
        </div>
    }
}

export default LeaveStatistics;