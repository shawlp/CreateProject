import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";
import './index.less';
import Horn from "../../common/Horn/index.jsx";     // 把边框的四个角抽成组件
import CenterHighLight from '@/common/CenterHighLight';
import Toast from '@/common/Toast/index';
import {Tool} from 'exhibition-tool'; 
import TabPage from '@/components/TabPage';
import { TabPageTable, TabPageThead, TabPageTbody } from '@/components/TabPage/TabPageTable/index.jsx';
import PortraitStatistic from './PortraitStatistic';
import { observer, inject } from 'mobx-react';
import ReactEcharts from 'echarts-for-react';
import ChartsByGender from '@/components/chartsComponentsOption/ChartsByGender'
import ChartsByTime from '@/components/chartsComponentsOption/ChartsByTime'
import ChartsByKeep from '@/components/chartsComponentsOption/ChartsByKeep'
import ChartsByLikes from '@/components/chartsComponentsOption/ChartsByLikes'

class PromptModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {  
        return (
            <div className="promptModal-wrap" style={{ display: this.props.isPromptModalShow ? 'block' : 'none' }}>
                <div className="promptModal-content">
                    <div className="prompt-text">敬请期待</div>
                    <div className="prompt-foot">
                        <input type="button" value="确定" className="promptModal-confirm" onClick={this.props.promptModalCloze} />
                    </div>
                </div>
            </div>
        )

    }
}

@inject('LearnActStore')
@observer
class EditModal extends Component { //编辑详情模态框
    constructor(props) {
        super(props);
        let { currentContent } = this.props.LearnActStore;
        console.log(5555);
        console.log('currentContent', currentContent);
        this.state = {
            listContentArrChild: {}, //列表数组
            selectedLabelArr: [],  //被点击智能标签数组
            newLabelArr: [],  //被选中智能标签去重后的数组
            personNums: 0,
            isDynamicShow: true,
            isStaticShow: false,
            isEditModalShow: this.props.isEditModalShow,
        }

        this.dynamicShow = this.dynamicShow.bind(this);
        this.staticShow = this.staticShow.bind(this);
        this.handleSummit = this.handleSummit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.modalShowId !== '' && nextProps.modalShowId !== this.props.modalShowId) {
            let personNums = this.getPersonNums(nextProps);
            this.setState({
                personNums
            });
        }
    }

    dynamicShow() {
        let { currentContent } = this.props.LearnActStore;
        currentContent.listAttr = "1";
    }
    staticShow() {
        let { currentContent } = this.props.LearnActStore;
        currentContent.listAttr = "2";
    }


    addPersonNums(nums) {
        let personNums = Number(nums);
        let { currentContent } = this.props.LearnActStore;
        personNums += 1;
        personNums = personNums > 20 ? 20 : personNums;
        this.setState({
            personNums: personNums
        }, () => {
            currentContent.areaPersonNums = personNums;
        })
    }

    reducePersonNums(nums) {
        let personNums = Number(nums);
        let { currentContent } = this.props.LearnActStore;
        personNums -= 1;
        personNums = personNums < 1 ? 1 : personNums;
        this.setState({
            personNums: personNums
        }, () => {
            currentContent.areaPersonNums = personNums;
        })
    }

    labelSelected(id, b) {
        let { selectedLabelArr } = this.state;
        let { modalListArr, LearnActStore } = this.props;
        LearnActStore.editLabelArr(id, b);
    }

    handleSummit() {
        let { selectedLabelArr, newLabelArr } = this.state;
        let { lastLabelArr, LearnActStore } = this.props;
        for (let i = 0; i < selectedLabelArr.length; i++) {
            if (selectedLabelArr[i].isLabelSelected == true) {
                newLabelArr.push(selectedLabelArr[i]);
            }
        }
        lastLabelArr = newLabelArr.filter(function (element, index, self) {  //对选出来的标签数组去重
            return self.indexOf(element) === index;
        });
        //向父组件传递的参数
        this.props.handleConfirm(lastLabelArr);
        LearnActStore.saveContent(lastLabelArr);

        // this.props.LearnActStore.getStudyActivityAreaList(); 

    }

    getPersonNums(props) {
        let num = 0;
        const { listContentArr } = props.LearnActStore;
        let modalShowId = props.modalShowId;
        let listContentArrChild = {};
        for (let i = 0; i < listContentArr.length; i++) {
            if (modalShowId == listContentArr[i].listId) {
                listContentArrChild = listContentArr[i];
            }
        }
        if (JSON.stringify(listContentArrChild) !== '{}') {
            num = listContentArrChild.areaPersonNums;
        }
        return num;
    }

    render() {
        const { listContentArr, currentContent, modalListArr } = this.props.LearnActStore;
        let listContentArrChild = this.state.listContentArrChild;
        let modalShowId = this.props.modalShowId;
        for (let i = 0; i < listContentArr.length; i++) {
            if (modalShowId == listContentArr[i].listId) {
                listContentArrChild = listContentArr[i];
            }
        }
        let selectedStyle = {  //动区、静区被选中时的背景
            background: 'rgb(19,211,224)',
            color: 'black'
        };
        let unSelectedStyle = {  //动区、静区未被选中时的背景
            background: 'rgb(9, 44, 79)',
            color: 'rgb(53, 146, 152)'
        };
        let labelSelectedStyle = {  //智能标签被选中时的背景状态
            background: 'rgb(19,211,224)',
            color: 'black'
        }
        let { isDynamicShow, isStaticShow, personNums, isLabelSelected } = this.state;

        return (
            <div className="editModal-wrap" style={{ display: this.props.isEditModalShow ? 'block' : 'none' }}>
                {
                    currentContent ?
                        <div className="modalContent">
                            <div className="contentText">
                                <p className="modal-title">{currentContent.listTitle}属性编辑</p>
                                <p className="modal-attr">
                                    动静属性：
                                <div className="attr-input1" onClick={this.dynamicShow} style={(currentContent.listAttr == '1') ? selectedStyle : unSelectedStyle}>动区</div>
                                    <div className="attr-input2" onClick={this.staticShow} style={(currentContent.listAttr == '2') ? selectedStyle : unSelectedStyle}>静区</div>
                                </p>
                                <p className="modal-person-nums clearfix">
                                    <div className="nums-title">额定人数：</div>
                                    <div className="person-reduce" onClick={this.reducePersonNums.bind(this, personNums)}>-</div>
                                    <div className="person-nums">{personNums}</div>
                                    <div className="person-add" onClick={this.addPersonNums.bind(this, personNums)}>+</div>
                                </p>
                                <p className="modal-i-arr">
                                    <div className="i-arr-left">多元智能：</div>
                                    <div className="i-arr-right">
                                        {
                                            currentContent ?
                                                <ul>
                                                    {
                                                        currentContent.listLabelArr.map((item, index) => {
                                                            let areaItem = currentContent
                                                            return <li onClick={this.labelSelected.bind(this, item.tagId, !item.isSelected)} style={(item.isSelected) ? labelSelectedStyle : null}>
                                                                {item.tagName}
                                                            </li>
                                                        }
                                                        )
                                                    }
                                                </ul> : null
                                        }
                                    </div>
                                </p>
                                <div className="modal-foot">
                                    <input type="button" value="取消" className="modal-cancel" onClick={this.props.handleCancel} />
                                    <input type="button" value="确定" className="modal-confirm" onClick={this.handleSummit} />
                                </div>
                            </div>
                        </div> : null
                }

            </div>
        )
    }
}

@inject('LearnActStore')
@observer
class LearnAct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditModalShow: false,
            isPromptModalShow: false,
            modalShowId: '',
            lastLabelArr: []
        }

        this.handleCancel = this.handleCancel.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.promptModalCloze = this.promptModalCloze.bind(this);
        this.promptModalShow = this.promptModalShow.bind(this);
        this.tabPageScroll = this.tabPageScroll.bind(this);
        this.handleToast = this.handleToast.bind(this);
    }
    handleEditList(id, index) {
        console.log(1111);
        console.log(this.state.lastLabelArr);
        this.props.LearnActStore.selectCurrentContent(index);
        this.setState({
            isEditModalShow: true,
            modalShowId: id,
            lastLabelArr: []
        });
    }

    handleCancel() {
        this.setState({
            isEditModalShow: false
        })
    }

    componentDidMount() {
        // 获取学生所在学校的兴趣位置--展厅
        this.props.LearnActStore.getInterestLocationData();

        // 获取孩子的兴趣活动数据
        this.props.LearnActStore.exhibitionInterestData();

        //// 获取学习活动区域列表
        // this.props.LearnActStore.getStudyActivityAreaList();
    }

    handleConfirm() {
        this.setState({
            isEditModalShow: false
        })
    }

    promptModalShow() {
        this.setState({
            isPromptModalShow: true
        })
    }

    promptModalCloze() {
        this.setState({
            isPromptModalShow: false
        })
    }

    getModalDom(content) {
        let { modalListArr } = this.props.LearnActStore;
        let dom = [];
        content.listLabelArr.forEach((element, index) => {
            dom.push(<span key={index}>
                <font>{element.tagName}</font>
            </span>)
        });
        return dom
    }

    tabPageScroll(scrollTop) {
        this.tb1.scroll(scrollTop);
        this.tb2.scroll(scrollTop);
        this.tb3.scroll(scrollTop);
    }

    handleToast() {
        let { handleToastAction } = this.props.LearnActStore;
        handleToastAction(true, '开发中，敬请期待！');
    }

    render() {
        const { statisticBarData, menuItems, formData, listContentArr, modalListArr, toast } = this.props.LearnActStore;
        let listContentData = listContentArr;
        let className = Tool.getCookie('className');
        return (
            <div>
                <div className="learn-act-wrap">
                    <div className="learn-act">
                        {className}课堂数据情况
                    </div>
                    <div className="learn-content">
                        <Horn />
                        <CenterHighLight />
                        <TabPage className="learn-info-tab-page" navs={[{ name: '各区域停留情况' }, { name: '区域评估' }, { name: '画像统计' }, { name: '数据详情' }]} onScroll={this.tabPageScroll}>
                            <div className="tab-page-fg"></div>
                            <TabPageTable className="tb-student" ref={(instance) => { this.tb1 = instance }}>
                                <ul className="ul-content">
                                    { 
                                        listContentData.map((item, index) => {
                                            // console.log('item.listAttr', item.listAttr);
                                            return <li className="list-content" key={index} >
                                                <div className="list-image" >
                                                    {/* <img src={imageMap[item.listId]} />   */}
                                                    <img src={item.img} />
                                                </div>
                                                <div className="list-top">
                                                    <div className="list-title">{item.listTitle}</div>
                                                    <img className="list-edit" src={`${require('./image/edit.png')}`} onClick={this.handleEditList.bind(this, item.listId, index)} />
                                                </div>
                                                <div className="list-text">
                                                    <p>共来访{item.totalNums}人次，男{item.boyNums} 女{item.girlNums}，满员速度第{item.listRanking}，响应时间{item.listTime}秒</p>
                                                </div>
                                                <div className="list-area">
                                                    <div className="list-area-person">
                                                        区域定额：
                                                <span>{item.areaPersonNums}人</span>
                                                    </div>
                                                    <div className="list-area-attribute">
                                                        动静属性：
                                                <span>{(item.listAttr == '1') ? '动区' : '静区'}</span>
                                                    </div>
                                                </div>  
                                                <div className="list-label">
                                                    {
                                                        this.getModalDom(item)
                                                    }
                                                </div>
                                            </li>
                                        }

                                        )
                                    }
                                    <li className="list-content">
                                        <div className="list-add">
                                            <img src={`${require('./image/add.png')}`} onClick={this.handleToast} />
                                        </div>
                                    </li>
                                </ul>
                            </TabPageTable>

                            <div className="tab-page-fg"></div>
                            <div className="assessment">
                                <p className="assessment-title">区域观察是幼儿老师一项重要工作。通过区域观察了解区域设置是否合理、材料投放是否科学等，为材料选择、更新等活动区创设提供帮助。</p>
                                <div className="assessment-boxs">
                                    <div className="assessment-box">
                                        <p className="assessment-box-title">日均来访统计</p>
                                        <p className="assessment-box-sub">各区域来访统计，分析整体概况及性别喜好分布。</p>
                                        <div className="charts-area">
                                            <ChartsByGender femaleValue={[11,23,27,13,24]} manValue={[23,20,12,25,15]} labels={['构建区','阅读区','美工区','科学区','自然区']}/>
                                        </div>
                                    </div>
                                    <div className="assessment-box">

                                        <p className="assessment-box-title">满员响应时间</p>
                                        <p className="assessment-box-sub">游戏区域受欢迎热度越高，满员时间越短。</p>
                                        <div className="charts-area">
                                            <ChartsByTime value={[7,28,30,15,75]} labels={['构建区','阅读区','美工区','科学区','自然区']}/>
                                        </div>
                                    </div>
                                    <div className="assessment-box">
                                        <p className="assessment-box-title">区域人员留存率</p>
                                        <p className="assessment-box-sub">游戏区域设计更具沉浸性时，人员流留存率越高，阈值设定为4分钟。</p>
                                        <div className="charts-area">
                                            <ChartsByKeep value={[87,62,55,72,83]} labels={['构建区','阅读区','美工区','科学区','自然区']} />
                                        </div>
                                    </div>
                                    <div className="assessment-box">
                                        <p className="assessment-box-title">学生偏好统计</p>
                                        <p className="assessment-box-sub"> 根据学生动静偏好、兴趣偏好合理配置区域和物料。</p>
                                        <div className="charts-area2">
                                            <div className="charts-area-likes">
                                                <div className="a-likes-charts">
                                                    <p>偏好静区</p>
                                                    <ChartsByLikes value={43} />
                                                </div>
                                                <div className="a-likes-charts">
                                                    <p>偏好动区</p>
                                                    <ChartsByLikes value={35} />
                                                </div>
                                                <div className="a-likes-charts">
                                                    <p>偏好单一</p>
                                                    <ChartsByLikes value={33} />
                                                </div>
                                                <div className="a-likes-charts">
                                                    <p>偏好广泛</p>
                                                    <ChartsByLikes value={12} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="assessment-box">
                                        <p className="assessment-box-title">区域常驻人员统计</p>
                                        <p className="assessment-box-sub"> 区域停留时间超过95%的人员统计。</p>
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
                                                        <td>构建区</td>
                                                        <td>3</td>
                                                        <td>张小明，张哲宁，徐可</td>
                                                    </tr>
                                                    <tr>
                                                        <td>阅读区</td>
                                                        <td>2</td>
                                                        <td>赵懂心，郭如远</td>
                                                    </tr>
                                                    <tr>
                                                        <td>美工区</td>
                                                        <td>3</td>
                                                        <td>吴沁瑶，吴沐远，柳妍希</td>
                                                    </tr>
                                                    <tr>
                                                        <td>科学区</td>
                                                        <td>2</td>
                                                        <td>贺家豪，戴辰欣</td>
                                                    </tr>
                                                    <tr>
                                                        <td>自然区</td>
                                                        <td>1</td>
                                                        <td>江莞琦</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="assessment-box">
                                        <p className="assessment-box-title">自定义统计图</p>
                                        <p className="assessment-box-sub"> 根据游戏区角特性自定义可视化统计图表。</p>
                                        <img className="btn-add-charts" src={`${require('./image/add.png')}`} onClick={this.handleToast} />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-page-fg"></div>
                            <TabPageTable className="tb-student" ref={(instance) => { this.tb2 = instance }}>
                                <div className="portrait-statistic">
                                    <PortraitStatistic statisticBarData={statisticBarData} />
                                </div>
                            </TabPageTable>
                            <div className="tab-page-fg"></div>
                            <TabPageTable className="tb-env" ref={(instance) => { this.tb3 = instance }}>
                                <TabPageThead>
                                    <tr>
                                        {
                                            formData.tHead.map((item, index) => {
                                                if (index === 0) return <th width="8%" key={`student-thead-${index}`}>{item}</th>
                                                return <th width={index === 8 ? "13%" : "9%"} key={`student-thead-${index}`}>{item}</th>
                                            })
                                        }
                                    </tr>
                                </TabPageThead>
                                <TabPageTbody>
                                    {
                                        formData.tData.map((ite, i) => {
                                            return <tr key={`student-tdata-${i}`} >
                                                <td width="8%">{ite.param1}</td>
                                                <td width="9%">{ite.param2}</td>
                                                <td width="9%">{ite.param3}</td>
                                                <td width="9%">{ite.param4}</td>
                                                <td width="9%">{ite.param5}</td>
                                                <td width="9%">{ite.param6}</td>
                                                <td width="9%">{ite.param7}</td>
                                                <td width="9%">{ite.param8}</td>
                                                <td width="13%">{ite.param9}</td>
                                                <td width="9%">{ite.param10}</td>
                                                <td width="9%" style={{ textDecoration: 'underline' }} onClick={this.handleToast}>{ite.param11}</td>
                                            </tr>
                                        })
                                    }
                                </TabPageTbody>
                            </TabPageTable>
                        </TabPage>
                        <EditModal isEditModalShow={this.state.isEditModalShow} handleCancel={this.handleCancel} handleConfirm={this.handleConfirm} listContentArr={this.listContentArr} modalListArr={this.modalListArr} lastLabelArr={this.state.lastLabelArr} modalShowId={this.state.modalShowId} />
                        {/* <PromptModal isPromptModalShow={this.state.isPromptModalShow} promptModalCloze={this.promptModalCloze}/> */}
                        <Toast toast={toast} />
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(LearnAct);