<template>
    <div class="container">
        <form>
            <label v-for="(item, index) in controls" @click="activeFun(item, index)">
                <input type="radio" name="radio" :checked="index === activeVar" />
                <span>{{ item.name }}</span>
            </label>
        </form>
        <!-- 楼层返回 -->
        <!-- <div class="back animated fadeIn" @click="backFloorBase" v-if="isShowFloorBack">
            <img src="./../assets/image/back.png" alt="" />
            <p>返回</p>
        </div> -->
        <!-- 楼层UI -->
        <layer v-if="isShowFloorBack" :layers="layerData" :active="currentLayer" @change="changeLayer"
            :styles="{ top: '55%', left: '72%', height: '400px' }"></layer>
        <!-- 提示框 -->
        <tooltip v-if="roomTooltipStyle.show" :style="{ left: roomTooltipStyle.x + 'px', top: roomTooltipStyle.y + 'px' }"
            :data="roomTooltipStyle"></tooltip>
    </div>
</template>

<script>
import { loaderFloorManage, setModelLayer } from '@/three/floorManage'
import { setModelDefaultMaterial, destroyControlsGroup } from '@/three/loaderModel'
import { loaderParkElectricity, destroyParkElectricity } from '@/three/parkElectricity'
import { loaderParkWater, destroyParkWater, createParkWater } from '@/three/parkWater'
import { parkData, cameraUrls } from '@/assets/mock/mock'
import layer from '@/components/layer'
import tooltip from '@/components/tooltip'
import EventBus from "@/bus";
export default {
    components: { layer, tooltip },
    data() {
        return {
            roomTooltipStyle: {
                show: false,
                x: 0,
                y: 0,
                name: ''
            },
            controls: [
                {
                    name: '首页',
                    goFunction: () => {
                        loaderParkWater(window.app)
                        this.$EventBus.$emit('roomUI', {
                                type:'all'
                            })
                    },
                    backFunction: () => { }
                },
                {
                    name: '气罐压力监测',
                    goFunction: () => {
                        window.app.flyTo({
                            position: [31.10, 13.77, -16.62],
                            controls: [-3.62, 2.18, -11.89]
                        })
                        window.app.model.traverse((obj) => {
                            if (obj.name === "Scene") {
                                console.log(obj);
                                EventBus.$emit("changeFloorUI", {
                                    isShowFloorBack: true,
                                    model: obj
                                },
                                    'room'
                                );
                            }
                        })

                    },
                    backFunction: () => {
                        this.isShowFloorBack = false
                        this.currentLayer = '全楼'
                        this.backFloorBase()
                    }
                }
            ],
            activeVar: 0,
            isShowFloorBack: false,
            currentLayer: '全楼',
            // 楼层层数
            layerData: [],
            // 楼层模型
            curFloorModel: null,
            roomName:null
        }
    },
    mounted() {

        this.$EventBus.$on('changeFloorUI', (obj, name = 'F') => {
            this.isShowFloorBack = obj.isShowFloorBack
            this.curFloorModel = obj.model

            const layerNames = obj.model.children.filter(item => item.name.indexOf(name) > -1).map(item => item.name)
            this.layerData = [this.currentLayer].concat(layerNames)
        })
        this.$EventBus.$on('changeRoomTooltip', (obj) => {

            if (obj.name.indexOf('摄像头') > -1) {
                this.roomTooltipStyle = Object.assign({
                    楼栋: this.curFloorModel.name,
                    楼层: this.currentLayer,
                    摄像头: obj.name,
                    视频: cameraUrls[obj.name.substr(0, 4)]
                }, obj)
            } else {
                this.roomTooltipStyle = Object.assign({
                    设备号: obj.name,
                    度数: parkData[this.curFloorModel.name][this.currentLayer][roomName][obj.type]
                }, obj)
            }
        })

        this.$EventBus.$on('changeTooltip', (obj,isNew) => {
            if(!isNew){
                this.roomTooltipStyle = obj;
            }else{
                this.roomName = obj['房间号']
                setTimeout(()=>{
                    this.roomTooltipStyle = obj;
                },1000)
            }
            
        });
        // 模拟报警
        setTimeout(()=>{
            this.onDeviceChanged()
        },10000)
    },
    methods: {
        activeFun(item, index) {
            this.activeVar = index
        },
        backFloorBase() {
            // this.isShowFloorBack = false
            // this.roomTooltipStyle.show = false
            this.currentLayer = '全楼'
            // this.$EventBus.$emit('roomUI', {
            //     name: ''
            // })
            window.app.flyTo({

                position: [31.10, 13.77, -16.62],
                controls: [-3.62, 2.18, -11.89],

            })

        },
        // 点击具体房间跳转
        changeLayer(layer) {
            this.currentLayer = layer
            // setModelLayer(window.app, this.curFloorModel, layer, this.layerData)

            if (this.currentLayer === '全楼') {
                this.$EventBus.$emit('roomUI', {
                    isShow: false,
                    name: ''
                })
                window.app.flyTo(
                    {
                        position: [31.10, 13.77, -16.62],
                        controls: [-3.62, 2.18, -11.89]
                    }
                )
            }
            if (this.currentLayer === 'room1') {
                window.app.flyTo(
                    {
                        position: [14.66, 6.93, -8.00],
                        controls: [15.28, 4.97, -6.04],
                        done: () => {
                            this.$EventBus.$emit('roomUI', {
                                type:'room1'
                            })
                        }
                    }
                )
            }
            if (this.currentLayer === 'room2') {
                window.app.flyTo(
                    {
                        position: [5.99, 6.57, -24.19],
                        controls: [2.17, 1.73, -19.22],
                        done: () => {
                            this.$EventBus.$emit('roomUI', {
                                type:'room2'
                            })
                        }
                    }
                )
            }
        },
        // 控制roomTooltipStyle隐藏事件
        roomTooltipStyleShowEvent(e) {
            if(e.target.tagName.toLowerCase() !== 'button'){
                this.roomTooltipStyle.show = false
            window.removeEventListener('mousedown', this.roomTooltipStyleShowEvent)
            }
        },

        // 设备报警通知three设备发生变化
        onDeviceChanged(){
            console.log(1);
            // 模拟websock接收到的参数
            createParkWater(window.app,'汽钢瓶1-1007',true,470)
        }

    },
    watch: {
        activeVar(newVal, oldVal) {
            const oldControl = this.controls.filter((item) => item.name === this.controls[oldVal].name);
            oldControl[0].backFunction();
            const newControl = this.controls.filter((item) => item.name === this.controls[newVal].name);
            newControl[0].goFunction();
        },
        //使标签在显示后再点击鼠标隐藏标签
        roomTooltipStyle() {
            if (this.roomTooltipStyle.show) {
                setTimeout(() => { window.addEventListener('mousedown', this.roomTooltipStyleShowEvent) }, 50)
            }
        },
        roomName(newVal){
            console.log(newVal);
            if(newVal==='room1'){
                this.changeLayer('room1')
            }
        }
        
    }
}
</script>
<style lang="less" scoped>
.back {
    width: 48px;
    position: fixed;
    bottom: 15%;
    left: 25%;
    z-index: 3;
    cursor: pointer;
    font-size: 18px;

    img {
        width: 100%;
    }

    p {
        color: #fff;
        text-align: center;
    }
}

.container form {
    display: flex;
    flex-wrap: wrap;
}

.container label {
    display: flex;
    cursor: pointer;
    font-weight: 500;
    position: relative;
    overflow: hidden;
    margin-bottom: 0.375em;
}

.container label input {
    position: absolute;
    left: -9999px;
}

.container label input:checked+span {
    background-color: #414181;
    color: white;
}

.container label input:checked+span:before {
    box-shadow: inset 0 0 0 0.4375em #00005c;
}

.container label span {
    display: flex;
    align-items: center;
    padding: 0.375em 0.75em 0.375em 0.375em;
    border-radius: 99em;
    transition: 0.25s ease;
    color: #414181;
}

.container label span:hover {
    background-color: #d6d6e5;
}

.container label span:before {
    display: flex;
    flex-shrink: 0;
    content: '';
    background-color: #fff;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    margin-right: 0.375em;
    transition: 0.25s ease;
    box-shadow: inset 0 0 0 0.125em #00005c;
}
</style>