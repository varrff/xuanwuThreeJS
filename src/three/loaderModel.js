import * as THREE from "three";
import {secondaryMaterial, trunkMaterial ,primaryMaterial} from './material'
import EventBus from '../bus';
import { createParkWater, loaderParkWater } from "./parkWater";
export function loaderModel(app) {
  return new Promise((resolve) => {
    app.controlGroup = new THREE.Group();
    app.scene.add(app.controlGroup);
    // 存储模型的所有材质
    app.modelMaterials = {};
    app.rayModel = []
    let urls = [
      {
        type: "glb",
        //模型地址
        url: "model/model3.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);
          app.model = object.scene;
          //需要接收阴影的小模型
          // const receiveModel = ["路面", "人行道", "道路", "斑马线"];
          const receiveModel = []
          // 使用辉光渲染的模型
          // const bloomModels = ['大楼1','大楼2','墙体']
          const bloomModels=[]
          //遍历模型里的小模型
          app.model.traverse((obj) => {
            // 如果模型的材质存在
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
            }
            // if(obj.name.indexOf('车流线1')>-1){
            //   console.log(obj.name);
            //   obj.material = secondaryMaterial
            // }
            // if(obj.name.indexOf('车流线2')>-1){
            //   obj.material = trunkMaterial
            // }
            EventBus.$emit('changeLoaidng', parseInt(100 / 1));

            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };

            if (receiveModel.includes(obj.name)) {
              obj.receiveShadow = true;
            } else {
              obj.castShadow = true;
              obj.receiveShadow = false;
            }

            for (let i = 0; i <bloomModels.length; i++){
              const value = bloomModels[i]
              if(obj.name.indexOf(value)>-1){
                obj.layers.enable(1)
                break
              }else{
                obj.layers.enable(0)
              }
            }
          });
        },
      },
    ];
    //最后一个参数是加载完模型后的回调
    app.iterateLoad(urls, (xhr)=>{}, () => {
      createParkWater(app);
      setTimeout(()=>{
        loaderParkWater(window.app)
      },500)
    });
    resolve();
  });
}
// 删除标签
export function destroyControlsGroupText(app, className) {
  const textDoms = document.getElementsByClassName(className);
  for (let i = 0; i < textDoms.length; i++) {
    const textDom = textDoms[i];
    textDom.onclick = null;
  }
  app.instance.removeAll(app.controlGroup);
}

// 恢复所有模型的材质
export function setModelDefaultMaterial(app) {
  app.model.traverse((obj) => {
    if (obj && obj.material && app.modelMaterials[obj.name]) {
      obj.material = app.modelMaterials[obj.name].material;
    }
  });
}

// 删除模型
export function destroyControlsGroup(app, className) {
  if (app?.controlGroup?.children?.length === 0) {
    return;
  }
  if (className) {
    destroyControlsGroupText(app, className);
  }
  // three.js对组的遍历最好是倒序，否则有时容易出bug
  for (let i = app.controlGroup.children.length - 1; i > -1; i--) {
    const obj = app.controlGroup.children[i];
    if (obj.isMesh) {
      obj.geometry.dispose();
      obj.material.dispose();
      app.controlGroup.remove(obj);
    }
  }
}
