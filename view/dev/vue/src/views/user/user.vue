<template>
  <div class="user-container">
    <div class="header-container">
      <div class="content">
        <div class="logo-container">
          <div class="logo"></div>
          <span>企业后台架构</span>
        </div>  
      </div>
    </div>
    <div class="main-container">
      <div class="content">
        <div class="container-left"></div>
        <div class="container-right">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.user-container {
  width: 100%;
  .header-container {
    width: 100%;
    height: 90px;
    background-color: #44bcf7;
    .logo-container {
      float: left;
      .logo {
        width: 59px;
        height: 59px;
        opacity: 0.23;
        border-radius: 2px;
        background-color: #eeeeee;
        float: left;
        margin-top: 15px;
      }
      span {
        font-size: 32px;
        color: #ffffff;
        margin: 20px 0 0 15px;
        display: inline-block;
      }
    }
    .title {
      float: right;
      font-size: 20px;
      color: #ffffff;
      margin-top: 30px;
    }
  }
  .main-container {
    width: 100%;
    float: left;
    height: calc(~"100vh - 90px");
    .container-left {
      float: left;
      width: 626px;
      height: 397px;
      background-image: url(../../assets/images/dls-web-edit-style-1-tusoeasy.png);
      background-size: 100% 100%;
      margin-top: 98px;
      margin-left: 40px;
    }
    .container-right {
      float: right;
      width: 390px;
      height: 377px;
      border-radius: 2px;
      box-shadow: 0 1px 14px 0 rgba(0, 0, 0, 0.21);
      background-color: #ffffff;
      margin-top: 126px;
      text-align: center;
      :last-child{
        margin-top:10px;
      }      
    }
  }
  .content {
    width: 65%;
    height: 100%;
    min-width: 1190px;
    margin: 0 auto;
  }
}
</style>
