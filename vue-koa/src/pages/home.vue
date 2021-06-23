<template>
  <div class="home-page">
    <van-nav-bar
      title="首页"
      
      fixed
      @click-right="toLogin"
    >
    <template #right>
      <span class="btn-login" v-if="!userName">登录</span>
      <span class="nickname" v-else>{{userName}}</span>
    </template>
    </van-nav-bar>
      <!-- <van-grid :column-num="2">
        <van-grid-item v-for="(item,index) in list" :key="index" :text="item.categoryName" icon="todo-list-o" />
      </van-grid> -->
    <ul class="list">
      <li v-for="(item,index) in list" :key="index"  @click="toDetail(item)">
        <img class="cover" v-if="index==0" alt="" src="https://www.xbiquge.la/files/article/image/0/10/10s.jpg">
        <img class="cover" v-if="index==2" alt="" src="https://www.xbiquge.la/files/article/image/56/56564/56564s.jpg">
        <img class="cover" v-if="index==1" alt="" src="https://www.xbiquge.la/files/article/image/7/7552/7552s.jpg">
        <img class="cover" v-if="index==4" alt="" src="https://www.xbiquge.la/files/article/image/0/885/885s.jpg">
        <img class="cover" v-if="index==5" alt="" src="https://www.xbiquge.la/files/article/image/48/48246/48246s.jpg">
        <img class="cover" v-if="index==3" alt="" src="https://www.xbiquge.la/files/article/image/45/45701/45701s.jpg">
        <span class="name">{{item.categoryName}}</span>
      </li>
    </ul>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>
<script>
import {getNovelCategory} from '@/common/api.js';
import {mapState} from 'vuex';
export default {
  data(){
    return{
      list:[],
      loading:false,
      actions: [{ name: '退出登录' }],
      show:false,
    }
  },
  computed:{
    ...mapState({
      userName:state=>state.userName,
    })
  },
  created() {
    this.onLoad();
  },
  methods: {
    //获取分类
    onLoad(){
      this.loading=true;
      getNovelCategory().then(r=>{
        this.loading=false;
        if(r.code==1){
          this.list=r.data;
        }
      }).catch(e=>{
        this.loading=false;
      })
    },
    toLogin(){
      if(this.userName){
        this.show=true;
      }else{
        this.$router.push('/login');
      }
    },
    //去小说分类列表
    toDetail(item){
      this.$router.push({name:'NovelList',params:{categoryId:item.categoryId,categoryName:item.categoryName}})
    },
    onSelect(item){
      this.show=false;
      this.$dialog.confirm({
        message:'是否确认退出登录？',
        title:'提示'
      }).then(r=>{
        if(r=='confirm'){
          this.$store.commit('setUser','');
          this.$toast('已退出！')
        }
      })
    }
  },
}
</script>
<style lang="scss">
.home-page{
  padding-top: 46px;
  .btn-login{
    color: #fff;
  }
  .nickname{
    color: #fff;
  }
  .list{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px 15px;
    li{
      flex: 1;
      width: 50%;
      text-align: center;
      margin-bottom: 20px;
      margin: 0 4px;
    }
    .cover{
      width: 120px;
      height: 180px;
      display: block;
      margin: 0 auto 10px;
    }
  }
}
</style>