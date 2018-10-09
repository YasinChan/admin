<template>
  <div class="tags">
    <el-alert
        style="margin-bottom: 20px;"
        title="标签不可轻易删除！"
        type="warning"
        center
        :closable="false">
    </el-alert>
    <el-button @click="addTag" type="success">添加标签</el-button>
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
          label="名称"
          width="180">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="edit(scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="标签设置" width="30%" center :visible.sync="dialogFormVisible">
      <div class="dialog-li">
        <span class="dialog-li-title">ID: </span>
        <span>{{ tagId }}</span>
      </div>
      <div class="dialog-li">
        <span class="dialog-li-title">名称</span>
        <el-input placeholder="请输入便签名" v-model="tagName"></el-input>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增标签" width="30%" center :visible.sync="dialogTagVisible">

      <div class="dialog-li">
        <span class="dialog-li-title">名称</span>
        <el-input placeholder="请输入便签名" v-model="newTagName"></el-input>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmNewTag">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getTags, updateTag, createTag } from "@/common/js/api";
export default {
  name: "tags",
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      dialogTagVisible: false,
      newTagName: "",
      tagId: "",
      tagName: "",
      originTagName: ""
    };
  },
  mounted() {
    getTags().then(res => {
      this.tableData = res.data.result;
    });
  },
  methods: {
    confirmNewTag() {
      createTag({ name: this.newTagName }).then(res => {
        console.log(res);
        this.tableData.push(res.data.result);
        this.dialogTagVisible = false;
      });
    },
    addTag() {
      this.dialogTagVisible = true;
    },
    edit(row) {
      this.dialogFormVisible = true;
      this.tagId = row.id;
      this.originTagName = this.tagName = row.name;
    },
    // handleDelete(idx) {},
    confirm() {
      if (this.originTagName !== this.tagName) {
        updateTag({ id: this.tagId, name: this.tagName }).then(res => {
          console.log(res);
          this.tableData.forEach(v => {
            if (v.name === this.originTagName) {
              v.name = this.tagName;
            }
          });
          this.dialogFormVisible = false;
        });
      }
    }
  }
};
</script>

<style scoped>
</style>
