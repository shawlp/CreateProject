import React, { Component } from 'react';
import { observer } from 'mobx-react';
import SportModel from './SportModel/index';
import './style/index.less';

@observer
class SportModelContent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {sportModel} = this.props;
        return <div className="sport-model-content">
            <SportModel {...sportModel[0]}/>
            <SportModel {...sportModel[1]}/>
            <SportModel {...sportModel[2]}/>
            <SportModel {...sportModel[3]}/> 
        </div>
    }
}

export default SportModelContent;