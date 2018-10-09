<template>
  <div class="newblog">
    <el-row>
      <el-col :span="12" class="left-area">
        <el-tooltip class="item" effect="dark" content="设置" placement="top-start">
          <el-button style="float: left;" @click="openSetting" icon="el-icon-setting" circle></el-button>
        </el-tooltip>
        <Upload @childExcute="getPicIdFromChild"></Upload>
        <div class="grid-content bg-purple area">
          <input class="nb-title nb-input" placeholder="标题" type="text" v-model="nb_title">
          <textarea placeholder="博客正文" class="nb-textarea" v-model="mdblog"></textarea>
        </div>
      </el-col>
      <el-col :span="12" class="right-area">
        <el-tooltip class="item" effect="dark" content="保存" placement="top-end">
          <el-button @click="saveBlog" style="float: right;" icon="el-icon-circle-check" circle></el-button>
        </el-tooltip>
        <div class="grid-content bg-purple area">
          <div class="nb-title">{{nb_title}}</div>
          <div class="markdown-body right-blog-area" v-html="_htblog"></div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="设置" width="30%" center :visible.sync="dialogFormVisible">
      <div class="dialog-li">
        <span class="dialog-li-title">编写日期</span>
        <el-date-picker
            v-model="editDate"
            type="datetime"
            placeholder="选择编写日期时间"
            align="right"
            :picker-options="pickerOptions1">
        </el-date-picker>
      </div>
      <div class="dialog-li">
        <span class="dialog-li-title">修改日期</span>
        <el-date-picker
            v-model="changeDate"
            type="datetime"
            placeholder="选择修改日期时间"
            align="right"
            :picker-options="pickerOptions1">
        </el-date-picker>
      </div>
      <div class="dialog-li">
        <span class="dialog-li-title">标签</span>
        <el-select
            v-model="_selectedTagName"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择文章标签">
          <el-option
              v-for="item in existTag"
              :key="item.id"
              :label="item.name"
              :value="item.name">
          </el-option>
        </el-select>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script>
import {
  getPostById,
  updatePost,
  getTags,
  updatetagbypostid,
  createPost
} from "@/common/js/api";
import marked from "marked";
import "highlight.js/styles/monokai-sublime.css";
import highlight from "highlight.js";
import Upload from "@/components/upload.vue";

marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  highlight: function(code) {
    return highlight.highlightAuto(code).value;
  }
});
export default {
  data() {
    return {
      preview: "",
      mdblog: "",
      nb_title: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      editDate: "",
      changeDate: "",
      pickerOptions1: {
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
      selectedTag: [], // 已选择的标签
      existTag: [], // 已存在的标签

      dialogPicVisible: false,
      picture_id: null
    };
  },
  components: {
    Upload
  },
  mounted() {
    if (this.$route.name === "editblog") {
      let id = this.$route.params.id;
      getPostById(id).then(res => {
        console.log(res);
        let data = res.data.result;
        this.mdblog = data.markdown;
        this.nb_title = data.title;
        this.preview = data.preview;
        this.editDate = data.created_at;
        this.changeDate = data.updated_at;
        this.selectedTag = data.tags;
        this.picture_id = data.picture_id;
      });
    }
  },
  computed: {
    _htblog() {
      return marked(this.mdblog);
    },
    _selectedTagId() {
      return this.selectedTag.map(v => v.id);
    },
    _selectedTagName: {
      get() {
        return this.selectedTag.map(v => v.name);
      },
      set(i) {
        let arr = [];
        this.existTag.forEach(v => {
          i.forEach(vv => {
            if (v.name === vv) {
              arr.push(v);
            }
          });
        });
        this.selectedTag = arr;
      }
    }
  },
  methods: {
    getPicIdFromChild(id) {
      this.picture_id = id;
    },
    openSetting() {
      getTags().then(res => {
        this.existTag = res.data.result;
      });
      this.dialogFormVisible = true;
    },
    saveBlog() {
      if (this.$route.name === "editblog") {
        let param = {
          id: this.$route.params.id,
          title: this.nb_title,
          preview: this.preview,
          markdown: this.mdblog,
          rendered: marked(this.mdblog),
          picture_id: this.picture_id,
          created_at: this.editDate,
          updated_at: this.changeDate
        };
        updatePost(param).then(res => {
          console.log(res);
          this.$message({
            message: "保存成功！",
            type: "success"
          });
        });
        updatetagbypostid({
          post_id: this.$route.params.id,
          tag_id: this._selectedTagId
        }).then(res => {
          this.$message({
            message: "保存成功！",
            type: "success"
          });
          console.log(res);
        });
      } else {
        let param = {
          title: this.nb_title,
          preview: this.preview,
          markdown: this.mdblog,
          rendered: marked(this.mdblog),
          picture_id: this.picture_id,
          created_at: this.editDate,
          updated_at: this.changeDate
        };
        createPost(param).then(res => {
          let post_id = res.data.result.data.post_id;
          updatetagbypostid({
            post_id: post_id,
            tag_id: this._selectedTagId
          }).then(res => {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
            console.log(res);
          });
        });
      }
    },
    successCallback() {},
    errorCallback() {},
    setOnlinePic() {
      let val = `![](${this.onlinePic})`;
      this.mdblog += val;
      this.dialogPicVisible = false;
      this.onlinePic = null;
    }
  }
};
</script>

<style scoped>
.area {
  padding: 30px 40px;
  height: calc(100vh - 100px);
}
.left-area {
  background: #f2f6fc;
  border-right: solid 1px #e6e6e6;
}
.right-area {
  /* background: #f8f9fa; */
}
.nb-title {
  display: block;
  font-size: 28px;
  text-align: center;
}
.nb-input {
  border-style: none;
  border-bottom: 1px dotted;
  width: 100%;
  outline: none;
  background: #f2f6fc;
}
.nb-textarea {
  font-size: 16px;
  width: 100%;
  outline: none;
  padding-top: 20px;
  border-style: none;
  resize: none;
  height: calc(100% - 50px);
  background: #f2f6fc;
}
.right-blog-area {
  padding-top: 20px;
  height: 100%;
  overflow: scroll;
}
.newblog {
  border: solid 1px #e6e6e6;
}
.newblog-bottom {
  height: 40px;
  background: #fff;
  border-top: solid 1px #e6e6e6;
  line-height: 40px;
}
.dialog-li {
  margin-bottom: 10px;
  text-align: center;
}
.dialog-li-title {
  margin-right: 10px;
}
</style>
