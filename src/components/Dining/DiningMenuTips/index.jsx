import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import './style/index.less';
import TipContent from './TipContent';
import LoginModule , { loginStore } from 'exhibition-login';

@inject('DiningStore')
@observer
class DiningMenuTips extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        if (loginStore.loginCheck()) {
            this.props.DiningStore.geRecommendScheme();     
        }           
    }
    render() { 
        let { tipData1, tipData2 } = this.props.DiningStore;
        return (
            <div className="dining-tips-wrapper">
                <div className="dining-tips-header clearfix">
                    <p className="dining-tips-header-title">校园用餐供给策略</p> 
                    <Link className='dining-tips-header-btn' to='/Dining/MenuRecom'>重新推荐</Link> 
                </div>
                <TipContent tipData1={tipData1} tipData2={tipData2}/>
            </div>  
        )
    }
}     
export default withRouter(DiningMenuTips);  