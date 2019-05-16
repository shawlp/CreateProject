import {axiosInstance} from 'exhibition-axios'; 

const STUDY_ACTIVITY_API = '/v1/web/smarthome/learnActivity/getAreaList';

// 获取学生所在学校的兴趣位置--展厅
export const getInterestLocationData = (param) => {
    return axiosInstance.get('/v1/app/campus/exhibition/exhibitionInterestLocationData', {
        params: param
    }).then((res) => {
        if (res.data.code == 0) {
            return res;
        }
    }); 
} 

// 获取孩子的兴趣活动数据
export const exhibitionInterestData = (param) => {
    return axiosInstance.get('/v1/app/campus/exhibition/exhibitionInterestData', {
        params: param
    }).then((res) => {
        if (res.data.code == 0) {
            return res;
        }
    });    
}

// 获取学习活动区域列表
// export const getStudyActivityAreaList = (param) => {
//     return axiosInstance.get('/v1/web/smarthome/learnActivity/getAreaList', {
//         params: param
//     }).then((res) => {
//         if (res.data.code == 0) {
//             return res;           
//         }
//     });    
// } 

// 获取学习活动区域列表
export const getStudyActivityAreaList = (data) => {
    let areaInfos = data; 
    let obj = {};
    areaInfos.map((item,index)=>{
        obj[`areaInfos[${index}].mapLocationId`] = item.mapLocationId;
        obj[`areaInfos[${index}].locationName`] = item.locationName; 
    });
    return axiosInstance.post(STUDY_ACTIVITY_API, obj) 
}

//获取学习活动区域详情信息
export const getAreaListDetail = (areaId) => {
    console.log(303030);
    return axiosInstance.get('/v1/web/smarthome/learnActivity/getAreaInfo', {
        params: {areaId}
    }).then((res) => {
        if (res.data.code == 0) {
            return res;                       
        }
    });
}

////编辑模态框中确定按钮提交
export const updateAreaInfo = (param) => {
    return axiosInstance.get('/v1/web/smarthome/learnActivity/updateAreaInfo',{
        params: param
    }).then((res) =>{
        if (res.data.code == 0) {
            return res;                       
        }
    })
}