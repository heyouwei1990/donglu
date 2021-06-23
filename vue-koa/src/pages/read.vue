<template>
  <div class="read-page">
    <h1 class="title">{{info.name}}</h1>
    <p class="desc" v-html="info.content"></p>
    <div class="btn-group">
      <button class="btn-default" @click="prev">上一章</button>
      <button class="btn-default" @click="back">目录</button>
      <button class="btn-default" @click="next">下一章</button>
    </div>
  </div>
</template>
<script>
import {getNovelChapterDetail} from '@/common/api.js';
export default {
  data(){
    return{
      info:{},
      loading:false,
    }
  },
  created() {
    this.getContent();
  },
  methods: {
    getContent(){
      this.loading=true;
      getNovelChapterDetail({
        novelId:this.$route.query.novelId,
        sortId:this.$route.query.sortId,
        id:this.$route.query.id,
      }).then(r=>{
        if(r.code==1){
          this.loading=false;
          this.info=r.data;
          this.$nextTick(()=>{
            document.documentElement.scrollIntoView();
          })
        }else{
          this.$toast(r.message);
        }
      })
    },
    //上一章
    prev(){
      if(!this.loading && this.info.sortId-1>0){
        this.$router.replace({
          path:'/read',
          query:{
            novelId:this.info.novelId,
            sortId:this.info.sortId-1,
          }
        })
        this.getContent();
      }
    },
    //下一章
    next(){
      if(!this.loading && this.info.sortId){
        this.$router.replace({
          path:'/read',
          query:{
            novelId:this.info.novelId,
            sortId:this.info.sortId+1,
          }
        })
        this.getContent();
      }
    },
    // 返回目录
    back(){
      this.$router.go(-1);
    },
  },
}
</script>
<style lang="scss">
.read-page{
  padding:10px 15px;
  .title{
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #333;
    line-height: 40px;
    margin-bottom: 10px;
  }
  .desc{
    font-size: 16px;
    color: #333;
    line-height: 24px;
    min-height: 80vh;
    >p{
      display: none;
    }
  }
  .btn-group{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn-default{
      width: 100px;
      height: 30px;
      outline: none;
      background-color: #fff;
      border-radius: 2px;
      border: 1px solid #e5e5e5;
      font-size: 14px;
      color: #666;
    }
  }
}
</style>