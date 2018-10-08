<template>
  <div class="photos">
    <upload style="height: 50px;"></upload>
    <el-row :gutter="20">
      <el-col v-for="item in photoData" style=" margin-bottom: 20px;" :key="item.id" :span="8">
        <el-card :body-style="{ padding: '0px' }">
          <img style="width: 100%; height: 300px; object-fit: cover;" :src="item.url" class="image">
          <div style="padding: 14px;">
            <span>{{ item.description }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.updated_at }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import { getUptoken, savePicture, getUploads } from "@/common/js/api";
import nanoid from "nanoid";
import Upload from "@/components/upload.vue";

import tinydate from "tinydate";

const stamp = tinydate("{YYYY}-{MM}-{DD}");

export default {
  name: "photos",
  data() {
    return {
      dialogPicVisible: false,
      onlinePic: "",
      form: {},
      photoData: []
    };
  },
  components: {
    Upload
  },
  mounted() {
    getUploads().then(res => {
      let result = res.data.result;
      result.forEach(v => {
        v.updated_at = stamp(new Date(v.updated_at));
        v.created_at = stamp(new Date(v.created_at));
      });
      this.photoData = result;
    });
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
      });
    },
    errorCallback() {}
  }
};
</script>

<style scoped>
</style>
