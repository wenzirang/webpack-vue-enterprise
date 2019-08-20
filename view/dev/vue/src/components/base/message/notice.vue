<template>
  <div class="bl-message-notice" translate="message">
    <div class="bl-message-notice-content">
      <div :class="[`${prefixCls}-custom-content ${prefixCls}-${type}`]">
        <i v-if="type" class="iconfont" v-html="iconType"></i>
        <span v-text="content"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String
    },
    type: {
      type: String
    },
    duration: {
      type: Number
    },
    selfKey: {
      type: String,
      required: true
    },
    onClose: {
      type: Function,
      default() {}
    }
  },
  data() {
    return {
      prefixCls: "bl-message"
    };
  },
  computed: {
    iconType() {
      return {
        info: "&#xE00D;",
        success: "&#xE007;",
        warning: "&#xE00D;",
        error: "&#xE005;",
        loading: "&#xE003;"
      }[this.type];
    }
  },
  mounted() {
    this.clearCloseTimer();
    if (this.duration) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, this.duration * 1000);
    }
  },
  beforeDestory() {
    this.clearCloseTimer();
  },
  methods: {
    clearCloseTimer() {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
    },
    close() {
      this.clearCloseTimer();
      this.onClose();
      this.$emit("close", this.selfKey);
    }
  }
};
</script>

<style lang="less">
@message-prefix-cls: ~"bl-message";

.@{message-prefix-cls} {
  &-notice {
    width: auto;
    vertical-align: middle;
    position: absolute;
    left: 50%;
  }

  &-notice-content {
    position: relative;
    right: 50%;
    padding: 8px 16px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    background: #fff;
    display: block;
  }

  &-success i {
    color: #00a854;
  }

  &-error i {
    color: #f04134;
  }

  &-warning i {
    color: #ffbf00;
  }

  &-info i,
  &-loading i {
    color: #108ee9;
  }

  i {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    float: left;
  }

  span {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    margin: 0px;
    font-size: 14px;
  }
}
</style>
