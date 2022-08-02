import signal from "@/utils/signair/signalR";
import { errorHandle } from "@/utils/dispose";
import { ResuleEntity } from "@/entitys/IResult";

export async function irInvoke<T = any>(actionName: string, ...args: any[]): Promise<T> {
   // const token = localStorage.getItem("token")!.toString()
   // const tenantToken = store.getters.getCompanyId;
   const result: ResuleEntity = await signal.signal.invoke<ResuleEntity>(actionName, ...args);
   // console.debug("IR请求", actionName, ...args)
   if (result.code === 200)
      return Promise.resolve(result.data as T);
   else {
      console.error("IR请求", actionName, ...args);
      errorHandle(result, {
         "接口": actionName,
         "参数": args

      });
      return Promise.reject(result);
   }
}

export async function irSend(actionName: string, ...args: any[]) {
   await signal.signal.invoke(actionName, ...args);
}

