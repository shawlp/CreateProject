import {axiosInstance} from 'exhibition-axios'; 

// 获取本周早午餐、早午点菜谱列表
export const getThisWeekRecipe = (param) => {
    return axiosInstance.get('/v1/web/smarthome/dining/getThisWeekRecipe', {
        params: param
    }).then((res) => {
        if (res.data.code == 0) {
            return res;
        }
    })
}

// 生成本周供餐策略
export const geRecommendScheme = () => {
    return axiosInstance.get('/v1/web/smarthome/dining/geRecommendScheme').then((res) => {
        if (res.data.code == 0) {
            return res;
        }
    });        
} 

// 获取外部环境数据
export const getExternaldata = (param) => {
    return axiosInstance.get('/v1/web/smarthome/scene/externaldata/get', {
        params: param
    }).then((res) => {
        if (res.data.code == 0) {
            return res;
        }
    })    
}