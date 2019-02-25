<template>
<el-menu
  :default-active="$route.path"
  router
  class="el-menu-vertical-demo"
  @open="handleOpen"
  @close="handleClose"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="/">
    <i class="el-icon-document"></i>
    <span slot="title">书籍列表</span>
  </el-menu-item>
  <el-menu-item index="/form">
    <i class="el-icon-circle-plus"></i>
    <span slot="title">添加书籍</span>
  </el-menu-item>
  <el-menu-item index="/searchBook">
    <i class="el-icon-search"></i>
    <span slot="title">ISBN查书</span>
  </el-menu-item>
  <el-menu-item index="4">
    <i class="el-icon-setting"></i>
    <span slot="title">备用四</span>
  </el-menu-item>
  <el-submenu index="5">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span style="font-size: 18px">备用五</span>
    </template>
    <el-menu-item index="5-1">选项1</el-menu-item>
    <el-menu-item index="5-2">选项2</el-menu-item>
  </el-submenu>
</el-menu>
</template>

<script>
export default {
  name: 'HomeNavMenu',
  data () {
    return {
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .el-menu-item, .el-submenu__title
    line-height: 50px
    font-size: .36rem
  span
    .36rem
</style>
