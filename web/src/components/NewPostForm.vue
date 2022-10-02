<template>
  <div>
    <div class="flex flex-row justify-between">
      <p class="text-2xl tracking-wider text-gray-500">📝 New Chewata</p>
      <loader v-if="loadingPost" :dark="true"></loader>

      <button
        v-else
        @click="post"
        type="button"
        class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-green-700 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
      >
        Publish Post 🚀
      </button>
    </div>
    <div class="mt-3">
      <div class="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200">
        <div class="py-2 px-4 rounded-t-lg bg-green-50">
          <textarea
            id="comment"
            rows="8"
            v-model="content"
            class="px-0 w-full text-xl text-gray-700 bg-green-50 border-0 focus:ring-0 outline-none"
            placeholder="New chewata ..."
            required
          ></textarea>
        </div>
        <div class="flex justify-between items-center py-2 px-3 border-t">
          <div class="flex pl-0 space-x-1 sm:pl-2 justify-between">
            <input
              type="file"
              @change="uploaded"
              class="hidden"
              ref="file"
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              @click="clickFileRef()"
              type="button"
              class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
            >
              <div class="w-10 h-10 object-contain" v-if="dataUrl">
                <img :src="dataUrl" class="rounded-lg" />
              </div>
              <svg
                v-else
                aria-hidden="true"
                class="w-7 h-7"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clip-rule="evenodd"
                ></path>
              </svg>

              <div class="px-2">Upload Image</div>
            </button>
            <p class="pt-2">{{ filename }}</p>
          </div>
        </div>
      </div>
      <div class="relative w-full">
        <input
          v-model="tagItem"
          type="text"
          id="first_name"
          class="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none"
          placeholder="Type in Tags"
        />

        <button
          type="button"
          @click="addNewItem"
          class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-green-700 rounded-r-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
        >
          Add
        </button>
      </div>
    </div>
    <div class="flex flex-row gap-2 flex-wrap flex-grow py-3">
      <button
        v-for="(tg, ix) in userTags"
        :key="ix"
        @click="userTagSelected(tg)"
        :class="{
          'bg-green-800 border-green-800 text-white': tg.selected,
          'text-gray-400': !tg.selected,
        }"
      >
        <div
          class="hover:border-green-600 text-center text-sm hover:text-green-600 cursor-pointer duration-100 transition ease-in-out delay-75 chip-items"
        >
          {{ tg.tagName }}
        </div>
      </button>
    </div>
    <p class="ml-auto text-xs text-gray-500">
      Remember, contributions to this topic should follow our
      <a href="/privacy" target="_blank" class="text-green-600 hover:underline"
        >Community Guidelines</a
      >.
    </p>
    <div class="flex flex-col pt-3">
      <h1 class="text-gray-500 pb-3 text-2xl font-normal tracking-widest">
        Top Tags
      </h1>
      <div class="flex flex-row gap-2 flex-wrap flex-grow">
        <button
          v-for="(tg, ix) in topTags"
          :key="ix"
          @click="tagSelected(tg)"
          :class="{
            'bg-green-800 border-green-800 text-white': tg.selected,
            'text-gray-400': !tg.selected,
          }"
        >
          <div
            class="hover:border-green-600 text-center text-sm hover:text-green-600 cursor-pointer duration-100 transition ease-in-out delay-75 chip-items"
          >
            {{ tg.tagName }}
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ADD_POST, TOP_TAGS } from "../queries";
import axios from "axios";
import Loader from "./Loader.vue";

export default defineComponent({
  components: { Loader },
  data: () => ({
    progress: 0,
    tagItem: "",
    content: "",
    uploadedUrl: null,
    preset: "c4o7elzd",
    loadingPost: false,
    topTags: [] as any,
    dataUrl: null as any,
    formData: null as any,
    userTags: [] as any,
    filename: null as any,
    file: null as any,
    invalidImage: false,
  }),
  async created() {
    await this.loadTags();
  },
  methods: {
    checkFile(e: any) {
      /// get list of files
      var file_list = e.target.files;
      let txt = "";
      let error = false;
      /// go through the list of files
      const file = file_list[0];
      var sFileName = file.name;
      var sFileExtension = sFileName
        .split(".")
        [sFileName.split(".").length - 1].toLowerCase();
      var iFileSize = file.size;
      var iConvert = (file.size / 1048576).toFixed(2);

      /// OR together the accepted extensions and NOT it. Then OR the size cond.
      /// It's easier to see this way, but just a suggestion - no requirement.
      const allowed = ["webp", "jpg", "jpeg", "png", "gif"];
      if (!allowed.includes(sFileExtension) || iFileSize > 2485760) {
        /// 10 mb
        txt +=
          "Please make sure your file is in image format and less than 2 MB.\n\n";
        error = true;
        this.invalidImage = true;
      }
      return { txt, error };
    },
    prepareFormData() {
      this.formData = new FormData();
      this.formData.append("upload_preset", this.preset);
      this.formData.append("file", this.file);
    },
    clickFileRef() {
      (this.$refs.file as any).click();
    },
    uploaded(e: any) {
      const { txt, error }: any = this.checkFile(e);
      if (error) {
        alert(txt);
        return;
      }
      this.file = e.target.files[0];
      this.filename = e.target.files[0].name;
      this.prepareFormData();
      const reader = new FileReader();

      reader.addEventListener(
        "load",
        () => {
          this.dataUrl = reader.result;
        },
        false
      );

      reader.readAsDataURL(this.file);
    },
    addNewItem() {
      if (this.tagItem) {
        const item = this.tagItem;
        this.userTags.push({ tagName: item, selected: true });
        this.tagItem = "";
      }
    },
    userTagSelected(tag: any) {
      tag.selected = false;
      this.userTags = this.userTags.filter(
        (item: any) => item.tagName !== tag.tagName
      );
    },
    tagSelected(tag: any) {
      tag.selected = !tag.selected;
      if (tag.selected) {
        this.userTags.push(tag);
      } else {
        this.userTags = this.userTags.filter(
          (item: any) => item.tagName !== tag.tagName
        );
      }
    },
    async loadTags() {
      const {
        data: { topTags },
      } = await this.$apollo.query({
        query: TOP_TAGS,
        fetchPolicy: "network-only",
      });
      this.topTags = topTags.map((tg: any) => {
        return {
          ...tg,
          selected: false,
        };
      });
    },
    async savePost() {
      const tags = this.userTags.map((e) => e.tagName);
      await this.$apollo
        .mutate({
          mutation: ADD_POST,
          variables: {
            input: {
              content: this.content,
              cover: this.uploadedUrl,
              tags,
            },
          },
        })
        .then(({ data: { addPost } }) => {
          console.log("post", addPost);
          this.$router.push(`/game/${addPost.postId}`);
        })
        .finally(() => {
          this.loadingPost = false;
        });
    },

    async post() {
      if (this.invalidImage) {
        alert("Invalid file size and format: make sure it's below 2mb");
        return;
      }
      if (this.content == "") {
        alert("Message can't be empty");
        return;
      }
      this.loadingPost = true;
      if (this.file) {
        const url = "https://api.cloudinary.com/v1_1/dtabnh5py/image/upload";
        const { data } = await axios({
          url,
          method: "POST",
          data: this.formData,
          onUploadProgress: (e) => {
            this.progress = Math.round((e.loaded * 100) / e.total);
          },
        });
        this.uploadedUrl = data.secure_url;
      }
      await this.savePost();
    },
  },
});
</script>
<style lang="scss" scoped>
.chip-items {
  border-radius: 5px;
  border-width: 2px;
  padding: 3px;
}
</style>
