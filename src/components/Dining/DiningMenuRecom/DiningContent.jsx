import React, { Component } from 'react';
import Horn from '@/common/Horn/index.jsx';
import { Link } from "react-router-dom";
import CenterHighLight from '@/common/CenterHighLight/index.jsx';
import { observer, inject } from 'mobx-react';
import KindergartenStandard from './KindergartenStandard';
import ConditionContent from './ConditionContent';

@inject('DiningStore')
@observer
class DiningContent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleToast = this.handleToast.bind(this);
    }
    handleToast() {
        let { handleToastAction } = this.props.DiningStore;
        handleToastAction(true, '正在生成本周共餐策略..', 1) 
    }
    render() {
        let { conditionListData, kindergartenData, weather } = this.props;
        return (
            <div className="dining-content">
                <CenterHighLight />
                <Horn />
                <KindergartenStandard kindergartenData={kindergartenData}/> 
                <ConditionContent conditionListData={conditionListData} weather={weather}/>
                <div className="dining-tips" onClick={this.handleToast}>生成本周供餐策略</div>
                <Link className='dining-return' to='/Dining'></Link> 
            </div>
        )
    }
}

export default DiningContent;
