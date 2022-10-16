<template>
  <div>
    <input type="file" accept="image/*" @change="onChange" />
    <img
      v-if="previewImage"
      :src="previewImage"
      alt="预览图"
      style="max-width: 100%; max-height: 100%;z-index: 100;"
    />
    <Cropper
      v-if="cropperVisible"
      :imagePath="imagePath"
      fileType="blob"
      @save="onSave"
      @cancel="onCancel"
    />
    {{ src }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: { src: String },
  components: {},
  methods: {
    onChange(e: any) {
      const file = e.target.files[0];
      this.imagePath = URL.createObjectURL(file);
      this.cropperVisible = true;
    },

    onSave(res: any) {
      if (typeof res === "string") {
        this.previewImage = res;
      } else {
        this.previewImage = URL.createObjectURL(res);
      }
      this.cropperVisible = false;
    },
    onCancel() {
      this.cropperVisible = false;
    },
  },
  data: () => ({
    option: {
      size: 1,
      outputType: "png",
    },
    cropperVisible: false,
    imagePath: "",
    previewImage: null as any,
  }),
});
</script>
