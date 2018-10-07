<template>
  <div class="upload">
    <el-tooltip class="item" effect="dark" content="上传图片" placement="top-start">
      <el-button style="float: left;" @click="dialogPicVisible = true" icon="el-icon-upload" circle></el-button>
    </el-tooltip>
    <el-dialog title="插入图片" width="30%" :visible.sync="dialogPicVisible">
      <el-upload
          style="text-align: center;"
          class="upload-demo"
          action="https://up.qbox.me"
          :before-upload="beforeUpload"
          :on-success="successCallback"
          :on-error="errorCallback"
          :multiple=false
          :show-file-list=false
          :data="form"
          drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPicVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUptoken, savePicture } from "@/common/js/api";
import nanoid from "nanoid";
export default {
  name: "photos",
  data() {
    return {
      dialogPicVisible: false,
      form: {}
    };
  },
  methods: {
    beforeUpload(file) {
      console.log(file);
      let type = file.type && file.type.match(/\/(\w+)/)[1];
      return getUptoken().then(res => {
        let data = res.data;
        this.form = {
          key: `${nanoid(8)}.${type}`,
          token: data
        };
      });
    },
    successCallback(res) {
      savePicture(res).then(res => {
        console.log(res);
        this.$message({
          message: "上传成功！",
          type: "success"
        });
        this.$emit("childExcute", res.data.result.id);
      });
    },
    errorCallback() {}
  }
};
</script>

<style scoped>
</style>
