<template>
  <div class="bloglist">
    <el-button @click="routerPush('new', null)" type="success">新建文章</el-button>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          label="ID"
          width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="日期"
          width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="标题"
          width="180">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="标签"
          width="380">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.tag" size="medium" :key="item">{{ item }}</el-tag>
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
export default {
  data() {
    return {
      tableData: [
        {
          id: "1",
          date: "2016-05-02",
          title: "标题一",
          tag: ["标签一", "标签二", "标签三"]
        },
        {
          id: "2",
          date: "2016-05-04",
          title: "标题一",
          tag: ["标签一", "标签二", "标签三"]
        },
        {
          id: "3",
          date: "2016-05-01",
          title: "标题一",
          tag: ["标签一", "标签二", "标签三"]
        },
        {
          id: "4",
          date: "2016-05-03",
          title: "标题一",
          tag: ["标签一", "标签二", "标签三"]
        }
      ]
    };
  },
  methods: {
    routerPush(type, row) {
      debugger;
      if (type === "new") {
        this.$router.push({ path: "/newblog" });
      } else {
        this.$router.push({ path: `/editblog/${row.id}` });
      }
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>
