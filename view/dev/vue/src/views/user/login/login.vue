<template>
  <div class="login-box">
    <button @click='submit'>登录</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  created() {
      //获取传入的参数
    var param = this.$route.query;
    this.params = param;
  },
  watch: {
   
  },
  methods: {
    submit(){
      this.$loading.show();
      localStorage.setItem("token", '123213123213213213213');
      localStorage.setItem("userInfo", JSON.stringify({userName:'欢迎您的到来'}));
      this.$loading.hide();
      if (this.params.redirect) {
        this.$router.push(`${this.params.redirect}`);
      } else {
        this.$router.push(`/main`);
      }      
    }
  }
};
</script> 
