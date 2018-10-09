<template>
  <div class="notes">
    <el-button @click="newNote" type="success">新建便签</el-button>
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
          <span style="margin-left: 10px">{{ scope.row.updated_at }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="标题"
          width="680">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编写便签" :visible.sync="dialogTableVisible">
      <el-date-picker
          class="datePick"
          v-model="date"
          align="right"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM.dd"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions">
      </el-date-picker>
      <el-button @click="saveNote" class="btn" type="success" icon="el-icon-check" circle></el-button>
      <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="noteContent">
      </el-input>
    </el-dialog>
  </div>
</template>

<script>
import { getNotes, createNote, deleteNote } from "@/common/js/api.js";

import tinydate from "tinydate";

const stamp = tinydate("{YYYY}-{MM}.{DD}");
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      date: "",
      noteContent: "",
      dialogTableVisible: false,
      tableData: [
        {
          id: "1",
          created_at: "2016-05-02",
          title: "标题一"
        },
        {
          id: "2",
          created_at: "2016-05-04",
          title: "标题一"
        },
        {
          id: "3",
          created_at: "2016-05-01",
          title: "标题一"
        },
        {
          id: "4",
          created_at: "2016-05-03",
          title: "标题一"
        }
      ]
    };
  },
  mounted() {
    getNotes().then(res => {
      let result = res.data.result;
      result.forEach(v => {
        v.updated_at = stamp(new Date(v.updated_at));
      });
      this.tableData = result;
    });
  },
  methods: {
    saveNote() {
      createNote({ content: this.noteContent }).then(res => {
        console.log(res);
        this.$message({
          message: "新建标签成功",
          type: "success"
        });
        this.dialogTableVisible = false;
      });
    },
    newNote() {
      this.dialogTableVisible = true;
    },
    handleDelete(index, row) {
      deleteNote(row.id).then(res => {
        this.$message({
          message: res.data.result,
          type: "success"
        });
      });
    }
  }
};
</script>

<style scoped>
.datePick {
  margin-bottom: 20px;
}
.btn {
  float: right;
}
</style>
