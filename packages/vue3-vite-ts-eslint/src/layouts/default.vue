  <template>
  <div class="app-wrapper">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="state.collapse ? '228px' : '280px'">
        我是左测内容，侧边栏
        <el-row class="tac">
          <!-- span可以绑定设置这里的栅格系统的内容这里配置一下内容 -->
          <el-col :span="18">
            <h5 class="mb-2">Custom colors</h5>
            <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#fff"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-sub-menu index="1">
                <template #title>
                  <el-icon>
                    <location />
                  </el-icon>
                  <span>
                    <router-link to="mytest">MyTest路由</router-link>
                  </span>
                </template>
                <el-menu-item-group title="Group One">
                  <el-menu-item index="1-1">
                    <router-link to="books">我的books</router-link>
                  </el-menu-item>
                  <el-menu-item index="1-2">item one</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                  <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                  <template #title>item four</template>
                  <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>
              <el-menu-item index="2">
                <span>Navigator Two</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <el-icon>
                  <document />
                </el-icon>
                <span>Navigator Three</span>
              </el-menu-item>
              <el-menu-item index="4">
                <el-icon>
                  <setting />
                </el-icon>
                <span>Navigator Four</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header height="92px">
          <div class="icon_div">
            <el-icon size="25" v-if="collapse">
              <fold />
            </el-icon>
            <el-icon size="25" v-else>
              <expand />
            </el-icon>
          </div>
          <div>
            <app-header />
          </div>
        </el-header>
        <!-- 内容区 -->
        <el-main>
          默认页面布局：{{ useRouter().currentRoute.value }}
          <div :style="`background: ${useRouter().currentRoute.value.meta.bgColor};`">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import { useRouter } from "vue-router";

const state = reactive({
  collapse: false
})
</script>