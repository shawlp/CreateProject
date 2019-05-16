import React, { Component } from 'react';
import './index.less';

class CenterHighlight extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="highlight-wrapper">
                <div className="highlight highlightTop"></div>
                <div className="highlight highlightBottom"></div>
            </div>
        )
    }
} 
export default CenterHighlight;