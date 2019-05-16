import React, { Component } from 'react';
import CenterHighLight from '@/common/CenterHighLight/index.jsx';

class KindergartenStandard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { kindergartenTitle, kindergartenContent } = this.props.kindergartenData;
        return <div className="kindergarten-standard">
            <p className="kindergarten-title">{kindergartenTitle}</p>
            <div className="kindergarten-wrapper">
                <CenterHighLight />
                <p className="kindergarten-content">
                    {kindergartenContent}
                </p>  
            </div>    
        </div>;
    } 
}

export default KindergartenStandard;