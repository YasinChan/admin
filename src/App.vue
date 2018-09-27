<template>
  <el-container style="height: 100vh;">
    <el-menu router default-active="/" class="el-menu-vertical-demo" :collapse="false">
      <el-menu-item index="/">
        <i class="el-icon-document"></i>
        <span slot="title">文章</span>
      </el-menu-item>
      <el-menu-item index="photos">
        <i class="el-icon-menu"></i>
        <span slot="title">相册</span>
      </el-menu-item>
      <el-menu-item index="notes">
        <i class="el-icon-tickets"></i>
        <span slot="title">便签</span>
      </el-menu-item>
      <el-menu-item index="about">
        <i class="el-icon-info"></i>
        <span slot="title">关于</span>
      </el-menu-item>
      <el-menu-item index="setting">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
