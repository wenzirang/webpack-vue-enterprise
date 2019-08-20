<template>
  <transition name="layer-fade">
    <div class="layer" v-show="showFlag" @click.stop>
      <div class="mask" @click="cancel"></div>
      <div class="layer-wrapper" :style="{'width':layerWidth,'height':layerWrapperHeight}">
        <i class="iconfont" @click="hide">&#xE005;</i>
        <div class="layer-content" :style="{'width':layerWidth,'height':layerHeight}">
          <slot name="html"></slot>
        </div>
        <div class="operate" :style="{'text-align':btnPosition}">
          <div
            class="left_btn"
            @click="cancel"
            :class="cancelBtnShow ? 'operate-btn ' : 'operate-btn  hidden'"
            :style="btnPosition == 'left' ? 'margin:0 50px ' : 'margin-right:50px;'"
          >{{cancelBtnText}}</div>
          <div
            @click="confirm"
            :style="btnPosition == 'right' ? 'margin:0 50px 0 0' : ''"
            :class="[layerBtnShow ? 'operate-btn' : 'operate-btn hidden', {layerBtnWidth:isWidthShow}]"
          >{{layerBtnText}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "layer",
  props: {
    identification: {
      type: String
    },
    btnPosition: {
      type: String,
      default: "center"
    },
    layerBtnText: {
      type: String,
      default: "确定"
    },
    cancelBtnText: {
      type: String,
      default: "取消"
    },
    layerBtnShow: {
      type: Boolean,
      default: true
    },
    isWidthShow: {
      type: Boolean,
      default: false
    },
    cancelBtnShow: {
      type: Boolean,
      default: true
    },
    layerWidth: {
      type: String,
      default:"433px"
    },
    layerHeight: {
      type: String,
      default: "312px"
    },
    layerWrapperHeight: {
      type: String,
      default: "auto"
    },
    autoClose: {
      type: Number,
      default: 0
    },
    layerClose: {
      type: Boolean,
      default: true
    },
    btnStyle: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    init() {
      var that = this;
      if (this.autoClose) {
        setTimeout(that.hide, that.autoClose);
      }
    },
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    cancel() {
      this.hide();
      this.$emit("cancel", this.identification);
    },
    confirm() {
      this.hide();
      this.$emit("confirm", this.identification);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/styles/PublicDefind.less";
.layer {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 998;

  &.layer-fade-enter-active {
    animation: layer-fadein 0.3s;
  }
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
    position: relative;
    z-index: 1;
  }
  .layer-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    background: #fff;
    .box-sizing();
    .border-radius(4px);
    .iconfont {
      position: absolute;
      top: 5px;
      right: 10px;
      z-index: 99;
      cursor: pointer;
    }
    .layer-content {
      width: 433px;
      height: 192px;
      .box-sizing();
    }
    .operate {
      padding-bottom: 25px;
      text-align: center;
      font-size: 14px;
      font-size: 0px;
      .operate-btn {
        cursor: pointer;
        display: inline-block;
        padding: 7px 30px;
        .border-radius(20px);
        font-size: 14px;
        line-height: 22px;
        color: #00abe1;
        background-color: #fff;
        .border(all, #00abe1, 1px, solid);
        &.left_btn {
          margin-right: 50px;
        }
        &:hover {
          color: #fff;
          background-color: #00abe1;
        }
        &.hidden {
          display: none;
        }
      }
      .layerBtnWidth{
        padding: 7px 135px!important;
        color: #fff!important;
        background-color: #00abe1!important;
      }
    }
  }
}

@keyframes layer-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes layer-zoom {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>