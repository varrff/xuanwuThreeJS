<template>
  <div class="main">
    <loader :number="loadingNumber" v-if="loadingNumber !== 100"></loader>
    <big-control class="control"></big-control>
    <!-- room信息框 -->
    <!-- <qiguan-echarts v-if="qigangIsShow" class="qiguan-echarts"/> -->
    <room-echarts :data="roomData"></room-echarts>
    <div id="screen" class="screen"></div>
  </div>
</template>

<script>
import ZThree from '@/three/ZThree.js'
import * as THREE from 'three'
import loader from '../components/loader.vue'
import QiguanEcharts from '@/components/QiguanEcharts.vue'
import RoomEcharts from '@/components/RoomEcharts.vue'
import { loaderModel } from '@/three/loaderModel.js'
import bigControl from '@/views/bigControl'
import TWEEN from 'three/examples/jsm/libs/tween.module.js'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { cssRender } from '@/three/cssRender'
import { createReprocessing } from '@/three/reprocessing';
import { darkMaterial } from '@/three/material'
import { addParkWater } from '@/three/parkWater'
import { primaryTexture, secondaryTexture, trunkTexture } from '@/three/texture'
import { createWebSocket } from '@/api/index'
let app, camera, scene, renderer, controls, clock, reprocessing, materials = {}
export default {
  name: 'HomeView',
  components: { bigControl, loader, QiguanEcharts, RoomEcharts },
  data() {
    return {
      loadingNumber: 0,
      roomIsShow: false,
      roomData: null
    }
  },
  methods: {
    async initZThree() {
      app = await new ZThree('screen');
      app.initThree()
      // app.initHelper()
      app.initOrbitControls()
      app.initLight()
      window.app = app

      app.cameraPosition = [68, 27, 47]
      app.controlsTarget = [-9.94, 1.36, 3.18]

      controls = app.controls
      controls.target.set(...app.controlsTarget)
      clock = new THREE.Clock()
      camera = app.camera
      camera.position.set(...app.cameraPosition)
      scene = app.scene
      renderer = app.renderer

      // 开启辉光
      // renderer.outputEncoding = THREE.sRGBEncoding
      // renderer.toneMapping = THREE.ACESFilmicToneMapping
      // 开启场景投影
      // renderer.shadowMap.enabled = true
      // renderer.shadowMap.type = THREE.PCFSoftShadowMap

      let instance = new cssRender(CSS3DRenderer, app)
      app.cssRenderer = instance.cssRenderer
      app.instance = instance

      //开启辉光
      // reprocessing = createReprocessing(app)

      await loaderModel(app)
      app.render(() => {
        const delta = clock.getDelta()
        //车流线动画
        // if(secondaryTexture){
        //   secondaryTexture.offset.x -= 0.005
        // }
        // if(trunkTexture){
        //   trunkTexture.offset.x -= 0.005
        // }
        // if(primaryTexture){
        //   primaryTexture.offset.x -= 0.005
        // }


        controls.update(delta)

        renderer.render(scene, camera)


        // 开启辉光
        // scene.traverse(this.darkenNonBloomed)
        // reprocessing.render()
        // scene.traverse(this.restoreMaterial)
        // app.finalComposer.render()

        app.cssRenderer.render(scene, camera)
        TWEEN.update()
      })
    }
    //开启辉光
    ,
    darkenNonBloomed(obj) {
      if (obj.isMesh && app.bloomLayer.test(obj.layers) === false) {
        materials[obj.uuid] = obj.material;
        obj.material = darkMaterial;
      }
    },
    restoreMaterial(obj) {
      if (materials[obj.uuid]) {
        obj.material = materials[obj.uuid];
        delete materials[obj.uuid];
      }
    },
    // 获取总体数据
    getRoomData() {
      this.roomData = {
        name: '总体状态',
        type: 'overall',
        //模拟放假数据
        运行状态: '正常',
        报警设备: 0
        
      }
    }
  },
  mounted() {
    createWebSocket().then(ws => {
      ws.onmessage = e => {
        console.log(1);
        console.log(e);
      }
    }).catch(err => {
      console.log(err);
    })
    this.$EventBus.$on('roomUI', data => {

      this.roomData = data
      // thisdata.name
    })
    this.$EventBus.$on('changeLoaidng', (val) => {
      this.loadingNumber = val;
    });
    // 模拟首次获取楼层数据
    this.getRoomData()
    this.initZThree();
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
  position: relative;

  .control {
    height: 5%;
    position: absolute;
    bottom: 3%;
    // left: 50%;
    width: 100%;
    // transform: translateX(-50%);
    z-index: 3;
    float: left;
    font-size: 30px;
    display: flex;
    justify-content: center;
  }
}

.screen {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

// .qiguan-echarts{
//   position: fixed;
//   top: 10vh;
//   left: 0;
// }
</style>