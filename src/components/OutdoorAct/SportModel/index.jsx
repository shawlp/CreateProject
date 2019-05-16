import React, { Component } from 'react';
import { observer } from 'mobx-react';
import '../style/index.less';

@observer
class SportModel extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { sportType, sportIntro } = this.props;
        return <div className="sport-model-wrapper">
            <div className="sport-model-type">{sportType}</div>
            <div className="sport-model-intro">
                {sportIntro}
            </div>  
        </div>
    }
}

export default SportModel;