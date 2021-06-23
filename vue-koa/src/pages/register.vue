<template>
  <div>
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
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import {register} from '@/common/api.js'
export default {
  data(){
    return{
      userName:'',
      password:'',
    }
  },
  methods: {
    submit(){
      register({
        userName:this.userName,
        password:this.password
      }).then(r=>{
        if(r.code==1){
          this.$toast('注册成功')
          this.$router.go(-1);
        }else{
          this.$toast(r.message);
        }
      })
    }
  },
}
</script>
<style lang="scss">
  
</style>