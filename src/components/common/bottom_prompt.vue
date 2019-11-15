<template>
  <div class="global">
    {{msg}}
    <span>营业日期：</span>{{data_time}}
  </div>
</template>

<script>
    export default {
        name: "bottom_prompt",
        data(){
          return{
            msg : '您好，欢迎使用mis系统！',
            data_time : '',//营业日期
          }
      },
      created : function () {

      },
      methods(){

      }
    }
</script>

<style scoped lang="less">
  .global{
     height: 30px;
     width: 100%;
     line-height: 30px;
     color: #ffffff;
     background: RGB(#373D41);
     position: fixed;
     bottom: 0px;
     transform: translateX();
     z-index: 999;
  }
</style>
