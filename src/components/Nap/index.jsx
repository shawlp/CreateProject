import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from "react-router-dom";
import Horn from '@/common/Horn';     // 把边框的四个角抽成组件
import './style/index.less';
import Condition from './Condition.jsx';
import FormWrapper from './FromWrapper.jsx';
import LoginModule , { loginStore } from 'exhibition-login';
import {Tool,Het} from 'exhibition-tool';
import TabPage from '@/components/TabPage';     // 把边框的四个角抽成组件
import { TabPageTable, TabPageThead, TabPageTbody } from '@/components/TabPage/TabPageTable/index.jsx';
import './index.less'; 
// import { LoginModule } from 'Common/login';//登录组件

@inject('NapStore')
@observer
class Nap extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.tabPageScroll=this.tabPageScroll.bind(this)
    } 
    componentDidMount() {
        if (loginStore.loginCheck()) {
            this.props.NapStore.getExternaldata('shenzhen');  
        }   
    }
    tabPageScroll(scrollTop){
        this.tb1.scroll(scrollTop);
        this.tb2.scroll(scrollTop);
    }
    render() { 
        let className = Tool.getCookie('className'); 
        let { conditionBarData, sleepData, environment, environmentFormData, studentFormData } = this.props.NapStore; 
        return (
            <div className="nap-page nap-enterPark">
                <p className="nap-enterPark-title">{className}午睡数据情况</p>   
                <Condition conditionBarData={conditionBarData} sleepData={sleepData} environment={environment}/> 
                <section className="nap-info-area">
                    <TabPage className="nap-info-tab-page" navs={[{ name: '睡眠数据' }, { name: '环境数据' }]} onScroll={this.tabPageScroll}>
                        <div className="tab-page-fg"></div>
                        <TabPageTable className="tb-student"  ref={(instance)=>{this.tb1=instance}}>
                            <TabPageThead>
                                <tr>
                                {
                                    studentFormData.tHead.map((item, i) => {
                                        return <th key={i} width={i === 0 ? '12%' : "11%"}>{item}</th>
                                      }
                                    )
                                } 
                                </tr>
                            </TabPageThead>
                            <TabPageTbody>
                                {
                                    studentFormData.tData.map((item, i) => 
                                        <tr key={i}>
                                            <td width="12%">{item.param1}</td>
                                            <td width="11%">{item.param2}</td>
                                            <td width="11%">{item.param3}</td>
                                            <td width="11%">{item.param4}</td>
                                            <td width="11%">{item.param5}</td>
                                            <td width="11%">{item.param6}</td>
                                            <td width="11%">{item.param7}</td>
                                            <td width="11%">{item.param8}</td>
                                            <td width="11%">{item.param9}</td>
                                        </tr> 
                                    )
                                } 
                            </TabPageTbody>
                        </TabPageTable>
                        <div className="tab-page-fg"></div>
                        <TabPageTable className="tb-env" ref={(instance)=>{this.tb2=instance}}>
                            <TabPageThead>
                                <tr>
                                    {
                                        environmentFormData.tHead.map((item, i) => {
                                            return <th key={i} width={i === 0 ? '12%' : "11%"}>{item}</th>
                                        }
                                        )
                                    }   
                                </tr>
                            </TabPageThead>
                            <TabPageTbody>
                                {
                                    environmentFormData.tData.map((item, i) => 
                                        <tr key={i}>
                                            <td width="12%">{item.param1}</td>
                                            <td width="11%">{item.param2}</td>
                                            <td width="11%">{item.param3}</td>
                                            <td width="11%">{item.param4}</td>
                                            <td width="11%">{item.param5}</td>
                                            <td width="11%">{item.param6}</td>
                                            <td width="11%">{item.param7}</td>
                                            <td width="11%">{item.param8}</td>
                                            <td width="11%">{item.param9}</td>
                                        </tr> 
                                    )
                                }

                            </TabPageTbody>
                        </TabPageTable>
                    </TabPage>
                    <Horn />
                </section>
            </div>
        ) 
    } 
}  
export default withRouter(Nap);