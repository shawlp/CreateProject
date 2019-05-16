import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Horn from 'HealthyCampusToB/common/Horn';     // 把边框的四个角抽成组件
import TabPage from 'HealthyCampusToB/components/TabPage';     // 把边框的四个角抽成组件
import { TabPageTable, TabPageThead, TabPageTbody } from 'HealthyCampusToB/components/TabPage/TabPageTable/index.jsx';
import './index.less'
class Nap extends Component {
    constructor(props) {
        super(props);
        this.tabPageScroll=this.tabPageScroll.bind(this)
    }
    tabPageScroll(scrollTop){
        this.tb1.scroll(scrollTop);
        this.tb2.scroll(scrollTop);
    }
    render() { 
        return (
            <div className="nap-page">
                <p className="nap-title">入园晨检情况</p>
                <section className="nap-chart-area">
                    <Horn />
                </section>
                <section className="nap-info-area">
                    <TabPage className="nap-info-tab-page" navs={[{ name: '睡眠数据' }, { name: '环境数据' }]} onScroll={this.tabPageScroll}>
                        <div className="tab-page-fg"></div>
                        <TabPageTable className="tb-student"  ref={(instance)=>{this.tb1=instance}}>
                            <TabPageThead>
                                <tr>
                                    <th width="12%">学生姓名</th>
                                    <th width="11%">手环数据</th>
                                    <th width="11%">睡眠带子数据</th>
                                    <th width="11%">上床时间</th>
                                    <th width="11%">入睡时间</th>
                                    <th width="11%">睡眠状态</th>
                                    <th width="11%">打鼾/咳嗽</th>
                                    <th width="11%">心率/呼吸</th>
                                    <th width="11%">睡眠模型</th>
                                </tr>
                            </TabPageThead>
                            <TabPageTbody>
                                {
                                    new Array(50).fill(50).map((item ,i ) =>
                                        <tr key={i}>
                                            <td width="12%">陈小明</td>
                                            <td width="11%">1011101</td>
                                            <td width="11%">xxxxxx</td>
                                            <td width="11%">10:17:11</td>
                                            <td width="11%">10:17:11</td>
                                            <td width="11%">浅睡眠</td>
                                            <td width="11%">0</td>
                                            <td width="11%">93/87</td>
                                            <td width="11%">模型异常</td>
                                        </tr>
                                    )
                                }

                            </TabPageTbody>
                        </TabPageTable>
                        <div className="tab-page-fg"></div>
                        <TabPageTable className="tb-env" ref={(instance)=>{this.tb2=instance}}>
                            <TabPageThead>
                                <tr>
                                    <th width="12%">环境数据</th>
                                    <th width="11%">室内噪声</th>
                                    <th width="11%">温度</th>
                                    <th width="11%">湿度</th>
                                    <th width="11%">空气质量</th>
                                    <th width="11%">亮度</th>
                                    <th width="11%">pm2.5</th>
                                    <th width="11%">紫外线</th>
                                    <th width="11%">设备异常</th>
                                </tr>
                            </TabPageThead>
                            <TabPageTbody>
                                {
                                    new Array(50).fill(50).map((item ,i ) =>
                                        <tr key={i}>
                                            <td width="12%">优</td>
                                            <td width="11%">22分贝</td>
                                            <td width="11%">23℃</td>
                                            <td width="11%">45%</td>
                                            <td width="11%">优</td>
                                            <td width="11%">1202</td>
                                            <td width="11%">--</td>
                                            <td width="11%">--</td>
                                            <td width="11%">新风机</td>
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