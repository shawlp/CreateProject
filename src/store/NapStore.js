import { observable, action, computed, autorun, reaction } from 'mobx';
import * as api from '@/api/Nap'; 

export default class NapStore {
    @observable studentFormData = { 
        tHead: ['学生姓名', '上床时间', '入睡耗时', '睡眠时长', '平均心率', '平均呼吸率', '午睡质量', '异常', '睡眠模型'],  
        tData: [
            {"param1":"张小明","param2":"12:30:18","param3":"20","param4":"70","param5":"78","param6":"26","param7":"86","param8":"无","param9":"健康型"},
            {"param1":"苏芷妍","param2":"12:31:25","param3":"11","param4":"79","param5":"88","param6":"26","param7":"87","param8":"无","param9":"健康型"},
            {"param1":"李懂","param2":"12:30:45","param3":"21","param4":"69","param5":"90","param6":"27","param7":"68","param8":"无","param9":"环境敏感型"},
            {"param1":"张哲宁","param2":"12:30:56","param3":"15","param4":"75","param5":"78","param6":"21","param7":"85","param8":"无","param9":"健康型"},
            {"param1":"徐可","param2":"12:33:07","param3":"7","param4":"83","param5":"66","param6":"27","param7":"88","param8":"无","param9":"健康型"},
            {"param1":"季晨皓","param2":"12:31:22","param3":"8","param4":"82","param5":"83","param6":"29","param7":"92","param8":"无","param9":"健康型"},
            {"param1":"赵懂心","param2":"12:30:43","param3":"11","param4":"79","param5":"70","param6":"26","param7":"87","param8":"无","param9":"健康型"},
            {"param1":"郭如远","param2":"12:31:12","param3":"23","param4":"67","param5":"77","param6":"28","param7":"71","param8":"无","param9":"环境敏感型"},
            {"param1":"许恒铭","param2":"12:30:26","param3":"12","param4":"78","param5":"73","param6":"30","param7":"90","param8":"无","param9":"健康型"},
            {"param1":"高逸辰","param2":"12:30:49","param3":"11","param4":"79","param5":"87","param6":"27","param7":"88","param8":"无","param9":"健康型"},
            {"param1":"吴沁瑶","param2":"12:30:54","param3":"7","param4":"83","param5":"90","param6":"24","param7":"87","param8":"无","param9":"健康型"},
            {"param1":"汪铭心","param2":"12:32:38","param3":"18","param4":"72","param5":"74","param6":"25","param7":"56","param8":"无","param9":"环境敏感型"},
            {"param1":"吴沐远","param2":"12:33:48","param3":"11","param4":"79","param5":"90","param6":"24","param7":"79","param8":"无","param9":"健康型"},
            {"param1":"周涵裕","param2":"12:30:22","param3":"7","param4":"83","param5":"71","param6":"27","param7":"83","param8":"无","param9":"健康型"},
            {"param1":"马芷菡","param2":"12:31:56","param3":"19","param4":"71","param5":"79","param6":"20","param7":"71","param8":"无","param9":"环境敏感型"},
            {"param1":"戴辰欣","param2":"12:30:43","param3":"22","param4":"68","param5":"88","param6":"26","param7":"69","param8":"无","param9":"环境敏感型"},
            {"param1":"贺家豪","param2":"12:30:52","param3":"23","param4":"67","param5":"75","param6":"20","param7":"72","param8":"无","param9":"环境敏感型"},
            {"param1":"柳妍希","param2":"12:32:41","param3":"15","param4":"75","param5":"75","param6":"22","param7":"90","param8":"无","param9":"健康型"},
            {"param1":"童恪言","param2":"12:31:55","param3":"15","param4":"75","param5":"88","param6":"27","param7":"88","param8":"无","param9":"健康型"},
            {"param1":"陈辰","param2":"12:30:49","param3":"13","param4":"77","param5":"88","param6":"21","param7":"86","param8":"无","param9":"健康型"},
            {"param1":"卢哲川","param2":"12:32:28","param3":"21","param4":"69","param5":"67","param6":"20","param7":"61","param8":"无","param9":"环境敏感型"},
            {"param1":"江莞琦","param2":"12:31:12","param3":"23","param4":"67","param5":"84","param6":"24","param7":"63","param8":"无","param9":"环境敏感型"},
            {"param1":"周沁瑶","param2":"12:31:36","param3":"19","param4":"71","param5":"66","param6":"29","param7":"66","param8":"无","param9":"环境敏感型"},    
        ]              
    }

    @observable environmentFormData = {
            tHead: ['环境数据', '室内噪声(db)', '温度(℃)', '湿度(%)', '空气质量', '亮度(LUX)', 'pm2.5(μg/m³)', '紫外线(kWh/m²)', '设备异常'],
            tData: [ 
                { param1: '优', param2: '22', param3: '23', param4: '45', param5: '优', param6: '1202', param7: '2.1', param8: '5.8', param9: '新风机' },
                { param1: '良', param2: '23', param3: '30', param4: '35', param5: '优', param6: '923', param7: '2.5', param8: '3.7', param9: '香薰机' },
                { param1: '一般', param2: '26', param3: '25', param4: '46', param5: '优', param6: '862', param7: '3.2', param8: '6.8', param9: '--' },
                { param1: '优', param2: '22', param3: '24', param4: '55', param5: '优', param6: '1000', param7: '4.2', param8: '7.2', param9: '香薰机' },
                { param1: '良', param2: '24', param3: '26', param4: '48', param5: '优', param6: '1122', param7: '3.6', param8: '4.8', param9: '--' },
                { param1: '优', param2: '25', param3: '24', param4: '46', param5: '优', param6: '1256', param7: '2.8', param8: '5.2', param9: '新风机' },
                { param1: '良', param2: '26', param3: '25', param4: '42', param5: '优', param6: '867', param7: '3.2', param8: '7.4', param9: '新风机' },
                { param1: '一般', param2: '22', param3: '26', param4: '43', param5: '优', param6: '824', param7: '2.8', param8: '6.2', param9: '--' },
                { param1: '良', param2: '23', param3: '24', param4: '46', param5: '优', param6: '958', param7: '4.5', param8: '5.6', param9: '香薰机' },
                { param1: '优', param2: '24', param3: '22', param4: '47', param5: '优', param6: '915', param7: '3.8', param8: '6.8', param9: '新风机' },
                { param1: '优', param2: '25', param3: '23', param4: '48', param5: '优', param6: '1202', param7: '2.9', param8: '7.4', param9: '香薰机' },  
            ]               
    }

    @observable sleepData = [
        {
            paramName: '入睡人数',
            paramValue: 22
        },
        {
            paramName: '清醒人数',
            paramValue: 17
        },        
    ];

    @observable environment = [
        {
            paramName: '室内温度',
            paramValue: 0,
            paramUnit: '',
            modelType: '舒适'
        },
        {
            paramName: '空气湿度',
            paramValue: 0,
            paramUnit: '',
            modelType: '舒适'            
        },
        {
            paramName: '环境噪音',
            paramValue: 0,
            paramUnit: 'db',
            modelType: '偏高'            
        },
        {
            paramName: '光照强度',
            paramValue: 0,
            paramUnit: 'lux',
            modelType: '舒适'            
        },         
    ]        

    @observable conditionBarData = {
        enterData: {
            chartTitle: '入园情况',
            color: '#5994FF',
            data: 98,
            isShowLabel: true,
            labelText: ['到校', '迟到'],
            titleText: ''
        },
        tempertureData: {
            chartTitle: '入睡率', 
            color: '#13D3E0',
            data: 90,
            isShowLabel: false,
            labelText: '',
            titleText: '' 
        },
        bodyData: {
            chartTitle: '心跳异常',
            color: '#13D3E0',
            data: 80,
            isShowLabel: false,
            labelText: '',
            titleText: '' 
        },
        environmentData: {
            chartTitle: '呼吸异常', 
            color: '#13D3E0',
            data: 96,
            isShowLabel: false,
            labelText: '',
            titleText: ''
        },
    }; 

    // TabBar
    @observable menuItems = [
        { itemName: '睡眠数据' },
        { itemName: '环境数据' } 
    ]

    // 获取外部环境数据
    @action getExternaldata(city) {
        let param = {
            city
        };
        api.getExternaldata(param).then((res) => {
            if (res.data.code === 0 && res.data.data) {
                let data = res.data.data;
                let obj = {};
                let {oTemperature, oHumidity, noise, illumination, roomBrilliancy, pm25, ultravioletIntensity} = data;

                this.environmentFormData.tData.shift();

                obj.param1 = '优';
                obj.param2 = noise;
                obj.param3 = oTemperature;
                obj.param4 = oHumidity;
                obj.param5 = '优';
                obj.param6 = roomBrilliancy;
                obj.param7 = pm25;
                obj.param8 = ultravioletIntensity;
                obj.param9 = '--';

                this.environmentFormData.tData.unshift(obj);                   

                this.environment = [ 
                    {
                        paramName: '室内温度',
                        paramValue: oTemperature,
                        paramUnit: '',
                        modelType: this.getModel1(oTemperature, [23, 26])
                    },
                    {
                        paramName: '空气湿度',
                        paramValue: oHumidity,
                        paramUnit: '',
                        modelType: this.getModel1(oHumidity, [38, 65])            
                    },
                    {
                        paramName: '环境噪音',
                        paramValue: noise,
                        paramUnit: 'db',
                        modelType: this.getModel2(noise, 50)            
                    },
                    {
                        paramName: '光照强度',
                        paramValue: illumination,
                        paramUnit: 'lux',
                        modelType: this.getModel2(illumination, 80)             
                    },        
                ]  
            }
        })
    }

    // 获得空气/室内温度模型
    getModel1(data, rangeArr) {
        let model = '';

        if (data <= rangeArr[0]) {
            model = '偏低';
        } else if (data <= rangeArr[1]) {
            model = '舒适';
        } else {
            model = '偏高';
        }

        return model;
    }

    // 获得噪音/光照强度模型
    getModel2(data, range) {
        let model = '';

        if (data <= range) {
            model = '舒适';
        } else {
            model = '偏高';
        }

        return model;
    }
}   
