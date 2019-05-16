import React, { Component } from 'react';
import './index.less'; 

export default class TabBar extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     activeIndex: 0
        // }
    }
    handleChangeTab(i) {
        this.props.handleChangeTab(i);
    } 
    render() {
        let { menuItems, activeIndex } = this.props; 

        return <div className="tab-bar clearfix">
            {
                menuItems.map((item, index) => {
                    return <div className="tab-bar-item" key={"tab-"+index} onClick={this.handleChangeTab.bind(this, index)}>
                        <span className={"tab-bar-name " + (index === activeIndex ? 'active-item' : '')}>{item.itemName}</span>
                        <span className={index === activeIndex ? "tab-bar-line active" : 'tab-bar-line'}></span>  
                    </div>          
                })  
            }
        </div>
    }
}