/**
 * 回车时跳转到下一个元素
 * @DateTime  2018-05-23
 * @param     {[type]}                 $input [INPUT 元素列表]
 */
function keydown_to ($input) {
    if (!$input) $input = $('input:text:not(:disabled)');
    $input.bind("keydown", function (e) {
        var n = $input.length;
        if (e.which == 13) {
            e.preventDefault(); //Skip default behavior of the enter key
            var nextIndex = $input.index(this) + 1;
            if (nextIndex < n)
                $input[nextIndex].focus();
            else
                $input[nextIndex - 1].blur();
        }
    });
}

// 全局变量的文件位置
// 这里存储全局用到的一些枚举值内容
export default {
    autho: {
        systemSet: {
            status: 0,
            errorMsg: "",
        },
        patientListComponent: {
            status: 0,
            errorMsg: "",
        },
        firstAidManagement: {
            status: 0,
            errorMsg: "",
        },
        commandDispatch: {
            status: 0,
            errorMsg: "",
        },
        dataStatistic: {
            status: 0,
            errorMsg: "",
        },
        checkEcg: {
            status: 0,
            errorMsg: "",
        },
    },
    routerList: ['statisticApplication'],//路由缓存数组
    messageList: [],//消息提醒列表
    overTimeWebSocket: '',//超时提醒socket
    socketTimer: '',//超时提醒心跳检测定时器
    audioName: '',//声音提醒
    voiceTip: '',//声音提醒是否开启
    //胸痛病历按钮完成急救状态
    buttonState: {
        emergencyfinishstatus: "0",//急救信息完成状态 (1完成,0未完成)
        checkfinishstatus: "0",//检查信息 (1完成,0未完成)
        treatmentfinishstatus: "0",//胸痛诊疗 (1完成,0未完成)
        cathlabfinishstatus: "0",//导管室 (1完成,0未完成)
        outcomefinishstatus: "0",//患者转归 (1完成,0未完成)
        calthstate: '0',//一键启动导管室（1已启动，0未启动）
        task_state: "",//任务状态（提交审核为空，7审核，8拒绝审核，9审核通过）
        ts_task: '',//
        ts_pat_info: '',
        outComeButton: false,//患者转归页签
        isCathLab: false,//导管室页签
        cp_diagnosis_code: '',//初步诊断
        give_up_treatment: '',//患者自愿放弃治疗
        is_trans_hospital: '',//直接转送上级医院
        setCathLabState: '1',//措施选择【直接PCI】时 状态为1，措施选择【转运PCI】时，转运PCI选择【接收患者】时状态为2，措施选择【溶栓】时，溶栓后措施选择【补救PCI】或【溶栓后介入】状态为3，侵入性策略为【2H紧急介入治疗】时状态为4
    },
    //卒中各页签完成状态
    strokeButtonState: {
        emergencyfinishstatus: '0',//急救信息完成状态 (1完成,0未完成)
        historyfinishstatus: '0',//既往史完成状态 (1完成,0未完成)
        checkfinishstatus: '0',//检查信息完成状态 1完成,0未完成
        inhospitaltreatfinishstatus: '0',//住院治疗完成状态 1完成,0未完成
        outcomefinishstatus: '0',//患者转归完成状态  1完成,0未完成
        stroketreatfinishstatus: '0',//卒中诊疗完成状态 1完成,0未完成
        ts: '',
        task_state: '',
        pk_task: ''
    },
    loginState: {
        saveDisabled: false, //保存按钮
        applyDisabled: false,//申请导管室
        savePatCPCMRDisabled: false,//完成急救
        submitPatCPCMRDisabled: false,//提交审核
        examinePatCPCMRDisabled: false,//审核
        filePatCPCMRDisabled: false,//归档
    },
    lockState: '',//病历锁定状态
    lockName: '',
    routerName: '',//跳转到患者病历的路由名称
    buttons: [],
    keydown_to,
    logindata: {
    }, //当前登陆者的信息
    painDate: {
        rowData: {
            firsttimestart: '',
            firsttimeend: '',
            effectivemark: '1',
            minvalue: '',
            maxvalue: ''
        }
    },//数据上报或者患者列表跳转到胸痛病历的变量
    roleSpace: {
        role_pk_org: '',
        role_pk_group: ''
    },
    systemType: 'MCPC'
};




