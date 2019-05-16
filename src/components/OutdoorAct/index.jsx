import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from 'mobx-react';
import Horn from "@/common/Horn/index";
import CenterHighLight from '@/common/CenterHighLight/index.jsx';
import TabPage from '@/components/TabPage';
import { TabPageTable, TabPageThead, TabPageTbody } from '@/components/TabPage/TabPageTable/index.jsx';
import SportModelContent from './SportModelContent';
import StatisticContent from './StatisticContent';
import PropertyMarkContent from './PropertyMarkContent';
import LoginModule , { loginStore } from 'exhibition-login';
import {Tool,Het} from 'exhibition-tool';
import EditMark from './EditMark';
import Toast from './Toast/index';
import './style/index.less';
import ReactEcharts from 'echarts-for-react';
import ChartsByGender from '@/components/chartsComponentsOption/ChartsByGender'
import ChartsByTime from '@/components/chartsComponentsOption/ChartsByTime'
import ChartsByKeep from '@/components/chartsComponentsOption/ChartsByKeep'
import ChartsByLikes from '@/components/chartsComponentsOption/ChartsByLikes'

@inject('OutdoorActStore')
@observer
class OutdoorAct extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.tabPageScroll=this.tabPageScroll.bind(this);
        this.handleToast=this.handleToast.bind(this);
    }
    componentDidMount() {
        if (loginStore.loginCheck()) { 
            this.props.OutdoorActStore.getAreaList(); 
        }   
    }
    tabPageScroll(scrollTop){
        this.tb1.scroll(scrollTop);
        this.tb4.scroll(scrollTop);
    }  
    handleToast() {
        let { handleToastAction } = this.props.OutdoorActStore;
        handleToastAction(true, '开发中，敬请期待！');
    }
    render() { 
        let { sportModel, toast, formData, barData } = this.props.OutdoorActStore;
        let className = Tool.getCookie('className');
        return (   
            <div className="outdoor-wrapper">
                <div className="outdoor-title">{className}户外活动数据情况</div>
                <div className="outdoor-content-wrapper">
                    <CenterHighLight /> 
                    <Horn />
                    <TabPage className="outdoor-info-tab-page" navs={[{ name: '区域属性标记' }, { name: '区域运动情况' },  { name: '数据详情' }]} onScroll={this.tabPageScroll}>
                        <div className="tab-page-fg"></div>
                        <TabPageTable className="tb-mark"  ref={(instance)=>{this.tb1=instance}}>
                            <PropertyMarkContent />
                        </TabPageTable> 
                        <div className="tab-page-fg"></div>
                        <div className="assessment">
                                <p className="assessment-title">区域观察是幼儿老师一项重要工作。通过区域观察了解区域设置是否合理、材料投放是否科学等，为材料选择、更新等活动区创设提供帮助。</p>
                                <div className="assessment-boxs">
                                    <div className="assessment-box">
                                        <p className="assessment-box-title">日均来访统计</p>
                                        <p className="assessment-box-sub">各区域来访统计，分析整体概况及性别喜好分布。</p>
                                        <div className="charts-area">
                                            <ChartsByGender femaleValue={[7,11,27,23,8]} manValue={[23,20,12,9,32]} labels={['攀爬区','沙水区','平衡区','秋千区','球类区']}/>
                                        </div>
                                    </div>
                                    <div className="assessment-box">

                                        <p className="assessment-box-title">满员响应时间</p>
                                        <p className="assessment-box-sub">游戏区域受欢迎热度越高，满员时间越短。</p>
                                        <div className="charts-area">
                                            <ChartsByTime value={[18,24,58,83,92]} labels={['攀爬区','沙水区','平衡区','秋千区','球类区']}/>
                                        </div>
                                    </div>
                                    
                                    <div className="assessment-box">
                                        <p className="assessment-box-title">运动模型统计</p>
                                        <p className="assessment-box-sub">分析学生运动模型，实施因材施教。</p>
                                        <div className="charts-area2">
                                            <div className="charts-area-likes">
                                                <div className="a-likes-charts">
                                                    <p>猎鹰型</p>
                                                    <ChartsByLikes value={12} />
                                                </div>
                                                <div className="a-likes-charts">
                                                    <p>兔子型</p>
                                                    <ChartsByLikes value={48} />
                                                </div>
                                                <div className="a-likes-charts">
                                                    <p>绵羊型</p>
                                                    <ChartsByLikes value={35} />
                                                </div>
                                                <div className="a-likes-charts">
                                                    <p>小蛇型</p>
                                                    <ChartsByLikes value={5} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="assessment-box">
                                        <p className="assessment-box-title">区域人员留存率</p>
                                        <p className="assessment-box-sub">游戏区域设计更具沉浸性时，人员流留存率越高，阈值设定为5分钟。</p>
                                        <div className="charts-area">
                                            <ChartsByKeep value={[18,34,58,83,92]} labels={['攀爬区','沙水区','平衡区','秋千区','球类区']} />
                                        </div>
                                    </div>
                                    <div className="assessment-box">
                                        <p className="assessment-box-title">区域常驻人员统计</p>
                                        <p className="assessment-box-sub">区域停留时间超过95%的人员统计。</p>
                                        <div className="table-area">
                                            <table className="statisic-table">
                                                <thead>
                                                    <tr>
                                                        <th width="20%">区域</th>
                                                        <th width="20%">人数</th>
                                                        <th width="60%">名单</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>攀爬区</td>
                                                        <td>2</td>
                                                        <td>赵懂心，郭如远</td>
                                                    </tr>
                                                    <tr>
                                                        <td>沙水区</td>
                                                        <td>2</td>
                                                        <td>贺家豪，戴辰欣</td>
                                                    </tr>
                                                    <tr>
                                                        <td>平衡区</td>
                                                        <td>3</td>
                                                        <td>张小明，张哲宁，徐可</td>
                                                    </tr>
                                                    <tr>
                                                        <td>秋千区</td>
                                                        <td>3</td>
                                                        <td>吴沁瑶，吴沐远，柳妍希</td>
                                                    </tr>
                                                    <tr>
                                                        <td>球类区</td>
                                                        <td>1</td>
                                                        <td>江莞琦</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="assessment-box" >
                                        <p className="assessment-box-title">自定义统计图</p>
                                        <p className="assessment-box-sub"> 根据游戏区角特性自定义可视化统计图表。</p>
                                        <img className="btn-add-charts" src={`${require('./img/add.png')}`} onClick={this.handleToast}/>
                                    </div>
                                    </div>
                                </div>
                        <div className="tab-page-fg tb-mt"></div>
                        <TabPageTable className="tb-detail" ref={(instance)=>{this.tb4=instance}}>
                            <TabPageThead>
                                <tr>
                                    {
                                        formData.tHead.map((item, index) => {
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
                                    formData.tData.map((ite, i) => { 
                                        return  <tr key={`student-tdata-${i}`}>
                                            <td width="12%">{ite.param1}</td>
                                            <td width="11%">{ite.param2}</td>
                                            <td width="11%">{ite.param3}</td>
                                            <td width="11%">{ite.param4}</td>
                                            <td width="11%">{ite.param5}</td>
                                            <td width="11%">{ite.param6}</td>
                                            <td width="11%">{ite.param7}</td>
                                            <td width="11%">{ite.param8}</td>
                                            <td width="11%">{ite.param9}</td>  
                                        </tr>
                                    })
                                }

                            </TabPageTbody>
                        </TabPageTable>
                    </TabPage>
                </div>
                <EditMark />
                <Toast toast={toast}/> 
            </div> 
        )
    }
}
export default withRouter(OutdoorAct);