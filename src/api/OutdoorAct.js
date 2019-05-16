import {axiosInstance} from 'exhibition-axios'; 

// 获取户外活动区域列表
export const getAreaList = () => {
    return axiosInstance.get('/v1/web/smarthome/outdoor/getAreaList').then((res) => {
        if (res.data.code == 0) {
            return res;
        }
    });   
}

// 获取户外活动区域信息
export const getAreaInfo = (param) => {
    return axiosInstance.get('/v1/web/smarthome/outdoor/getAreaInfo', {
        params: param
    }).then((res) => {
        if (res.data.code == 0) {
            return res;
        }
    })
}

// 编辑户外区域信息
export const updateAreaInfo = (param) => {
    return axiosInstance.get('/v1/web/smarthome/outdoor/updateAreaInfo', {
        params: param
    }).then((res) => {
        if (res.data.code == 0) {
            return res;
        }
    })
}