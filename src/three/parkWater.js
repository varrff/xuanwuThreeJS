import { roomTexts, parkData } from "@/assets/mock/mock";
import {
  floorBaseMaterial,
  floorBaseMaterial2,
  floorBaseMaterial3,
} from "@/three/material";
import { Notification } from "element-ui";
import EventBus from "@/bus";
import { setModelDefaultMaterial } from "@/three/loaderModel";
import * as THREE from "three";
/*
监测
*/
export function loaderParkWater() {
  app.flyTo({
    position: [6.4, 31.19, 52.18],
    controls: [-6.64, 12.05, -12.11],
    done: () => {},
  });
}
export function createParkWater(app, qipingName, isNew, newValue) {
  if (!isNew) {
    let notifIndex = 0;
    app.model.traverse((obj) => {
      // if (obj.isMesh) {
      if (obj.name.indexOf("大楼") > -1) {
        obj.material = floorBaseMaterial2;
      }
      // if (obj.name.indexOf("room") > -1) {
      //   console.log(obj);
      //   obj.traverse(obj=>{
      //     obj.material = floorBaseMaterial2;
      //   })
      // }
      // } else {
      if (obj.name.indexOf("汽钢瓶") > -1) {
        //楼栋
        const value = 450;
        // const value = Math.floor(Math.random() * (481 - 300) + 300);
        obj.userData.value = value;
        //    如果大于设定值：460的处理逻辑
        // console.log(obj.name);
        if (value > 460) {
          const objMaterial = obj.material;
          setInterval(() => {
            if (obj.material == floorBaseMaterial3) {
              obj.material = objMaterial;
            } else {
              obj.material = floorBaseMaterial3;
            }
          }, 1000);
          // })
          // app.selectedObjects.push(obj);
          setTimeout(() => {
            if (notifIndex < 6) {
              Notification({
                title: "警告",
                // message: `${floorName}的${layerName}${roomName}的用电量为${value}度，已超出平均值，请留意`,
                message: `1号楼2层气瓶间23号气瓶，已超出平均值，请留意`,
                type: "warning",
                duration: 6000,
              });
              notifIndex++;
            }
          }, notifIndex * 200);
        }
        app.rayModel.push(obj);
      }
      // }
    });
    app.initRaycaster(
      (activeObj, app, event) => {
        if (activeObj.object) {
          const obj = activeObj.object;
          console.log(obj);
          const value = obj.userData.value;
          EventBus.$emit("changeTooltip", {
            // 楼栋: floorName,
            // 楼层: layerName,
            房间号: obj.parent.name,
            度数: value,
            设备号: obj.name,
            type: "气压启动盘",
            x: event.x,
            y: event.y,
            show: true,
          });
        } else {
          EventBus.$emit("changeTooltip", {
            show: false,
          });
        }
      },
      app.rayModel,
      "click"
    );
  } else {
    app.model.traverse((obj) => {
      if (obj.name === qipingName) {
        console.log(newValue);
        const value = newValue;
        obj.userData.value = value;

        const objMaterial = obj.material;
        setInterval(() => {
          if (obj.material == floorBaseMaterial3) {
            obj.material = objMaterial;
          } else {
            obj.material = floorBaseMaterial3;
          }
        }, 1000);

        // 模型对象
        const mesh = obj;

        // 将模型世界坐标转换为向量
        const worldPosition = new THREE.Vector3();
        mesh.getWorldPosition(worldPosition);

        // 将世界坐标转换为标准化设备坐标
        const standardVector = worldPosition.project(app.camera);

        // 将标准化设备坐标转换为屏幕像素坐标
        // 获取窗口的宽高
const width = window.innerWidth
const height = window.innerHeight
// 坐标转换时使用窗口宽高
const screenPosition = standardVector
  .clone()
  .multiplyScalar(width / 2) 
  .addScalar(width / 2, height / 2)

        // screenPosition就是模型在屏幕上的像素坐标点
        console.log(screenPosition);
        EventBus.$emit("changeTooltip", {
          // 楼栋: floorName,
          // 楼层: layerName,
          房间号: obj.parent.name,
          度数: value,
          设备号: obj.name,
          type: "气压启动盘",
          x: screenPosition.x,
          y: screenPosition.y,
          show: true,
        },
        true
        );
        Notification({
          title: "警告",
          // message: `${floorName}的${layerName}${roomName}的用电量为${value}度，已超出平均值，请留意`,
          message: `${qipingName}报警`,
          type: "warning",
          duration: 6000,
        });
        app.rayModel.push(obj);
      }
      // }
    });
  }
}

// 销毁
export function destroyParkWater(app) {
  app.selectedObjects = [];
  app.outlinePass.selectedObjects = app.selectedObjects;
  EventBus.$emit("changeTooltip", {
    show: false,
  });
  setModelDefaultMaterial(app);
  app.destroyRaycaster("click");
}

// 批量添加模型
// export function addParkWater(app, arr) {
//   console.log(app.model);
//   try {
//     let foundModel = false; // 标志是否找到模型
//     app.model.traverse(obj => {
//       if (foundModel) {
//         return; // 如果已经找到模型，则退出遍历
//       }
//       if (obj.isMesh && obj.name.indexOf("水管") > -1) {
//         arr.forEach(e => {
//           const clonedModel = obj.clone(); // 克隆模型
//           clonedModel.name = e.name;
//           console.log(clonedModel);
//           clonedModel.position.set(e.x, e.y, e.z);
//           clonedModel.scale.set(1, 1, 1)
//           app.model.add(clonedModel); // 将克隆后的模型添加到场景中
//         });
//         foundModel = true; // 标记已找到模型
//       }
//     });
//   } catch (e) {
//     console.log(e);
//     return;
//   }
// }
