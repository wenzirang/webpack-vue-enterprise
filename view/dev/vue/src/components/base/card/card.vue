<template>
  <div
    class="card"
    :style="{ 'width': width, 'border-radius': borderRadius + 'px','background-color': backgroundColor}"
  >
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    width: {
      type: String,
      default: "100%"
    },
    borderRadius: {
      type: Number,
      default: 2
    },
    backgroundColor: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less">
.card {
  float: left;
  box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.14) !important;
  margin-bottom: 20px;
  .card-header {
    width: 100%;
    float: left;
    border-bottom: 1px solid #d8d8d8;
  }

  .card-content {
    width: 100%;
    float: left;
  }
}
</style>

