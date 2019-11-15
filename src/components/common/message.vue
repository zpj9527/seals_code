<template>
    <div class="message" style="color: #eeeeee;font-size: 14px" >
      <span>{{access_user}}</span>
      <div style="display: inline-block;margin-left: 10px">
        <span >欢迎光临</span><span>{{hotel}}</span>
      </div>

    </div>
</template>

<script>
    export default {
        name: "message",
      data(){
          return{
            url:this.api.api_9022_9519,
            access_user:'',
            hotel:'',
          }
      },
      created(){
          let that =this;
          that.gain();
      },
      methods:{
          /**获取员工*/
          gain(){
           let that =this;
           let userInfo ;
            userInfo =JSON.parse( localStorage.getItem('userInfo'));
            console.log(userInfo);
            that.access_user = userInfo.real_name;
            console.log(userInfo.hotel_id);
            that.hotel_type(userInfo.hotel_id);
          },
        hotel_type(val){
          let that = this;
          that.$axios({
            url: that.url + "/v1/common/hotel/get_info/" +val,
            "method": "get",
          })
            .then(res => {
              if (res.data.message === "success") {
                 that.hotel = res.data.data.full_name;
              }
              else {
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
      },
    }
</script>

<style scoped>

</style>
