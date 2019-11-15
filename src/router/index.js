/**
 * @author  yilukeji   webpre
 * @date 2019-01-01
 * @aim  MIS-SYSTEM
 */
/**
 * 公共路由设置
 */
import Vue from 'vue'
import Router from 'vue-router'
/**
 * 登陆后进入的路由
 */
import Index from '@/views/main'
/**
 * PMS 路由设置  住管家
 */
import Home from '@/views/pms/common/home.vue'
import Main from '@/views/pms/main/main'
import HouseStatus from '@/views/pms/houseStatus/houseStatus'
import OrderList from '@/views/pms/orderList/orderList'
import Customer from '@/views/pms/customer/customer'
import AccountsReceivable from '@/views/pms/accountsReceivable/accountsReceivable'

import Invoicing from '@/views/pms/invoicing/invoicing'
import Shifting from '@/views/pms/shifting/shifting'

import Nightaudit from '@/views/pms/nightaudit/nightaudit'
/**
 * 点击内控店控进入的路由
 */
import Welcome from '@/views/internal-store-control/welcome/welcome'
import Homes from '@/views/internal-store-control/common/home'
import ModuleTree from '@/views/internal-store-control/module-tree/module-tree'
import Moduleinformation from '@/views/internal-store-control/module-tree/module-information'
import Moduletypesetting from '@/views/internal-store-control/module-type-setting/module-type-setting'
import Moduletype from '@/views/internal-store-control/module-type-setting/module-type'
import Kind from '@/views/internal-store-control/module-type-setting/kind'
import Moduleloginlog from '@/views/internal-store-control/module-login-log/module-login-log'
import Log from '@/views/internal-store-control/module-login-log/log'
import Moduleversioning from '@/views/internal-store-control/module-versioning/module-versioning'
import Versionlist from '@/views/internal-store-control/module-versioning/version-list'
import ManyStores from '@/views/internal-store-control/many-stores/many-stores'
// import Management from '@/views/internal-store-control/many-stores/management'
//点击内控店控进入的组织架构管理的路由
import Organization from '@/views/internal-store-control/organization/organization'
import Basicinfo from '@/views/internal-store-control/organization/basic-info'
import Hotel from '@/views/internal-store-control/organization/hotel'
import Sections from '@/views/internal-store-control/organization/sections'
import Personalrole from '@/views/internal-store-control/personal-role/personal-role'
import Role from '@/views/internal-store-control/personal-role/role'
import Permissions from '@/views/internal-store-control/permissions/permissions'
import Roleprivileges from '@/views/internal-store-control/permissions/role-privileges'
//页面管理页面
import Pagemanagement from '@/views/internal-store-control/page-management/page-management'
import Pagetable from '@/views/internal-store-control/page-management/page-table'
//排班考勤管理
import Composing from '@/views/internal-store-control/composing/composing'
import Schedule from '@/views/internal-store-control/composing/schedule'
import Checkingin from '@/views/internal-store-control/composing/checking-in'
import Crew from '@/views/internal-store-control/composing/crew'
import Allcrew from '@/views/internal-store-control/composing/all_crew'
import crewCalendar from '@/views/internal-store-control/composing/crew_calendar'
import SummaryOne from '@/views/internal-store-control/composing/summary_one'
import AuditManagement from '@/views/internal-store-control/composing/audit_management'
import SalarySite from '@/views/internal-store-control/composing/salary_site'
//点击内控店控进入的组织架构管理的设置路由
import Setting from '@/views/internal-store-control/setting/setting'
import Mission from '@/views/internal-store-control/setting/mission'
import Obligation from '@/views/internal-store-control/setting/obligation'
import Wechat from '@/views/internal-store-control/setting/wechat'
import Parameter from  '@/views/internal-store-control/setting/parameter'
import Papers from '@/views/internal-store-control/setting/papers'
import Marketing from '@/views/internal-store-control/setting/marketing'
import Roomstatus from '@/views/internal-store-control/setting/room-status'
import Reserve from '@/views/internal-store-control/setting/reserve'
import Reception from '@/views/internal-store-control/setting/reception'
import Guestroom from '@/views/internal-store-control/setting/guest-room'
import Else from '@/views/internal-store-control/setting/else'
import Api from '@/views/internal-store-control/API/api' //新增的api管理
/**管理员管理*/
import Admin from '@/views/internal-store-control/admin/admin'
//薪资管理
import Pay from '@/views/internal-store-control/pay/pay';
import Compensation from '@/views/internal-store-control/pay/compensation';
import SocialSecurity from '@/views/internal-store-control/pay/social_security';
import Monthly from '@/views/internal-store-control/pay/monthly';
import Entering from '@/views/internal-store-control/pay/entering';
import Salary from  '@/views/internal-store-control/pay/salary';
import Salarisafschrift from '@/views/internal-store-control/pay/salarisafschrift';
import Program from '@/views/internal-store-control/pay/program';
import Establish from '@/views/internal-store-control/pay/establish';
import Paycomponent from '@/views/internal-store-control/pay/component';
import System from '@/views/internal-store-control/pay/system';
import Submitted from '@/views/internal-store-control/pay/submitted';
import IndividualInformation from '@/views/internal-store-control/pay/individual-information';
import Deduct from '@/views/internal-store-control/pay/deduct';
import Payset from '@/views/internal-store-control/pay/pay-set';
import Paystatement from '@/views/internal-store-control/pay/pay-statement';

/**
 * 路眼
 * */
import Pathwaycommon from '@/views/pathway-eyes/common/home'
import  Pathway from "@/views/pathway-eyes/pathway"
import Eyes from "../views/pathway-eyes/eyes"
import Visitor  from "@/views/pathway-eyes/visitor"
import Pathwayset from "@/views/pathway-eyes/pathway-set"
/**自由人*/
import Freedomcommon from '@/views/freedom/common/home'
import  Freedom from "@/views/freedom/freedom"
import Selfhelp from "@/views/freedom/self-help"
import Selfjournal from  "@/views/freedom/self-journal"
import Selfset from "@/views/freedom/self-set"
 import Operational from "@/views/freedom/operational"
/**ota直连*/
import Connectioncommon from '@/views/connection/common/home'
import Connection from '@/views/connection/connection'
import Orderform from '@/views/connection/order-form'
import Product from '@/views/connection/product'
import Otaset from '@/views/connection/ota-set'
import Reportota from '@/views/connection/ota-report'
/**
 * 客管家的路由
 */

/**
 * 点击铁管家进入的路由
 */
import Ironhome from '@/views/ironsteward/common/ironhome'
import Equipmentcommon from '@/views/ironsteward/equipmentcommon/equipmentcommon'
import Equipmentguest from '@/views/ironsteward/equipmentguest/equipmentguest'
import Equipmenttype from '@/views/ironsteward/equipmenttype/equipmenttype'
import Guestcontrol from '@/views/ironsteward/guestcontrol/guestcontrol'
import Ironsteward from '@/views/ironsteward/ironsteward/ironsteward'
/**
 * 点击会管家进入的路由
 */
import Meetsteward from '@/views/meetsteward/meetsteward'
import Home_meet from '@/views/meetsteward/common/home_meet'
import LeftNav from '@/components/nav/leftNav.vue'
import NotFound from '@/components/404.vue'
import RightContent from '@/components/nav/rightContent.vue'
/**
 * 销控宝路由设置
 */


/**
 * 库管家
 */

/**
 * 地管家
 */

/**
 * 点击钱管家进入的路由
 */
//这个是导航栏
import HomeShopping from '@/views/pursesteward/common/home-shopping'
import Welcomemoney from "../views/pursesteward/welcome/welcome-money"
//帐
import Accounting from '@/views/pursesteward/accounting/accounting'
import Curtain from '@/views/pursesteward/accounting/curtain'

//钱
import Money from '@/views/pursesteward/money/money'
import Cash from '@/views/pursesteward/money/cash'

//票
import Ticket from '@/views/pursesteward/ticket/ticket'
import Ballot from '@/views/pursesteward/ticket/ballot'

//设置
import Advanced from '@/views/pursesteward/advanced/advanced'
import Entryvalue from '@/views/pursesteward/advanced/entry-value'
import Commercialbill from '@/views/pursesteward/advanced/commercial-bill'
import ARaccount from '@/views/pursesteward/advanced/ar_account'
import Cashiers from '@/views/pursesteward/advanced/cashiers'
import Checkstand from '@/views/pursesteward/advanced/checkstand'
import Audit from '@/views/pursesteward/advanced/audit'
import Brew from '@/views/pursesteward/advanced/brew'
import Revocation from '@/views/pursesteward/advanced/revocation'
import Paymentmethod from '@/views/pursesteward/advanced/payment_method'
import Template from '@/views/pursesteward/advanced/template'
import paymentaccount from '@/views/pursesteward/advanced/payment_account'
import Securitytype from '@/views/pursesteward/advanced/security_type'
import Currency from '@/views/pursesteward/advanced/currency'
import Parameters from '@/views/pursesteward/advanced/parameters'
import Fixedcharges from '@/views/pursesteward/advanced/fixed_charges'
import Creditcard from '@/views/pursesteward/advanced/credit-card'

/**
 * 车管家
 */

/**
 * 事管家 - 任务体系路由设置
 */
import Taskscommon from '@/views/tasksystem/common/tasks-common'
import Tasks from '@/views/tasksystem/tasks/tasks'
import Person from '@/views/tasksystem/tasks/person'
import Roomservice from '@/views/tasksystem/tasks/room-service'
import Purchase from '@/views/tasksystem/tasks/purchase'
import Shuttlebus from '@/views/tasksystem/tasks/shuttle-bus'
import Engineering from '@/views/tasksystem/tasks/engineering'
import Human from '@/views/tasksystem/tasks/human'
import Awaken from '@/views/tasksystem/tasks/awaken'
import Surveillance from '@/views/tasksystem/tasks/surveillance'
import Visiting from '@/views/tasksystem/tasks/visiting-book'
import Approval from '@/views/tasksystem/tasks/approval'

/**
 * 路由的加载部分
 * @param resolve
 * @constructor
 */
// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/views/login'], resolve);
//登陆
// import Login from '@/views/login'
//初始化页面
import Initial from '@/views/initial-login'
//多店选择
import Store from '../views/store/store'

Vue.use(Router)

let router = new Router({
  /**
   * 这里是需要加一行代码的 但是为了本地测试，测试阶段不加
   * mode :'history',
   */
  //mode : 'hash',
  mode :'history',
  //base:'/erp',
  routes: [
    {
      path: '/',
      name:'/login',
      type: 'login',
      component: Login
    },
    {
      path: '/initial-login',
      name:'/initial',
      type: 'initial',
      component: Initial
    },
    {
      path: '/store',
      name: 'store',
      type: 'store',
      component: Store
    },

    {
      path: '*',
      component: NotFound //当相应路由没有内容的时候
    },
    //登陆后进入的路由
    {
      path: '/index',
      name: 'index',
      type: 'main',
      component: Index
    },

    /**
     * 点击pms进入的路由
     */
    {
      path: '/main',
      type: 'home',
      name: 'update',
      redirect: '/main',
      component: Home,
      menuShow: true,
      children: [{
        path: '/main',
        component: RightContent,
        // component: Home,
        name: 'main_page', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/main',
          component: Main,
          name: '主页',
          menuShow: true
        }, ]
      }]
    },
    {
      path: '/houseStatus',
      type: 'home',
      name: 'houseStatus_page',
      redirect: '/houseStatus',
      component: Home,
      menuShow: true,
      children: [{
        path: '/houseStatus',
        component: RightContent,
        // component: Home,
        name: 'houseStatus_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/houseStatus',
          component: HouseStatus,
          name: '房态',
          menuShow: true
        },

        ]
      }]
    },
    {
      path: '/orderList',
      type: 'home',
      name: 'orderList_page',
      redirect: 'orderList',
      component: Home,
      menuShow: true,
      children: [{
        path: '/orderList',
        component: RightContent,
        name: 'orderList_update',
        leaf: true,
        iconCls: 'iconfont icon-home',
        menuShow: true,
        children: [{
          path: '/orderList',
          component: OrderList,
          name: '预定',
          menuShow: true
        }]
      }]
    },
    {
      path: '/customer',
      type: 'home',
      name: 'customer_page',
      redirect: 'customer',
      component: Home,
      menuShow: true,
      children: [{
        path: '/customer',
        component: RightContent,
        name: 'customer_update',
        leaf: true,
        iconCls: 'iconfont icon-home',
        menuShow: true,
        children: [{
          path: '/customer',
          component: Customer,
          name: '客户',
          menuShow: true
        }]
      }]
    },
    {
      path: '/invoicing',
      type: 'home',
      name: 'invoicing_page',
      redirect: 'invoicing',
      component: Home,
      menuShow: true,
      children: [{
        path: '/invoicing',
        component: RightContent,
        name: 'invoicing_update',
        leaf: true,
        iconCls: 'iconfont icon-home',
        menuShow: true,
        children: [{
          path: '/invoicing',
          component: Invoicing,
          name: '发票',
          menuShow: true
        }]
      }]
    },
    {
      path: '/accountsReceivable',
      type: 'home',
      name: 'accountsReceivable_page',
      redirect: 'accountsReceivable',
      component: Home,
      menuShow: true,
      children: [{
        path: '/accountsReceivable',
        component: RightContent,
        name: 'accountsReceivable_update',
        leaf: true,
        iconCls: 'iconfont icon-home',
        menuShow: true,
        children: [{
          path: '/accountsReceivable',
          component: AccountsReceivable,
          name: '财务',
          menuShow: true
        }]
      }]
    },
    {
      path: '/nightaudit',
      type: 'home',
      name: 'nightaudit_page',
      redirect: 'nightaudit',
      component: Home,
      menuShow: true,
      children: [{
        path: '/nightaudit',
        component: RightContent,
        name: 'nightaudit_update',
        leaf: true,
        iconCls: 'iconfont icon-home',
        menuShow: true,
        children: [{
          path: '/nightaudit',
          component: Nightaudit,
          name: '夜审',
          menuShow: true
        }]
      }]
    },
    {
      path: '/shifting',
      type: 'home',
      name: 'shifting_page',
      redirect: 'shifting',
      component: Home,
      menuShow: true,
      children: [{
        path: '/shifting',
        component: RightContent,
        name: 'shifting_update',
        leaf: true,
        iconCls: 'iconfont icon-home',
        menuShow: true,
        children: [{
          path: '/shifting',
          component: Shifting,
          name: '交接班',
          menuShow: true
        }]
      }]
    },
    /**
     * 点击店控进入的路由
     */
    {
      path: '/welcome',
      type: 'home',
      name: 'welcome',
      redirect: '/welcome',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/welcome',
        component: Welcome,
        // component: Home,
        name: 'welcome', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: 'welcome',
          component: Welcome,
          name: '欢迎页面',
          menuShow: true
        },
          // {path: '/organizationchart/Internalcontrol',  component: Welcome, name: '欢迎页面', menuShow: true},
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/module-tree',
      type: 'home',
      name: 'moduleTree',
      redirect: '/module-tree',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/module-tree',
        component: ModuleTree,
        // component: Home,
        name: 'module-tree', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/module-tree/moduleinformation',
          component: Moduleinformation,
          name: '模块信息',
          menuShow: true
        },
          // {path: '/organizationchart/Internalcontrol',  component: Welcome, name: '欢迎页面', menuShow: true},
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/module-type-setting',
      type: 'home',
      name: 'modulesetting',
      redirect: '/modulet-ype-setting',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/module-typese-sting',
        component: Moduletypesetting,
        // component: Home,
        name: 'module-type-setting', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/module-type-setting/module-type',
          component: Moduletype,
          name: '模块类型2',
          menuShow: true
        },
          {
            path: '/module-type-setting/kind',
            component: Kind,
            name: '模块种类',
            menuShow: true
          },
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/module-login-log',
      type: 'home',
      name: 'modulelog',
      redirect: '/module-login-log',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/module-login-log',
        component: Moduleloginlog,
        // component: Home,
        name: 'module-login-log', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/module-login-log/log',
          component: Log,
          name: '模块类型1',
          menuShow: true
        },
          // {path: '/organizationchart/Internalcontrol',  component: Internalcontrol, name: '内控人员和权限管理', menuShow: true},
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/module-versioning',
      type: 'home',
      name: 'moduleversioning',
      redirect: '/module-versioning',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/module-versioning',
        component: Moduleversioning,
        // component: Home,
        name: 'module-versioning', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/module-versioning/version-list',
          component: Versionlist,
          name: '模块类型',
          menuShow: true
        },
          // {path: '/organizationchart/Internalcontrol',  component: Internalcontrol, name: '内控人员和权限管理', menuShow: true},
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/many-stores',
      type: 'home',
      name: 'many-stores',
      redirect: '/many-stores',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/many-stores',
        component: ManyStores,
        // component: Home,
        name: 'many-stores', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/many-stores/many-stores',
          component: ManyStores,
          name: '多店人员管理',
          menuShow: true
        },
          // {path: '/organizationchart/Internalcontrol',  component: Internalcontrol, name: '内控人员和权限管理', menuShow: true},
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/organization',
      type: 'home',
      name: 'ozation',
      redirect: '/organization',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/organization',
        component: Organization,
        // component: Home,
        name: 'organization', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/organization/basic-info',
          component: Basicinfo,
          name: '组织机构管理',
          menuShow: true
        },
          {
            path: '/organizationchart/hotel',
            component: Hotel,
            name: '酒店',
            menuShow: true
          },
          {
            path: '/organizationchart/sections',
            component: Sections,
            name: '部门',
            menuShow: true
          },
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/personal-role',
      type: 'home',
      name: 'personalrole',
      redirect: '/personal-role',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/personal-role',
        component: Personalrole,
        // component: Home,
        name: 'personal-role', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/personal-role/role',
          component: Role,
          name: '人员角色管理',
          menuShow: true
        },
          // {path: '/organizationchart/Internalcontrol',  component: Internalcontrol, name: '内控人员和权限管理', menuShow: true},
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/permissions',
      type: 'home',
      name: 'permi_ssions',
      redirect: '/permissions',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/permissions',
        component: Permissions,
        // component: Home,
        name: 'permissions', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/permissions/role-privileges',
          component: Roleprivileges,
          name: '排版考勤管理',
          menuShow: true
        },
          // {path: '/organizationchart/Internalcontrol',  component: Internalcontrol, name: '内控人员和权限管理', menuShow: true},
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/composing',
      type: 'home',
      name: 'comp_osing',
      redirect: '/composing',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/composing',
        component: Composing,
        // component: Home,
        name: 'composing', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/composing/checking-in',
          component: Checkingin,
          name: '班次设置',
          menuShow: true
        },
          {
            path: '/composing/schedule',
            component: Schedule,
            name: '排班方式',
            menuShow: true
          },
          {
            path: '/composing/crew',
            component: Crew,
            name: '人员排班',
            menuShow: true
          },
          {
            path: '/composing/all_crew',
            component:  Allcrew,
            name: '所有人排班列表',
            menuShow: true
          },
          {
            path: '/composing/crew_calendar',
            component:  crewCalendar,
            name: '排班日历列表',
            menuShow: true
          },
          {
            path: '/composing/summary_one',
            component: SummaryOne,
            name: '考勤一览表',
            menuShow: true
          },
          {
            path: '/composing/audit_management',
            component: AuditManagement,
            name: '审核管理',
            menuShow: true
          },
          {
            path: '/composing/salary_site',
            component: SalarySite,
            name: '考勤地点设置',
            menuShow: true
          }
        ]
      }]
    },
    {
      path: '/pay',
      type: 'home',
      name: 'pay_pay',
      redirect: '/pay',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/pay',
        component: Pay,
        // component: Home,
        name: 'pay', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/pay/compensation',
          component: Compensation,
          name: '薪资管理',
          menuShow: true
        },
          {path: '/pay/SocialSecurity',  component: SocialSecurity, name: '社保管理', menuShow: true},
          {path: '/pay/Monthly',  component: Monthly, name: '月度输入', menuShow: true},
          {path: '/pay/Entering',  component: Entering, name: '考勤录入', menuShow: true},
          {path:'/pay/Salary', component: Salary, name: '生成工资', menuShow: true},
          {path:'/pay/Salarisafschrift',component: Salarisafschrift, name: '工资报表', menuShow: true},
          {path:'/pay/Program',component: Program, name: '薪酬方案', menuShow: true},
          {path:'/pay/establish',component: Establish, name: '创建薪酬方案', menuShow: true},
          {path:'/pay/paycomponent',component: Paycomponent, name: '薪酬分项设置', menuShow: true},
          {path:'/pay/System',component: System, name: '社保方案', menuShow: true},
          {path:'/pay/Submitted',component:Submitted,name:'个人报送',menuShow: true},
          {path:'/pay/IndividualInformation',component:IndividualInformation,name:'个税信息',menuShow: true},
          {path:'/pay/Deduct',component:Deduct,name:'专项附加扣除',menuShow: true},
          {path:'/pay/Payset',component:Payset,name:'设置',menuShow: true},
          {path:'/pay/Paystatement',component:Paystatement,name:'薪资报表',menuShow: true},

        ]
      }]
    },
    {
      path: '/setting',
      type: 'home',
      name: 'seti',
      redirect: '/setting',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/setting',
        component: Setting,
        // component: Home,
        name: 'setg', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/setting/papers',
          component: Papers,
          name: '证件',
          menuShow: true
        },
          {
            path: '/setting/marketing',
            component: Marketing,
            name: '市场销售',
            menuShow: true
          },
          {
            path:'/setting/mission',
            component: Mission,
            name: '任务体系',
            menuShow: true
          },
          {
            path:'/setting/obligation',
            component: Obligation,
            name: '角色职责',
            menuShow: true
          },
          {
            path:'/setting/parameter',
            component: Parameter,
            name: '参数设置',
            menuShow: true
          },
          {
            path: '/setting/wechat',
            component: Wechat,
            name: '微信',
            menuShow: true
          },
          {
            path: '/setting/room-status',
            component: Roomstatus,
            name: '房态1',
            menuShow: true
          },
          {
            path: '/setting/reserve',
            component: Reserve,
            name: '预定1',
            menuShow: true
          },
          {
            path: '/setting/reception',
            component: Reception,
            name: '前台',
            menuShow: true
          },
          {
            path: '/setting/guest-room',
            component: Guestroom,
            name: '客房',
            menuShow: true
          },
          {
            path: '/setting/else',
            component: Else,
            name: '其他',
            menuShow: true
          }
        ]
      }]
    },
    {
      path: '/api',
      type: 'home',
      name: 'api',
      redirect: '/api',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/api',
        component: Api,
        // component: Homes,
        name: 'api', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: '/api', // 图标样式class
        menuShow: true,
        children: [{
          path: '/api',
          component: Api,
          name: 'api列表',
          menuShow: true
        },
          // {path: '/organizationchart/Internalcontrol',  component: Internalcontrol, name: '内控人员和权限管理', menuShow: true},
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/page-management',
      type: 'home',
      name: 'page-management',
      redirect: '/page-management',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/page-management',
        component: Pagemanagement,
        // component: Home,
        name: 'page', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/page-management/page-table',
          component: Pagetable,
          name: '页面管理',
          menuShow: true
        },
          // {path: '/organizationchart/Internalcontrol',  component: Internalcontrol, name: '内控人员和权限管理', menuShow: true},
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      },]
    },
    {
      path: '/admin',
      type: 'home',
      name: 'admin',
      redirect: '/admin',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/admin',
        component: Admin,
        // component: Homes,
        name: 'admin', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: '/admin', // 图标样式class
        menuShow: true,
        children: [{
          path: '/admin',
          component: Admin,
          name: 'admin',
          menuShow: true
        },
          // {path: '/organizationchart/Internalcontrol',  component: Internalcontrol, name: '内控人员和权限管理', menuShow: true},
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    /**
     * 客管家
     */
    // member会员进入路由
    {
      path: '/member',
      type: 'index',
      name: '会员',
      component: () =>
        import('@/views/member/Member'),
      redirect: '/MemberList',
      children: [{
        path: '/MemberPlan',
        component: () =>
          import('@/views/member/MemberPlan'),
        name: 'memberPlan_page'
      },
        {
          path: '/Integral',
          component: () =>
            import('@/views/member/Integral'),
          name: 'Integral_page'
        },
        {
          path: '/Stored',
          component: () =>
            import('@/views/member/Stored'),
          name: 'Stored_page'
        },
        {
          path: '/SaleRules',
          component: () =>
            import('@/views/member/SaleRules'),
          name: 'SaleRules_page'
        },
        {
          path: '/MemberList',
          component: () =>
            import('@/views/member/MemberList'),
          name: 'MemberList_page'
        },
        {
          path: '/IntegralList',
          component: () =>
            import('@/views/member/IntegralList'),
          name: 'IntegralList_page'
        },
        {
          path: '/StoredList',
          component: () =>
            import('@/views/member/StoredList'),
          name: 'StoredList_page'
        }
      ]
    },
    {
      path: '/MemberLogin',
      component: ()=>import('@/views/member/MemberLogin'),
      name: 'MemberLogin'
    },
    {
      path: '/agreement',
      type: 'index',
      name: '会员',
      component: ()=>import('@/views/agreement/agreement'),
      redirect:'/agreementMemberList',
      children: [
        {
          path: '/agreementPlan',
          component: ()=>import('@/views/agreement/agreementPlan'),
          name: 'memberPlan_page'
        },
        {
          path: '/agreementIntegral',
          component: ()=>import('@/views/agreement/agreementIntegral'),
          name: 'Integral_page'
        },
        {
          path: '/agreementStored',
          component: ()=>import('@/views/agreement/agreementStored'),
          name: 'Stored_page'
        },
        {
          path:'/agreementSaleRules',
          component: ()=>import('@/views/agreement/agreementSaleRules'),
          name: 'agreementSaleRules_page'
        },
        {
          path: '/agreementMemberList',
          component: ()=>import('@/views/agreement/agreementMemberList'),
          name: 'agreementMemberList_page'
        },
        {
          path: '/agreementIntegralList',
          component: ()=>import('@/views/agreement/agreementIntegralList'),
          name: 'IntegralList_page'
        },
        {
          path: '/agreementStoredList',
          component: ()=>import('@/views/agreement/agreementStoredList'),
          name: 'agreementStoredList_page'
        }
      ]
    },
    // 客管家宾客的路由
    {
      path: '/guests',
      type: 'guests',
      name: '宾客',
      component: ()=>import('@/views/guests/guests'),
    },
    // 客管家宾客的路由
    {
      path: '/team',
      type: 'team',
      name: '团队',
      component: ()=>import('@/views/team/team'),
    },
    /**
     * 点击铁管家进入的路由
     */
    {
      path: '/ironsteward',
      type: 'ironhome',
      name: 'ironsteward_page',
      redirect: '/ironsteward',
      component: Ironhome,
      menuShow: true,
      children: [{
        path: '/ironsteward',
        component: RightContent,
        // component: Home,
        name: 'ironsteward_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/ironsteward',
          component: Ironsteward,
          name: '铁管家',
          menuShow: true
        }, ]
      }]
    },
    {
      path: '/equipmentcommon',
      type: 'ironhome',
      name: 'equipmentcommon_page',
      redirect: '/equipmentcommon',
      component: Ironhome,
      menuShow: true,
      children: [{
        path: '/equipmentcommon',
        component: RightContent,
        // component: Home,
        name: 'equipmentcommon_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/equipmentcommon',
          component: Equipmentcommon,
          name: '设备',
          menuShow: true
        }, ]
      }]
    },
    {
      path: '/equipmentguest',
      type: 'ironhome',
      name: 'equipmentguest_page',
      redirect: '/equipmentguest',
      component: Ironhome,
      menuShow: true,
      children: [{
        path: '/equipmentguest',
        component: RightContent,
        // component: Home,
        name: 'equipmentguest_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/equipmentguest',
          component: Equipmentguest,
          name: '设备设置',
          menuShow: true
        }, ]
      }]
    },
    {
      path: '/equipmenttype',
      type: 'ironhome',
      name: 'equipmenttype_page',
      redirect: '/equipmenttype',
      component: Ironhome,
      menuShow: true,
      children: [{
        path: '/equipmenttype',
        component: RightContent,
        // component: Home,
        name: 'equipmenttype_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/equipmenttype',
          component: Equipmenttype,
          name: '设备类型',
          menuShow: true
        }, ]
      }]
    },
    {
      path: '/guestcontrol',
      type: 'ironhome',
      name: 'guestcontrol_page',
      redirect: '/guestcontrol',
      component: Ironhome,
      menuShow: true,
      children: [{
        path: '/guestcontrol',
        component: RightContent,
        // component: Home,
        name: 'guestcontrol_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/guestcontrol',
          component: Guestcontrol,
          name: '客控',
          menuShow: true
        }, ]
      }]
    },
    /**
     * 点击会管家进入的路由
     */
    {
      path: '/meetsteward',
      type: 'home',
      name: 'update',
      redirect: '/meetsteward',
      component: Home_meet,
      menuShow: true,
      children: [{
        path: '/meetsteward',
        component: RightContent,
        // component: Home,
        name: 'main_page', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/meetsteward',
          component: Meetsteward,
          name: '主页',
          menuShow: true
        }, ]
      }]
    },
    /**
     * 销控宝路由新
     */

    /**
     * 库管家
     */
    /**
     * 地管家
     */
    {
      path: '/land',
      type: 'index',
      name: '地管家',
      component: () =>
        import('@/views/landsteward/land'),
      redirect: '/roomSetting',
      children: [{
        path: '/roomSetting',
        component: () =>
          import('@/views/landsteward/roomSetting'),
        name: 'roomSetting_page'
      },
        {
          path: '/buroomSetting',
          component: () =>
            import('@/views/landsteward/buroomsetting'),
          name: 'buroomsetting_page'
        },
        {
          path: '/cleanSetting',
          component: () =>
            import('@/views/landsteward/cleansetting'),
          name: 'cleansetting_page'
        },
        {
          path: '/eatSetting',
          component: () =>
            import('@/views/landsteward/eatsetting'),
          name: 'eatsetting_page'
        },
        {
          path: '/elevatorSetting',
          component: () =>
            import('@/views/landsteward/elevatorsetting'),
          name: 'elevatorsetting_page'
        },
        {
          path: '/gtingSetting',
          component: () =>
            import('@/views/landsteward/gtingsetting'),
          name: 'gtingsetting_page'
        },
        {
          path: '/ktvSetting',
          component: () =>
            import('@/views/landsteward/ktvsetting'),
          name: 'ktvsetting_page'
        },
        {
          path: '/lobbySetting',
          component: () =>
            import('@/views/landsteward/lobbysetting'),
          name: 'lobbysetting_page'
        },
        {
          path: '/mettingSetting',
          component: () =>
            import('@/views/landsteward/mettingsetting'),
          name: 'mettingsetting_page'
        },
        {
          path: '/storeSetting',
          component: () =>
            import('@/views/landsteward/storesetting'),
          name: 'storesetting_page'
        },
        {
          path: '/weakSetting',
          component: () =>
            import('@/views/landsteward/weaksetting'),
          name: 'weaksetting_page'
        }
      ]
    },
    /**
     * 钱管家路由
     *
     */
    {
      path: '/welcome-money',
      type: 'home',
      name: 'money',
      redirect: '/welcome-money',
      component: HomeShopping,
      menuShow: true,
      children: [{
        path: '/welcome-money',
        component: Welcomemoney,
        // component: Home,
        name: 'welcome-money', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: 'welcome-money',
          component: Welcomemoney,
          name: '欢迎页面',
          menuShow: true
        },

        ]
      }]
    },
    {
      path: '/accounting',
      type: 'home',
      name: 'accounting',
      redirect: '/accounting',
      component: HomeShopping,
      menuShow: true,
      children: [{
        path: '/accounting',
        component: Accounting,
        // component: Home,
        name: 'accounting_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/accounting',
          component: Curtain,
          name: '帐',
          menuShow: true
        },
          {
            path: '/accounting/money',
            component: Money,
            name: '钱',
            menuShow: true
          },
          {
            path: '/accounting/ticket',
            component: Ticket,
            name: '票',
            menuShow: true
          },
          {
            path: '/accounting/advanced',
            component: Advanced,
            name: '设置',
            menuShow: true
          },

        ]
      }]
    },
    {
      path: '/money',
      type: 'home',
      name: 'money',
      redirect: '/money',
      component: HomeShopping,
      menuShow: true,
      children: [{
        path: '/money',
        component: Money,
        // component: Home,
        name: 'money_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/money/cash',
          component: Cash,
          name: '现金',
          menuShow: true
        },

        ]
      }]
    },
    {
      path: '/ticket',
      type: 'home',
      name: 'ticket',
      redirect: '/ticket',
      component: HomeShopping,
      menuShow: true,
      children: [{
        path: '/ticket',
        component: Ticket,
        // component: Home,
        name: 'ticket_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/ticket/ballot',
          component: Ballot,
          name: '票据',
          menuShow: true
        },

        ]
      }]
    },
    {
      path: '/advanced',
      type: 'home',
      name: 'advanced',
      redirect: '/advanced',
      component: HomeShopping,
      menuShow: true,
      children: [{
        path: '/advanced',
        component: Advanced,
        // component: Home,
        name: 'advanced_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/advanced/entry-value',
          component: Entryvalue,
          name: '入账代码',
          menuShow: true
        },
          {
            path: '/advanced/brew',
            component: Brew,
            name: '冲调帐原因',
            menuShow: true
          },
          {
            path: '/advanced/audit',
            component: Audit,
            name: '查账原因',
            menuShow: true
          },
          {
            path: '/advanced/revocation',
            component: Revocation,
            name: '撤销原因',
            menuShow: true
          },
          {
            path: '/advanced/payment_method',
            component: Paymentmethod,
            name: '付款方式设置',
            menuShow: true
          },
          {
            path: '/advanced/template',
            component: Template,
            name: '付款方式模板设置',
            menuShow: true
          },
          {
            path: '/advanced/payment_account',
            component: paymentaccount,
            name: '付款原因',
            menuShow: true
          },
          {
            path: '/advanced/commercial-bill',
            component: Commercialbill,
            name: '票据种类设置',
            menuShow: true
          },
          {
            path: '/advanced/ar_account',
            component: ARaccount,
            name: 'AR账户设置',
            menuShow: true
          },
          {
            path: '/advanced/cashiers',
            component: Cashiers,
            name: '收银点操作记录',
            menuShow: true
          },
          {
            path: '/advanced/checkstand',
            component: Checkstand,
            name: '收银点设置',
            menuShow: true
          },
          {
            path: '/advanced/security_type',
            component: Securitytype,
            name: '担保种类设置',
            menuShow: true
          },
          {
            path: '/advanced/currency',
            component: Currency,
            name: '币种设置',
            menuShow: true
          },
          {
            path:'/advanced/parameters',
            component: Parameters,
            name: '参数设置',
            menuShow: true
          },
          {
            path: '/advanced/fixed_charges',
            component: Fixedcharges,
            name: '固定支出',
            menuShow: true
          },
          {
            path: '/advanced/credit-card',
            component: Creditcard,
            name: '信用卡设置',
            menuShow: true
          },
        ]
      }]
    },
    /**
     * 车管家
     */

    /**
     * 事管家
     */
    {
      path: '/tasks',
      type: 'home',
      name: 'tasks',
      redirect: '/tasks',
      component: Taskscommon,
      menuShow: true,
      children: [{
        path: '/tasks',
        component: Tasks,
        // component: Home,
        name: 'tasks_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/tasks/person',
          component: Person,
          name: '送物',
          menuShow: true
        },
          {
            path: '/tasks/room-service',
            component: Roomservice,
            name: '送餐',
            menuShow: true
          },
          {
            path: '/tasks/purchase',
            component: Purchase,
            name: '采购',
            menuShow: true
          },
          {
            path: '/tasks/shuttle-bus',
            component: Shuttlebus,
            name: '班车',
            menuShow: true
          },
          {
            path: '/tasks/engineering',
            component: Engineering,
            name: '工程配合',
            menuShow: true
          },
          {
            path: '/tasks/human',
            component: Human,
            name: '人员协作',
            menuShow: true
          },
          {
            path: '/tasks/awaken',
            component: Awaken,
            name: '叫醒',
            menuShow: true
          },
          {
            path: '/tasks/surveillance',
            component: Surveillance,
            name: '监控',
            menuShow: true
          },
          {
            path: '/tasks/visiting-book',
            component: Visiting,
            name: '访客登记',
            menuShow: true
          },
          {
            path:'/tasks/approval',
            component:Approval,
            name: '审批',
            menuShow: true
          }
        ]
      }]
    },
    /**
     * ota直连
     * */
    {
      path: '/connection',
      type: 'home',
      name: 'connection',
      redirect: '/connection',
      component: Connectioncommon,
      menuShow: true,
      children: [{
        path: '/connection',
        component: Connection,
        // component: Home,
        name: 'connection_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [
          {
            path: '/connection/order-form',
            component: Orderform,
            name: '订单',
            menuShow: true
          },
          {
            path: '/connection/product',
            component:Product,
            name: '产品',
            menuShow: true
          },
          {
            path: '/connection/ota-set',
            component:Otaset,
            name: '设置',
            menuShow: true
          },
          {
            path: '/connection/ota-report',
            component:Reportota,
            name: '报表',
            menuShow: true
          },

        ]
      }]
    },

    /**
     * 自由人
     * */
    {
      path: '/freedom',
      type: 'home',
      name: 'freedom',
      redirect: '/freedom',
      component: Freedomcommon,
      menuShow: true,
      children: [{
        path: '/freedom',
        component: Freedom,
        // component: Home,
        name: 'freedom_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/freedom/self-help',
          component: Selfhelp,
          name: '自助机操作日志',
          menuShow: true
        },
          {
            path: '/freedom/self-journal',
            component: Selfjournal,
            name: '自助机卡日志',
            menuShow: true
          },
          {
            path: '/freedom/self-set',
            component: Selfset,
            name: '设置',
            menuShow: true
          },
          {
            path: '/freedom/operational',
            component: Operational,
            name: '运维',
            menuShow: true
          },

        ]
      }]
    },
    /**
     * 路眼
     * */
    {
      path: '/pathway-eyes',
      type: 'home',
      name: 'pathway-eyes',
      redirect: '/pathway-eyes',
      component: Pathwaycommon,
      menuShow: true,
      children: [{
        path: '/pathway',
        component: Pathway,
        // component: Home,
        name: 'pathway_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/pathway/eyes',
          component: Eyes,
          name: '路眼',
          menuShow: true
        },
          {
            path: '/pathway/visitor',
            component: Visitor,
            name: '陌生人管理',
            menuShow: true
          },
          // pathway-set
          {
            path: '/pathway/pathway-set',
            component: Pathwayset,
            name: '设置',
            menuShow: true
          },
        ]
      }]
    },
  ]
});
//这个不知道什么用，影响现在的功能，不能跳转路由，暂时注释
/*router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if(to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else if(to.path.startsWith('/register')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if(!user) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
});*/

// router.addRoutes(orderManagerRouter)

export default router
