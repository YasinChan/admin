<template>
  <div class="bloglist">
    <el-button @click="routerPush('new', null)" type="success">新建文章</el-button>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          label="ID"
          width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="标题"
          width="120">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="编写日期"
          width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="修改日期"
          width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.updated_at }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="标签"
          width="380">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.tags" size="medium" :key="item.id">{{ item.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="routerPush('edit', scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPosts, deletePostById } from "@/common/js/api";
import tinydate from "tinydate";

const stamp = tinydate("{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}");

export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    getPosts().then(res => {
      let result = res.data.result;

      result.forEach(v => {
        v.created_at = stamp(new Date(v.created_at));
        v.updated_at = stamp(new Date(v.updated_at));
      });

      this.tableData = result;
    });
  },
  methods: {
    routerPush(type, row) {
      if (type === "new") {
        this.$router.push({ path: "/newblog" });
      } else {
        this.$router.push({ path: `/editblog/${row.id}` });
      }
    },
    handleDelete(index, row) {
      console.log(index, row);
      deletePostById(row.id).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
