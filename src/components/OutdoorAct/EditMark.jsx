import React, { Component, Fragment } from 'react';
import { observer,inject } from 'mobx-react';

@inject('OutdoorActStore')
@observer
class EditMark extends Component {
    constructor(props) {
        super(props);
    }
    handleTagList(i, item) {
        let {handleTagList} = this.props.OutdoorActStore;
        handleTagList(i, item); 
    }
    handleShowEditMark(y) {
        let {handleShowEditMark} = this.props.OutdoorActStore;
        handleShowEditMark(y);
    }
    render() {   
        let {tagList, isShowEditMark, editAreaTagList, areaName} = this.props.OutdoorActStore;
        let selectedArr = [];

        tagList.forEach((item, index) => {
            editAreaTagList.forEach((ite) => {
                if (item.tagName === ite.tagName && ite.isSelected === 1) {
                    selectedArr.push(item.tagName);
                }
            })  
        })   

        return <Fragment>  
            {   
                isShowEditMark ? 
                    <div className="edit-mark">
                        <div className="edit-mark-content">
                            <p className="edit-mark-title">{areaName}属性编辑</p>
                            <div className="edit-mark-property clearfix">
                                <p className="edit-mark-property-title">区域属性：</p>
                                <ul className="edit-mark-property-items">
                                    {
                                        tagList.map((item, index) => {
                                            if (selectedArr.includes(item.tagName)) { 
                                                return <li className="edit-mark-property-item active" key={'item-'+index} onClick={this.handleTagList.bind(this, index, item)}>{item.tagName}</li>
                                            } else { 
                                                return <li className="edit-mark-property-item" key={'item-'+index} onClick={this.handleTagList.bind(this, index, item)}>{item.tagName}</li>
                                            }
                                        })
                                    }
                                </ul> 
                            </div>
                            <div className="edit-btn">
                                <div className="edit-btn-cancel" onClick={this.handleShowEditMark.bind(this, 'cancel')}>取消</div>
                                <div className="edit-btn-yes" onClick={this.handleShowEditMark.bind(this, 'yes')}>确定</div>                      
                            </div> 
                        </div>
                    </div> : null
            }
        </Fragment>
    }
}

export default EditMark;
