<template>
  <div class="search-page">
    <van-nav-bar 
      left-arrow
      right-text="搜索"
      fixed
      @click-left="$router.go(-1)" 
      @click-right="search"
    >
      <template #title>
        <van-search v-model="keyword" shape="round" placeholder="请输入搜索关键词" @search="search" />
      </template>
    </van-nav-bar>
    <div class="cell"  v-for="(item,index) in list" :key="index" @click="toDetail(item)">
      <span class="title">{{item.title}}</span>
    </div>
  </div>
</template>
<script>
import {getNovelList} from '@/common/api.js';
export default {
  data(){
    return{
      list:[],
      loading:false,
      finished:false,
      pageSize:100,
      pageNo:1,
      keyword:'',
    }
  },
  methods: {
    search(){
      this.list=[];
      getNovelList({
        pageNo:this.pageNo,
        pageSize:this.pageSize,
        keyword:this.keyword,
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
        name:'Novel',
        params:{
          id:item.id
        }
      })
    }
  },
}
</script>
<style lang="scss">
.search-page{
  padding-top: 46px;
  .van-search{
    background-color: transparent;
    .van-search__content{
      background-color: #fff;
    }
    .van-icon{
      color: #ccc;
    }
  }
  .van-nav-bar__title{
    margin: 0 44px;
    max-width: 80%;
    width: calc(100% - 100px);
  }
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