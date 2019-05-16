import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import { Link } from "react-router-dom";
import Horn from '@/common/Horn/index.jsx';
import CenterHighLight from '@/common/CenterHighLight/index.jsx';
import Tip from './Tip';
import Form from './Form/index'; 
import Toast from '../Toast/index';

@inject('DiningStore') 
@observer
class TipContent extends Component {
    constructor(props) {
        super(props)
    }
    render() { 
        let { toast } = this.props.DiningStore;
        let {tipData1, tipData2} = this.props;

        return (   
            <div className="tip-wrapper">
                <CenterHighLight />  
                <Horn />
                <div className="tip-wrapper-left">
                    <Tip {...tipData1}/>
                    <div className="tip-form-scroll"> 
                        <Form {...tipData1}/> 
                    </div>  
                </div>  
                <div className="tip-wrapper-right">
                    <Tip  {...tipData2}/>
                    <div className="tip-form-scroll"> 
                        <Form {...tipData2}/>    
                    </div> 
                </div>
                <Link className='dining-return' to='/Dining'></Link>
                <Toast toast={toast}/>               
            </div> 
        ) 
    }
}  

export default TipContent;