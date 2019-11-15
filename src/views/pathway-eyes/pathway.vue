<template>
  <div class="pathway">
    <div class="navigation">
      <el-col class="pull-left" style="background-color: #EAEDF1; width:276px;">
        <ul class="navigation"style="margin-top: 10px">
          <router-link :to="item.path" v-for="(item,index) in way_eye " :key="index">
            <li :class="activeClass == index ? 'active':''" @click="getItem(index,item)">{{item.descript}}</li>
          </router-link>
        </ul>
      </el-col>
    </div>
    <div class="router" style="border-left:2px solid  #eeeeee ;">
      <div class="ini">
        <money-task></money-task>
      </div>
      <router-view  ></router-view>
    </div>
  </div>
</template>

<script>
    export default {
        name: "pathway",
        data(){
          return{
            connection_list:[
              {
                descript:'路眼',
                path:'/pathway/eyes'
              },
              {
                descript:'访客管理',
                path:'/pathway/visitor'
              },
              {
                descript:'设置',
                path:'/pathway/pathway-set'
              },

            ],
            connection_data:[
              {
                descript:'路眼',
                path:'/pathway/eyes'
              },
              {
                descript:'设置',
                path:'/pathway/pathway-set'
              },

            ],
            connection_arr:[
              {
                descript:'访客管理',
                path:'/pathway/visitor'
              },

            ],
            activeClass: 0,
            way_eye:[],
        }
        },
        created(){
          let that =this;
          let data = this.$route.query;
          console.log(data);
          this.index =  sessionStorage.getItem('index');
          console.log(this.index);
          if(that.index!=='0' ){
            if(data.index===3){
              that.way_eye = that.connection_arr;
            }else {
              that.way_eye = that.connection_data;
            }
          }else {
            that.way_eye = that.connection_list;
          }
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
  .pathway {
    width: 100%;
    height: calc(100% - 60px);
    background: #eeeeee;
    overflow: hidden;
    .navigation {
      float: left;
      width: 280px;
      height: 100%;
      background: white;
      li {
        height: 50px;
        padding-left: 40px;
        line-height: 50px;
      }
    }
    .router {
      width: calc(100% - 280px);
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
    background: #eeeeee;
    font-weight: bolder;
    border-radius: 4px;
    width: 276px;
  }

</style>
<style scoped>
  .connection>>> .el-transfer-panel{
    width: 320px;
  }
</style>
