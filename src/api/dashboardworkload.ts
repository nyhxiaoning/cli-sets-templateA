import { ScreenCofig } from "@/components/data_screen/screen_list_ety";
import https from "@/utils/https/https"


/** 
 * 搜索进度工时数据
 */
export async function searchWorkingHours(kw: string, condition: ScreenCofig | undefined = undefined): Promise<any[]> {
    let config: ScreenCofig | undefined = undefined
    let kwConfig = {
        name: "keyword",
        args: [
            {
                kw
            }
        ]
    }
    if (condition) {
        let ruleOut = ['empty', 'notEmpty', 'isRepeat']
        config = JSON.parse(JSON.stringify(condition)) as ScreenCofig
        let res = config?.conditions.filter(x => {
            let symbol = ruleOut.find(y => y === x.symbol)
            if (symbol) {
                return true
            } else {
                return x.value?.length > 0
            }
        })
        res.push(kwConfig)
        config.conditions = res
    }
    else {
        config = new ScreenCofig()
        config.conditions = [kwConfig]
        config.style = 'template'
        config.conjunction = 'and'
    }
    let _result = await https.post("dashboardworkload", "search", undefined, { condition: config })
    let tasks: any[] = _result.map((item: any) => {
        let parms = JSON.parse(JSON.stringify(item.fields))
        parms.owner = item.owner
        parms.project_id = item.project_id
        parms.record_id = item.record_id
        parms.wordload = item.wordload
        if (item.wordload) {
            let wordloadKeys = Object.keys(item.wordload)
            wordloadKeys.forEach(key => {
                parms[key] = JSON.parse(JSON.stringify(item.wordload[key]))
            })
        }
        return parms
    })
    return tasks
}