<template>
 <div class="welcome">
   <img src="../../../assets/images/internal-store-control/welcome.png" alt="">
   <div class="ini"><logon-view></logon-view></div>
 </div>
</template>

<script>
    export default {
        name: "welcome"
    }
</script>

<style   lang="less" scoped>
 .welcome{
   width: 100%;
   height: 90%;
   overflow: hidden;
   img{
     width: 100%;
     height: auto ;

   }
    .ini {
     height: 97%;
     position: absolute;
     right: 0;
     top: 30px;
   }
 }
</style>
