/**
 * 左侧tab栏
 */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { observer, inject } from "mobx-react";
import classnames from 'classnames';
import './index.less';

const Routes = [
    {
        path: '/EnterPark',
        title: '入园'
    },
    {
        path: '/LearnAct',
        title: '学习活动'
    },
    {
        path: '/Dining',
        title: '用餐'
    },
    {
        path: '/Nap',
        title: '午睡'
    },
    {
        path: '/OutdoorAct',
        title: '户外活动'
    },
    {
        path: '/LeavePark',
        title: '离园'
    },
]

@inject('homeStore')
@observer
class Home extends Component {
    constructor(props) {
        super(props);
        window.onhashchange = () => {
            this.handleActivePath(window.location.href.split('#')[1]);
        } 
    }
    handleActivePath(path) {
        const { activePathAction, activePath } = this.props.homeStore
        console.log('activePath', activePath);
        console.log('path', path);
        if (activePath === path && path === '/') {
            activePathAction('/EnterPark')
        } else if (activePath === path && path !== '/') {
            return
        } else {  
            activePathAction(path)
        }      
    }
    componentDidMount() {
        let hash = window.location.hash;
        hash = hash.replace('#', '');
        this.handleActivePath(hash);
    }
    render() {
        const { activePath } = this.props.homeStore;
        return (
            <ul className="nav-wrapper">
                {
                    Routes.map((item, index) => (
                        <li
                            key={index}
                            className={classnames({ 'active-path': item.path === activePath || (activePath.indexOf(item.path) !== -1 && item.path !== '/') })}         
                            // onClick={() => this.handleActivePath(item.path)} 
                        >
                            {/* <NavLink exact replace to={item.path} className={classnames({ 'active-path': activePath.indexOf(item.path) !== -1 && item.path !== '/'})} activeClassName={'active-path'}>  */}
                            {item.title}     
                            {/* </NavLink > */}
                            {/* {
                                activePath===item.path ?
                                <div class="arrow"></div>
                                : null
                            } */}
                        </li>
                    ))
                }
            </ul>
        )
    }
}
export default Home