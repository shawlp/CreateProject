import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import Horn from '@/common/Horn/index.jsx';
import CenterHighLight from '@/common/CenterHighLight/index.jsx';
import Meal from './Meal'; 

@observer
class BreakfastToday extends Component {
    constructor(props) {
        super(props)
    }
    render() { 
        let { mealData } = this.props;  
        let mealData1 = mealData[0];
        let mealData2 = mealData[1]; 
        return ( 
            <div className="breakfast-today">
                <CenterHighLight />
                <Horn />
                <div className="breakfast-content clearfix"> 
                    <div className="breakfast-content-left">
                        <Meal mealData={mealData1} container={'breakfast-container'}/>
                    </div>
                    <div className="breakfast-content-right">
                        <Meal mealData={mealData2}  container={'lunch-container'}/>
                    </div> 
                </div>
            </div> 
        )
    }
}   
export default BreakfastToday;