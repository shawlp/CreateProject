
import axiosInstance from 'Common/axiosInstance';
import Contract from 'Common/Contract';
import CantractForLinkage from 'HealthyCampusToB/common/Cantract/CantractForLinkage';

/**
 * 双屏联动
 * 
 */
export const sendRouterChangeEvent=(routeValue)=>{
    let message = {
        action:CantractForLinkage.ACTION_ROUTE_CHANGE,
        value:routeValue
    };
    return axiosInstance.post('/v1/web/smarthome/scene/sceneCommun',{
        fromScene:Contract.SCENE_NAME_CAMPUS_C,destScene:Contract.SCENE_NAME_CAMPUS_B,message:JSON.stringify(message)
    })
}
