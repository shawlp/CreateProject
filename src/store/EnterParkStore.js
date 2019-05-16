import { observable, action, computed, autorun, reaction } from 'mobx';
import {axiosInstance,axios,tokenService} from 'exhibition-axios';
import moment from 'moment';
import {Tool,Het} from 'exhibition-tool';
import * as api from '@/api/EnterPark';        

export default class EnterParkStore {
    @observable studentData = {   
        studentDataId: '',
        studentName: '',
        arriveTime: '',
        temperature: 0,
        high: 0,
        weight: 0,
        bmi: 0,
        modelName: '',
        isAbnormal: '无' 
    }

    @observable studentFormData = { 
        tHead: ['学生姓名', '到校时间', '体温(°C)', '身高(cm)', '体重(kg)', 'bmi', '生长模型', '异常'], 
        tData: [
            {"param1":"李懂","param2":"7:55:32","param3":"36.9","param4":"106","param5":"18.5","param6":"16.5","param7":"营养充足正常α型","param8":"无"},
            {"param1":"张哲宁","param2":"8:02:53","param3":"37.4","param4":"105","param5":"18.4","param6":"16.7","param7":"营养充足正常α型","param8":"无"},
            {"param1":"苏芷妍","param2":"9:53:07","param3":"36.8","param4":"105","param5":"18.8","param6":"17.1","param7":"能量过剩超重α型","param8":"到校异常", isAbnormalFlag: true },
            {"param1":"徐可","param2":"8:09:23","param3":"37.2","param4":"107","param5":"18","param6":"15.7","param7":"营养充足正常α型","param8":"无"}, 
            {"param1":"季晨皓","param2":"8:09:22","param3":"37.5","param4":"101","param5":"16","param6":"15.7","param7":"营养充足正常α型","param8":"无"},
            {"param1":"赵懂心","param2":"8:11:26","param3":"36.6","param4":"97","param5":"16.2","param6":"17.2","param7":"能量过剩超重α型","param8":"无"},
            {"param1":"郭如远","param2":"8:13:00","param3":"36.5","param4":"97","param5":"15.7","param6":"16.7","param7":"营养充足正常α型","param8":"无"},
            {"param1":"许恒铭","param2":"8:15:03","param3":"36.9","param4":"101","param5":"16.3","param6":"16.0","param7":"营养充足正常α型","param8":"无"},
            {"param1":"高逸辰","param2":"8:17:07","param3":"36.7","param4":"97","param5":"16.1","param6":"17.1","param7":"能量过剩超重α型","param8":"无"},
            {"param1":"吴沁瑶","param2":"8:19:23","param3":"36.8","param4":"103","param5":"16.1","param6":"15.2","param7":"营养充足正常α型","param8":"无"},
            {"param1":"汪铭心","param2":"8:20:08","param3":"37.1","param4":"91","param5":"13.6","param6":"16.4","param7":"营养充足正常α型","param8":"无"},
            {"param1":"吴沐远","param2":"8:21:07","param3":"37.2","param4":"102","param5":"17.0","param6":"16.3","param7":"营养充足正常α型","param8":"无"},
            {"param1":"周涵裕","param2":"8:21:05","param3":"37.5","param4":"103","param5":"19.0","param6":"17.9","param7":"能量过剩超重α型","param8":"无"},
            {"param1":"马芷菡","param2":"8:26:01","param3":"37.4","param4":"98","param5":"13.6","param6":"14.2","param7":"营养充足正常α型","param8":"无"},
            {"param1":"戴辰欣","param2":"8:22:01","param3":"36.9","param4":"106","param5":"21.3","param6":"19.0","param7":"能量过剩超重α型","param8":"无"},
            {"param1":"贺家豪","param2":"8:27:03","param3":"36.5","param4":"103","param5":"17.5","param6":"16.5","param7":"营养充足正常α型","param8":"无"},
            {"param1":"柳妍希","param2":"8:21:01","param3":"37.3","param4":"103","param5":"16.9","param6":"15.9","param7":"营养充足正常α型","param8":"无"},
            {"param1":"童恪言","param2":"8:23:07","param3":"36.7","param4":"108","param5":"20.9","param6":"17.9","param7":"能量过剩超重α型","param8":"无"},
            {"param1":"陈辰","param2":"8:23:01","param3":"37.2","param4":"103","param5":"17.8","param6":"16.8","param7":"营养充足正常α型","param8":"无"},
            {"param1":"卢哲川","param2":"8:23:34","param3":"36.8","param4":"105","param5":"18.9","param6":"17.1","param7":"能量过剩超重α型","param8":"无"},
            {"param1":"江莞琦","param2":"8:21:08","param3":"37.1","param4":"95","param5":"15.9","param6":"17.6","param7":"能量过剩超重α型","param8":"无"},
            {"param1":"周沁瑶","param2":"8:22:02","param3":"37.4","param4":"103","param5":"16.2","param6":"15.3","param7":"营养充足正常α型","param8":"无"},
        ]            
    }

    @observable environmentFormData = {
            tHead: ['参数', '课室', '食堂', '寝室', '洗手间', '室外'],
            tData: [
                { param1: 'CO2', param2: '2.1%', param3: '3.2%', param4: '2.6%', param5: '2.8%', param6: '2.5%' },
                { param1: '噪音', param2: '32db', param3: '36db', param4: '28db', param5: '32db', param6: '38db' },
                { param1: '温度', param2: '36度', param3: '24度', param4: '30度', param5: '32度', param6: '33度' },
                { param1: '湿度', param2: '2.3rh', param3: '1.5rh', param4: '2.8rh', param5: '2.2rh', param6: '2.9rh' },
                { param1: 'PM2.5', param2: '2.1μg/m³', param3: '2.3μg/m³', param4: '4.1μg/m³', param5: '3.2μg/m³', param6: '2μg/m³' },
                { param1: '氧气', param2: '2.3', param3: '2.6', param4: '2.7', param5: '2.9', param6: '2.3' },
                { param1: '甲醛含量', param2: '2.1mg/m³', param3: '0.1mg/m³', param4: '2.4mg/m³', param5: '2.2mg/m³', param6: '0.1mg/m³' },
                { param1: '铅含量', param2: '0.1μg/L', param3: '0.3μg/L', param4: '0.5μg/L', param5: '0.4μg/L', param6: '0.5μg/L' },
                { param1: '光照强度', param2: '5.7kWh/m²', param3: '3.7kWh/m²', param4: '4.2kWh/m²', param5: '2.3kWh/m²', param6: '1.8kWh/m²' },
                { param1: '臭氧', param2: '56μg/m³', param3: '85μg/m³', param4: '48μg/m³', param5: '42μg/m³', param6: '49μg/m³' },
                { param1: '二氧化氮', param2: '2.1μg/m³', param3: '2.3μg/m³', param4: '4.1μg/m³', param5: '3.2μg/m³', param6: '2μg/m³' },
                { param1: '一氧化氮', param2: '2μg/m³', param3: '4μg/m³', param4: '3μg/m³', param5: '1.8μg/m³', param6: '2.1μg/m³' }, 
            ]            
    } 

    @observable studentRecord = {
        studentTotal: 354,
        studentEnterTotal: 346,
        tempertureAbnormalTotal: 4,
        epidemicTotal: 1
    }; 

    @observable conditionBarData = {
        enterData: {
            chartTitle: '入园情况',
            color: '#5994FF',
            data: [98, 7],
            isShowLabel: true,
            labelText: ['到校', '迟到'],
            titleText: ''
        },
        tempertureData: {
            chartTitle: '体温情况',
            color: '#13D3E0',
            data: [93, 1], 
            isShowLabel: true,
            labelText: ['已测', '异常'],
            titleText: ''
        },  
        bodyData: {
            chartTitle: '身体情况',
            color: '#F45A50',
            data: 100,
            isShowLabel: false,
            labelText: '',
            titleText: '正常'
        }, 
        environmentData: {
            chartTitle: '环境情况',
            color: '#AA38F2',
            data: 98,
            isShowLabel: false,
            labelText: '',
            titleText: '正常'
        },
    }; 

    // TabBar
    @observable menuItems = [
        { itemName: '学生管理' },
        { itemName: '环境管理' }
    ]

    // 获取学生的唯一id
    @action getStudentDataId(sucCallback){
        let studentDataId;
        api.getStudentDataId().then((res) => {
            if (res.data.code == 0 && res.data.data) {
                let data = res.data.data;
                this.studentData.studentDataId = data[0].studentDataId;
                studentDataId = data[0].studentDataId; 
            }

            Het.setCookie('studentDataId', studentDataId);
            return studentDataId; 
        }).then((data) => {
            data && this.childrenHealthData(sucCallback);
        }); 
    } 
    
    // 获取学生信息 
    @action childrenHealthData(sucCallback){
        let isExist = false; // 是否请求数据成功
        let param = {
            studentDataId: this.studentData.studentDataId
        }

        api.childrenHealthData(param).then((res) => {
            if (res.data.code == 0 && res.data.data) {
                let data = res.data.data;
                let high = data.height;
                let weight = data.weight;
                this.studentData.studentName = data.studentName;
                this.studentData.arriveTime = data.pmCardTime ? data.pmCardTime : (data.amCardTime ? data.amCardTime : '无');  
                this.studentData.temperature = data.temperature;
                this.studentData.high = high;
                this.studentData.weight = weight;
                this.studentData.sex = data.sex;
                this.studentData.year = data.age;
                this.studentData.bmi = this.bmi;
                isExist = true;

                Het.setCookie('className', data.className);
            }

            return isExist;            
        }).then((data) => {
            data && this.getGrowthModel(sucCallback);
        });        
    }

    // 获取生长发育模型
    @action getGrowthModel(sucCallback){
        let param = {
            sex: this.studentData.sex,
            year: this.studentData.year,
            month:6,
            bmi: 50,
            height: this.studentData.high, 
            flag: 1
        }
        api.getGrowthModel(param).then((res) => {
            if (res.data.code === 0&&res.data.data) {
                let data = res.data.data;
                let obj = {};
                this.studentData.modelName = data.modelName;
                this.studentData.isAbnormal = this.isAbnormal;   
                this.studentFormData.tData.shift(); 

                obj.param1 = this.studentData.studentName;
                obj.param2 = this.studentData.arriveTime;
                obj.param3 = this.studentData.temperature;
                obj.param4 = this.studentData.high;
                obj.param5 = this.studentData.weight;
                obj.param6 = this.studentData.bmi;
                obj.param7 = this.studentData.modelName;
                obj.param8 = this.studentData.isAbnormal;
                obj.isAbnormalFlag = true;

                this.studentFormData.tData.unshift(obj);
                this.studentFormData.update = true;

                typeof sucCallback === "function" && sucCallback(res);                
            } else {
                typeof sucCallback === "function" && sucCallback(res);
            }
        }, (res) => {
            typeof sucCallback === "function" && sucCallback(res);            
        }); 
    } 

    // 比较时间1是否在时间2之后
    isTime1AfterTime2(time1, time2){
        return moment(time1).isAfter(time2);
    }

    // 计算是否异常
    @computed get isAbnormal() {
        let abnormalIntroArr = [], abnormalIntro = '';
        let { temperature, arriveTime, modelName } = this.studentData;
        let time = moment(new Date());
        let normalDate = `${time.get('year')}-${time.get('month') < 10 ? '0' + (time.get('month') + 1) : (time.get('month') + 1)}-${time.get('date') < 10 ? '0' + time.get('date') : time.get('date')} 08:00:00`;
        arriveTime = `${time.get('year')}-${time.get('month') < 10 ? '0' + (time.get('month') + 1) : (time.get('month') + 1)}-${time.get('date') < 10 ? '0' + time.get('date') : time.get('date')} ${arriveTime}`; 

        if (temperature && temperature > 37) { 
            abnormalIntroArr.push('体温异常');
        } 
        if (normalDate && this.isTime1AfterTime2(arriveTime, normalDate)) {
            abnormalIntroArr.push('到校异常'); 
        } 
        if (modelName === '发育迟缓矮小型' || modelName === '发育迟缓消瘦型' || modelName === '发育迟缓超重型') {
            abnormalIntroArr.push('模型异常');  
        }
        
        if (abnormalIntroArr.lenth === 0) {
            abnormalIntro = '无';
        } else if (abnormalIntroArr.lenth === 1) {
            abnormalIntro = abnormalIntroArr[0];
        } else {
            abnormalIntro = '多项异常';
        } 
        
        return abnormalIntro;
    }

    // 计算bmi
    @computed get bmi() {
        let { high, weight } = this.studentData;
        if (high && weight) {
            return weight/(high/100)*(high/100); 
        } else {
            return null;
        }
    }
}  
