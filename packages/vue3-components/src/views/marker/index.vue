<template>
  <div ref="markContainer" class="marker-container">
    <svg
      id="svgId" ref="svgContainer" v-draw="{
        rectDialog: rectDialog,
        set: handleAddDraggerOption,
        original: draggerOptionList,
        isFirst: isFirst,
        updateFirst: handleUpdateFirst,
        rectDialogFn: dialogUpdateFirst,
        deleteSvgRect: deleteSvgRectOption,
        tempCurrentOperatePosFlag: tempCurrentOperatePosFlag,
      }" class="svgPanel" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 667 375" x="0" y="0"
      :width="containerWidth" :height="containerHeight" version="1.1" xml:space="preserve"
    >111</svg>
  </div>
</template>

<script>
import { createEmbedEle } from './svg.util';
import { drawDirectives } from './draw';
import { inject, ref, onMounted, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { ElMessage, ElMessageBox } from 'element-plus';
// import { Base64 } from 'js-base64';
// import { sparringChartDetail } from '@/api/musicSongs.js';
// import { _debounce } from '@/lib/utils.js';
// 获取当前的曲谱的标记点
// import { request } from '@/api/request';
import { userApi } from "@test/apis-ts";


export default {
  directives: {
    draw: drawDirectives
  },
  props: {
    rectDialogValue: {
      type: Boolean
    }
  },
  setup(props) {
    console.log(userApi);
    debugger;
    const store = useStore();
    const $message = inject('$message'),
      containerHeightRef = ref(0),
      containerWidthRef = ref(0),
      draggerOptionListRef = ref([]),
      markContainerRef = ref(),
      isFirstRef = ref(false),
      dialogVisibleRef = ref(false),
      svgContainerRef = ref();
    const routeMatch = ref({});
    const state = reactive({
      rectDialog: false,
      // 设置当前的状态的判断，是不是下发了清空了,true表示下发了清空，false表示没有下发清空
      tempCurrentOperatePosFlag: false
    });

    /**
     * 根据当前的视图，渲染当前的高度，宽度已经默认渲染在初始化的时候完成
     * 同时获取此时svgUrl的地址参数内容，将整个svg渲染上去
     */
    const getContainer = () => {
      const markContainer = markContainerRef.value;
      containerWidthRef.value = markContainer.parentElement.clientWidth;
      // TODO:这里看后台的返回值字段，如果是base64后的数据，需要做以下反解
      // TODO:这里是关键的步骤，创建svg的图片逻辑 -->
      //TODO:写死一个图片
      //TODO:图片引用的位置注意
      //TODO:这里可以使用本地服务图片
      createEmbedEle('http://127.0.0.1:5500/packages/vue3-components/src/views/marker/01.svg', markContainer);
      // createEmbedEle('http://127.0.0.1:5500/mymusicSvgOnline/01musicscore.svg', markContainer);

      // Base64.decode()
      setTimeout(() => {
        // 设置蒙层高度与原svg一样高度
        containerHeightRef.value =
          document.getElementById('embed-container').clientHeight;
      }, 500);
    };

    /**
     * 获取曲谱标注,通过路由的params的传参
     */
    // TODO:params传递一个url参数的get位置，参数形式："/api-admin/ai/operns/:id/keypoint"
    // 扁平化数据的过程
    async function getKeyPoint() {
      const data = await userApi.getSingleMusicDetailsFn({
        kpId: 123
      });
      // TODO:设置一下初始化的labels对应标记的labelId数组
      let tempLabels = [];
      // TODO:将当前的data.data中的信息的每一个id放入当前的位置信息中
      // TODO:但是如果是初始化，那么此时这里的信息为空
      if (data?.data?.labels) {
        store.commit('setInitCurrentFullComModelSvgInfo', data.data);

        data.data.labels.forEach((item) => {
          tempLabels.push(item.id);
        });

        store.commit('setFullLables', data.data.labels);

        store.commit('setLabelArrId', tempLabels);
        // const data = await request.get(
        //   `/rest/api-admin/ai/operns/${ids}/keypoint`
        // );
        // TODO:初始化展示当前的色块内容,同时将色块中增加id
        // 循环当前的labels，然后将色块展示成为一个字符串大数组
        let allShowPos = [];
        let firstAllShowPos = [];
        for (let i = 0; i < data.data.labels.length; i++) {
          let tempAllShowPos = [];
          let tempId = data.data.labels[i].id;
          let objTemp = { id: data.data.labels[i].id };
          let objTemp2 = { ...JSON.parse(data.data.labels[i].positions) };
          // TODO:每一次循环判断此时的objTemp2是不是多个opsitions
          let tempNewObj = [];
          if (Object.getOwnPropertyNames(objTemp2).length > 1) {
            for (
              let j = 0;
              j < Object.getOwnPropertyNames(objTemp2).length;
              j++
            ) {
              objTemp2[j].id = tempId;
              tempNewObj.push(objTemp2[j]);
            }
          } else {
            objTemp2[0].id = tempId;
            tempNewObj = objTemp2;
          }
          firstAllShowPos.push({ ...tempNewObj });
        }
        for (let i = 0; i < firstAllShowPos.length; i++) {
          console.log(firstAllShowPos[i][0], i);
          if (Object.getOwnPropertyNames(firstAllShowPos[i]).length > 1) {
            //   遍历当前的这个对象，然后进行一次次放入赋值
            for (
              let j = 0;
              j < Object.getOwnPropertyNames(firstAllShowPos[i]).length;
              j++
            ) {
              allShowPos.push(firstAllShowPos[i][j]);
            }
          } else {
            allShowPos.push(firstAllShowPos[i][0]);
          }
        }
        // TODO:这里的数据是拍平的，方便用于数据下发和对比这样,当前的拍平后的所有的数据结构，
        // TODO:这样在确认完成设置顺序后，这里直接也可以使用
        store.commit('setAllShowPos', allShowPos);
        // TODO:这些色块，需要将原来的数组色卡falt拍平，因为不然每一个区域少显示一个色块
        console.log('0002-----------------------allShowPos', allShowPos);

        // TODO:设置初始化的色块展示
        // TODO:v-draw和vue中的逻辑进行相互通信
        draggerOptionListRef.value = [...allShowPos] || [];
        isFirstRef.value = true;
      }

      return Promise.resolve(data.data);
    }
    /**
     * 保存标注信息
     */
    function handleAddDraggerOption(data) {
      draggerOptionListRef.value = data;
    }
    /**
     * 曲谱标记的下发的弹窗
     */
    function handleSaveMarker() {
      ElMessageBox.confirm('您真的要保存标记吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          handleMarkerToServer();
        })
        .catch(() => { });
    }
    /**
     * 曲谱标记的数据下发
     */
    function handleMarkerToServer() {
      request
        .put({
          url: 'rest/api-admin/ai/operns/:id/keypoint',
          data: {
            keypoint: JSON.stringify(draggerOptionListRef.value)
          },
          params: {
            id: route.query.id
          }
        })
        .then((res) => {
          $message.success('曲谱标记成功');
        })
        .catch((err) => {
          $message.error(err.msg);
        });
    }

    function handleUpdateFirst() {
      isFirstRef.value = false;
    }
    function dealObjectValue(obj) {
      var param = {};
      if (obj === null || obj === undefined || obj === '') return param;
      for (var key in obj) {
        // 判断是否是Object对象
        if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
          param[key] = dealObjectValue(obj[key]);
        } else if (
          obj[key] !== null &&
          obj[key] !== undefined &&
          obj[key] !== ''
        ) {
          param[key] = obj[key];
        }
      }
      return param;
    }
    /**v-自定义指令传值 */
    /**
     * divId前台当前存储的矩形的一个矩形id,
     * fullActivityDiv 当前的所有的矩形的集合
     * tempCurrentOperatePos当前的新操作的rect矩形数组位置
     */
    async function dialogUpdateFirst(
      divId,
      fullActivityDiv,
      tempCurrentOperatePos
    ) {
      // TODO:每一次双击色块后，需要反查出来当前操作的是哪一个id,，如果当前色块可以找到对应的id，那么表明此时是更新，
      // TODO:如果当前的色块表明的是没有id，那么此时单纯的新建，但是有可能是合并，也有可能是单个一句。
      // TODO:每一次打开窗口不用调用1415
      // TODO:获取当前的数据和fullActivityDiv对比的内容，找出是那些点需要合并
      // TODO:判断此时的逻辑是新建还是更新
      let tempFlag;
      // TODO:暂存所有没有id的对应的divId的数组集合，因为需要做随后的合并操作
      let nullIdArrDivIds = [];
      let allDivIds = store.state.fullLables; //遍历出来全量中那几个没有id，同时存储当前的位置
      let mergeTempPositions = '';
      // TODO:暂存后台存储在数据库所有位置信息的数组结构
      let allTempPositons = [];
      // TODO:找出labels中找出id为空的那些divId，就是当前的diff差异的那些数组内容
      // TODO:判断所有的位置信息中的内容中，是否有_divId存储在fullLabels中，如果存在表示当前的是加载打开一些信息，
      // TODO:如果是不存在fullLables中，那么表示此时我们是新建，那么不用管了，直接空打开一个界面。
      // TODO:情况1：刚刚新建，如果fullLables为空，那么我们合并这个所有的色块，即可
      // TODO:情况2：fullLables不为空，那么判断有没有id，来反查是不是新建

      // TODO:快速判断更新的方法，获取当前的divId
      let arrActive1 = [...fullActivityDiv];
      console.log(arrActive1, '此时的状态是编辑还是新建');
      let refreshFlag = false; //默认是新建
      for (let l = 0; l < arrActive1.length; l++) {
        if (arrActive1[l]._divId == divId) {
          refreshFlag = true;
        }
      }

      if (store.state.fullLables.length) {
        // TODO:此时已经有了内容，判断这里是不是更新
        // TODO:获取当前的色块的位置信息，然后将当前的色块位置信息做一次遍历
        let arrActive = Array.from(fullActivityDiv);
        // TODO:将对象数组对象化，
        let newArrActive = { ...arrActive };
        let currentObj = dealObjectValue(newArrActive);
        let allColorRectPos = Object.values(currentObj);
        // TODO:此时将位置信息结构化
        // TODO:此时将位置信息结构化
        // TODO:处理合并位置信息的数据结构
        // TODO:循环获取所有色块位置的时候，这里有一个坑，因为合并的时候，这里的内容是一个对象数组，所以需要将位置和get展示色块
        // TODO:一样，需要专门挑出来，这里提前将id和后台的位置信息绑定，就是为了很好的通过位置
        // TODO:位置信息快速定位好labelId
        // TODO:判断一下当前的位置信息如果是数组，那么处理get一样
        store.state.fullLables.forEach((item) => {
          let tempPosition = { ...JSON.parse(item.positions) };
          let tempId = { id: item.id };
          let newTempPosition = { ...tempPosition[0], ...tempId };
          allTempPositons.push(newTempPosition);
        });

        // TODO:循环diff出来当前的rect中的新增的色块,内da
        // TODO:这里前提是mergeRectPos已经是拍平的数组结构，当前的所有色块，allTempPostions是后台存储过的色块
        let newDiffRectPos = new Set();
        // TODO:找出divId对应的diff内容
        let allColorRectPosDivNumbers = [];
        for (let m = 0; m < allColorRectPos.length; m++) {
          allColorRectPosDivNumbers.push(allColorRectPos[m]._divId);
        }
        let allTempPositonsDivNumbers = [];
        for (let n = 0; n < allTempPositons.length; n++) {
          allTempPositonsDivNumbers.push(allTempPositons[n]._divId);
          // }TODO:当前操作的divId是否再全量中，如果在，那么表示是更新，
        }
        // TODO:参考信息的时候对于fullLables处理,将这里的信息posiitons数据拍平
        let allShowPos = [];
        let firstAllShowPos = [];
        for (let i = 0; i < store.state.fullLables.length; i++) {
          let tempAllShowPos = [];
          let tempId = store.state.fullLables[i].id;
          let objTemp = { id: store.state.fullLables[i].id };
          let objTemp2 = { ...JSON.parse(store.state.fullLables[i].positions) };
          // TODO:每一次循环判断此时的objTemp2是不是多个opsitions
          let tempNewObj = [];
          if (Object.getOwnPropertyNames(objTemp2).length > 1) {
            for (
              let j = 0;
              j < Object.getOwnPropertyNames(objTemp2).length;
              j++
            ) {
              objTemp2[j].id = tempId;
              tempNewObj.push(objTemp2[j]);
            }
          } else {
            objTemp2[0].id = tempId;
            tempNewObj = objTemp2;
          }
          firstAllShowPos.push({ ...tempNewObj });
        }

        let allShowPosFlat = [];
        for (let i = 0; i < firstAllShowPos.length; i++) {
          console.log(firstAllShowPos[i][0], i);
          if (Object.getOwnPropertyNames(firstAllShowPos[i]).length > 1) {
            //   遍历当前的这个对象，然后进行一次次放入赋值
            for (
              let j = 0;
              j < Object.getOwnPropertyNames(firstAllShowPos[i]).length;
              j++
            ) {
              allShowPosFlat.push(firstAllShowPos[i][j]);
            }
          } else {
            allShowPosFlat.push(firstAllShowPos[i][0]);
          }
        }

        // TODO:循环当前的divId在不在当前的拍平的数组中,refreshFlag
        let refreshFlag2 = false;
        for (let r = 0; r < allShowPosFlat.length; r++) {
          if (allShowPosFlat[r]._divId == divId) {
            refreshFlag2 = true;
          }
        }
        // TODO:每次打开弹窗，赋值一下当前是更新还是新建
        store.commit('setGlobalStatusDialog', refreshFlag2);
        // TODO:判断此时的divId在不在后台接口对应的数据里面,第一种情况，divId恰好在第一个数组里面，但是
        // TODO:有没有可能，恰好后台返回的数据结构中，数据没有拍平记录，数据结构是合并后的数据
        if (refreshFlag2) {
          // 找出当前的位置信息，就是存储的数据结构中的后台所有的信息
          // TODO:准备下发的位置信息准备好，但是当前一个问题，如果位置移动，这里的内容又是需要diff
          // TODO:TODO:拖动位置的实现，这里暂时先不考虑，不然这个需求无法正常完成提交。
          // TODO:不考虑拖动后的实现的数据内容和实时更新暂时
          // TODO 第一步，首先将这里的位置信息进行获取，这时候前台的所有的位置信息，其实就是拖动完成后的位置信息，其实也很简单
          // TODO:那么此时使用前台的所有的位置，同时这里获取后的位置信息，需要注意区分好。
          // TODO:这里使用一个专门的标记，allShowPos是后台获取的，移动更新后的位置信息，moveAllShowPos,虽然数据的数量没有变化，
          // TODO 但是这里的数据的

          // TODO:展示当前的视频信息，只能通过一个比较差的办法，通过divId，反查出来当前的操作labelId,从fulllables中找出。
          // TODO:第一步，找出当前的位置divId对应的id,然后通过id反查视频
          let nowId = '';
          for (let h = 0; h < allShowPosFlat.length; h++) {
            if (allShowPosFlat[h]._divId == divId) {
              nowId = allShowPosFlat[h].id;
            }
          }
          // TODO:全局标记的曲谱id派发出去，用于修改的时候使用，需要清空吗
          store.commit('setLabelId', nowId);
          // TODO:这里可能有一个bug就是这里的allTempPositons数据是为拍平的内容，
          // 第二步查出视频，通过当前的nowId查出视频
          // 通过nowId查出当前的视频信息
          // TODO:同时通过nowId将接口数据存储好的数据直接拿出来，赋值给mergePos，即可，因为是一个合并数据或是不是都是已经处理好的
          let currentVideos = [];

          // TODO:循环nowId对应的位置信息,传递给当前的更新的设置顺序数组
          for (let i = 0; i < store.state.fullLables.length; i++) {
            if (store.state.fullLables[i].id == nowId) {
              // TODO:重新将所有的覆盖，视频新的所有
              store.commit(
                'setAllShowUploadVideos',
                store.state.fullLables[i].videoInfos
              );
              store.commit(
                'setMergeCurPos',
                JSON.parse(store.state.fullLables[i].positions)
              );
            }
          }
          //
          // TODO:此时是更新，那么需要将视频数据加载出来，fullRectVideos
          // TODO:主动diff出来当前的数据内容
          store.commit('setNewDialogRectFlag', true);
          // 设置获取当前的视频信息的内容
        } else {
          // 视频，已经存在色块的前提下的新建
          // 新建的时候，清空
          store.commit('setClearNewUploadVideos');
          // TODO:清空展示层的数据内容视频和顺序内容
          store.commit('setClearShowUploadVideos');
          let arrActive = Array.from(fullActivityDiv);
          // TODO:将对象数组对象化
          let newArrActive = { ...arrActive };
          let currentObj = dealObjectValue(newArrActive);
          let uiGetRectPos = Object.values(currentObj); //此时UI获取的界面色块
          // TODO:存在两个对象比较的，需要diff出来当前的已经存在的和UI界面的差异，找出当前的新建的所有块
          // TODO:备份一个当前的后台拍平数据结构，用于循环
          // TODO:因为这里的store.state.fullLables已经不是扁平化，需要将位置信息抽取，扁平化位置信息
          let interfaceAllShowPos = JSON.parse(
            JSON.stringify(store.state.allShowPos)
          );
          // TODO:处理扁平化接口数据
          // TODO:
          let allShowPos1 = [];
          let firstAllShowPos1 = [];
          for (let i = 0; i < store.state.fullLables.length; i++) {
            let tempAllShowPos1 = [];
            let tempId1 = store.state.fullLables[i].id;
            let objTemp1 = { id: store.state.fullLables[i].id };
            let objTemp21 = {
              ...JSON.parse(store.state.fullLables[i].positions)
            };
            // TODO:每一次循环判断此时的objTemp2是不是多个opsitions
            let tempNewObj1 = [];
            if (Object.getOwnPropertyNames(objTemp21).length > 1) {
              for (
                let j = 0;
                j < Object.getOwnPropertyNames(objTemp21).length;
                j++
              ) {
                objTemp21[j].id = tempId1;
                tempNewObj1.push(objTemp21[j]);
              }
            } else {
              objTemp21[0].id = tempId1;
              tempNewObj1 = objTemp21;
            }
            firstAllShowPos1.push({ ...tempNewObj1 });
          }

          // TODO:二次优化数据
          for (let i = 0; i < firstAllShowPos1.length; i++) {
            console.log(firstAllShowPos1[i][0], i);
            if (Object.getOwnPropertyNames(firstAllShowPos1[i]).length > 1) {
              //   遍历当前的这个对象，然后进行一次次放入赋值
              for (
                let j = 0;
                j < Object.getOwnPropertyNames(firstAllShowPos1[i]).length;
                j++
              ) {
                allShowPos1.push(firstAllShowPos1[i][j]);
              }
            } else {
              allShowPos1.push(firstAllShowPos1[i][0]);
            }
          }

          //  现将两个对象的相同之处进行记录
          let sameObjPosNoId = []; //没有id的位置信息内容
          for (let i = 0; i < uiGetRectPos.length; i++) {
            for (let j = 0; j < allShowPos1.length; j++) {
              if (uiGetRectPos[i]._divId == allShowPos1[j]._divId) {
                sameObjPosNoId.push(uiGetRectPos[i]);
              }
            }
          }
          // TODO:根据过滤出来的相同的信息，diff出来多余新建的位置
          // TODO:找出数组相同的部分,然后通过备份一个当前的循环全量，删除其中的多余内容，最后删除
          let backUiGetRectPos = JSON.parse(JSON.stringify(uiGetRectPos));
          for (let i = 0; i < uiGetRectPos.length; i++) {
            for (let j = 0; j < sameObjPosNoId.length; j++) {
              if (uiGetRectPos[i]._divId == sameObjPosNoId[j]._divId) {
                delete backUiGetRectPos[i];
                break;
              }
            }
          }

          // TODO:此时将位置信息结构化
          // TODO:单个和多个没有区别，因为都是要保存一下当前的合并信息节点的内容
          // 将下发前的位置信息顺序，从0开始排序实现，
          let tempOrderPos = dealObjectValue(backUiGetRectPos);
          store.commit('setMergeCurPos', Object.values(tempOrderPos));
          // TODO:因为此时是新建，所以此时的视频信息需要清空
          store.commit('setClearNewUploadVideos');
          store.commit('setNewDialogRectFlag', true);
        }

        // TODO:当前新建的位置信息，暂存
        // TODO:位置信息的存储，全部将数据铺平，不用嵌套
        // TODO:注意这里铺平的处理数据
      } else {
        // TODO:百分百新建的情况，因为开始的时候，什么信息内容也没有。
        // TODO:这里的逻辑就是新建的逻辑
        // TODO:情况1：刚刚新建，如果fullLables为空，那么我们合并这个所有的色块，即可
        // TODO:合并此时的所有的色块的位置信息
        // TODO:此时更新所有的色块合并信息，色块的信息就是当前的下发位置信息
        let arrActive = Array.from(fullActivityDiv);
        // TODO:将对象数组对象化
        let newArrActive = { ...arrActive };
        let currentObj = dealObjectValue(newArrActive);
        let mergeRectPos = Object.values(currentObj);

        // TODO:此时将位置信息结构化
        // TODO:单个和多个没有区别，因为都是要保存一下当前的合并信息节点的内容
        store.commit('setMergeCurPos', mergeRectPos);
        let obj = {
          dialogFlag: true
        };
        // TODO:因为此时是新建，所以此时的视频信息需要清空
        store.commit('setClearNewUploadVideos');
        // TODO:清空展示层的数据内容视频和顺序内容
        store.commit('setClearShowUploadVideos');
        // 展示新建的弹窗出现
        store.commit('setNewDialogRectFlag', true);
        // TODO:这里注意新建操作的位置信息，只能通过传入的newArrActive数据结构设置position
        // TODO:因为fulllables中没有内容
      }
      // TODO:存储是不是合并的数组，如果长度length是1，那么是一个，如果超过1，那么是合并
      // TODO:这里内容，只是删除之前单条的清空，如果是多条，那么这里比较困难
    }
    const deleteSvgRectOption = (deleteId) => {
      // _debounce(deleteSvgRectSingleFn(deleteId));
    };
    /**
     * 删除当前的svg色块，当前多个色块，通过lableId区分当前的色块
     */
    const deleteSvgRectSingleFn = (deleteId) => {
      //TODO:更新曲谱的视频全量信息
      // ElMessageBox.confirm('请您确定要删除当前区间色块', '提示', {
      //   type: 'warning',
      // }).then(() => {
      //TODO: 每一次删除一个弹窗，

      // TODO:通过当前的选中的
      console.log(
        store.state.currentFullComModelSvgInfo,
        store.state.initCurrentFullComModelSvgInfo,
        '------------currentFullComModelSvgInfo-----------'
      );
      // 反查出来删除的那个色块的id,循环遍历
      let operateId = '';
      store.state.allShowPos.forEach((item) => {
        if (item._divId == deleteId) {
          operateId = item.id;
        }
      });
      // TODO:同时全量的位置信息中，减少了这个id对应的内容
      store.state.allShowPos.forEach((item, index) => {
        if (item?.id == operateId) {
          console.log(
            '------------删除成功。这里也需要同步删除这个前台存储',
            operateId
          );
          delete store.state.allShowPos[index];
          // TODO:删除此时的全局的labels内容中的id为operateId内容
          store.commit('setUpdateFullLables', operateId);
          // TODO:删除此时的对应的矩形汇总信息的位置信息
          // TODO:因为删除每一次删除一个
          store.commit('setAllShowPos', store.state.allShowPos);
          console.log(
            'store.state.allShowPos',
            store.state.allShowPos,
            store.state.allShowPos
          );
        }
      });
      // 删除接口下发
      resource.deleteLabelInfo(operateId).then((res) => {
        ElMessage({
          message: '删除成功',
          type: 'success'
        });
      });
      // });
    };
    function handleReset() {
      ElMessageBox.confirm('您真的要清除所有标记吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          draggerOptionListRef.value = [];
          svgContainerRef.value.innerHTML = '';
        })
        .catch(() => { });
    }

    function handleClose() {
      dialogVisibleRef.value = false;
    }
    // 监听一下此时的操作的矩形数组，是清空吗，true表示清空，false，表示不是
    // watch(
    //   () => store.state.currentOperatePosFlag,
    //   (newVal, oldVal) => {
    //     if (newVal) {
    //       store.commit('setCurrentOperatePosFlag', newVal);
    //       // TODO:同时告诉暂存的那个数组，目前已经清空了,这个draw的传值是否可以传递成功
    //       state.tempCurrentOperatePosFlag = newVal;
    //       console.log(
    //         state.tempCurrentOperatePosFlag,
    //         '-------watch监听这里的传值'
    //       );
    //     }
    //   }
    // );
    // TODO:增加一个监听，当前的ppt切换后，掉一共这个获取标记的接口
    // watch(
    //   () => store.state.curKpId,
    //   () => {
    //     console.log(
    //       '---------------------------------------此时的curKpId是不是',
    //       store.state.curKpId
    //     );
    //     getKeyPoint();
    //   }
    // );
    onMounted(() => {
      // TODO:获取此时的标记,这里需要再次调用一次，才能调用展示成功
      getKeyPoint();
      // TODO:默认打开的时候，已经调用了这个接口
      getContainer();
    });
    return {
      containerHeight: containerHeightRef,
      containerWidth: containerWidthRef,
      // 标记选项 array
      /**
       * 标记选项 array
       */
      draggerOptionList: draggerOptionListRef,
      // 标记容器
      markContainer: markContainerRef,
      svgContainer: svgContainerRef,
      //
      /**
       * 默认为第一次才可渲染
       */
      isFirst: isFirstRef,
      handleAddDraggerOption,
      handleSaveMarker,
      handleUpdateFirst,
      routeMatch,
      dialogVisible: dialogVisibleRef,
      handleReset,
      handleClose,
      ...toRefs(state),
      dialogUpdateFirst,
      deleteSvgRectSingleFn,
      dealObjectValue,
      deleteSvgRectOption
    };
  }
};
</script>

<style lang="less" scoped>
// @mixin pos-ab {
//   position: absolute;
// }
.marker-container {
  position: relative;
}

.svgPanel {
  position: absolute;
  left: 0;
  top: 0;
}

.control-panel {
  position: relative;
  left: 550px;
  top: -88px;
  padding: 10px;
  z-index: 100;
}
</style>
