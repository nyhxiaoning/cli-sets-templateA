import * as signalR from "@microsoft/signalr";
import { getToken, hasToken } from "../global_functions";
import MittEnents from "@/utils/mitt_enents";
import emitter from "../events/events";
import { HubConnectionState } from "@microsoft/signalr";
import mitt from "@/utils/events/events";

////服务器地址

// let signalBuilder = new signalR.HubConnectionBuilder()
//   .configureLogging(signalR.LogLevel.Debug)
//   .withUrl(
//     process.env.VUE_APP_IM_PATH!.toString(),
//     {
//       accessTokenFactory: () => getToken()!,
//       skipNegotiation: true,
//       transport: signalR.HttpTransportType.WebSockets
//     }
//   )
//   .withAutomaticReconnect()
const signalBuilder = getNewSignalBuider();
let signal = signalBuilder.build();


/**
 * Get a new HubConnectionBuilder.
 * @returns SignalR.HubConnectionBuilder
 */
function getNewSignalBuider(): signalR.HubConnectionBuilder {
  return new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl(
      process.env.VUE_APP_IM_PATH!.toString(),
      {
        accessTokenFactory: () => getToken()!,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      }
    )
    .withAutomaticReconnect();
}
/** 连接ir */
async function start() {
  if (hasToken()) {
    try {
      await signal.start();
      console.debug("signair连接成功");
      imServer = true;
      handleSignalrState();
      initializationSignalR();
      emitter.emit(MittEnents.irConnectioned);
    } catch (error) {
      emitter.emit(MittEnents.irConnectionFailure);
      console.error("signair连接失败", error);
    }
  }
}

function resetSignal() {
  // signalBuilder = getNewSignalBuider()
  signal.stop();
  signal = getNewSignalBuider().build();
}



let imServer = false;
if (signal.state === HubConnectionState.Disconnected) {
  // ------------
  signal.onreconnecting(() => {
    imServer = false;
    handleSignalrState();
  });

  signal.onreconnected(() => {
    imServer = true;
    handleSignalrState();
    initializationSignalR();
  });
 
  signal.onclose(() => {
    console.error("signair连接结束onclose");
    imServer = false;
    handleSignalrState();
  });


}

// 初始化signalR的连接请求，写入请求的上下文信息。
function initializationSignalR() {
  const tenantToken = localStorage.getItem("companyId");
  if (tenantToken !== null) {
    signal.send("set_headers", { "tenantToken": tenantToken });
  }
}

function handleSignalrState() {
  if (imServer === true) {
    mitt.emit("networkStatus", true);
  } else {
    mitt.emit("networkStatus", false);
  }
}
// start()
export default { signal, getNewSignalBuider, resetSignal, start };
