import { observable, action, computed, autorun, reaction } from 'mobx';
import {axiosInstance,axios,tokenService} from 'exhibition-axios';
import moment from 'moment';
import {Tool} from 'exhibition-tool'; 
import * as api from '@/api/LearnAct';  

let timer = null;
export default class LearnActStore {
    @observable currentContent = null;
    @observable currentContentIndex=null;
    @observable tmpCurrentContent = null;

    // toast相关参数
    @observable toast = {
        toastContent: '',
        isToastShow: false,
        toastType: 0 // 0-无spin 1-有spin
    };

    @observable modalListArr = [
            {labelId: '0',labelName: '人际',isLabelSelected: false},
            {labelId: '1',labelName: '自然',isLabelSelected: false},
            {labelId: '2',labelName: '语言',isLabelSelected: false},
            {labelId: '3',labelName: '内省',isLabelSelected: false},
            {labelId: '4',labelName: '运动',isLabelSelected: false},
            {labelId: '5',labelName: '空间',isLabelSelected: false},
            {labelId: '6',labelName: '音乐',isLabelSelected: false},
            {labelId: '7',labelName: '逻辑',isLabelSelected: false}
    ];  

    @observable listContentArr=[ //列表内容
        // {
        //     img:'./image/role.png', 
        //     listId:'0',
        //     listTitle:'角色区', 
        //     totalNums:'25',    
        //     boyNums:'7', 
        //     girlNums:'18', 
        //     listRanking:'1', 
        //     listTime:'30s', 
        //     areaPersonNums:'25', 
        //     listAttr:'1', 
        //     // listLabelArr:{
        //     //     0:true,
        //     //     1:true,
        //     //     2:false,
        //     //     3:false,
        //     //     4:false,
        //     //     5:false,
        //     //     6:false,
        //     //     7:false,
        //     // }
        //     listLabelArr:[
        //         {"tagId": 1,"tagName": "人际","isSelected": 0},
        //         {"tagId": 2,"tagName": "自然","isSelected": 0},
        //         {"tagId": 3,"tagName": "语言","isSelected": 0},
        //         {"tagId": 4,"tagName": "内省","isSelected": 0},
        //         {"tagId": 5,"tagName": "运动","isSelected": 0},
        //         {"tagId": 6,"tagName": "空间","isSelected": 0},
        //         {"tagId": 7,"tagName": "音乐","isSelected": 0},
        //         {"tagId": 8,"tagName": "逻辑","isSelected": 0}
        //     ]
        // }
    ]
    @action addPersonNums(index, num) {
        
    }


    @action selectCurrentContent(index){
        this.currentContentIndex=index;
        this.getAreaListDetail(this.listContentArr[index].listId);
        this.currentContent = JSON.parse(JSON.stringify(this.listContentArr[index]));
    }
    @action editLabelArr(id,b){
        this.currentContent.listLabelArr.forEach(element => {
            if(element.tagId == id) element.isSelected = b?1:0;
        });
    }
    @action saveContent(){
        // this.listContentArr[this.currentContentIndex] = this.currentContent;
        let tmplistLabelArr = this.currentContent.listLabelArr;
        let saveLabelArr = [];
        tmplistLabelArr.forEach(label => {
            if(label.isSelected){
                saveLabelArr.push(label)
            }
        })
        // this.listContentArr[this.currentContentIndex].listLabelArr=saveLabelArr;
        const tagIdArr = [];
        this.currentContent.listLabelArr.forEach(item=>{
            if(item.isSelected){
                tagIdArr.push(item.tagId);
            }
        }) 
        this.updateAreaInfo(
            {
                areaId:this.currentContent.listId,
                areaName:this.currentContent.listTitle,
                areaProperty:this.currentContent.listAttr,
                areaMaxNum:this.currentContent.areaPersonNums,
                tagIds:tagIdArr.join(',')
            }
        );
        // areaId	是	number	区域id
        // areaName	否	string	区域名称
        // areaProperty	是	number	区域属性 1:动区；2:静区
        // areaMaxNum	是	number	区域额定人数
        // tagIds	是	string	选中的标签ids，多个以逗号分隔
    }

    // 画像统计数据
    @observable statisticBarData = {
        staticData: {
            barTitle: '偏好静区',
            barData: 12,
            barIntro: '经常进静区的幼儿，是个爱独立思考的小朋友。但要注意鼓励幼儿多与人交往。'
        },
        dynamicData: {
            barTitle: '偏好动区',
            barData: 32,
            barIntro: '经常在动区活动的幼儿，大脑皮层长时间处于高度、兴奋状态，容易导致身心疲倦。要帮助幼儿。'
        },
        singleData: {
            barTitle: '偏好单一',
            barData: 23,
            barIntro: '内向型幼儿出入活区频率少，能力发展容易不均衡。要鼓励幼儿多到别的区看一看，玩一玩。'             
        },
        broadData: {
            barTitle: '偏好广泛',
            barData: 33,
            barIntro: '外向型幼儿选择活动区的类型很广泛。但不易专注。要引导幼儿长时集中做一件事，培养注意力。'                
        }
    }

    // TabBar
    @observable menuItems = [
        { itemName: '各区域停留情况' },
        { itemName: '画像统计' },
        { itemName: '数据详情' },
    ]  

    // 数据详情
    @observable formData = { 
        tHead: ['学生姓名', '专注度', '兴趣度', '角色区域时长', '阅读区域时长', '构建区域时长', '美工区域时长', '表演区域时长', '八大智能统计', '违规次数', '操作'],
        tData: [ 
            {"param1":"张小明","param2":"89","param3":"36","param4":"23","param5":"31","param6":"12","param7":"13","param8":"13","param9":"73/83/43/55/78/67/82/92","param10":"0","param11":"校验"}, 
            {"param1":"苏芷妍","param2":"65","param3":"65","param4":"26","param5":"29","param6":"42","param7":"32","param8":"40","param9":"62/74/88/43/54/75/83/72","param10":"0","param11":"校验"},
            {"param1":"李懂","param2":"67","param3":"58","param4":"44","param5":"41","param6":"31","param7":"31","param8":"26","param9":"58/88/53/56/68/68/83/83","param10":"3","param11":"校验"},
            {"param1":"张哲宁","param2":"82","param3":"87","param4":"37","param5":"34","param6":"39","param7":"44","param8":"32","param9":"76/82/47/65/79/54/79/83","param10":"0","param11":"校验"},
            {"param1":"徐可","param2":"78","param3":"85","param4":"36","param5":"39","param6":"32","param7":"25","param8":"32","param9":"82/63/59/55/82/77/66/73","param10":"1","param11":"校验"},
            {"param1":"季晨皓","param2":"74","param3":"61","param4":"40","param5":"37","param6":"30","param7":"29","param8":"23","param9":"73/83/43/55/78/67/82/92","param10":"0","param11":"校验"},
            {"param1":"赵懂心","param2":"75","param3":"36","param4":"32","param5":"34","param6":"27","param7":"25","param8":"39","param9":"73/83/43/55/78/67/82/92","param10":"0","param11":"校验"},
            {"param1":"郭如远","param2":"93","param3":"81","param4":"29","param5":"34","param6":"28","param7":"29","param8":"37","param9":"58/88/53/56/68/68/83/83","param10":"0","param11":"校验"},
            {"param1":"许恒铭","param2":"65","param3":"94","param4":"34","param5":"39","param6":"32","param7":"27","param8":"23","param9":"62/74/88/43/54/75/83/72","param10":"0","param11":"校验"},
            {"param1":"高逸辰","param2":"90","param3":"99","param4":"37","param5":"21","param6":"25","param7":"45","param8":"32","param9":"62/74/88/43/54/75/83/72","param10":"0","param11":"校验"},
            {"param1":"吴沁瑶","param2":"69","param3":"69","param4":"21","param5":"22","param6":"30","param7":"21","param8":"37","param9":"82/66/57/55/71/88/71/64","param10":"0","param11":"校验"},
            {"param1":"汪铭心","param2":"72","param3":"67","param4":"27","param5":"22","param6":"24","param7":"33","param8":"29","param9":"63/83/43/55/78/67/82/92","param10":"1","param11":"校验"},
            {"param1":"吴沐远","param2":"75","param3":"56","param4":"41","param5":"35","param6":"34","param7":"33","param8":"35","param9":"58/88/53/56/68/68/83/83","param10":"0","param11":"校验"},
            {"param1":"周涵裕","param2":"69","param3":"74","param4":"37","param5":"35","param6":"37","param7":"26","param8":"45","param9":"73/83/43/55/78/67/82/92","param10":"1","param11":"校验"},
            {"param1":"马芷菡","param2":"90","param3":"92","param4":"38","param5":"27","param6":"42","param7":"24","param8":"45","param9":"75/83/43/55/78/67/82/92","param10":"0","param11":"校验"},
            {"param1":"戴辰欣","param2":"75","param3":"98","param4":"26","param5":"36","param6":"26","param7":"23","param8":"34","param9":"58/88/53/56/68/68/83/83","param10":"0","param11":"校验"},
            {"param1":"贺家豪","param2":"95","param3":"97","param4":"24","param5":"25","param6":"44","param7":"38","param8":"38","param9":"66/83/49/51/49/67/82/77","param10":"无","param11":"校验"},
            {"param1":"柳妍希","param2":"90","param3":"99","param4":"43","param5":"39","param6":"38","param7":"34","param8":"30","param9":"62/74/88/43/54/75/83/72","param10":"无","param11":"校验"},
            {"param1":"童恪言","param2":"94","param3":"84","param4":"35","param5":"27","param6":"44","param7":"29","param8":"38","param9":"73/83/43/55/78/67/82/92","param10":"无","param11":"校验"},
            {"param1":"陈辰","param2":"84","param3":"40","param4":"42","param5":"42","param6":"44","param7":"45","param8":"39","param9":"75/83/43/55/78/67/82/92","param10":"无","param11":"校验"},
            {"param1":"卢哲川","param2":"92","param3":"68","param4":"32","param5":"28","param6":"22","param7":"39","param8":"32","param9":"61/88/69/55/72/55/79/76","param10":"无","param11":"校验"},
            {"param1":"江莞琦","param2":"91","param3":"42","param4":"42","param5":"36","param6":"28","param7":"38","param8":"43","param9":"73/83/43/55/78/67/82/92","param10":"无","param11":"校验"},
            {"param1":"周沁瑶","param2":"94","param3":"49","param4":"25","param5":"30","param6":"30","param7":"25","param8":"25","param9":"58/88/53/56/68/68/83/83","param10":"无","param11":"校验"},           
        ]  
    } 

    // 获取学生所在学校的兴趣位置--展厅
    @action getInterestLocationData() {
        let infoData = [];
        const studentDataId = Tool.getCookie('studentDataId');

        let param = {
            studentDataId
        };

        api.getInterestLocationData(param).then((res) => {
            let infoData = [];
            if (res.data.code == 0 && res.data.data) {
                let data = res.data.data;
                // let tHeadData = data.map((item) => `${item.locationName}域时长`);
                // this.formData.tHead =  ['学生姓名', '专注度', '兴趣度', ...tHeadData, '画像统计', '偏好标签', '规则违反'];
                infoData =  data; 
            }
            return infoData; 
        }).then((data) => {
            console.log('data',data);
            this.getStudyActivityAreaList(data);   
        }); 
    }
    
    countTimeDiff(time1, time2) {
        let ms = moment(time2).diff(moment(time1));  
        let d = moment.duration(ms);
        let s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        return s;        
    }

    // 获取孩子的兴趣活动数据
    @action exhibitionInterestData() {
        let param = {
            studentDataId: Tool.getCookie('studentDataId')
        };

        api.exhibitionInterestData(param).then((res) => {
            if (res.data.code == 0 && res.data.data) {
                let data = res.data.data;
                data = data.map((item, index) => {
                    let data = item.subList.map((ite) => {
                        return this.countTimeDiff(ite.enterTime, ite.leaveTime);
                    }) 
                    return data;
                });
                console.log('exhibitionInterestData', data);
            }
        }) 
    }

    getAreaData(name) {
        let obj = {
            totalNums: '0', 
            boyNums: '0', 
            girlNums: '0', 
            listRanking: '0', 
            listTime: '0', 
        };
        switch(name) {
            case '构建区':
                obj = {
                    totalNums: '34', 
                    boyNums: '23', 
                    girlNums: '11', 
                    listRanking: '1', 
                    listTime: '7', 
                };
            break;
            case '阅读区':
                obj = {
                    totalNums: '43', 
                    boyNums: '20', 
                    girlNums: '23', 
                    listRanking: '3', 
                    listTime: '28', 
                };
            break;
            case '美工区':
                obj = {
                    totalNums: '39', 
                    boyNums: '12', 
                    girlNums: '27', 
                    listRanking: '4', 
                    listTime: '30', 
                };
            break; 
            case '科学区':
                obj = {
                    totalNums: '38', 
                    boyNums: '25', 
                    girlNums: '13', 
                    listRanking: '2', 
                    listTime: '15', 
                };
            break;  
            case '自然区':
                obj = {
                    totalNums: '39', 
                    boyNums: '15', 
                    girlNums: '24', 
                    listRanking: '5', 
                    listTime: '75', 
                };
            break;            
        }
        return obj;
    }

    //获取学习活动区域列表
    @action getStudyActivityAreaList(param){
        api.getStudyActivityAreaList(param).then((res) => {
            if (res.data.code == 0 && res.data.data) {
                let data = res.data.data;
                let arr = [];
                data.map((item, index) => {
                    // console.log('item.areaImage', item.areaImage);
                    let tagList =item.tagList;
                    let areaObj = this.getAreaData(item.areaName);
                    arr.push({
                        img: item.areaImage, 
                        listId:item.areaId,
                        listTitle:item.areaName, 
                        areaPersonNums:item.areaMaxNum, 
                        listAttr:item.areaProperty, 
                        listLabelArr:tagList,
                        ...areaObj
                    })
                })                
                this.listContentArr = arr;
            }
        })
    }



    //获取学习活动区域详情信息
    @action getAreaListDetail(areaId){
        api.getAreaListDetail(areaId).then((res) => {
            if (res.data.code == 0 && res.data.data) {
                let item = res.data.data;
                //对获取的数据进行处理
                let arr = [];
                let tagList =item.tagList;
                let areaObj = this.getAreaData(item.areaName);
                this.currentContent = {
                    img: item.areaImage, 
                    listId:item.areaId,
                    listTitle:item.areaName, 
                    areaPersonNums:item.areaMaxNum, 
                    listAttr:item.areaProperty, 
                    listLabelArr:tagList,
                    ...areaObj 
                    // listLabelArr:item.tagList
                };
            //     console.log(101010101);
            //     console.log('data', data);
            //     console.log(20202020);
            }
        })
    }

    //编辑模态框中确定按钮提交
    @action updateAreaInfo(param){
        api.updateAreaInfo(param).then((res) =>{
            if(res.data.code ==0){
                this.getInterestLocationData();
            }
        }) 
    }

    // 控制toast
    @action handleToastAction = (bool, content) =>  {
        this.toast.isToastShow = bool;
        this.toast.toastContent = content;

        this.handleDispear();
    }

    // 使得toast 2s消失
    @action handleDispear(type) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            this.toast.isToastShow = false
        }, 2000); 
    }    
} 