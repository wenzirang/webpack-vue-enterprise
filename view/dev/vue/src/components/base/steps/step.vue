<template>
  <div :class="wrapClasses">
    <div class="step_action">
      <div class="step_sign_content">
        <div class="step_sign">
          <div class="sign_content" v-if="icon.length <=0 " :class="signClasses">{{stepNumber}}</div>
          <i class="iconfont" v-if="icon.length >0" v-html="icon" :class="signClasses"></i>
        </div>
      </div>
      <div class="step_description">{{description}}</div>
    </div>
    <div class="connecting_line" :class="lineClasses" :style="{width:lineWidth}" v-if="!stepLast"></div>
  </div>
</template>

<style lang="less" scoped>
@import "../../../assets/styles/PublicDefind.less";

@step-prefix: ~"step_status";
@error-color : #f04134;
@white-color : #ffffff;
@finish-color :#44bcf7;
@wait-bg-color: #f2f2f2;
@wait-font-color: #a8a8a8;

.step_itme {
  float: left;
  .step_action {
    float: left;
    .size_small {
      width: 36px;
      height: 36px;
      line-height: 36px;
    }
    .size_medium {
      width: 56px;
      height: 56px;
      line-height: 56px;
    }
    .size_big {
      width: 80px;
      height: 80px;
      line-height: 80px;
    }
    .step_sign_content {
      width: 100%;
      .flex();
      .flex-justify-content(center);
      .step_sign {
        display: inline-block;
        .sign_content {
          border-radius: 50%;
          text-align: center;
        }
      }
    }

    .step_description {
      display: inherit;
      margin-top: 10px;
    }
  }

  .connecting_line {
    float: left;
    height: 1px;
    margin: 0 10px;
  }
  .connecting_line_small {
    margin-top: 18px;
  }
  .connecting_line_medium {
    margin-top: 28px;
  }
  .connecting_line_big {
    margin-top: 40px;
  }
}
.@{step-prefix}_error {
  .step_sign {
    .sign_content {
      background-color: @error-color;
      color: @white-color;
    }
    i {
      color: @error-color;
    }
  }
  .connecting_line {
    background-color: @error-color;
  }
  .step_description {
    color: @error-color;
  }
}

.@{step-prefix}_finish {
  .step_sign {
    .sign_content {
      background-color: @finish-color;
      color: @white-color;
    }
    i {
      color: @finish-color;
    }
  }
  .connecting_line {
    background-color: @finish-color;
  }
  .step_description {
    color: @finish-color;
  }
}
.@{step-prefix}_wait {
  .step_sign {
    .sign_content {
      background-color: @wait-bg-color;
      color: @wait-font-color;
    }
    i {
      color: @wait-font-color;
    }
  }
  .connecting_line {
    background-color: @wait-bg-color;
  }
  .step_description {
    color: @wait-font-color;
  }
}
</style>


<script>
export default {
  name: "Step",
  props: {
    description: String,
    icon: {
      type: String,
      default: ""
    },
    stepWidth: {
      type: Number,
      default: 120
    }
  },
  data() {
    return {
      signSize: "",
      stepLast: false,
      stepNumber: 1,
      currentStatus: ""
    };
  },
  computed: {
    wrapClasses() {
      return ["step_itme", `step_status_${this.currentStatus}`];
    },
    signClasses() {
      return [`size_${this.signSize}`];
    },
    lineWidth() {
      return `${this.stepWidth}px`;
    },
    lineClasses() {
      return [`connecting_line_${this.signSize}`];
    }
  }
};
</script>
