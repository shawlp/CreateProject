import { observable, action} from 'mobx';
import { createHashHistory } from 'history';
import * as api from '@/api/Dining'; 

let timer = null;
export default class DiningStore {
    @observable weather = {
        conditionTitle: '天气情况',
        conditionList: [
            { paramName: '天气', paramValue: '连续阴雨3天', paramUnit: '' },
            { paramName: '平均温度', paramValue: 27, paramUnit: '度' },
            { paramName: '天气湿度', paramValue: 70, paramUnit: '%' },
        ],
        modifyBtnText: ''            
    };
    @observable conditionListData = {
        growth: { 
            conditionTitle: '本校学生发育情况',
            conditionList: [
                { paramName: '人数', paramValue: 328, paramUnit: '' },
                { paramName: '肥胖检测类', paramValue: 5, paramUnit: '%' },
                { paramName: '生长斜率异常', paramValue: 0.08, paramUnit: '%' },
                { paramName: '骨骼发育不良', paramValue: 0.08, paramUnit: '%' },
                { paramName: '传染病或疑似传染', paramValue: 0.3, paramUnit: '%' },
                { paramName: '疾病', paramValue: '流感高发期', paramUnit: '' },
            ],
            modifyBtnText: ''            
        },
        sport: {
            conditionTitle: '本校学生运动情况',
            conditionList: [
                { paramName: '户外运动班级', paramValue: 15, paramUnit: '个' },
                { paramName: '平均户外时长', paramValue: 1.5, paramUnit: '小时' },
                { paramName: '平均运动步数', paramValue: 4000, paramUnit: '' },
                { paramName: '平均体脂消耗量', paramValue: 1300, paramUnit: 'kcal' },
            ],
            modifyBtnText: '参数修改'             
        },
        weather: {
            conditionTitle: '天气情况',
            conditionList: [
                { paramName: '天气', paramValue: '连续阴雨3天', paramUnit: '' },
                { paramName: '平均温度', paramValue: 27, paramUnit: '度' },
                { paramName: '天气湿度', paramValue: 70, paramUnit: '%' },
            ],
            modifyBtnText: ''            
        },
        agriculture: {
            conditionTitle: '农业知识图谱',
            conditionList: [
                { 
                    paramName: '季节', 
                    paramValue: '春季', 
                    paramUnit: '' 
                },
                { 
                    paramName: '蔬菜', 
                    paramValue: '辣椒、青椒、彩椒、洋葱、花椰菜、甜豆、豌豆、芹菜、莴苣、荠菜、油菜、菠菜、香椿、春笋、马兰头、瓠瓜、韭菜。', 
                    paramUnit: '' 
                },
            ],
            modifyBtnText: '季节调整'           
        },
    }

    @observable kindergartenData = { 
        kindergartenTitle: '幼儿园普适标准',
        kindergartenContent: '按照相关的规定日托提供餐点的总能量不能低于全天总能量的80%，动物蛋白不低于全天蛋白质的30%，加上植物蛋白，蛋白质的总供给不能低于全天需求的50%，维生素和矿物质不能低于全天需求的75%。每周规律安排少量猪肝、猪血。禽蛋类全日安排量约 50g。豆类每天约25g。用鲜豆、豆制品轮换使用。上午课间点安排课间奶150g，下午起床后午点安排糕点或粗杂粮类加奶类，糕点杂粮20g。'
    }

    // 本周菜谱
    @observable recipeData = { 
        recipeTitle: '本周菜谱',
        recipeFormData: { 
            tHead: ['日期', '用餐人数', '菜谱名称', '食物重量', '食材储备', '处理'], 
            tData: [
                // {
                //     date: '星期一早餐',
                //     recipeList: [
                //         { recipeNum: 869, recipeName: '红枣小米粥', foodWeight: '红枣5g、小米15g、大米20g', recipeReserve: '需购置', processing: '预约购置食材' },
                //         { recipeNum: 869, recipeName: '红枣小米粥', foodWeight: '红枣5g、小米15g、大米20g', recipeReserve: '需购置', processing: '预约购置食材' },
                //     ]
                // },
                // {
                //     date: '星期二早餐', 
                //     recipeList: [
                //         { recipeNum: 869, recipeName: '红枣小米粥', foodWeight: '红枣5g、小米15g、大米20g', recipeReserve: '需购置', processing: '预约购置食材' },
                //         { recipeNum: 869, recipeName: '红枣小米粥', foodWeight: '红枣5g、小米15g、大米20g', recipeReserve: '需购置', processing: '预约购置食材' },
                //     ]
                // },
                // {
                //     date: '星期二早餐', 
                //     recipeList: [
                //         { recipeNum: 869, recipeName: '红枣小米粥', foodWeight: '红枣5g、小米15g、大米20g', recipeReserve: '需购置', processing: '预约购置食材' },
                //         { recipeNum: 869, recipeName: '红枣小米粥', foodWeight: '红枣5g、小米15g、大米20g', recipeReserve: '需购置', processing: '预约购置食材' },
                //     ]
                // },
                // {
                //     date: '星期二早餐', 
                //     recipeList: [
                //         { recipeNum: 869, recipeName: '红枣小米粥', foodWeight: '红枣5g、小米15g、大米20g', recipeReserve: '需购置', processing: '预约购置食材' },
                //         { recipeNum: 869, recipeName: '红枣小米粥', foodWeight: '红枣5g、小米15g、大米20g', recipeReserve: '需购置', processing: '预约购置食材' },
                //     ]
                // },   
            ]             
        }
    } 

    // 早午餐
    @observable mealData = [
        { 
            mealTitle: '今日早餐早点',
            mealList: [ 
                // { mealUrl: '', mealName: '芥兰白灼' },
                // { mealUrl: '', mealName: '酸辣土豆丝' },
                // { mealUrl: '', mealName: '芥兰白灼' },
                // { mealUrl: '', mealName: '酸辣土豆丝' },
                // { mealUrl: '', mealName: '芥兰白灼' },
                // { mealUrl: '', mealName: '芥兰白灼' },
                // { mealUrl: '', mealName: '酸辣土豆丝' },
                // { mealUrl: '', mealName: '芥兰白灼' },
                // { mealUrl: '', mealName: '酸辣土豆丝' },
                // { mealUrl: '', mealName: '芥兰白灼' },  
            ]
        },
        { 
            mealTitle: '今日午餐午点',
            mealList: [ 
                // { mealUrl: '', mealName: '芥兰白灼' },
                // { mealUrl: '', mealName: '酸辣土豆丝' },
                // { mealUrl: '', mealName: '芥兰白灼' },
                // { mealUrl: '', mealName: '酸辣土豆丝' },
                // { mealUrl: '', mealName: '芥兰白灼' },
                // { mealUrl: '', mealName: '酸辣土豆丝' },
                // { mealUrl: '', mealName: '芥兰白灼' },
                // { mealUrl: '', mealName: '酸辣土豆丝' },
            ]
        },        
    ]

    // toast相关参数
    @observable toast = {
        toastContent: '',
        isToastShow: false,
        toastType: 0 // 0-无spin 1-有spin
    };

    // 控制toast
    @action handleToastAction = (bool, content, type) =>  {
        this.toast.isToastShow = bool;
        this.toast.toastContent = content;
        this.toast.toastType = type;

        this.handleDispear(type);
    }

    // 使得toast 2s消失
    handleDispear(type) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            this.toast.isToastShow = false

            //跳转路由
            if (type === 1) {
                createHashHistory().push('/Dining/MenuTips');
            }

            // type === 1 ? window.location.href = '/healthyCampusToB#/Dining/MenuTips' : null;        
        }, 2000); 
    }

    // 校园用餐供给策略

    // 方案一
    @observable tipData1 = {
        tipTitle: '方案一',
        body: {
            barTitle: '体检匹配度',
            barData: 0,                 
        },
        weather: {
            barTitle: '天气匹配度',
            barData: 0,                
        },
        sport: { 
            barTitle: '运动匹配度', 
            barData: 0,                
        }, 
        formData: [
            {  
                date: '星期一',
                recipeList: [  
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                ]
            },  
            {
                date: '星期二',
                recipeList: [
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                ]
            },
            {
                date: '星期三',
                recipeList: [
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                ]
            },
        ]
    }

    // 方案二
    @observable tipData2 = {
        tipTitle: '方案二',
        body: {
            barTitle: '体检匹配度',
            barData: 0,                 
        },
        weather: {
            barTitle: '天气匹配度',
            barData: 0,                
        },
        sport: { 
            barTitle: '运动匹配度', 
            barData: 0,                
        },  
        formData: [
            {
                date: '星期一',
                recipeList: [
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                ]
            },  
            {
                date: '星期二',
                recipeList: [
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                ]
            },
            {
                date: '星期三',
                recipeList: [
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                    { mealName: '早餐', mealList: '红枣小米粥、南瓜花卷', prepare: '餐前储备', arrangement: '餐后安排' },
                ]
            },
        ]
    }
    
    // 获取今日是星期几
    getTodayWeek() {
        let date = new Date();
        let day = date.getDay();
        let weekDay = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        return weekDay[day];
    }

    // 获取今日早餐早点/午餐午点数据
    getTodayRecipe(data, week, recipeTypeArr) {
        let recipeData = [];
        recipeData = data.filter((item, index) => item.weekName === week && (item.recipeType === recipeTypeArr[0] || item.recipeType === recipeTypeArr[1]));
        return recipeData;
    }

    // 获取菜谱
    getRecipe(data) {
        let arr = []; 
        let arr1 = [], arr2 = [];
        let weekDay = ["星期一","星期二","星期三","星期四","星期五","星期六", "星期日"]; 

        data.forEach((item) => {
            if (item.recipeType === 1 || item.recipeType === 2) {
                arr1.push(item);
            } else if (item.recipeType === 3 || item.recipeType === 4) {
                arr2.push(item);
            }
        })

        arr1 = weekDay.map((item) => {
            let obj = {};
            obj.date = `${item}早餐早点`;
            obj.recipeList = arr1.map((ite, index) => {
                if (item === ite.weekName) {
                    let recipeMaterial = ite.recipeMaterial;
                    recipeMaterial = recipeMaterial.replace(/\|/g, "");
                    recipeMaterial = recipeMaterial.replace(/\,/g, "、");
                    return {
                        recipeNum: 346, // 1-200随机数
                        recipeName: ite.recipeName,
                        foodWeight: recipeMaterial,
                        recipeReserve: '需购置',
                        processing: '预约购置食材'
                    }
                } 
            });
            obj.recipeList = obj.recipeList.filter((item) => item !== undefined);
            return obj;
        });

        arr2 = weekDay.map((item) => {
            let obj = {};
            obj.date = `${item}午餐午点`;
            obj.recipeList = arr2.map((ite, index) => {
                if (item === ite.weekName) {
                    let recipeMaterial = ite.recipeMaterial;
                    recipeMaterial = recipeMaterial.replace(/\|/g, "");  
                    recipeMaterial = recipeMaterial.replace(/\,/g, "、"); 
                    return {
                        recipeNum: 346, // 1-200随机数
                        recipeName: ite.recipeName,
                        foodWeight: recipeMaterial,
                        recipeReserve: '需购置',
                        processing: '预约购置食材'
                    } 
                } 
            });
            obj.recipeList = obj.recipeList.filter((item) => item !== undefined);
            return obj;
        });

        arr1.forEach((item, index) => {
            arr.push(item);
            arr2.forEach((ite, ind) => {
                if (index === ind) {
                    arr.push(ite);
                }
            })
        })
    
        // arr = [...arr1, ...arr2];

        return arr;
    }

    getTips(data) {
        let tipData = data;
        let arr = tipData.weekRecipe; 
        let weekDay = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];

        arr = weekDay.map((item) => {
            let obj = {};
            obj.date = `${item}`;
            obj.recipeList = arr.map((ite, index) => {
                if (item === ite.weekName) {
                    return {
                        mealName: ite.typeName,
                        mealList: ite.recipeName,
                        prepare: '餐前储备', 
                        arrangement: '餐后安排'
                    }
                }
            });
            obj.recipeList = obj.recipeList.filter((item) => item !== undefined);
            return obj;
        });

        let tipData1 = {
            tipTitle: tipData.schemeName,
            body: {
                barTitle: '体检匹配度',
                barData: parseInt(tipData.peMatchDegree),                 
            },
            weather: {
                barTitle: '天气匹配度',
                barData: parseInt(tipData.weatherMatchDegree),                  
            },
            sport: { 
                barTitle: '运动匹配度',
                barData: parseInt(tipData.sportMatchDegree),                   
            },
            formData: arr       
        }
        
        return tipData1;
    }


    // 获取本周早午餐、早午点菜谱列表
    @action getThisWeekRecipe(queryTypes) {
        let param = {
            queryTypes
        };
        api.getThisWeekRecipe(param).then((res) => {
            if (res.data.code === 0 && res.data.data) {
                let data = res.data.data;
                let week = this.getTodayWeek();
                let breakfastRecipe = this.getTodayRecipe(data, week, [1, 2]);
                let lunchRecipe = this.getTodayRecipe(data, week, [3, 4]); 

                breakfastRecipe = breakfastRecipe.map((item) => {
                    return {
                        mealUrl: item.recipeImage,
                        mealName: item.recipeName
                    };
                });

                lunchRecipe = lunchRecipe.map((item) => {
                    return {
                        mealUrl: item.recipeImage,
                        mealName: item.recipeName
                    };
                }); 

                this.mealData = [ 
                    {
                        mealTitle: '今日早餐早点',
                        mealList: breakfastRecipe,
                    },
                    {
                        mealTitle: '今日午餐午点',
                        mealList: lunchRecipe,
                    },                    
                ] 

                // 本周菜谱
                this.recipeData.recipeFormData.tData = this.getRecipe(data); 
            } 
        })
    }  

    // 生成本周供餐策略
    @action geRecommendScheme() { 
        api.geRecommendScheme().then((res) => {
            if (res.data.code === 0 && res.data.data) {
                let data = res.data.data;
                let tipData1 = this.getTips(data[0]);
                let tipData2 = this.getTips(data[1]);

                this.tipData1 = tipData1;
                this.tipData2 = tipData2; 
            }            
        })
    }
    
    // 获取外部环境数据
    @action getExternaldata(city) {
        let param = {
            city
        };
        api.getExternaldata(param).then((res) => {
            if (res.data.code === 0 && res.data.data) {
                this.weather = { 
                    conditionTitle: '天气情况',
                    conditionList: [ 
                        { paramName: '天气', paramValue: res.data.data.weather, paramUnit: '' },
                        { paramName: '平均温度', paramValue: res.data.data.oTemperature, paramUnit: '度' },
                        { paramName: '天气湿度', paramValue: res.data.data.oHumidity, paramUnit: '%' },
                    ],
                    modifyBtnText: ''             
                }; 

                this.conditionListData.agriculture = {
                    conditionTitle: '农业知识图谱',
                    conditionList: [
                        { 
                            paramName: '季节', 
                            paramValue: res.data.data.season,  
                            paramUnit: '' 
                        },
                        { 
                            paramName: '蔬菜', 
                            paramValue: '辣椒、青椒、彩椒、洋葱、花椰菜、甜豆、豌豆、芹菜、莴苣、荠菜、油菜、菠菜、香椿、春笋、马兰头、瓠瓜、韭菜。', 
                            paramUnit: '' 
                        },
                    ],
                    modifyBtnText: '季节调整'           
                }
            }
        })
    }
}