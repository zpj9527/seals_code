<template>
  <div class="login">
    <!--<p class="login_title">-->
      <!--红盒子-->
    <!--</p>-->
    <ul class="items"  >
      <li v-for="(item,index) in itemsData" :key="index"  v-on:mouseover="changeActive(index)" v-on:mouseout="removeActive(index)" @click="navigate(item.desc,item.router)">
        <img :src="item.url" :alt="item.desc">
        <p>{{ item.desc }}</p>
      </li>

    </ul>
  </div>
</template>

<script>
  export default{
    name: "login",
    data(){
      return {
        itemsData:[
          {
            url: require('../assets/images/login/ERPicon_none.png'),
            default_url: require('../assets/images/login/ERPicon_none.png'),
            selected_url: require('../assets/images/login/ERPicon.png'),
            desc:'ERP',
            router: '/initial-login',
          },
          {
            url: require('../assets/images/login/middleground_none.png'),
            default_url: require('../assets/images/login/middleground_none.png'),
            selected_url: require('../assets/images/login/middleground.png'),
            desc:'中台',
            router: '/initial-login',
          },
          {
            url: require('../assets/images/login/several_machines_none.png'),
            default_url: require('../assets/images/login/several_machines_none.png'),
            selected_url: require('../assets/images/login/several_machines.png'),
            desc:'运台',
            router: '/initial-login',
          },
          {
            url: require('../assets/images/login/holder_none.png'),
            default_url: require('../assets/images/login/holder_none.png'),
            selected_url: require('../assets/images/login/holder.png'),
            desc:'数台',
            router: '/initial-login',
          },
          {
            url: require('../assets/images/login/calculate_none.png'),
            default_url: require('../assets/images/login/calculate_none.png'),
            selected_url: require('../assets/images/login/calculate.png'),
            desc:'算台',
            router: '/initial-login',
          },
          {
            url: require('../assets/images/login/internally_piloting_none.png'),
            default_url: require('../assets/images/login/internally_piloting_none.png'),
            selected_url: require('../assets/images/login/internally_piloting.png'),
            desc:'控台',
            router: '/initial-login',
          },
        ]
      }
    },
    created(){

    },
    methods: {
      navigate(desc,router){
        this.$router.push({ path: router})
        console.log(desc);
        sessionStorage.setItem('desc',desc);//index
      },
      /*
        鼠标悬浮函数
       */
      changeActive(index){
        this.itemsData[index].url = this.itemsData[index].selected_url;
      },
      removeActive(index){
        this.itemsData[index].url = this.itemsData[index].default_url;
      }

    }
  }
</script>

<style lang="less" scoped>
  .return{
    font-size: 22px;
    color: #4488e9;
  }
  .login {
    width: 100%;
    height: 100%;
    margin: auto;
    .login_title {
      text-align: center;
      font-size: 40px;
      color: #4488e9;
      font-weight: 400;
      line-height: 80px;
      position: relative;
      .nav_return{
        position: absolute;
        left: 30px;
        top: 0;
        .logo{
          width: 40px;
          height: 44px;
          vertical-align: middle;
        }

      }

    }
    .items{
      background: url(../assets/images/login/initial.png) no-repeat center;
      width: 100%;
      min-width: 1366px;
      min-height: 768px;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    .items li{
      width: 250px;
      margin: 10% 28px;
      cursor: pointer;
      p{
        text-align: center;
        color: #ffffff;
        font-size: 40px;
        margin-top: 20px;
      }

    }
    .items li:hover p{
      color: #4488E9;
    }


  }
</style>
