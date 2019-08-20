<template>
  <div>
    dashboard
    <button @click="loginOut">注销</button>
  </div>
</template>

<script>
import { SETUSERINFO } from "@src/store/mutation-types";
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations([SETUSERINFO]),
    loginOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      this[SETUSERINFO]({ isGet: false });
      this.$router.push("/user/login");
    }
  }
};
</script>