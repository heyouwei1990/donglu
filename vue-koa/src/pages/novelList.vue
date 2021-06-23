<template>
  <div class="novelList">
    <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" @click-right="$router.push('/search')">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="cell"  v-for="(item,index) in list" :key="index" @click="toDetail(item)">
        <span class="title">{{item.title}}</span>
        <span class="author">{{item.author}}</span>
        <van-icon name="arrow" />
      </div>
    </van-list>
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
      pageSize:10,
      pageNo:1,
      title:'',
    }
  },
  created() {
    console.log(this.$route)
    this.title=this.$route.params.categoryName;
  },
  methods: {
    onLoad(){
      getNovelList({
        pageNo:this.pageNo,
        pageSize:this.pageSize,
        categoryId:this.$route.params.categoryId,
      }).then(r=>{
        this.loading=false;
        if(r.code==1){
          if(this.pageNo==1){
            this.list=r.data;
          }else{
            this.list=this.list.concat(r.data);
          }
          this.pageNo++;
          if(r.data && r.data.length<this.pageSize){
            this.finished=true;
          }
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
.novelList{
  .cell{
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
    font-size: 14px;
    color: #333;
    align-items: center;
    .title{
      width: 100px;
      flex: 1;
    }
    .author{
      color: #999;
    }
    &:active{
      background-color: #f8f8f8;
    }
  }
}
</style>
