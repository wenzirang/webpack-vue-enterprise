<template>
  <div
    class="bl-popover-wrapper"
    style="display:inline-block"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
    v-clickoutside="handleClose"
  >
    <div
      @click="handleClick"
      style="display:inline-block"
      ref="reference"
      @mousedown="handleFocus(false)"
      @mouseup="handleBlur(false)"
    >
      <slot></slot>
    </div>
    <transition name="fade">
      <div
        ref="popper"
        :class="`bl-popover bl-popover-placement-${placement}`"
        v-show="visible"
        :style="overlayStyle"
      >
        <div class="bl-popover-content">
          <div class="bl-popover-arrow"></div>
          <div class="bl-popover-inner">
            <div>
              <div class="bl-popover-title" v-if="this.$slots.title || title">
                <slot name="title">{{title}}</slot>
              </div>
              <div class="bl-popover-inner-content">
                <slot name="content"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Popper from "./popover.mixin";
import clickoutside from "./popover.directive.clickoutside";
const placements = [
  "top",
  "topLeft",
  "topRight",
  "bottom",
  "bottomLeft",
  "bottomRight",
  "left",
  "leftTop",
  "leftBottom",
  "right",
  "rightTop",
  "rightBottom"
];
export default {
  name: "Popover",
  mixins: [Popper],
  directives: { clickoutside },
  data: () => ({
    prefixCls: "ant-popover",
    isInput: false,
    visible: false
  }),
  props: {
    title: String,
    overlayStyle: [Object, String],
    placement: {
      validator(value) {
        return placements.includes(value);
      },
      default: "top"
    },
    trigger: {
      default: "hover",
      validator(value) {
        return ["click", "focus", "hover"].includes(value);
      }
    },
    controlled: {
      type: Boolean,
      default: false
    },
    initVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible(val) {
      this.$emit("input", val);
      this.$emit("change", val);
    },
    initVisible(val) {
      this.visible = val;
    }
  },
  methods: {
    handleClick() {
      if (this.trigger !== "click" || (this.controlled && this.visible)) {
        return false;
      }
      this.visible = !this.visible;
    },
    handleClose() {
      if (this.trigger !== "click" || this.controlled) {
        return false;
      }
      this.visible = false;
    },
    handleMouseenter() {
      if (this.trigger !== "hover") {
        return false;
      }
      this.visible = true;
    },
    handleMouseleave() {
      if (this.trigger !== "hover" || this.controlled) {
        return false;
      }
      this.visible = false;
    },
    handleFocus(fromInput = true) {
      if (this.trigger !== "focus" || (this.isInput && !fromInput)) {
        return false;
      }
      this.visible = true;
    },
    handleBlur(fromInput = true) {
      if (
        this.trigger !== "focus" ||
        (this.isInput && !fromInput) ||
        this.controlled
      ) {
        return false;
      }
      this.visible = false;
    },
    getInputChildren() {
      const $input = this.$refs.reference.querySelectorAll("input");
      const $textarea = this.$refs.reference.querySelectorAll("textarea");
      let $children = null;
      if ($input.length) {
        $children = $input[0];
      } else if ($textarea.length) {
        $children = $textarea[0];
      }
      return $children;
    }
  },
  mounted() {
    if (this.trigger === "focus") {
      const $children = this.getInputChildren();
      if ($children) {
        $children.addEventListener("focus", this.handleFocus, false);
        $children.addEventListener("blur", this.handleBlur, false);
        this.isInput = true;
      }
    }
    this.visible = this.initVisible;
  },
  beforeDestroy() {
    const $children = this.getInputChildren();
    if ($children) {
      $children.removeEventListener("focus", this.handleFocus, false);
      $children.removeEventListener("blur", this.handleBlur, false);
    }
  }
};
</script>
<style lang="less" scoped>
@popover-prefix-cls: ~"bl-popover";

.@{popover-prefix-cls} {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1030;
  cursor: auto;
  user-select: text;
  white-space: normal;
  font-size: 12px;
  line-height: 1.5;
  font-weight: normal;
  text-align: left;

  &:after {
    content: "";
    position: absolute;
    background: rgba(255, 255, 255, 0.01);
  }

  &-hidden {
    display: none;
  }

  // Offset the popover to account for the popover arrow
  &-placement-top,
  &-placement-topLeft,
  &-placement-topRight {
    padding-bottom: 8px;
  }

  &-placement-right,
  &-placement-rightTop,
  &-placement-rightBottom {
    padding-left: 8px;
  }

  &-placement-bottom,
  &-placement-bottomLeft,
  &-placement-bottomRight {
    padding-top: 8px;
  }

  &-placement-left,
  &-placement-leftTop,
  &-placement-leftBottom {
    padding-right: 8px;
  }

  &-inner {
    background-color: #ffffff;
    background-clip: padding-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  }

  &-title {
    min-width: 177px;
    margin: 0; // reset heading margin
    padding: 0 16px;
    line-height: 32px;
    height: 32px;
    border-bottom: 1px solid #e9e9e9;
    color: fade(#000, 65%);
    font-weight: 500;
  }

  &-inner-content {    
    color: fade(#000, 65%);
  }

  &-message {
    padding: 8px 0 16px;
    font-size: 12px;
    color: fade(#000, 65%);
    > .anticon {
      color: #ffbf00;
      line-height: 17px;
      position: absolute;
    }
    &-title {
      padding-left: 20px;
    }
  }

  &-buttons {
    text-align: right;
    margin-bottom: 8px;
    button {
      margin-left: 8px;
    }
  }

  // Arrows
  // .popover-arrow is outer, .popover-arrow:after is inner

  &-arrow {
    &,
    &:after {
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
    }
  }

  &-arrow {
    border-width: 5px;
  }

  &-arrow:after {
    border-width: 4px;
    content: "";
  }

  &-placement-top > &-content > &-arrow,
  &-placement-topLeft > &-content > &-arrow,
  &-placement-topRight > &-content > &-arrow {
    border-bottom-width: 0;
    border-top-color: fadeout(#d9d9d9, 30%);
    bottom: 3px;
    &:after {
      content: " ";
      bottom: 1px;
      margin-left: -4px;
      border-bottom-width: 0;
      border-top-color: #ffffff;
    }
  }
  &-placement-top > &-content > &-arrow {
    left: 50%;
    margin-left: -5px;
  }
  &-placement-topLeft > &-content > &-arrow {
    left: 16px;
  }
  &-placement-topRight > &-content > &-arrow {
    right: 16px;
  }

  &-placement-right > &-content > &-arrow,
  &-placement-rightTop > &-content > &-arrow,
  &-placement-rightBottom > &-content > &-arrow {
    left: 3px;
    border-left-width: 0;
    border-right-color: fadeout(#d9d9d9, 30%);
    &:after {
      content: " ";
      left: 1px;
      bottom: -4px;
      border-left-width: 0;
      border-right-color: #ffffff;
    }
  }
  &-placement-right > &-content > &-arrow {
    top: 50%;
    margin-top: -5px;
  }
  &-placement-rightTop > &-content > &-arrow {
    top: 12px;
  }
  &-placement-rightBottom > &-content > &-arrow {
    bottom: 12px;
  }

  &-placement-bottom > &-content > &-arrow,
  &-placement-bottomLeft > &-content > &-arrow,
  &-placement-bottomRight > &-content > &-arrow {
    border-top-width: 0;
    border-bottom-color: fadeout(#d9d9d9, 30%);
    top: 3px;
    &:after {
      content: " ";
      top: 1px;
      margin-left: -4;
      border-top-width: 0;
      border-bottom-color: #ffffff;
    }
  }
  &-placement-bottom > &-content > &-arrow {
    left: 50%;
    margin-left: -5px;
  }
  &-placement-bottomLeft > &-content > &-arrow {
    left: 16px;
  }
  &-placement-bottomRight > &-content > &-arrow {
    right: 16px;
  }

  &-placement-left > &-content > &-arrow,
  &-placement-leftTop > &-content > &-arrow,
  &-placement-leftBottom > &-content > &-arrow {
    right: 3px;
    border-right-width: 0;
    border-left-color: fadeout(#d9d9d9, 30%);
    &:after {
      content: " ";
      right: 1px;
      border-right-width: 0;
      border-left-color: #ffffff;
      bottom: -4px;
    }
  }
  &-placement-left > &-content > &-arrow {
    top: 50%;
    margin-top: -5px;
  }
  &-placement-leftTop > &-content > &-arrow {
    top: 12px;
  }
  &-placement-leftBottom > &-content > &-arrow {
    bottom: 12px;
  }
}
</style>
