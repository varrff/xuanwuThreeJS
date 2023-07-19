import * as THREE from 'three'
import { secondaryTexture, trunkTexture, primaryTexture, pointTexture } from './texture';

// 管理材质的文件
// 选中某个模块时其他模块透明的材质
export const floorBaseMaterial = new THREE.MeshBasicMaterial({
    color:0x00beff,
    transparent:true,
    opacity:.1,
    depthWrite:false
})
// 电力监测和水力监测的材质
export const floorBaseMaterial2 = new THREE.MeshBasicMaterial({
    color:0x00beff,
    transparent:true,
    opacity:.2,
    //开启线框
    wireframe:true
})
//气瓶
export const floorBaseMaterial3 = new THREE.MeshBasicMaterial({
  color:'#ff6600',
  transparent:true,
  opacity:1,
  //开启线框
  // wireframe:true
})
// 黑色材质
export const darkMaterial =new THREE.MeshBasicMaterial({
    color:'#000'
})

// 地图线材质
export const secondaryMaterial = new THREE.MeshBasicMaterial({
    map: secondaryTexture,
    transparent: true,
    side: THREE.DoubleSide,
    opacity: 1
  });
  export const trunkMaterial = new THREE.MeshBasicMaterial({
    map: trunkTexture,
    transparent: true,
    side: THREE.DoubleSide,
    opacity: 1
  });
  export const primaryMaterial = new THREE.MeshBasicMaterial({
    map: primaryTexture,
    transparent: true,
    side: THREE.DoubleSide,
    opacity: 1
  });
  
  // 点材质
  export const pointMaterial = new THREE.PointsMaterial({
    size: 2,
    map: pointTexture,
    fog: true,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true, // 透明
    opacity: 1 // 透明度
  });
  