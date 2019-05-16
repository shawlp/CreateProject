import React, { Component } from 'react';
import classnames from 'classnames';

import './index.less'
import { toJS } from 'mobx';
class TabPageTable extends Component {
    constructor(props) {
        super(props);
        this.state={
            active:0
        }
        this.theadHeight = 60;
    }
    componentDidMount(){
        this.initDom();
    }
    initDom(){
        this.height=this.tableDom.offsetHeight;//dom 高度
        this.top=this.tableDom.offsetTop;//dom 离
    }
    scroll(scrollTop){
        console.log(scrollTop,this.top,this.height)
        if(this.top>=scrollTop){ //顶部
            this.setState(
                {
                    active:0
                }
            )
        }else if(scrollTop>this.top&&scrollTop<(this.top+this.height-this.theadHeight)){//活动状态
            this.setState(
                {
                    active:1
                }
            )
        }else if(scrollTop>this.top+this.height-this.theadHeight){//底部
            
            this.setState(
                {
                    active:2
                }
            )
        }
    }
    render() {
        let {active} = this.state;
        let {className} = this.props;
        return (
            <div className={classnames('tab-page-table',className,{'top':active==0},{'active':active==1},{'bottom':active==2})} ref={(instance)=>{this.tableDom=instance}}>
                {this.props.children}
            </div>
        )
    }
}
function TabPageThead(props) {
    return <div className="tab-page-thead">
        <table>
            <thead>
                {props.children}
            </thead>
        </table>
    </div>
}
function TabPageTbody(props) {
    return <div className="tab-page-tbody">
        <table>
            <tbody>
                {props.children}
            </tbody>
        </table>
    </div>
}
export { TabPageTable, TabPageThead, TabPageTbody };