<template>
  <div class="novel-page">
    <van-nav-bar 
      :title="title" 
      left-arrow 
      right-text="目录"
      @click-left="$router.go(-1)" 
      @click-right="goMenu"
    >
    </van-nav-bar>
    <dl class="info-dl">
      <dt>
        <img :src="info.cover" alt="" class="face">
      </dt>
      <dd>
        <h2 class="name">{{title}}</h2>
        <div class="info">作者：{{info.author}}</div>
        <div class="info">最新章节：{{info.lastName}}</div>
        <div class="info">更新时间：{{info.lastTime}}</div>
      </dd>
    </dl>
    <p class="intro">{{info.intro}}</p>
  </div>
</template>
<script>
import {getNovelDetail} from '@/common/api.js';
export default {
  data(){
    return{
      title:'标题',
      info:{},
      id:0,
    }
  },
  created() {
    this.pageInit();
  },
  methods: {
    pageInit(){
      this.info={};
      getNovelDetail({
        id:this.$route.params.id,
      }).then(r=>{
        if(r.code==1){
          this.info=r.data;
          this.title=this.info.title||'标题'
        }
      })
    },
    goMenu(){
      this.$router.push({
        name:'NovelChapter',
        params:{
          id:this.info.id
        }
      })
    }
  },
}
</script>
<style lang="scss">
.novel-page{
  .info-dl{
    display: flex;
    padding: 10px 15px;
    dt{
      width: 120px;
      height: 160px;
      background-color: #f8f8f8;
      margin-right: 10px;
    }
    .face{
      width: 100%;
      height: 100%;
      display: block;
    }
    dd{
      flex: 1;
      width: 100px;
    }
    .name{
      font-size: 16px;
      color: #333;
      line-height: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .info{
      font-size: 14px;
      color: #999;
      line-height: 24px;
      margin-bottom: 6px;
    }
  }
  .intro{
    font-size: 14px;
    color: #666;
    line-height: 24px;
    text-indent: 2em;
    padding: 0 15px;
  }
}
</style>