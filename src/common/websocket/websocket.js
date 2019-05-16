import WSServer from 'Common/WSServer';
import Contract from 'Common/Contract';

let ws = null;
/**
 * 建立ws连接，简单单例
 */
export default function createWebSocket(){
    if(ws) return ws;
    ws = new WSServer('/v1/web/smarthome/websocketServer',{sceneName:Contract.SCENE_NAME_CAMPUS_B});
    return ws;
}