import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import 'antd/dist/antd.css';
import Sidebar from '@/components/SiderBar';
import BreadCrumb from '@/components/BreadCrumb';
import barMenu from '@/config/sideBarMenu';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const Loading = () => <div>Loading...</div>;
const tom = Loadable({ 
    loader: () => import('@/components/tom'),
    loading: Loading,
});

const bill = Loadable({ 
    loader: () => import('@/components/bill'),
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

@observer 
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            breadCrumbItem: []
        };
    }
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    componentDidMount() {
        this.getBreadCrumbItem();
    }
    getBreadCrumbItem() {
        window.onhashchange = () => {
            let hash = window.location.hash.substr(2);
            let breadItem = [];
            let hashItem = hash.split('/');
            barMenu.forEach((item) => {
                if (item.flag == hashItem[0]) {
                    item.children.forEach((ite) => {
                        if (ite.url == window.location.hash.substr(1)) {
                            breadItem = ite.breadItem;
                            this.setState({
                                breadCrumbItem: breadItem
                            }); 
                        }
                    })
                }
            });
        }
    }
    render () {
        let {breadCrumbItem} = this.state;
        return (  
            <Router>
                <Fragment>
                    <Layout style={{ minHeight: '100vh' }}>
                        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                            <div className="logo" />
                            <Sidebar allMenu={barMenu} location={window.location}/>
                        </Sider>
                        <Layout>
                            <Header style={{ background: '#fff', padding: 0 }}>
                                <Icon
                                    className="trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.onCollapse}
                                />        
                            </Header> 
                            <Content style={{ margin: '0 16px' }}>
                                <BreadCrumb items={breadCrumbItem}/>
                                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                    <Switch>    
                                        <Route exact path='/user/tom'  component={tom}/>
                                        <Route exact path='/user/bill'  component={bill}/>
                                        <Route exact component={noMatch} /> 
                                    </Switch> 
                                </div>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                        </Layout>
                    </Layout>
                </Fragment>
            </Router>   
        ) 
    }
}

export default App; 
