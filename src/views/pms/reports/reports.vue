<template>
  <!--设置-->
  <div class="Reports">
    <el-col class="pull-left"  style="background-color: #EAEDF1; width: 250px;">
      <div style="height: 66px; font-size: 22px; color: #222222; margin-left: 36px; line-height: 66px"  >
        报表分类
      </div>
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="12">
          <!-- <i class="el-icon-caret-bottom"></i> -->
          <template slot="title">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <span>客房查房</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="12-1"><router-link to="/reports/checkRoomContent">查房内容</router-link></el-menu-item>
            <el-menu-item index="12-2"><router-link to="/reports/checkRoomRecord">查房记录</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="13">
          <!-- <i class="el-icon-caret-bottom"></i> -->
          <template slot="title">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <span>客房打扫</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="13-1"><router-link to="/reports/cleanRoomRecord">打扫记录</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="1">
          <template slot="title">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <span>1.交接班报表</span>
          </template>
          <el-menu-item-group  :default-active="this.$route.path" router mode="horizontal">
            <el-menu-item index="1-1"><router-link to="/reports/cashierReport">收银员交接表</router-link></el-menu-item>
            <el-menu-item index="1-2"><router-link to="/reports/cashierNoReport">收银员交接表(含无账)</router-link></el-menu-item>
            <el-menu-item index="1-3"><router-link to="/reports/entryDetailReport">前台入账明细</router-link></el-menu-item>
            <el-menu-item index="1-4"><router-link to="/reports/entrySimpleReport">前台入账简表</router-link></el-menu-item>
            <el-menu-item index="1-5"><router-link to="/reports/entrySummaryReport">前台入账汇总</router-link></el-menu-item>
            <el-menu-item index="1-7"><router-link to="/reports/receiveDetailReport">前台收款明细</router-link></el-menu-item>
            <el-menu-item index="1-8"><router-link to="/reports/receiveSummaryReport">前台转账报表</router-link></el-menu-item>
            <el-menu-item index="1-9"><router-link to="/reports/chongDiaoReport">冲账调帐报表</router-link></el-menu-item>
            <el-menu-item index="1-10"><router-link to="/reports/resolveSummaryReport">结账实收统计</router-link></el-menu-item>
            <el-menu-item index="1-11"><router-link to="/reports/resolveDetailReport">结账实收明细</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
         <el-submenu index="2">
          <!-- <i class="el-icon-caret-bottom"></i> -->
          <template slot="title">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <span>2.财务报表</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1"><router-link to="/reports/dateReport">营业日报表</router-link></el-menu-item>
            <el-menu-item index="2-2"><router-link to="/reports/dateCodeReport">营业日报表(设费用码)</router-link></el-menu-item>
            <el-menu-item index="2-3"><router-link to="/reports/monthReport">月份汇总报表</router-link></el-menu-item>
            <el-menu-item index="2-4"><router-link to="/reports/dateSimpleReport">营业日简表</router-link></el-menu-item>
            <el-menu-item index="2-5"><router-link to="/reports/dateCountReport">营业统计表</router-link></el-menu-item>
            <el-menu-item index="2-6"><router-link to="/reports/eatCountReport">餐饮统计表</router-link></el-menu-item>
            <el-menu-item index="2-7"><router-link to="/reports/lateCountReport">夜审记录表</router-link></el-menu-item>
            <el-menu-item index="2-8"><router-link to="/reports/selfReport">手工输帐表</router-link></el-menu-item>
            <el-menu-item index="2-9"><router-link to="/reports/previewReport">预授权报表</router-link></el-menu-item>
            <el-menu-item index="2-10"><router-link to="/reports/yaHouseReport">哑房账报表</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <template slot="title">
              <!-- <i class="el-icon-caret-bottom"></i> -->
              <span>3.接待报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1"><router-link to="/reports/loginReport">登记记录报表</router-link></el-menu-item>
              <el-menu-item index="3-2"><router-link to="/reports/cardReport">制卡记录报表</router-link></el-menu-item>
              <el-menu-item index="3-3"><router-link to="/reports/onLiveReport">在住客人资料</router-link></el-menu-item>
              <el-menu-item index="3-4"><router-link to="/reports/historyReport">客史档案资料</router-link></el-menu-item>
              <el-menu-item index="3-5"><router-link to="/reports/onPriceReport">在住押金报表</router-link></el-menu-item>
              <el-menu-item index="3-6"><router-link to="/reports/tempReport">临时挂账报表</router-link></el-menu-item>
              <el-menu-item index="3-7"><router-link to="/reports/resolveBillReport">已结账单报表</router-link></el-menu-item>
              <el-menu-item index="3-8"><router-link to="/reports/operationReport">操作记录报表</router-link></el-menu-item>
              <el-menu-item index="3-9"><router-link to="/reports/previewLeaveReport">预离客人报表</router-link></el-menu-item>
              <el-menu-item index="3-10"><router-link to="/reports/exceptionReport">离客账务异常</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <template slot="title">
              <!-- <i class="el-icon-caret-bottom"></i> -->
              <span>4.预定报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1"><router-link to="/reports/previewRecordReport">预订记录报表</router-link></el-menu-item>
              <el-menu-item index="4-2"><router-link to="/reports/previewAlyReport">预订分析报表</router-link></el-menu-item>
              <el-menu-item index="4-3"><router-link to="/reports/datePreviewReport">日预订报表</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <template slot="title">
              <!-- <i class="el-icon-caret-bottom"></i> -->
              <span>5.会员报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1"><router-link to="/reports/memberRegReport">会员注册表</router-link></el-menu-item>
              <el-menu-item index="5-2"><router-link to="/reports/memberCzdetailReport">会员充值明细报表</router-link></el-menu-item>
              <el-menu-item index="5-3"><router-link to="/reports/memberXfdetailReport">会员消费明细报表</router-link></el-menu-item>
              <el-menu-item index="5-4"><router-link to="/reports/memberXfCountReport">会员充值消费汇总</router-link></el-menu-item>
              <el-menu-item index="5-5"><router-link to="/reports/memberCzfreezeReport">会员储值冻结报表</router-link></el-menu-item>
              <el-menu-item index="3-6"><router-link to="/reports/memberScoreReport">会员积分消费报表</router-link></el-menu-item>
              <el-menu-item index="3-7"><router-link to="/reports/memberCspointReport">会员积分产生报表</router-link></el-menu-item>
              <el-menu-item index="3-8"><router-link to="/reports/memberOperationReport">会员操作记录报表</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <template slot="title">
              <!-- <i class="el-icon-caret-bottom"></i> -->
              <span>6.协议单位报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="6-1"><router-link to="/reports/unitDataReport">协议单位资料报表</router-link></el-menu-item>
              <el-menu-item index="6-2"><router-link to="/reports/unitDetailReport">协议挂账明细查询</router-link></el-menu-item>
              <el-menu-item index="6-3"><router-link to="/reports/unitXfReport">协议单位消费报表</router-link></el-menu-item>
              <el-menu-item index="6-4"><router-link to="/reports/unitRecesiveReport">应收账款结算</router-link></el-menu-item>
              <el-menu-item index="6-5"><router-link to="/reports/unitRecordReport">应收账款结算记录</router-link></el-menu-item>
              <el-menu-item index="6-6"><router-link to="/reports/unitAgeReport">AR账龄分析</router-link></el-menu-item>
              <el-menu-item index="6-7"><router-link to="/reports/unitRegeReport">登记非挂账报表</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <template slot="title">
              <!-- <i class="el-icon-caret-bottom"></i> -->
              <span>7.自助机报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="7-1"><router-link to="/reports/selfDetailReport">自助机明细报表</router-link></el-menu-item>
              <el-menu-item index="7-2"><router-link to="/reports/selfFindReport">自助机账单查询</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="8">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <template slot="title">
              <!-- <i class="el-icon-caret-bottom"></i> -->
              <span>8.客房报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="8-1"><router-link to="/reports/hsEditReport">房态修改记录</router-link></el-menu-item>
              <el-menu-item index="8-2"><router-link to="/reports/hsCleanReport">房务清理统计</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="9">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <template slot="title">
              <!-- <i class="el-icon-caret-bottom"></i> -->
              <span>9.餐厅报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="9-1"><router-link to="/reports/foodDetailReport">餐饮销售明细</router-link></el-menu-item>
              <el-menu-item index="9-2"><router-link to="/reports/foodCountReport">餐饮销售汇总</router-link></el-menu-item>
              <el-menu-item index="9-3"><router-link to="/reports/foodSortReport">餐饮销售排行</router-link></el-menu-item>
              <el-menu-item index="9-4"><router-link to="/reports/foodFlDetailReport">商品分类销售汇总</router-link></el-menu-item>
              <el-menu-item index="9-5"><router-link to="/reports/foodFlCountReport">商品分类销售明细</router-link></el-menu-item>
              <el-menu-item index="9-6"><router-link to="/reports/foodWaterReport">餐厅开台流水报表</router-link></el-menu-item>
              <el-menu-item index="9-7"><router-link to="/reports/foodRecordReport">退菜记录报表</router-link></el-menu-item>
              <el-menu-item index="9-8"><router-link to="/reports/foodOperationReport">餐厅操作记录报表</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="10">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <template slot="title">
              <!-- <i class="el-icon-caret-bottom"></i> -->
              <span>10.商品报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="10-1"><router-link to="/reports/productCountReport">商品销售汇总</router-link></el-menu-item>
              <el-menu-item index="10-2"><router-link to="/reports/productDetailReport">商品销售明细</router-link></el-menu-item>
              <el-menu-item index="10-3"><router-link to="/reports/productWaterReport">商品销售流水</router-link></el-menu-item>
              <el-menu-item index="10-4"><router-link to="/reports/productWaterCountReport">商品流水汇总</router-link></el-menu-item>
              <el-menu-item index="10-5"><router-link to="/reports/productVoucherReport">早餐券报表</router-link></el-menu-item>
              <el-menu-item index="10-6"><router-link to="/reports/productUseReport">早餐券使用报表</router-link></el-menu-item>
              <el-menu-item index="10-7"><router-link to="/reports/productParkReport">停车券报表</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="11">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <template slot="title">
              <!-- <i class="el-icon-caret-bottom"></i> -->
              <span>11.销售报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="11-1"><router-link to="/reports/saleCountReport">佣金统计报表</router-link></el-menu-item>
              <el-menu-item index="11-2"><router-link to="/reports/saleDetailReport">需清算明细表</router-link></el-menu-item>
              <el-menu-item index="11-3"><router-link to="/reports/saleQsDetailReport">清算单明细表</router-link></el-menu-item>
              <el-menu-item index="11-4"><router-link to="/reports/saleSortReport">销售员排行榜</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
      </el-menu>
    </el-col>
    <div class="RightCotent pull-left">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

  </div>



</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      }
    },

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    }
  }
</script>
<style scoped>
.Reports{
  width: calc(100% - 58px);
  margin-top: 60px;
  overflow: hidden;
}
.el-menu{
  background-color: #EAEDF1;
  color: #000000;
}
.router-link-active{
  color: #409EFF;
}
.RightCotent{
  width: calc(100% - 250px);
}
</style>

