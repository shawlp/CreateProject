import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import LoginModule , { loginStore } from 'exhibition-login'; // 登录组件  

@inject('loginStore')
@inject('testStore')
@observer
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPass: false
        }
    }
    render() {
        let { loginStore, testStore } = this.props;
        return <div className='app'>
            <LoginModule show={!loginStore.loginPass} backFun={() => { loginStore.loginSuccess() }}></LoginModule>
            <p className='hw' onClick={() => { testStore.change() }}>{testStore.text}</p>
        </div>
    }
}
export default Home;