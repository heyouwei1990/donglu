<template>
  <div class="login-page"><van-nav-bar
      title="登录"
      right-text="注册"
      @click-right="$router.push('/register')"
    />
    <div class="login-wrapper">
      <van-form @submit="submit">
        <van-field
          v-model="userName"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import {login} from '@/common/api.js'
export default {
  data(){
    return{
      userName:'',
      password:'',
    }
  },
  methods: {
    submit(){
      login({
        userName:this.userName,
        password:this.password
      }).then(r=>{
        if(r.code==1){
          this.$store.commit('setUser',this.userName);
          this.$router.replace('/');
        }
      })
    }
  },
}
</script>
<style lang="scss">
.login-page{
  background-color: #f8f8f8;
  height: 100vh;
  .login-wrapper{
    width: 300px;
    margin: 10vh auto;
    border: 1px solid #e5e5e5;
    background-color: #fff;
    border-radius: 4px;
    padding: 10px 10px;
  }
}
</style>