import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import LoginModule , { loginStore } from 'exhibition-login';
import BreakfastToday from './BreakfastToday';
import WeekRecipe from './WeekRecipe';
import './style/index.less';  

@inject('DiningStore')
@observer
class Dining extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        if (loginStore.loginCheck()) {
            // 获取本周早午餐、早午点菜谱列表
            this.props.DiningStore.getThisWeekRecipe();    
        }           
    }
    render() { 
        let { recipeData, mealData } = this.props.DiningStore;
        return (
            <div className="dining-wrapper">
                <div className="dining-header clearfix">
                    <p className="dining-header-title">校园备餐管理平台</p>
                    <Link className='dining-header-btn' to='/Dining/MenuRecom'>智能菜谱推荐</Link> 
                </div>
                <BreakfastToday mealData={mealData}/>
                <WeekRecipe recipeData={recipeData}/> 
            </div>  
        )
    } 
}   
export default withRouter(Dining); 