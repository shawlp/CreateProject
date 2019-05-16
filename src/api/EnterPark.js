import {axiosInstance} from 'exhibition-axios'; 

// 获取学生的唯一id
export const getStudentDataId = () => {
    return axiosInstance.get('/v1/app/campus/parent/getBindStuInfo').then((res) => {
        if (res.data.code == 0) {
            return res;
        }
    });        
} 

// 获取学生信息
export const childrenHealthData = (param) => {
    return axiosInstance.get('/v1/app/campus/exhibition/exhibitionChildrenHealthData', {
        params: param
    }).then((res) => {
        if (res.data.code == 0) {
            return res;
        }
    })
}

// 获取生长发育模型
export const getGrowthModel = (param) => {
    return axiosInstance.get('/v1/web/smarthome/enterCampus/getGrowthModel', {
        params: param
    }).then((res) => {
        if (res.data.code == 0) {
            return res;
        }
    })
} 
