<template>
  <el-container>
    <!-- 左侧菜单开始 -->
    <el-aside width="auto">
      <el-menu
          :default-active="$route.path"
          class="menu-bar"
          :collapse="isCollapse"
      >
        <MenuItemTest :menuList="menuList"></MenuItemTest>
      </el-menu>
    </el-aside>
    <!--左侧菜单结束 -->
    <!-- 右侧内容显示区 -->


  </el-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import MenuItemTest from "@/components/MenuItem";
// eslint-disable-next-line no-unused-vars
import tabs from "@/components/tabs";
export default {
  name: "MenuBarTest",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    MenuItemTest,
    // eslint-disable-next-line vue/no-unused-components
    tabs
  },
  data() {
    return {
      isCollapse:false,
      menuList: [
        {
          children: [
            {
              children: [],
              code: "company:dept",
              createTime: 1586703509000,
              icon: "el-icon-copy-document",
              id: 33,
              isHome: 0,
              label: "公司平台管理",
              name: "CompanyList",
              orderNum: 2,
              parentId: 17,
              path: "/companyList",
              type: "1",
              updateTime: 1586337139000,
              url: "/system/Department/DepartmentList"
            },
            {
              children: [],
              code: "company:user",
              createTime: 1691464271000,
              icon: "el-icon-s-custom",
              id: 18,
              isHome: 0,
              label: "平台操作员管理",
              name: "OperatorList",
              orderNum: 3,
              parentId: 17,
              path: "/operatorList",
              type: "1",
              updateTime: 1691565988000,
              url: "/system/User/UserList"
            },
          ],
          code: "company:manage",
          createTime: 1691464271000,
          icon: "el-icon-document",
          id: 17,
          isHome: 0,
          label: "系统管理",
          orderNum: 1,
          parentId: 0,
          path: "/system",
          type: "0",
          updateTime: 1691565988000
        },
        {
          children: [
            {
              children: [],
              code: "company:goodsCategory",
              createTime: 1586703272000,
              icon: "el-icon-s-data",
              id: 36,
              isHome: 0,
              label: "登录次数统计",
              name: "LoginCount",
              orderNum: 1,
              parentId: 34,
              path: "/loginCount",
              type: "1",
              updateTime: 1586683590000,
              url: "/goods/goodsCategory/goodsCategoryList"
            }
          ],
          code: "company:goods",
          createTime: 1586702987000,
          icon: "el-icon-user",
          id: 34,
          isHome: 0,
          label: "用户管理",
          name: "",
          orderNum: 2,
          parentId: 0,
          path: "/goods",
          type: "0",
          updateTime: 1586683323000
        },
        {
          children: "",
          code: "company:systenConfig",
          createTime: 1586703003000,
          icon: "el-icon-receiving",
          id: 42,
          isHome: 0,
          label: "日志管理",
          name: "LogList",
          orderNum: 3,
          parentId: 0,
          path: "/logList",
          type: "0",
          updateTime: 1586684441000
        }
      ]
    };
  }
}
</script>

<style scoped>

/* 此样式用于设置 el-aside width="auto" 宽度为auto的样式 */
.menu-bar:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  border-right: none !important;
}

.el-aside {
  border-right: solid 1px #e6e6e6;
}
</style>