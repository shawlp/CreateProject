import {axiosInstance} from 'exhibition-axios'; 

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