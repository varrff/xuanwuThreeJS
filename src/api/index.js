import axios from "axios";

import { websocketURL } from "./url";

/** 
createWebSocket
页面打开时开启的设备报警的websocket
第一个参数是接收信息的回调

**/
export function createWebSocket() {
    
    return new Promise((resolve,reject)=>{
        const ws = new WebSocket(websocketURL);
        ws.onopen = () => resolve(ws) 
        ws.onerror = err => reject(err)
    })
}
