<template>
  <div class="photos">
    <upload></upload>
  </div>
</template>

<script>
import { getUptoken, savePicture } from "@/common/js/api";
import nanoid from "nanoid";
import Upload from "@/components/upload.vue";
export default {
  name: "photos",
  data() {
    return {
      dialogPicVisible: false,
      onlinePic: "",
      form: {}
    };
  },
  components: {
    Upload
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
