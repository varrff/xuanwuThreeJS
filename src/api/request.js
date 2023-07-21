import axios from "axios";

import { websocketURL } from "./url";

/** 
createWebSocket
页面打开时开启的设备报警的websocket
第一个参数是接收信息的回调

**/
export function createWebSocket(onMessage) {
  const ws = new WebSocket(websocketURL);
  ws.addEventListener("open", function(event) {
    // 连接成功回调

  });
  ws.addEventListener("message",onMessage,false);
  return ws
}
