import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import Horn from '@/common/Horn/index.jsx';
import CenterHighLight from '@/common/CenterHighLight/index.jsx';
import Meal from './Meal'; 
import Form from './Form/index';
import Toast from './Toast/index';

@inject('DiningStore') 
@observer
class WeekRecipe extends Component {
    constructor(props) {
        super(props)
    }
    render() { 
        let { toast } = this.props.DiningStore;
        let recipeData = this.props.recipeData; 
        let { recipeTitle, recipeFormData } = recipeData;

        return ( 
            <div className="week-recipe">
                <CenterHighLight /> 
                <Horn />
                <div className="recipe-content">
                    <p className="recipe-title">{recipeTitle}</p>
                    <Form formData={recipeFormData}/>
                </div>
                <Toast toast={toast}/> 
            </div>  
        )
    }
}  

export default WeekRecipe;