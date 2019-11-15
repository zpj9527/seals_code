<template>
  <div class="store">
    <div class="head">
      <router-link to="/">
        <span>门店选择</span>
      </router-link>

    </div>
     <ul>
       <li v-for="(item,index) in itemsData" :key="index"   @click="select(item,index)"  v-on:mouseover="movement(item,index)">
         <img :src="item.hotel_phote" :alt="item.desc">
         <p :class="activeClass == index ? 'active':''">{{ item.hotel_full_name }}</p>
       </li>
     </ul>

  </div>
</template>

<script>
    export default {
        name: "store",
      data(){
          return{
            itemsData:[],
            activeClass: -1, // 0为默认选择第一个，-1为不选择
          }
      },
      created(){
         let that =this;
        let obj = JSON.parse(sessionStorage.getItem('obj'));
        that.itemsData = obj.data.data.can_use_hotel
        console.log(that.itemsData);
      },
      methods:{
         /***鼠标移动事件*/
         movement(value,index){
           let that =this;
           that.activeClass = index; // 把当前点击元素的index，赋值给activeClass
         },
          /**选择想要进的酒店
           * */
        select(value,index){
          console.log(value);
          let that =this;
          // that.activeClass = index; // 把当前点击元素的index，赋值给activeClass
          that.$axios({
            url:"http://organ.crowncrystalhotel.com/v1/organization/ht/employee/choice_shop/",
            method:"post",
            data:{
              user_name:sessionStorage.getItem('username'),
              password:sessionStorage.getItem('password'),
              hotel_group_code:value.hotel_group_code,
              hotel_id:value.hotel_id,
              hotel_user_name:value.hotel_user_name,
              top_root_level:value.top_root_level,
            }
          })
            .then(res=>{
              console.log(res);
              if(res.data.message==="success"){
                localStorage.setItem('access-user', JSON.stringify(res.data.real_name));
                sessionStorage.setItem("root_level",res.data.root_level);
                localStorage.setItem('userInfo', JSON.stringify(res.data.user_info));
                sessionStorage.setItem("rules",JSON.stringify(res.data.rules));
                that.$router.push({
                  path: '/index'
                });
              }
            })
            .catch(err=>{
              console.log(err);
            })
        },

      },
    }
</script>

<style scoped lang="less">
  .store{
    width: 100%;
    .head{
      width: 100%;
      height: 100%;
      background: #4488E9;
      span{
        font-size:30px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(254,254,255,1);
        line-height:24px;
        display: inline-block;
        padding: 20px 0 20px 70px;
      }
    }
    ul{
      overflow: hidden;
      margin-top: 40px ;
      li{
        float: left;
        margin-left: 64px;
        border:1px solid rgba(155,193,248,1);
        img{
          width: 240px;
          height: 240px;
        }
        p{
          padding: 10px 0;
          text-align: center;
        }
        .active {
          /* background: #eee; */
          color: #1e82d2;
          font-weight: bolder;
        }
      }

    }
  }
</style>
