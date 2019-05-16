import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';

@inject('DiningStore')
@observer
class ConditionList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleToast = this.handleToast.bind(this);
    }
    handleToast() {
        let { handleToastAction } = this.props.DiningStore;
        handleToastAction(true, '开发中，敬请期待！', 0)
    }
    render() {
        let { conditionTitle, conditionList, modifyBtnText } = this.props;

        return (
            <div className="condition-list">
                <div className="condition-title">
                    {conditionTitle}
                </div>
                <div className="condition-item-list">
                    {
                        conditionList.map((item, index) => {
                            return <div className="condition-item" key={'condition-item-'+index}>
                                <span>{item.paramName}:</span>
                                <span>{item.paramValue}{item.paramUnit}</span>
                            </div> 
                        })
                    }
                    <div className="condition-item-modify" onClick={this.handleToast}>{modifyBtnText}</div>
                </div>
            </div>
        )
    }
} 

export default ConditionList;