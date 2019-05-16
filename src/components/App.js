import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import Home from '../common/Home';
import LoginModule , { loginStore } from 'exhibition-login'; // 登录组件
import createWebSocket from 'exhibition-wsserver';
import CantractForLinkage from '@/common/Cantract/CantractForLinkage';//登录组件
import Contract from '@/common/Contract'; 
import {Tool,Het} from 'exhibition-tool';

const Loading = () => <div>Loading...</div>;
// 代码分割, 以路由为分割异步加载各个模块
const EnterPark = Loadable({ 
    loader: () => import('./EnterPark/index.jsx'),
    loading: Loading,
});
const LearnAct = Loadable({
    loader: () => import('./LearnAct/index.jsx'),
    loading: Loading,
});
const Dining = Loadable({
    loader: () => import('./Dining/index.jsx'),
    loading: Loading,
});
const DiningMenuRecom = Loadable({
    loader: () => import('./Dining/DiningMenuRecom/index.jsx'),
    loading: Loading,
});
const DiningMenuTips = Loadable({
    loader: () => import('./Dining/DiningMenuTips/index'),
    loading: Loading,
});
const Nap = Loadable({
    loader: () => import('./Nap/index.jsx'),
    loading: Loading,
});
const OutdoorAct = Loadable({
    loader: () => import('./OutdoorAct/index.jsx'),
    loading: Loading,
});
const LeavePark = Loadable({
    loader: () => import('./LeavePark/index.jsx'),
    loading: Loading,
});

class noMatch extends Component {  
    render () {
        return (
            <div>
                没有匹配到对应的网页
            </div>
        )
    }
}

const appId = Tool.getUrlParam('appId');
const appSecret = Tool.getUrlParam('appSecret');
@observer 
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPass: false
        }
        this.lisenWebSocket(props);
    }
    lisenWebSocket(){
        const ws = createWebSocket('/v1/web/smarthome/websocketServer',{sceneName:Contract.SCENE_NAME_CAMPUS_B});
        ws.registMessage((data)=>{
            console.log(data);
            if(data.dataType==15){
                let routeData = JSON.parse(data.data);
                if(routeData.action===CantractForLinkage.ACTION_ROUTE_CHANGE){
                    window.location.href=`#${routeData.value}` 
                }
            }
        });
    }
    render () {
        let { loginStore, testStore } = this.props;
        return (  
            <Router>
                <Fragment>
                    <LoginModule appId={appId?appId:31165} appSecret={appSecret?appSecret:'131a55f337584c2e854b8dd7673ad323'}></LoginModule>

                    <div className="left-side"> 
                        <Home />
                    </div>
                    <div className="right-side">
                        <Switch>    
                            <Route exact path='/'  component={EnterPark}/>
                            <Route exact path='/EnterPark'  component={EnterPark}/>
                            <Route exact component={noMatch} /> 
                        </Switch> 
                    </div>
                </Fragment>
            </Router>   
        ) 
    }
}

export default App; 
