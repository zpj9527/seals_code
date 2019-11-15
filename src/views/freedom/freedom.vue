<template>
  <div class="connection">
    <div class="navigation" >
      <el-col class="pull-left" style="background-color: white; width: 280px;">
        <p style="padding: 10px;background: rgb(104, 129, 158);margin-top: 0px;color: white;width: 276px;">自由人</p>
        <ul class="navigation" style="margin-top: 10px;">
          <router-link :to="item.path" v-for="(item,index) in connection_list " :key="index">
            <li :class="activeClass == index ? 'active':''" @click="getItem(index,item)">{{item.descript}}</li>
          </router-link>
        </ul>
      </el-col>
    </div>
    <div class="router"style="border-left:2px solid  #eeeeee ;">
      <div class="ini">
        <money-task></money-task>
      </div>
      <router-view  ></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "connection",
    data(){
      return{
        connection_list:[
          {
            descript:'自助机操作日志',
            path:'/freedom/self-help'
          },
          {
            descript:'自助机卡日志',
            path:'/freedom/self-journal'
          },
          {
            descript:'自助机设置',
            path:'/freedom/self-set'
          },
          {
            descript:'运维',
            path:'/freedom/operational'
          }

        ],
        activeClass: 0,
      }
    },
    created(){

    },
    methods:{
      getItem(index,item){
        console.log(item);
        let that=this;
        this.activeClass = index;  // 把当前点击元素的index，赋值给activeClass
        that.service_type =item.id;
      },
    }

  }
</script>

<style lang="less" scoped>
  .connection {
    width: 100%;
    height: calc(100% - 60px);
    background: #eeeeee;
    overflow: hidden;
    .navigation {
      float: left;
      width: 278px;
      height: 100%;
      background: white;
      li {
        height: 50px;
        padding-left: 40px;
        line-height: 50px;
      }
    }
    .router {
      width: calc(100% - 278px);
      height: 100%;
      overflow-y: scroll;
      float: left;
      background: white;
      padding-left: 4px;
      .ini {
        height: calc(100% - 60px);
        position: absolute;
        right: 0px;
        top: 60px;
        z-index: 10;
      }
    }
  }
  .active {
    /* background: #eee; */
    width: 276px;
    background: #eeeeee;
    font-weight: bolder;
    border-radius: 4px;
  }

</style>
<style scoped>
  .connection>>> .el-transfer-panel{
    width: 320px;
  }
</style>
