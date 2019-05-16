import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import './index.less'
class TabPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            active:0
        }
        this.pageArrTop = [];
        this.scrollToPage=this.scrollToPage.bind(this);
    }
    componentDidMount() {
        this.jsPagePosition()
        this.tabPageContent.onscroll = () => {
            this.renderNav(this.tabPageContent.scrollTop);
            this.props.onScroll&&this.props.onScroll(this.tabPageContent.scrollTop);
        }
    }
    componentDidUpdate() {
        this.jsPagePosition()
    }
    jsPagePosition() {
        this.pageArrTop=[];
        let nodes = this.tabPageContent.getElementsByClassName('tab-page-fg');
        for(let i=0;i<nodes.length;i++){
            this.pageArrTop.push(nodes[i].offsetTop);
        }
        console.log(this.pageArrTop);
    }
    renderNav(scrollTop){
        let maxI = 0;
        for(let i = 0;i<this.pageArrTop.length;i++){
            if(scrollTop>=this.pageArrTop[i]){
                maxI=i;
            }
        }
        console.log('maxI',maxI)
        this.setState({
            active:maxI
        });
    }
    scrollToPage(index){
        this.tabPageContent.scrollTop = this.pageArrTop[index];
    }
    render() {
        let {active} = this.state;
        let { navs, className } = this.props;
        return (
            <div className={classnames('tab-page', className)}>
                <nav>
                    {
                        navs.map((nav,i) =>
                            <div key={nav.name} className={classnames('nav-item',{'active':active==i})} onClick={()=>{this.scrollToPage(i)}}>
                                <p>{nav.name}</p>
                            </div>
                        )
                    }
                </nav>
                <div className="tab-page-content-out">
                    <div className="tab-page-content">
                        <div className="tab-page-content-scroll" ref={(instance) => { this.tabPageContent = instance }}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default TabPage;