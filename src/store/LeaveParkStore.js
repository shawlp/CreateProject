import { observable, action } from 'mobx';

let timer = null;
export default class LeaveParkStore {
    // toast相关参数
    @observable toast = {
        toastContent: '',
        isToastShow: false,
        toastType: 0 // 0-无spin 1-有spin
    };

    // 数据详情
    @observable formData = {
        tHead: ['学生姓名', '离校时间', '接送家长', '所在班级', '离校异常', '操作'], 
        tData: [   
            {"param1":"张小明","param2":"16:33:18","param3":"母亲","param4":"小（2）班","param5":"无","param6":"无"},
            {"param1":"苏芷妍","param2":"15:41:16","param3":"母亲","param4":"小（2）班","param5":"早退","param6":"查看登记信息"},
            {"param1":"李懂","param2":"16:31:22","param3":"父亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"张哲宁","param2":"16:43:18","param3":"父亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"徐可","param2":"16:33:19","param3":"父亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"季晨皓","param2":"16:45:13","param3":"母亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"赵懂心","param2":"16:42:11","param3":"父亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"郭如远","param2":"16:36:18","param3":"父亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"许恒铭","param2":"16:41:28","param3":"父亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"高逸辰","param2":"16:33:19","param3":"父亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"吴沁瑶","param2":"16:31:21","param3":"母亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"汪铭心","param2":"16:52:11","param3":"母亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"吴沐远","param2":"16:37:23","param3":"母亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"周涵裕","param2":"16:45:17","param3":"母亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"马芷菡","param2":"16:51:23","param3":"父亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"戴辰欣","param2":"16:41:28","param3":"母亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"贺家豪","param2":"16:45:19","param3":"母亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"柳妍希","param2":"16:37:21","param3":"父亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"童恪言","param2":"16:41:28","param3":"母亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"陈辰","param2":"16:43:18","param3":"父亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"卢哲川","param2":"16:35:17","param3":"母亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"江莞琦","param2":"16:48:15","param3":"母亲","param4":"小（2）班","param5":"正常","param6":"无"},
            {"param1":"周沁瑶","param2":"16:42:11","param3":"母亲","param4":"小（2）班","param5":"正常","param6":"无"}, 
        ]
    }

    // 离园情况
    @observable barData = {
        smallClass: {
            chartTitle: '小班离园情况',
            yAxisData: ['小一班', '小二班', '小三班'],
            seriesData: [74, 65, 82]
        },
        middleClass: {
            chartTitle: '中班离园情况',
            yAxisData: ['中一班', '中二班', '中三班'],
            seriesData: [62, 83, 80]
        },
        bigClass: {
            chartTitle: '大班离园情况',
            yAxisData: ['大一班', '大二班', '大三班'],
            seriesData: [90, 53, 44]
        },
    }

    // 离园人数统计
    @observable leaveData = {
        totalStudent: 354,
        leaveNum: 254
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
}