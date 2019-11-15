<template>
  <div class="establish">
    <div class="head">
      <h4 style="display:inline-block; margin-right: 10px;">创建薪酬方案</h4>
      <el-button type="text" @click="backtrack">返回</el-button>
      <el-button v-if="operation==='1'" type="danger" @click="omit" size="mini"
                 style="width: 80px;float: right;margin: 30px 10px 10px 0">删除
      </el-button>
    </div>
    <div class="content">
      <p>基本信息</p>
      <ul class="information">
        <li>
          <span> <i style="color: red;font-size: 18px">*</i>方案名称：</span>
          <el-input v-model="precept_name" placeholder="请输入内容" size="mini" style="width: 450px;"></el-input>
        </li>
        <li>
          <span> <i style="color: red;font-size: 18px">*</i>工时制：</span>
          <el-select v-model="labor_hour" placeholder="请选择" style="width: 450px;" size="mini">
            <el-option
              v-for="item in man_hour"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li style="margin-top: 10px">
          <span> <i style="color: red;font-size: 18px">*</i>备注：</span>
          <el-input v-model="desc" placeholder="请输入内容" size="mini" style="width: 450px;"></el-input>
        </li>
        <li style="margin-top: 10px">
          <span> <i style="color: red;font-size: 18px">*</i>生效日期：</span>
          <el-date-picker
            v-model="effect_date"
            type="date"
            size="mini"
            style="width: 450px;"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </li>
      </ul>
      <div class="Income">
        <p>经常性收入项</p>
        <el-table
          :data="salary_list"
          :cell-style="{textAlign:'center'}"
          @cell-dblclick="tableDbEdit"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          size="mini"
          style="width: 100%;"
        >
          <el-table-column
            prop="income_name"
            fixed
            label="名称">
          </el-table-column>
          <el-table-column
            prop="tax_type_name"
            label="税收类型">
          </el-table-column>
          <el-table-column
            prop="taxee"
            label="谁纳税">
            <template slot-scope="scope">
              <span v-if="scope.row.taxee === '1'">个人缴纳</span>
              <span v-else>公司缴纳</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            width="190"
            fixed="right"
            label="操作">
            <template slot-scope="scope" v-if="scope.row.id!==1">
              <el-button @click="cancel(scope.row.id,scope.$index, salary_list)" type="danger" size="mini">移除
              </el-button>
              <!--<el-button size="small" @click="submit(scope.row,scope.row.id,scope.$index, salary_list)" >修改</el-button>-->
            </template>
          </el-table-column>

        </el-table>
        <el-button type="primary" @click="add" size="mini" style="width: 80px;margin-top: 10px">添加</el-button>
      </div>
      <div class="Income" style="margin-top: 10px">
        <p>经常性扣减项</p>
        <el-table
          :data="deduction"
          :cell-style="{textAlign:'center'}"
          @cell-dblclick="table_deduction"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          size="mini"
          style="width: 100%;"
        >
          <el-table-column
            prop="deduct_name"
            fixed
            label="名称">
          </el-table-column>
          <el-table-column
            prop="tax_type_name"
            label="税收类型">
          </el-table-column>
          <el-table-column
            prop="taxee"
            label="谁纳税">
            <template slot-scope="scope">
              <span v-if="scope.row.taxee === '1'">个人缴纳</span>
              <span v-else>公司缴纳</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            width="190"
            fixed="right"
            label="操作">
            <template slot-scope="scope" v-if="scope.row.id!==1">
              <el-button @click="cancel(scope.row.id,scope.$index, deduction)" type="danger" size="mini">移除</el-button>
              <!--<el-button size="small" @click="submit(scope.row,scope.row.id,scope.$index, salary_list)" >修改</el-button>-->
            </template>
          </el-table-column>

        </el-table>
        <el-button type="primary" @click="deduction_add" size="mini" style="width: 80px;margin-top: 10px">添加</el-button>
      </div>
    </div>
    <!--添加经常性收入的页面-->
    <el-dialog
      :visible.sync="dialog"
      :close-on-click-modal='false'
      width="30%"
      :before-close="handleClose">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name"> {{ title }}</span>
      </div>
      <ul class="mask_information">

        <li>
          <span><i style="color: red;font-size: 18px">*</i>名称：</span>
          <el-select v-model="income_id" placeholder="请选择" style="width: 217px;" size="mini">
            <el-option
              v-for="item in salary_data"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li>
          <span><i style="color: red;font-size: 18px">*</i>税收类型：</span>
          <el-select v-model="tax_type_id" placeholder="请选择" style="width: 217px;" size="mini">
            <el-option
              v-for="item in revenue_list"
              :key="item.value"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li>
          <span><i style="color: red;font-size: 18px">*</i>谁纳税：</span>
          <el-radio v-model="taxee" label="1">个人缴纳</el-radio>
          <el-radio v-model="taxee" label="2">公司缴纳</el-radio>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false" size="mini">取 消</el-button>
        <el-button v-if="mark" type="primary" @click="preserve_keep()" size="mini">确 定</el-button>
         <el-button v-else type="primary" @click="preserve()" size="mini">确 定</el-button>
        </span>
    </el-dialog>
    <!--添加经常性扣减的页面-->
    <el-dialog
      :visible.sync="deduction_dialog"
      :close-on-click-modal='false'
      width="30%"
      :before-close="handleClose">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name"> {{ title }}</span>
      </div>
      <ul class="mask_information">
        <li>
          <span><i style="color: red;font-size: 18px">*</i>名称：</span>
          <el-select v-model="deduct_id" placeholder="请选择" style="width: 217px;" size="mini">
            <el-option
              v-for="item in salary_data"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li>
          <span><i style="color: red;font-size: 18px">*</i>税收类型：</span>
          <el-select v-model="tax_type_id" placeholder="请选择" style="width: 217px;" size="mini">
            <el-option
              v-for="item in revenue_list"
              :key="item.value"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li>
          <span><i style="color: red;font-size: 18px">*</i>谁纳税：</span>
          <el-radio v-model="taxee" label="1">个人缴纳</el-radio>
          <el-radio v-model="taxee" label="2">公司缴纳</el-radio>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deduction_dialog = false" size="mini">取 消</el-button>
        <el-button v-if="mark" type="primary" @click="deduction_keep()" size="mini">确 定</el-button>
         <el-button v-else type="primary" @click="deduction_amend()" size="mini">确 定</el-button>
        </span>
    </el-dialog>
    <div class="foot">
      <el-button size="mini" style="width: 80px;margin-top: 10px" @click="backtrack">取消</el-button>
      <el-button type="primary" @click="ascertain" size="mini" style="width: 80px;margin-top: 10px">确定</el-button>
    </div>
  </div>
</template>

<script>

  export default {
    name: "establish",
    data() {
      return {
        url: this.api.api_9530_9503,
        precept_name: "",//方案名称
        labor_hour: '',//工时制
        desc: "",//备注
        man_hour: [
          {
            value: '1',
            label: '5天工作制'
          },
          {
            value: '2',
            label: '6天工作制'
          },
          {
            value: '3',
            label: '7天工作制'
          },
          {
            value: '4',
            label: '21.75天计薪制'
          }

        ],
        salary_list: [],//获取薪资方案
        salary_data: [],//收入项的名称
        text: 1,
        dialog: false,
        title: '',
        taxee: '1',//谁纳税
        tax_type_id: '',//类型
        income_id: '',//名称
        effect_date: '',//生效日期
        revenue_list: [],//税收类型
        mark: false,//判断新增还是修改的标志,
        rowIndex: '', //修改项的index
        operation: "",//判断删除件是否显示；
        row_id: "",//路由跳转时携带的id
        //经常性扣减项
        deduction: [],
        deduction_dialog: false,
        deduct_id: "",
      }
    },
    created() {
      let that = this;
      //判断是从哪个地方进来的
      that.operation = sessionStorage.getItem('operation');
      that.salary();//获取名称
      that.salary_tax_type();//税收类型
      if (that.operation === '1') {
        that.cache_data();//获取薪方案
      }


    },
    methods: {
      /**返回*/
      backtrack() {
        let that = this;
        that.$router.back(-1)
      },
      /**获取经常性收入项*/
      salary() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/salary/item/list",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              that.salary_data = res.data.data.list;
              console.log(res);
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      /**新增经常性收入项*/
      add() {
        let that = this;
        that.title = "经常性收入项";
        that.dialog = true;
        that.mark = true;
        that.taxee = '1',//谁纳税
          that.tax_type_id = '',//类型
          that.income_id = '';//名称
        that.$axios({
          url: that.url + "/v1/salary/item/list",
          method: "get",
          params: {
            page_size: 999,
            income_or_deduct: 0,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              that.salary_data = res.data.data.list;
              console.log(res);
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      /**确定 ---新增经常性收入项*/
      preserve_keep() {
        let that = this;
        let obj = {};
        let tax_type_name;
        let income_name;
        if (that.taxee === "" || that.tax_type_id === "" || that.income_id === "") {
          that.hintInfo("warning", "*为必填项")
        } else {
          obj.taxee = that.taxee;
          obj.tax_type_id = that.tax_type_id;
          obj.income_id = that.income_id;
          obj.index = that.salary_list.length + 1;
          if (that.tax_type_id !== null) {
            tax_type_name = that.code_desc(1, that.tax_type_id, that.revenue_list);
          }
          ;
          if (that.income_id !== null) {
            income_name = that.code_desc(1, that.income_id, that.salary_data);
          }
          ;
          obj.tax_type_name = tax_type_name;
          obj.income_name = income_name;
        }
        that.salary_list.push(obj);
        that.dialog = false;
        console.log(that.salary_list);
      },
      //封装税收类型的id转换为名字
      code_desc(flag, data, list_code) {
        // flag为1的时候code转desc
        let that = this;
        // list = that.country_code_list;
        for (let i in list_code) {
          if (flag && data === list_code[i].id) {
            return list_code[i].name
          } else if (!flag && data === list_code[i].name) {
            return list_code[i].id
          }
        }
      },
      /**确定 ----修改后的确定*/
      preserve() {
        let that = this;
        let obj = {};
        let tax_type_name;
        let income_name;
        obj.taxee = that.taxee;
        obj.tax_type_id = that.tax_type_id;
        obj.income_id = that.income_id;
        obj.index = that.rowIndex;
        if (that.tax_type_id !== null) {
          tax_type_name = that.code_desc(1, that.tax_type_id, that.revenue_list);
        }
        ;
        if (that.income_id !== null) {
          income_name = that.code_desc(1, that.income_id, that.salary_data);
        }
        ;
        console.log(obj);
        obj.tax_type_name = tax_type_name;
        obj.income_name = income_name;
        that.salary_list[that.rowIndex - 1] = obj;
        that.dialog = false;
        console.log(that.salary_list);
      },
      /**移除*/
      cancel(id, index, list) {
        let that = this;
        list.splice(index, 1);
      },
      /**获取税收类型*/
      salary_tax_type() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/salary/tax_type/list",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              that.revenue_list = res.data.data.list;
              console.log(res);
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      //新增的显示与隐藏
      handleClose(done) {
        done();
      },
      /**双击表格进入修改*/
      tableDbEdit(row, column, cell, event) {
        let that = this;
        console.log(row, column, cell, event);
        console.log(row.index);
        that.mark = false;
        that.tax_type_id = row.tax_type_id;
        that.income_id = row.income_id;
        that.taxee = row.taxee + "";
        that.dialog = true;
        that.rowIndex = row.index;
      },
      /**确定薪酬方案*/
      ascertain() {
        let that = this;
        let urldata = that.operation === '1' ? (that.url + "/v1/salary/plan/update/" + that.row_id) : (that.url + "/v1/salary/plan/add");
        if (that.precept_name === "" || that.labor_hour === "" || that.desc === "") {
          that.hintInfo("warning", "*为必填项")
        } else if (that.salary_list === "") {
          that.hintInfo("warning", "请创建经常性收入项")
        } else if (that.deduction === "") {
          that.hintInfo("warning", "请创建经常性扣减项")
        }
        else {
          console.log(urldata);
          that.$axios({
            url: urldata,
            method: "post",
            data: {
              name: that.precept_name,
              remark: that.desc,
              time_type: that.labor_hour,
              effect_date: that.effect_date,
              incomes: JSON.stringify(that.salary_list),
              deducts: JSON.stringify(that.deduction)

            }
          })
            .then(res => {
              if (res.data.message === "success") {
                that.backtrack()
                if (that.operation === '1') {
                  that.hintInfo("success", "修改成功")
                } else {
                  that.hintInfo("success", "新增成功")
                }
              }
              else {
                console.log(res.data.message);
              }

            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      /**获取跳转路由时缓存的数据id*/
      cache_data() {
        let that = this;
        that.row_id = sessionStorage.getItem("row_id");
        that.$axios({
          url: that.url + "/v1/salary/plan/get/" + that.row_id,
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              let revenue = res.data.data;
              that.precept_name = revenue.name;
              that.labor_hour = revenue.time_type + "";
              that.effect_date = revenue.effect_date;
              that.desc = revenue.remark;
              that.salary_list = revenue.incomes;
              that.deduction = revenue.deducts;
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      /**删除*/
      omit() {
        let that = this;
        that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
          // list.splice(index, 1);
          this.$axios({
            url: that.url + "/v1/salary/plan/delete/" + that.row_id,
            method: "get",
          })
            .then(res => {
              console.log(res.message)
              if (res.data.message === "success") {
                // this.$emit('handleClick');
                that.$router.push({
                  path: `/pay/program`,
                });
              }

            })
            .catch(error => {
              console.log(error);
            })


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /**
       * 经常性扣减项
       *
       * */
      /**新增扣减项*/
      deduction_add() {
        let that = this;
        that.deduction_dialog = true;
        that.title = "经常性扣减项";
        that.mark = true;
        that.taxee = '1';//谁纳税
        that.tax_type_id = '';//类型
        that.deduct_id = '';//名称
        that.$axios({
          url: that.url + "/v1/salary/item/list",
          method: "get",
          params: {
            page_size: 999,
            income_or_deduct: 1,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              that.salary_data = res.data.data.list;
              console.log(res);
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      /**新增后的确定*/
      deduction_keep() {
        let that = this;
        let obj = {};
        let tax_type_name;
        let deduct_name;
        if (that.taxee === "" || that.tax_type_id === "" || that.deduct_id === "") {
          that.hintInfo("warning", "*为必填项")
        } else {
          obj.taxee = that.taxee;
          obj.tax_type_id = that.tax_type_id;
          obj.deduct_id = that.deduct_id;
          obj.index = that.deduction.length + 1;
          if (that.tax_type_id !== null) {
            tax_type_name = that.code_desc(1, that.tax_type_id, that.revenue_list);
          }
          ;
          if (that.deduct_id !== null) {
            deduct_name = that.code_desc(1, that.deduct_id, that.salary_data);
          }
          ;
          obj.tax_type_name = tax_type_name;
          obj.deduct_name = deduct_name;
        }
        that.deduction.push(obj);
        that.deduction_dialog = false;
        console.log(that.deduction);
      },
      /**双击表格进入修改*/
      table_deduction(row, column, cell, event) {
        let that = this;
        console.log(row, column, cell, event);
        console.log(row.index);
        that.mark = false;
        that.tax_type_id = row.tax_type_id;
        that.deduct_id = row.deduct_id;
        that.taxee = row.taxee + "";
        that.deduction_dialog = true;
        that.rowIndex = row.index;
      },
      /**双击表格进入修改后的确定*/
      deduction_amend() {
        let that = this;
        let obj = {};
        let tax_type_name;
        let deduct_name;
        obj.taxee = that.taxee;
        obj.tax_type_id = that.tax_type_id;
        obj.deduct_id = that.deduct_id;
        obj.index = that.rowIndex;
        if (that.tax_type_id !== null) {
          tax_type_name = that.code_desc(1, that.tax_type_id, that.revenue_list);
        }
        ;
        if (that.income_id !== null) {
          deduct_name = that.code_desc(1, that.deduct_id, that.salary_data);
        }
        ;
        console.log(obj);
        obj.tax_type_name = tax_type_name;
        obj.deduct_name = deduct_name;
        that.deduction[that.rowIndex - 1] = obj;
        that.deduction_dialog = false;
        console.log(that.deduction);
      },


      /**
       * @hintInfo 操作提示信息
       * @param hint  成功提示
       * @param info 警告信息
       */
      hintInfo: function (hint, info) {
        let that = this;
        if (hint === "success") {
          that.$message({
            message: info,
            type: 'success'
          });
        } else if (hint === "warning") {
          that.$message({
            message: info,
            type: 'warning'
          });
        } else {
          this.$message.error('出错了！');
        }
      },

    },
  }
</script>

<style lang="less" scoped>
  .establish {
    width: 97%;
    height: 100%;
    background: white;
    overflow-y: scroll;
    .head {
      overflow: hidden;
      padding-left: 10px;
    }
    .content {
      padding-left: 10px;
      p {
        background: #EEEEEE;
        padding: 10px;
      }
      ul {
        width: 100%;
        min-width: 1400px;
        background: #F7F7F7;
        overflow: hidden;
        li {
          float: left;
          width: 50%;
          padding-left: 10px;
          span {
            display: inline-block;
            width: 80px;
            text-align: right;
          }
        }
      }

    }
    .mask_information {
      width: 100%;
      li {
        margin-top: 10px;
        span {
          display: inline-block;
          width: 90px;
          text-align: right;
        }
      }
    }
    .foot {
      float: right;
      margin-right: 20px;
    }
  }
</style>
