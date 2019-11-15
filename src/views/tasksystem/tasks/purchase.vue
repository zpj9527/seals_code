<template>
  <div class="purchase">

    <Not-opened></Not-opened>
  </div>
</template>

<script>
  export default {
    name: "purchase",
  }
</script>

<style lang="less" scoped>
  .purchase {
    width: 97%;
    height: 100%;
    background: white;
    .title {
      width: 100%;
      height: 100%;
      background: white;
      padding-top: 16px;
      .grabble {
        div {
          display: inline-block;
        }
        button {
          width: 80px;
          height: 27px;
          background: rgba(68, 136, 233, 1);
          border: none;
          border-radius: 4px;
          color: white;
          margin-left: 20px;
        }
      }
      .dialog_style {
        /*overflow: hidden;*/
        margin-left: 20px;
        li {
          /*float: left;*/
          /*width: 50%;*/
          margin-bottom: 10px;
          span {
            display: inline-block;
            width: 110px;
          }
        }
      }

    }
  }
</style>

