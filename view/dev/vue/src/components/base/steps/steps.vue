<template>
  <div class="strps_content">
    <slot></slot>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  name: "Steps",
  props: {
    currentStep: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: "medium"
    },
    status: String
  },
  data() {
    return {
      currentStatus: this.status
    };
  },
  mounted() {
    this.handStatus();
  },
  watch: {
    currentStep() {
      this.handStatus();
    }
  },
  methods: {
    handStatus() {
      const LEN = this.$children.length - 1;
      this.$children.forEach((child, index) => {
        child.signSize = this.size;
        child.stepNumber = (index + 1).toString();
        index === LEN ? (child.stepLast = true) : (child.stepLast = false);
        if (this.currentStatus) {
          if (index === this.currentStep) {
            child.currentStatus = this.currentStatus;
          } else if (index < this.currentStep) {
            child.currentStatus = "finish";
          } else {
            child.currentStatus = "wait";
          }
        } else if (index === this.currentStep) {
          child.currentStatus = "wait";
        } else if (index < this.currentStep) {
          child.currentStatus = "finish";
        } else {
          child.currentStatus = "wait";
        }
      });
    }
  }
};
</script>

