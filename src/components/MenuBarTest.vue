<template>
  <el-container>
    <!-- 左侧菜单开始 -->
    <el-aside width="auto">
      <el-menu
          default-active=""
          class="menu-bar"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
      >
        <MenuItemTest :menuList="menuList"></MenuItemTest>
      </el-menu>
    </el-aside>
    <!--左侧菜单结束 -->
    <!-- 右侧内容显示区 -->
    <el-container style="background:red">
      <el-main style='background:#FFF;'>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import MenuItemTest from "@/components/MenuItemTest";

export default {
  name: "MenuBarTest",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    MenuItemTest
  },
  data() {
    return {
      menuList: [
        {
          children: [
            {
              children: [],
              code: "sys:dept",
              createTime: 1586703509000,
              icon: "el-icon-copy-document",
              id: 33,
              isHome: 0,
              label: "机构管理",
              name: "departmentList",
              orderNum: 2,
              parentId: 17,
              path: "/departmentList",
              remark: "机构管理",
              type: "1",
              updateTime: 1586337139000,
              url: "/system/Department/DepartmentList"
            },
            {
              children: [],
              code: "sys:user",
              createTime: 1691464271000,
              icon: "el-icon-s-custom",
              id: 18,
              isHome: 0,
              label: "用户管理",
              name: "userList",
              orderNum: 3,
              parentId: 17,
              path: "/userList",
              type: "1",
              updateTime: 1691565988000,
              url: "/system/User/UserList"
            },
            {
              children: [],
              code: "sys:role",
              createTime: 1691464271000,
              icon: "el-icon-rank",
              id: 23,
              isHome: 0,
              label: "角色管理",
              name: "roleList",
              orderNum: 4,
              parentId: 17,
              path: "/roleList",
              type: "1",
              updateTime: 1691565988000,
              url: "/system/Role/RoleList"
            },
            {
              children: [],
              code: "sys:menu",
              createTime: 1691464271000,
              icon: "el-icon-menu",
              id: 28,
              isHome: 0,
              label: "权限管理",
              name: "menuList",
              orderNum: 5,
              parentId: 17,
              path: "/menuList",
              type: "1",
              updateTime: 1691565988000,
              url: "/system/Menu/MenuList"
            }
          ],
          code: "sys:manage",
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
              code: "sys:goodsCategory",
              createTime: 1586703272000,
              icon: "el-icon-s-data",
              id: 36,
              isHome: 0,
              label: "分类管理",
              name: "goodCategory",
              orderNum: 1,
              parentId: 34,
              path: "/goodCategory",
              type: "1",
              updateTime: 1586683590000,
              url: "/goods/goodsCategory/goodsCategoryList"
            },
            {
              children: [],
              code: "sys:goodsBrand",
              createTime: 1586683924000,
              icon: "el-icon-tickets",
              id: 37,
              isHome: 0,
              label: "品牌管理",
              name: "goodsBrand",
              orderNum: 2,
              parentId: 34,
              path: "/goodsBrand",
              type: "1",
              updateTime: 1586683924000,
              url: "/goods/goodsBrand/goodsBrandList"
            }
          ],
          code: "sys:goods",
          createTime: 1586702987000,
          icon: "el-icon-picture",
          id: 34,
          isHome: 0,
          label: "商品管理",
          name: "",
          orderNum: 2,
          parentId: 0,
          path: "/goods",
          type: "0",
          updateTime: 1586683323000
        },
        {
          children: [
            {
              children: [],
              code: "sys:systemCode",
              createTime: 1587012282000,
              icon: "el-icon-files",
              id: 43,
              isHome: 0,
              label: "代码生成",
              name: "systemCode",
              orderNum: 0,
              parentId: 42,
              path: "/systemCode",
              type: "1",
              updateTime: 1586684646000,
              url: "/system/config/code"
            },
            {
              children: [],
              code: "sys:document",
              createTime: 1586748705000,
              icon: "el-icon-s-operation",
              id: 77,
              isHome: 0,
              label: "接口文档",
              name: "document",
              orderNum: 0,
              parentId: 42,
              path: "/document",
              type: "1",
              updateTime: 1586748705000,
              url: "/system/config/systemDocument"
            }
          ],
          code: "sys:systenConfig",
          createTime: 1586703003000,
          icon: "el-icon-receiving",
          id: 42,
          isHome: 0,
          label: "系统工具",
          name: "",
          orderNum: 3,
          parentId: 0,
          path: "/systenConfig",
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