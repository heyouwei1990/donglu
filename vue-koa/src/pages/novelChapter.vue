<template>
  <div class="novelChapter">
    <van-nav-bar 
      title="目录" 
      left-arrow 
      fixed
      @click-left="$router.go(-1)" 
    >
    </van-nav-bar>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="cell"  v-for="(item,index) in list" :key="index" @click="toDetail(item)">
        <span class="title">{{item.name}}</span>
        <!-- <van-icon name="arrow" /> -->
      </div>
    </van-list>
  </div>
</template>
<script>
import {getNovelChapter} from '@/common/api.js';
export default {
  data(){
    return{
      list:[],
      loading:false,
      finished:false,
      pageSize:10,
      pageNo:1,
      title:'目录',
    }
  },
  methods: {
    onLoad(){
      getNovelChapter({
        id:this.$route.params.id,
      }).then(r=>{
        this.loading=false;
        if(r.code==1){
          this.list=r.data;
            this.finished=true;
        }else{
          this.$toast(r.message);
        }
      })
    },
    toDetail(item){
      this.$router.push({
        path:'/read',
        query:{
          novelId:item.novelId,
          id:item.id,
        }
      })
    }
  },
}
</script>
<style lang="scss">
.novelChapter{
  padding-top: 46px;
  .cell{
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
    font-size: 14px;
    color: #333;
    align-items: center;
    &:active{
      background-color: #f8f8f8;
    }
  }
}
</style>