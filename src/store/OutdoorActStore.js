import { observable, action, computed, autorun, reaction } from 'mobx';
import * as api from '@/api/OutdoorAct';

const selectedTagIds = [];
let timer = null;
let areaObj = { 
    areaId: '',
    areaName: '',
    tagIds: ''
};
export default class OutdoorActStore { 
    // tabbar
    @observable menuItems = [
        { itemName: '区域属性标记' },
        { itemName: '区域运动情况' },
        { itemName: '运动模型' },
        { itemName: '数据详情' },
    ];

    // toast相关参数
    @observable toast = {
        toastContent: '',
        isToastShow: false,
        toastType: 0 // 0-无spin 1-有spin
    };
    
    // 运动模型
    @observable sportModel = [
        {
            sportType: '猎鹰型',
            sportIntro: '经常进静区的幼儿，是个爱独立思考的小朋友。但要注意鼓励幼儿多与人交往。'
        },
        {
            sportType: '兔子型',
            sportIntro: '经常在动区活动的幼儿，大脑皮层长时间处于高度、兴奋状态，容易导致身心疲倦。要帮助幼儿适当放松。'
        }, 
        {
            sportType: '绵羊型',
            sportIntro: '内向型幼儿出入活区频率少，选择类型较单一，能力发展容易不均衡。要鼓励幼儿多到别的区看一看，玩一玩。'
        }, 
        {
            sportType: '小蛇型',
            sportIntro: '外向型幼儿选择活动区的类型很广泛。但不易专注。要引导幼儿长时集中做一件事，培养注意力。'
        },        
    ] 
    
    // 区域属性
    @observable tagList = [
        {
            "tagId": 9,
            "tagName": "跑步",
            "isSelected": 0
        },
        {
            "tagId": 10,
            "tagName": "走步",
            "isSelected": 0
        },
        {
            "tagId": 11,
            "tagName": "垂悬",
            "isSelected": 0
        }, 
        {
            "tagId": 12,
            "tagName": "搬运",
            "isSelected": 0
        }, 
        {
            "tagId": 13,
            "tagName": "跳跃",
            "isSelected": 0
        }, 
        {
            "tagId": 14,
            "tagName": "投掷",
            "isSelected": 0
        }, 
        {
            "tagId": 15,
            "tagName": "支撑",
            "isSelected": 0
        }, 
        { 
            "tagId": 16,
            "tagName": "推",
            "isSelected": 0
        }, 
        {
            "tagId": 17,
            "tagName": "拉",
            "isSelected": 0
        }, 
        {
            "tagId": 18,
            "tagName": "钻",
            "isSelected": 0
        }, 
        {
            "tagId": 19,
            "tagName": "爬",
            "isSelected": 0
        }       
    ];

    // 编辑的区域属性
    @observable editAreaTagList = [
        // {
        //     "tagId": 0,
        //     "tagName": "跑步",
        //     "isSelected": 1
        // },
        // {
        //     "tagId": 1,
        //     "tagName": "走步",
        //     "isSelected": 1
        // },
        // {
        //     "tagId": 2,
        //     "tagName": "垂悬",
        //     "isSelected": 1
        // }, 
        // {
        //     "tagId": 3,
        //     "tagName": "搬运",
        //     "isSelected": 1
        // },         
    ]

    // 户外活动区域列表
    @observable areaList = [
        // {
        //     "areaId": 0,
        //     "areaName": "攀爬区",
        //     "areaImage": "http://skintest.hetyj.com/aa06b11404934aafb4286eaa40b7869e.png",
        //     "tagList": [
        //         {
        //             "tagId": 0,
        //             "tagName": "跑步",
        //             "isSelected": 1
        //         },
        //         {
        //             "tagId": 1,
        //             "tagName": "走步",
        //             "isSelected": 1
        //         },
        //     ]
        // }, 
        // {
        //     "areaId": 1,
        //     "areaName": "沙土区",
        //     "areaImage": "http://skintest.hetyj.com/aa06b11404934aafb4286eaa40b7869e.png",
        //     "tagList": [
        //         {
        //             "tagId": 8,
        //             "tagName": "拉",
        //             "isSelected": 1
        //         }, 
        //         {
        //             "tagId": 9,
        //             "tagName": "钻",
        //             "isSelected": 1
        //         }, 
        //     ]
        // },
        // {
        //     "areaId": 2,
        //     "areaName": "滑梯区",
        //     "areaImage": "http://skintest.hetyj.com/aa06b11404934aafb4286eaa40b7869e.png",
        //     "tagList": [
        //         {
        //             "tagId": 8,
        //             "tagName": "拉",
        //             "isSelected": 1
        //         }, 
        //     ]
        // },
        // {
        //     "areaId": 3,
        //     "areaName": "秋千区",
        //     "areaImage": "http://skintest.hetyj.com/aa06b11404934aafb4286eaa40b7869e.png",
        //     "tagList": [
        //         {
        //             "tagId": 8,
        //             "tagName": "拉",
        //             "isSelected": 1
        //         }, 
        //     ]
        // },
        // {
        //     "areaId": 4,
        //     "areaName": "足球区",
        //     "areaImage": "http://skintest.hetyj.com/aa06b11404934aafb4286eaa40b7869e.png",
        //     "tagList": [
        //         {
        //             "tagId": 8,
        //             "tagName": "拉",
        //             "isSelected": 1
        //         }, 
        //     ]
        // },        
    ] 

    // 数据详情
    @observable formData = { 
        tHead: ['学生姓名', 'A区域时长', 'B区域时长', 'C区域时长', 'D区域时长', 'E区域时长', '平均心率', '步数', '运动模型'],
        tData: [
            {"param1":"张小明","param2":"45","param3":"23","param4":"34","param5":"19","param6":"26","param7":"69","param8":"7850","param9":"兔子型"},
            {"param1":"苏芷妍","param2":"38","param3":"37","param4":"39","param5":"34","param6":"35","param7":"83","param8":"7111","param9":"兔子型"},
            {"param1":"李懂","param2":"23","param3":"42","param4":"29","param5":"23","param6":"20","param7":"93","param8":"7810","param9":"兔子型"},
            {"param1":"张哲宁","param2":"23","param3":"36","param4":"30","param5":"45","param6":"38","param7":"95","param8":"6395","param9":"小蛇型"},
            {"param1":"徐可","param2":"25","param3":"39","param4":"25","param5":"23","param6":"38","param7":"91","param8":"7729","param9":"兔子型"},
            {"param1":"季晨皓","param2":"34","param3":"32","param4":"25","param5":"36","param6":"38","param7":"77","param8":"8087","param9":"猎鹰型"},
            {"param1":"赵懂心","param2":"20","param3":"36","param4":"19","param5":"22","param6":"31","param7":"66","param8":"8591","param9":"猎鹰型"},
            {"param1":"郭如远","param2":"27","param3":"32","param4":"38","param5":"42","param6":"22","param7":"75","param8":"8426","param9":"猎鹰型"},
            {"param1":"许恒铭","param2":"30","param3":"26","param4":"26","param5":"38","param6":"26","param7":"80","param8":"4555","param9":"小蛇型"},
            {"param1":"高逸辰","param2":"20","param3":"37","param4":"26","param5":"22","param6":"35","param7":"81","param8":"3234","param9":"绵羊型"},
            {"param1":"吴沁瑶","param2":"28","param3":"31","param4":"29","param5":"44","param6":"20","param7":"95","param8":"3891","param9":"绵羊型"},
            {"param1":"汪铭心","param2":"23","param3":"22","param4":"24","param5":"21","param6":"45","param7":"75","param8":"3462","param9":"绵羊型"},
            {"param1":"吴沐远","param2":"27","param3":"41","param4":"28","param5":"35","param6":"44","param7":"70","param8":"4331","param9":"绵羊型"},
            {"param1":"周涵裕","param2":"20","param3":"30","param4":"27","param5":"41","param6":"21","param7":"90","param8":"7192","param9":"兔子型"},
            {"param1":"马芷菡","param2":"21","param3":"30","param4":"29","param5":"40","param6":"28","param7":"74","param8":"8656","param9":"猎鹰型"},
            {"param1":"戴辰欣","param2":"35","param3":"44","param4":"20","param5":"34","param6":"30","param7":"90","param8":"3226","param9":"绵羊型"},
            {"param1":"贺家豪","param2":"34","param3":"41","param4":"37","param5":"24","param6":"22","param7":"75","param8":"4666","param9":"小蛇型"},
            {"param1":"柳妍希","param2":"24","param3":"27","param4":"34","param5":"26","param6":"33","param7":"66","param8":"3701","param9":"绵羊型"},
            {"param1":"童恪言","param2":"39","param3":"30","param4":"22","param5":"26","param6":"36","param7":"92","param8":"3962","param9":"绵羊型"},
            {"param1":"陈辰","param2":"43","param3":"19","param4":"23","param5":"45","param6":"45","param7":"84","param8":"5537","param9":"小蛇型"},
            {"param1":"卢哲川","param2":"19","param3":"32","param4":"21","param5":"19","param6":"42","param7":"69","param8":"3424","param9":"绵羊型"},
            {"param1":"江莞琦","param2":"36","param3":"40","param4":"29","param5":"36","param6":"34","param7":"72","param8":"4291","param9":"绵羊型"},
            {"param1":"周沁瑶","param2":"22","param3":"27","param4":"24","param5":"31","param6":"23","param7":"75","param8":"7880","param9":"兔子型"}, 
        ]      
    } 

    data1 = [10, 8, 6, 3, 6, 4];
    data2 = [8, 7, 7, 3, 6, 3];
    data3 = function(that) {
        var datas = [];
        for (var i = 0; i < that.data1.length; i++) {

            datas.push(that.data1[i] + that.data2[i]); 
        }
        return datas;
    }(this); 

    // 区域人数统计
    @observable barData = { 
        seriesData: [
            {
                name: '男生',
                data: this.data1,
                stack: '性别'
            },
            {
                name: '女生',
                data: this.data2,
                stack: '性别'                
            },
            {
                name: '总计',
                data: this.data3, 
                stack: '性别'                
            },            
        ],
        xAxisData: ['攀爬区','沙土区','秋千区','足球区','滑梯区','某某区']        
    };

    // 区域名
    @observable areaName = '';

    // 是否显示编辑区域
    @observable isShowEditMark = false;

    // 操作显示、隐藏
    @action handleShowEditMark = (i) => {
        this.isShowEditMark = !this.isShowEditMark;

        if (Object.prototype.toString.call(i) === "[object Object]") {
            this.getAreaInfo(i.areaId);

            areaObj.areaId = i.areaId;
            areaObj.areaName = i.areaName;
        } else if (i === 'yes') { 
            this.updateAreaInfo(areaObj);
        } else if (i === 'cancel') {
            // 清空  
            this.editAreaTagList = [];
            this.areaName = '';
            areaObj = {
                areaId: '',
                areaName: '',
                tagIds: ''
            };            
        }

    }
    
    // 操作区域属性
    @action handleTagList = (i, ite) => {
        this.tagList[i].isSelected = this.tagList[i].isSelected ? 0 : 1;

        // if (this.tagList[i].isSelected && !selectedTagIds.includes(i)) {
        //     selectedTagIds.push(i);
        // } else {
        //     this.remove(selectedTagIds, i);
        // }
        let bool = false, index = -1;
        this.editAreaTagList.forEach((item, ind) => {
            if (item.tagName === ite.tagName) {
                bool = true;
                index = ind;
            }  
        })
        if (!bool) {
            this.editAreaTagList.push({
                "tagId": ite.tagId,
                "tagName": ite.tagName,
                "isSelected": 1
            })
        } else {
            index !== -1 && this.editAreaTagList.splice(index, 1); 
        }

        let selectedArr = [];
        this.tagList.forEach((item, index) => {
            this.editAreaTagList.forEach((ite) => {
                if (item.tagName === ite.tagName && ite.isSelected === 1) {
                    selectedArr.push(item.tagId);
                }
            })
        });
        areaObj.tagIds = selectedArr.join(',');
    }

    // 控制toast
    @action handleToastAction = (bool, content) =>  {
        this.toast.isToastShow = bool;
        this.toast.toastContent = content;

        this.handleDispear();
    }

    // 使得toast 2s消失
    handleDispear(type) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            this.toast.isToastShow = false
        }, 2000); 
    }

    // 删除数组中指定的元素
    remove(items, item) {
        let index = -1;
        items.forEach((ite, ind) => {
            if (ite === item) {
                index = ind;
            }
        });

        if (index !== -1) {
            items.splice(index, 1);
        }
    }

    // 获取户外活动区域列表
    @action getAreaList() {
        api.getAreaList().then((res) => {
            if (res.data.code === 0 && res.data.data) {
                let data = res.data.data;
                this.areaList = data;
            }
        })
    }

    // 获取户外活动区域信息
    @action getAreaInfo(areaId) {
        let param = {
            areaId
        };
        api.getAreaInfo(param).then((res) => {
            if (res.data.code === 0 && res.data.data) {
                let data = res.data.data;
                let tagList = data.tagList;
                tagList = tagList.filter((item) => item.isSelected === 1);
                this.editAreaTagList = tagList; 
                this.areaName = data.areaName;  

                let tagIds = tagList.map((item) => item.tagId);
                tagIds = tagIds.join(',');

                areaObj = {
                    areaId: data.areaId,
                    areaName: data.areaName,
                    tagIds: tagIds
                };   
                console.log('getAreaInfo', areaObj); 
            } 
        })        
    }

    // 编辑户外区域信息
    @action updateAreaInfo(params) {
        let param = {
            ...params
        };
        api.updateAreaInfo(param).then((res) => {
            if (res.data.code === 0) {
                // 清空 
                this.editAreaTagList = [];
                this.areaName = '';
                areaObj = {
                    areaId: '',
                    areaName: '',
                    tagIds: ''
                };   

                // 重新获取列表
                this.getAreaList();
            }
        })          
    }    
}  