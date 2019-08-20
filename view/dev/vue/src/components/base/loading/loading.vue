<template>
  <div class="loading_container">
    <div class="loading-mask"></div>
    <div class="loading_content">
      <div class="loading_animate">
        <div class="loading_default"></div>
      </div>
      <div class="loading_text" :style="textStyle" v-if="isShowText">{{text}}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.loading_container {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000000;
  top: 0px;
  left: 0px;
  .loading-mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
  }
  .loading_content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    .loading_animate {
      width: 40px;
      height: 40px;
      margin: 0 auto;
      .loading_default {
        height: 40px;
        width: 40px;
        border: 2px solid #ffffff;
        border-left-color: transparent;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spin 2s infinite;
        -webkit-animation: spin 2s infinite;
      }
    }
    .loading_text {
      font-size: 14px;
      color: #fff;
      margin-top: 20px;
    }
  }
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }

  50% {
    -webkit-transform: rotate(360deg);
  }

  100% {
    -webkit-transform: rotate(0deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
</style>

<script>
export default {
  name: "Loading",
  props: {
    text: {
      type: String,
      default: "正在加载中..."
    },
    isShowText: {
      type: Boolean,
      default: true
    },
    textStyle: {
      type: Object,
      default: function() {
        return {
          fontSize: "14px",
          color: "#fff"
        };
      }
    }
  },
  methods: {
    preventDefault(e) {
      console.log(e);
      e.preventDefault();
      e.stopPropagation();
    }
  },
  mounted() {
    document
      .querySelector("body")
      .addEventListener("scroll", this.preventDefault);
  },
  destroyed() {
    document
      .querySelector("body")
      .removeEventListener("scroll", this.preventDefault);
  }
};
</script>

