import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('OutdoorActStore')
@observer
class PropertyMark extends Component {
    constructor(props) {
        super(props);
        this.handleToast = this.handleToast.bind(this);
    }
    handleShowEditMark(i) {
        let { handleShowEditMark } = this.props.OutdoorActStore;
        handleShowEditMark(i);
    }
    handleToast() { 
        let { handleToastAction } = this.props.OutdoorActStore;
        handleToastAction(true, '开发中，敬请期待！');
    }
    render() {
        let { areaList } = this.props.OutdoorActStore;

        return <ul className="property-mark-wrapper">
            {
                areaList.map((item, index) => {
                    return <li className="mark-item" key={"mark-item-"+index}>
                        <div className="mark-item-img" style={{backgroundImage: `url(${item.areaImage})`}}></div>
                        <div className="mark-item-intro">
                            <div className="mark-item-name">{item.areaName}</div>
                            <div className="mark-item-edit" onClick={this.handleShowEditMark.bind(this, {areaId: item.areaId, areaName: item.areaName})}></div>
                        </div> 
                        <div className="mark-item-tags">
                            {
                                item.tagList && item.tagList.map((ite, ind) => {
                                    return <div className="mark-item-tag" key={"mark-item-tag-"+ind}>{ite.tagName}</div>
                                })
                            }
                        </div>
                    </li>
                })
            } 
            <li className="mark-item">
                <div className="mark-item-img-add" onClick={this.handleToast}></div> 
            </li>
        </ul>
    }
}

export default PropertyMark;