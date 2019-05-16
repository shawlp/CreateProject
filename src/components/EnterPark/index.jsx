import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from "react-router-dom";
import './style/index.less';
import Condition from './Condition.jsx';
import Horn from '@/common/Horn';
import CenterHighLight from '@/common/CenterHighLight';  
import FormWrapper from './FromWrapper.jsx';
import LoginModule , { loginStore } from 'exhibition-login';
import {Tool,Het} from 'exhibition-tool';
import TabPage from '@/components/TabPage';     // 把边框的四个角抽成组件
import { TabPageTable, TabPageThead, TabPageTbody } from '@/components/TabPage/TabPageTable/index.jsx';

@inject('EnterParkStore')
@observer
class EnterPark extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.tabPageScroll=this.tabPageScroll.bind(this)
    }
    componentDidMount() {
        if (loginStore.loginCheck()) { 
            // 获取学生信息
            this.startChildrenHealthData(); 
        }   
    }
    // 轮询学生数据接口
    startChildrenHealthData() {
        this.refreshChildrenTimer && window.clearTimeout(this.refreshChildrenTimer);
        this.props.EnterParkStore.getStudentDataId(()=>{
            this.refreshChildrenTimer = setTimeout(()=>{
                this.startChildrenHealthData();
                console.log(1)
            },5000); 
        })            
    }
    componentWillUnmount() {
        this.refreshChildrenTimer && window.clearTimeout(this.refreshChildrenTimer);
    }
    tabPageScroll(scrollTop){
        this.tb1.scroll(scrollTop);
        this.tb2.scroll(scrollTop);
    }  
    render() { 
        let { studentFormData, environmentFormData, studentRecord, conditionBarData, menuItems } = this.props.EnterParkStore; 
        return (
            <div className="enterPark">
                <p className="enterPark-title">入园晨检情况</p>
                <Condition studentRecord={studentRecord} conditionBarData={conditionBarData}/>
                {/* <FormWrapper studentFormData={studentFormData} environmentFormData={environmentFormData} menuItems={menuItems}/>  */}
                <div className="form-wrapper">
                    <CenterHighLight />
                    <Horn />
                    <TabPage className="enter-info-tab-page" navs={[{ name: '学生管理' }, { name: '环境管理' }]} onScroll={this.tabPageScroll}>
                        <div className="tab-page-fg"></div>
                        <TabPageTable className="tb-student"  ref={(instance)=>{this.tb1=instance}}>
                            <TabPageThead>
                                <tr>
                                    {
                                        studentFormData.tHead.map((item, index) => {
                                            if (index === 0) {
                                                return <th width="12%" key={`student-thead-${index}`}>{item}</th>
                                            }
                                            return <th width="11%" key={`student-thead-${index}`}>{item}</th>
                                        })
                                    }
                                </tr>
                            </TabPageThead>
                            <TabPageTbody>
                                {
                                    studentFormData.tData.map((ite, i) => { 
                                        let param8 = ite.param8;
                                        return  <tr key={`student-tdata-${i}`} style={{background: `${ite.isAbnormalFlag && param8 && param8 !== '无' ? '#391832' : 'RGBA(9, 25, 63, .4)'}`}}>
                                            <td width="12%">{ite.param1}</td>
                                            <td width="11%">{ite.param2}</td>
                                            <td width="11%">{ite.param3}</td>
                                            <td width="11%">{ite.param4}</td>
                                            <td width="11%">{ite.param5}</td>
                                            <td width="11%">{ite.param6}</td>
                                            <td width="11%">{ite.param7}</td>
                                            <td width="11%" style={{color: `${ite.isAbnormalFlag && param8 && param8 !== '无' ? '#FF3E83' : 'rgba(153,153,153,1)'}`}}>{ite.param8}</td> 
                                        </tr>
                                    })
                                }
                            </TabPageTbody>
                        </TabPageTable>
                        <div className="tab-page-fg"></div>
                        <TabPageTable className="tb-env" ref={(instance)=>{this.tb2=instance}}>
                            <TabPageThead>
                                <tr>
                                    {
                                        environmentFormData.tHead.map((item, index) => {
                                            if (index === 0) {
                                                return <th width="12%" key={`environment-thead-${index}`}>{item}</th>
                                            }
                                            return <th width="11%" key={`environment-thead-${index}`}>{item}</th>
                                        })
                                    }
                                </tr>
                            </TabPageThead>
                            <TabPageTbody>
                                {
                                    environmentFormData.tData.map((ite, i) => {
                                        return  <tr key={`environment-tdata-${i}`}>
                                            <td width="12%">{ite.param1}</td>
                                            <td width="11%">{ite.param2}</td>
                                            <td width="11%">{ite.param3}</td>
                                            <td width="11%">{ite.param4}</td>
                                            <td width="11%">{ite.param5}</td>
                                            <td width="11%">{ite.param6}</td> 
                                        </tr>
                                    })
                                }
                            </TabPageTbody>
                        </TabPageTable>
                    </TabPage>
                </div> 
            </div>  
        ) 
    } 
}  
export default withRouter(EnterPark);