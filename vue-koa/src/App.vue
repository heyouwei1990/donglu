<template>
  <div id="app" class="root">
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,body{
  max-width: 750px;
  margin: 0 auto;
}
li{
  list-style:none;
}
.root{
  .van-nav-bar{
    background-color: #25c1ff;
  }
  .van-nav-bar--fixed{
    max-width: 750px;
    left: 50%;
    transform: translateX(-50%);
  }
  .van-nav-bar .van-icon{
    color: #fff;
  }
  .van-nav-bar__text,
  .van-nav-bar__title {
    color: #fff;
  }
}
.toast-loading{
  background-color: transparent !important;
  .van-toast__loading{
    color: #25c1ff;
  }
  .van-toast__text{
    color: #25c1ff;
  }
}

</style>
