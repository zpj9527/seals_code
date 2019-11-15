<template>
  <!--夜审-->
  <div class="warp-main">
    <Not-opened></Not-opened>
  </div>
</template>
<script>
  export default {
    data: function(){
      return {
        message: 'Hello Vue'
      };
    },
    methods: {
      clickShow: function(){
        alert('显示');
      }
    }
  }
</script>
<!--<template>
  <div>
    <p style="text-align: center; margin: 50px 0 20px">使用 scoped-slot 自定义数据项</p>
    <div style="text-align: center">
      <el-transfer
        style="text-align: left; display: inline-block"
        v-model="value4"
        filterable
        :titles="['Source', 'Target']"
        :button-texts="['到左边', '到右边']"
        :format="{}"
        @change="handleChange"
        :data="data">
        <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
      </el-transfer>
    </div>
  </div>
</template>

<style>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>

<script>
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
          });
        }
        return data;
      };
      return {
        data_obj : [],
        data: generateData(),
        value4: [],
        renderFunc(h, option) {
          return option.label;
        }
      };
    },

    methods: {
      handleChange(value, direction, movedKeys) {
        let that = this;
        console.log(value[0]);
        console.info(that.data[value[0]]);
      }
    }
  };
</script>-->
<style scoped lang="less">
  .warp-main{
    width: calc(100% - 58px);
  }
</style>
