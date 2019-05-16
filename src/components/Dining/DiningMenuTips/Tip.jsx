import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import MatchingBar from './MatchingBar';

@observer
class Tip extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let { tipTitle, body, weather, sport} = this.props;

        return (  
            <div className="scheme-wrapper">
                <div className="scheme-title">{tipTitle}</div>
                <div className="scheme-bar">
                    <MatchingBar {...body}/> 
                    <MatchingBar {...weather}/> 
                    <MatchingBar {...sport}/>    
                </div>                     
            </div>  
        ) 
    }
}  

export default Tip;