<template>
  <div class="newblog">
    <el-row>
      <el-col :span="12" class="left-area">
        <el-tooltip class="item" effect="dark" content="设置" placement="top-start">
          <el-button style="float: left;" @click="dialogFormVisible = true" icon="el-icon-setting" circle></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="插入图片" placement="top-start">
          <el-button style="float: left;" @click="dialogPicVisible = true" icon="el-icon-upload" circle></el-button>
        </el-tooltip>
        <div class="grid-content bg-purple area">
          <input class="nb-title nb-input" placeholder="标题" type="text" v-model="nb_title">
          <textarea placeholder="博客正文" class="nb-textarea" v-model="mdblog"></textarea>
        </div>
      </el-col>
      <el-col :span="12" class="right-area">
        <el-tooltip class="item" effect="dark" content="保存" placement="top-end">
          <el-button style="float: right;" icon="el-icon-circle-check" circle></el-button>
        </el-tooltip>
        <div class="grid-content bg-purple area">
          <div class="nb-title">{{nb_title}}</div>
          <div class="right-blog-area" v-html="_htblog"></div>
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
            v-model="selectedTag"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择文章标签">
          <el-option
              v-for="item in existTag"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="插入图片" width="30%" :visible.sync="dialogPicVisible">
      <el-upload
          style="text-align: center;"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-success="successCallback"
          :on-error="errorCallback"
          :multiple=false
          :show-file-list=false
          drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-input @keyup.enter.native="setOnlinePic" style="margin-top: 20px;" placeholder="或者输入网络图片链接并回车" v-model="onlinePic"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPicVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import marked from "marked";
import "highlight.js/styles/monokai-sublime.css";
import highlight from "highlight.js";

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  headerPrefix: "ddd",
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: true,
  highlight: function(code) {
    return highlight.highlightAuto(code).value;
  }
});
export default {
  data() {
    return {
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
      // selectedCategory: "", // 已选择的分类 （分类只能选一个）
      // existCategory: [], // 已存在的分类

      dialogPicVisible: false,
      onlinePic: null
    };
  },
  mounted() {
    // debugger;
    // if (this.$route.name === "editblog") {
    //   let id = this.$route.params.id;
    // }
  },
  components: {},
  computed: {
    _htblog() {
      return marked(this.mdblog);
    }
  },
  methods: {
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
