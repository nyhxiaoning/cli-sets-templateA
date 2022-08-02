<template>
  <div id="fileBodyBox" class="file-box" :style="getBoxStyle()" @paste="onPasted">
    <div class="file-items-box" @click="dialogVisible = true">
      <div class="file-mini-box" style="background-color: #eff0f1;">
        <el-icon>
          <plus />
        </el-icon>
      </div>
      <div v-for="item in value" :key="item.id" class="file-mini-box">
        <!-- <el-icon v-else>
          <tickets />
        </el-icon> -->
        <a-tooltip placement="top" style="pointer-events: none;">
          <template #title>
            <span>{{ item.name }}</span>
          </template>
          <div v-if="item?.type === 'image'" class="flex-center-box" style="overflow: hidden;">
            <el-image style="width: 30px; height: 30px;border-radius: 4px;" fit="fill" :src="item.thumbnailUrl" />
          </div>
          <div v-else class="flex-center-box">
            <svg-icon icon="file" style="font-size: 20px;" />
          </div>
        </a-tooltip>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" width="598px" @opened="dialogOpened" @closed="dialogClosed">
      <div class="head-box">
        <span class="head-box-title">附件列表</span>
        <div class="head-box-close" />
      </div>
      <div class="body-box" :style="{ flex: 1, }">
        <div id="fileBox" class="file-image-box">
          <!-- :style="{ flex: 1, 'pointer-events': dragVisible ? 'none' : 'all' }" -->
          <div id="drag-upload-box-id" class="drag-upload-box" :style="{ flex: 1 }">
            <config-provider :locale="zhCN">
              <a-upload
                v-show="!dragVisible" ref="fileUpdateRef" v-model:file-list="fileList" :action="fileUploadPath"
                :headers="heads" list-type="picture-card" :before-upload="beforeUpload" @change="fileUpdateChanged"
                @preview="handlePreview" @remove="fileRemoved"
              >
                <div style="margin-top: 8px;pointer-events: none;">
                  上传文件
                </div>
                <template #itemRender="{ file, actions }">
                  <div class="a-file-box">
                    <div
                      v-if="file.status === 'success' || file.status === 'done'" style="height: 100%;width:100%"
                      @mouseenter="focusFileId = file.uid" @mouseleave="focusFileId = ''"
                    >
                      <div v-if="isImage(file.type)" style="display: flex;height: 100%;">
                        <el-image :src="file?.thumbUrl" fit="cover" style="width:100% ;" />
                      </div>
                      <div v-else style="width:100%;height:100%">
                        <div class="a-file-default" :style="file.status === 'error' ? 'color: red' : ''">
                          <svg-icon icon="file" style="font-size: 30px;" />
                          <div style="text-overflow: ellipsis;overflow: hidden;">
                            {{ file.name }}
                          </div>
                        </div>
                      </div>
                      <div v-show="focusFileId === file.uid" class="a-file-btns">
                        <el-icon class="icon-box" @click="actions.preview">
                          <icon-view />
                        </el-icon>
                        <el-icon class="icon-box" @click="actions.remove">
                          <delete />
                        </el-icon>
                      </div>
                    </div>
                    <div v-else-if="file.status === 'uploading'" class="a-file-uploading">
                      <el-icon class="is-loading">
                        <loading />
                      </el-icon>
                      <div>文件上传中</div>
                    </div>
                    <div
                      v-else-if="file.status === 'error'" style="height: 100%;width:100%"
                      @mouseenter="focusFileId = file.uid" @mouseleave="focusFileId = ''"
                    >
                      <div class="a-file-error">
                        <el-icon>
                          <WarningFilled />
                        </el-icon>
                        <div style="text-overflow: ellipsis;overflow: hidden;">
                          上传失败
                        </div>
                      </div>
                      <div v-show="focusFileId === file.uid" class="a-file-btns">
                        <el-icon class="icon-box" @click="actions.remove">
                          <delete />
                        </el-icon>
                      </div>
                    </div>

                    <!-- <a href="javascript:;" @click="actions.download">download</a>
                    <a href="javascript:;" @click="actions.remove">delete</a> -->
                  </div>
                </template>
              </a-upload>
            </config-provider>
            <div style="flex:1;display: flex;align-items: center;justify-content: center; pointer-events: none;">
              {{ dragText }}
            </div>
          </div>
          <el-progress v-if="progressVisible" :percentage="loadProgress" />
          <ImgViewr :visible="imgViewrVisible" :urls="urls" :initial-index="0" @close="imgViewrVisible = false" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, nextTick, onMounted, computed, onUnmounted, getCurrentInstance, AppContext, watch } from 'vue';
import { Loading, UploadFilled, Tickets, Plus, View, Delete, WarningFilled } from "@element-plus/icons-vue";
import { ElMessage } from 'element-plus';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import Modal from 'ant-design-vue/lib/modal';
// import https from '@/utils/https/https';
import { ConfigProvider } from 'ant-design-vue';
import ImgViewr from 'vue-img-viewr';
// import store from '@/store';
// import { downloadFile } from '@/utils/tools';
// import { getToken } from '@/utils/global_functions';

export default defineComponent({
  /** 文件编辑组件 */
  name: 'FileDrop',
  components: { Loading, UploadFilled, Tickets, WarningFilled, ImgViewr, "icon-view": View, Delete, Modal, Plus, ConfigProvider },
  props: ["params"],
  setup(props) {
    /** 用于文件上传 */
    const heads = computed(() => {
      return {
        // tenant_access_token: store.getters.getCompanyId,
        user_access_token: getToken()
      };
    });

    const widgetState = reactive({
      dialogVisible: false,
      activeName: "file",
      loadProgress: 0,
      /** 进度显示 */
      progressVisible: false,
      /** 当前选择的图片 */
      currentImage: undefined as any,
      fileList: [] as any[],
      dragVisible: false,
      focusFileId: "",
      urls: [] as string[],
      imgViewrVisible: false
    });

    const value = ref(props.params.value ? props.params.value as any[] : []);

    if (value.value?.length > 0) {
      widgetState.fileList = value.value.map(x => {
        return initFile(x);
      });
    }


    /** 文件上传地址 */
    const fileUploadPath = computed(() => {
      return process.env.VUE_APP_API_PATH + '/api/v1/media/upload';
    });

    /** 将file对象转换成ant file对象 */
    function initFile(file: any): any {
      return {
        uid: file.id,
        name: file.name,
        status: 'done',
        thumbUrl: file?.thumbnailUrl,
        type: file.type === "image" ? file.type : "text/plain",
        url: file.url
      };
    }

    function getBoxStyle() {
      let _style: any = {
        width: (props.params.column.actualWidth) + "px",
        height: (props.params.node.rowHeight - 1) + "px"
      };
      if (props.params?.node?.rowHeight <= 42) {
        _style.display = "flex";
      } else {
        _style.display = "flex";
        _style['flex-wrap'] = "wrap";
      }
      return _style;
    }

    const dragText = computed(() => {
      return widgetState.dragVisible ? '黏贴或拖动文件至此上传' : '';
    });

    function isPopup() {
      return true;
    }

    function getValue(): any {
      return [...value.value];
    }

    //在编辑开始之前调用一次，给编辑器一个机会
    //在开始之前取消编辑。
    function isCancelBeforeStart() {
      const _res: boolean = props.params?.allowEditCell(props.params);
      return _res;
    }

    const fileUpdateRef = ref({} as HTMLElement);


    onMounted(() => {
      console.log("File onMounted ============================>");
      window.addEventListener("paste", onPasted);
      nextTick(() => {

      });
    });

    onUnmounted(() => {
      console.warn("File onUnmounted ============================>");
      window.removeEventListener("paste", onPasted);
    });

    function isImage(type: string): boolean {
      return type.toLocaleLowerCase().indexOf('image') > -1;
    }

    function dialogOpened() {
      const _dom = document.getElementById('fileBox');
      if (_dom) {
        _dom.addEventListener('drop', dropEvent);
        _dom.addEventListener('dragenter', dropEventEnter);
        _dom.addEventListener('dragover', dropEventOver);
        _dom.addEventListener('dragleave', dropEventLave);
      }
    }

    function dialogClosed() {
      props.params.api.stopEditing();
    }

    /** 拖动结束后执行 */
    function dropEvent(e: DragEvent) {
      e.preventDefault();
      e.stopPropagation();
      widgetState.dragVisible = false;
      const files = e.dataTransfer?.files;
      console.log("%c 拖动的文件", 'background-color:red;color:#fff', files);
      if (files) {
        const file = files[0];
        let formData = new FormData();
        if (file.size > (1024 * 1024 * 5)) {
          ElMessage.error("文件大小不能超过5MB");
          return;
        }
        formData.append("file", file);
        const uid = Date.now().toString();

        //设置ang 文件列表
        widgetState.fileList.push({
          uid: uid,
          name: files[0].name,
          status: 'uploading',
          type: files[0].type
        });

        //设置服务端文件列表
        value.value.push({
          id: uid,
          name: files[0].name,
          status: 'uploading',
          type: "file"
        } as AFileEntity);
        https
          .uploadfile("media", "upload", formData)
          .then(function (response) {
            ElMessage.success(`文件 ${response.name} 上传成功！`);
            console.log("文件上传结果", response);
            //value.value.push(JSON.parse(JSON.stringify(response)));
            const _index = value.value.findIndex(x => x.id === uid);
            if (_index > -1) {
              const newFile = response as AFileEntity;
              newFile.status = 'success';
              value.value.splice(_index, 1, newFile);
              // value.value.push(newFile);
            }
            const _antfile = widgetState.fileList.find(x => x.uid === uid);
            console.log("上传后找到的ant file", uid, _antfile);
            if (_antfile) {
              _antfile.status = 'success';
              _antfile.url = response.url;
              _antfile.uid = response.id;
              if (response.type === 'image') {
                //如果为图片类型则设置缩略图
                _antfile.thumbUrl = response.thumbUrl;
              }
            }
          })
          .catch((err) => {
            const _antfile = widgetState.fileList.find(x => x.uid === uid);
            if (_antfile) {
              _antfile.status = 'error';
            }
            console.log("文件上传报错", err);
            ElMessage.error("文件上传失败");
          });

      }

    }

    watch(() => widgetState.dragVisible, (value) => {
      if (value === true) {
        const node = document.getElementById('drag-upload-box-id');
        if (node) {
          node.style.pointerEvents = 'none';
          console.warn("监听得到节点", node.style.pointerEvents);
        }
      }
    });


    function dropEventEnter(e: DragEvent) {
      console.log("开始拖动");
      widgetState.dragVisible = true;
      const node = document.getElementById('drag-upload-box-id');
      if (node) {
        node.style.pointerEvents = 'none';
        console.warn("得到节点", node);
      }
      e.preventDefault();
      e.stopPropagation();
    }

    function dropEventOver(e: any) {
      console.log("%c 拖动", 'background-color:green;color:#fff');
      e.preventDefault();
      e.stopPropagation();
    }

    function dropEventLave(e: DragEvent) {
      console.log("%c LEAVE", 'background-color:blue;color:#fff');
      widgetState.dragVisible = false;
      // e.preventDefault();
      // e.stopPropagation();
    }


    /** 文件上传失败后回调 */
    function onFileErrored(error: Error) {
      ElMessage.error('上传失败：' + error.message);
    }

    /**
    * 上传图片之前执行
    * @param rawFile 原始文件
    */
    function beforeImageUpload(rawFile: any) {
      if (rawFile.size / 1024 / 1024 > 5) {
        ElMessage.error('图片大小不能超过5MB!');
        return false;
      }
      return true;
    }


    /**
     * 文件上传成功后回调
     */
    function onFileSuccessed(_result: ResuleEntity) {
      if (_result.code === 200) {
        widgetState.currentImage = _result.data;
        ElMessage.success('附件上传成功！');
      }
    }


    /**
    * 文件上传进度事件
    */
    function onFileProgress(evt: any) {
      widgetState.progressVisible = true;
      widgetState.loadProgress = parseInt(evt.percent);
      if (widgetState.loadProgress >= 100) {
        widgetState.loadProgress = 100;
        setTimeout(() => {
          widgetState.progressVisible = false;
        }, 2000);
      }
    }


    /** 文件点击 */
    async function handlePreview(file: any) {
      if (file.type.toLocaleLowerCase().indexOf('image') > -1 && file.url) {
        widgetState.urls = [process.env.VUE_APP_API_PATH + file.url];
        widgetState.imgViewrVisible = true;
      } else {

        ElMessage.info(`开始后台下载文件: ${file.name},请勿刷新页面.`);
        downloadFile("/media/" + file.uid, file.name).catch(e => {
          console.error("文件下载失败", e);
          ElMessage.error("下载失败");
        });

      }
    }

    /** 文件上传成功 */
    function fileUpdateChanged(result: any) {
      if (result.file.status == 'done' && result.file.response?.code == '200') {
        console.log("%c 上传成功", "background-color:blue;color:#fff", result.file);
        result.file.url = result.file.response.data.url;
        result.file.uid = result.file.response.data.id;
        if (result.file.response.data.thumbnailUrl) {
          result.file.thumbUrl = result.file.response.data.thumbnailUrl;
        }
        value.value.push(result.file.response.data);
        value.value = [...value.value];
      }
    }

    /** ant 文件移除 */
    function fileRemoved(file: any) {
      let removeFile = value.value.find(x => x.id === file.uid);
      if (removeFile) value.value.remove(removeFile);
    }

    function onPasted(e: any) {
      e.preventDefault();
      e.stopPropagation();
      // 获取文本值
      e.clipboardData.getData('text');
      console.log("%c 获取文本值", "background-color:blue;color:#fff", e.clipboardData.getData('text'));
      // 获取图片
      let files = e.clipboardData.files as File[];
      console.log("%c 获取图片", "background-color:blue;color:#fff", files);
      if (files && files.length > 0) {
        let formData = new FormData();
        const _file = files[0];
        if (_file.size > (1024 * 1024 * 5)) {
          ElMessage.error("文件大小不能超过5MB");
          return;
        }
        formData.append("file", _file);
        const uid = Date.now().toString();
        //  return {
        //         uid: file.id,
        //         name: file.name,
        //         status: 'done',
        //         // thumbUrl: x.url,
        //         type: file.type === "image" ? file.type : "text/plain",
        //         url: file.url
        //       };

        //设置ang 文件列表
        widgetState.fileList.push({
          uid: uid,
          name: _file.name,
          status: 'uploading',
          type: _file.type
        });

        //设置服务端文件列表
        const _valueFile = {
          id: uid,
          name: _file.name,
          status: 'uploading',
          type: "file"
        } as AFileEntity;

        value.value.push(_valueFile);
        https
          .uploadfile("media", "upload", formData)
          .then(function (response) {
            ElMessage.success(`文件 ${response.name} 上传成功！`);
            console.log("文件上传结果", response);
            //value.value.push(JSON.parse(JSON.stringify(response)));
            const _index = value.value.findIndex(x => x.id === uid);
            if (_index > -1) {
              const newFile = response as AFileEntity;
              newFile.status = 'success';
              value.value.splice(_index, 1, newFile);
              // value.value.push(newFile);
            }
            const _antfile = widgetState.fileList.find(x => x.uid === uid);
            console.log("上传后找到的ant file", uid, _antfile);
            if (_antfile) {
              _antfile.status = 'success';
              _antfile.url = response.url;
              _antfile.uid = response.id;
              if (response.type === 'image') {
                //如果为图片类型则设置缩略图
                _antfile.thumbUrl = response.thumbUrl;
              }
            }
          })
          .catch((err) => {
            const _antfile = widgetState.fileList.find(x => x.uid === uid);
            if (_antfile) {
              _antfile.status = 'error';
            }
            console.log("文件上传报错", err);
            ElMessage.error("文件上传失败");
          });

      }
    }

    /** 文件点击 */
    function fileClicked(file: any) {
      if (file.type.toLocaleLowerCase().indexOf('image') > -1 && file.url) {
        widgetState.urls = [process.env.VUE_APP_API_PATH + file.url];
        widgetState.imgViewrVisible = true;
      } else {
        ElMessage.info(`开始后台下载文件: ${file.name},请勿刷新页面.`);
        downloadFile("/media/" + file.id, file.name).catch(e => {
          console.error("文件下载失败", e);
          ElMessage.error("下载失败");
        });
      }
    }

    function dialogBeforeClose(done: any) {
      console.log("done", done);

    }

    function beforeUpload(file: any) {
      const sizeVerification = file.size < (1024 * 1024 * 5);
      if (!sizeVerification) {
        ElMessage.error("文件大小不能超过5MB");
      }
      return sizeVerification;
    }


    return {
      value, zhCN,
      ...toRefs(widgetState), fileUploadPath, dragText, heads,
      fileUpdateChanged, isImage, beforeUpload,
      fileUpdateRef, dialogOpened, dialogClosed, dialogBeforeClose,
      handlePreview, fileRemoved, fileClicked,
      getBoxStyle, onFileErrored, onFileProgress, onFileSuccessed,
      isPopup, getValue, isCancelBeforeStart, beforeImageUpload, onPasted
    };
  }
});
</script>
<style lang="less" scoped>
.file-box {
  width: 100%;
  height: 40px;
  border-radius: 0px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  pointer-events: visiblePainted;

  .file-items-box {
    display: flex;
    align-items: center;
    align-content: flex-start;
    // flex-direction: row;
    overflow: hidden;
    width: 100%;
    padding: 0px 2px;
    // background-color: rgb(247, 193, 193);

    .file-mini-box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30px;
      width: 30px;
      min-width: 30px;
      min-height: 30px;
      margin: 2px;
      border-radius: 4px;
      // background-color: #f5f7fa;
      background-color: #ecedee !important;

    }

    .file-mini-box:hover {
      cursor: pointer;
    }

    .file-mini-img-box:hover {
      cursor: pointer;
    }

    .file-mini-img-box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30px;
      width: 30px;
      min-width: 30px;
      min-height: 30px;
      margin: 2px;
      border-radius: 4px;
    }
  }

  .file-image-box {
    display: flex;

    .a-file-box {
      display: flex;
      // flex-direction: column;
      height: 100%;
      width: 100%;
      border: 1px solid #e9e9f5;
    }

    .a-file-uploading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    }

    .a-file-error {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #f56c6c;
      height: 100%;
      width: 100%;
    }

    .a-file-default {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }

    .a-file-btns {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      top: -100%;
      left: 0px;
      height: 100%;
      color: #fff;
      background-color: #1e1e1e81;

      .icon-box {
        margin: 0px 6px;
      }

      .icon-box:hover {
        cursor: pointer;
      }
    }
  }

  //文件上传容器样式
  .drag-upload-box {
    display: flex;
    justify-content: center;


    .el-icon--upload {
      margin: 10px 0px;
    }

    :deep(.el-upload) {
      width: 100%;
    }

    :deep(.el-upload-dragger) {
      width: 100%;
    }
  }

  .head-box {
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #e4e7ed;

    .head-box-title {
      height: 30px;
      line-height: 30px;
      margin: 0px 10px;
      font-size: 16px;
    }

    .head-box-close {
      height: 30px;
      width: 30px;
    }

    .head-box-close:hover {
      cursor: pointer;
    }
  }

  .body-box {
    // height: 400px;
    max-height: 700px;
    padding: 8px 10px;

    &>* {
      box-sizing: border-box;
    }

    :deep(.ant-upload-list-item) {
      box-sizing: border-box;
    }


    .file-image-box {
      flex: 1;
      border: 1px solid #e9e9f5;
      padding: 8px;
      min-height: 300px;
    }
  }


  :deep(.el-dialog__header, .el-dialog__body) {
    padding: 0px;
  }

  :deep(.el-dialog__body) {
    padding: 0px;
  }
}
</style>