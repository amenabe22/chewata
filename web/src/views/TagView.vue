<template>
  <div class="w-full">
    <login-popup
      @loggedin="$store.commit('SET_LOGIN_POP', false)"
      @close="$store.commit('SET_LOGIN_POP', false)"
      :loginPopup="$store.state.loginPopup"
    ></login-popup>
    <dialog-modal :show="$store.state.showMainDialog" @close="closeDialog">
      <div class="px-2 relative w-full">
        <div
          v-if="loadingPost"
          class="h-full bg-gray-500 top-0 left-0 right-0 w-full opacity-60 absolute z-50"
        >
          <div class="flex flex-col mt-32 justify-center items-center">
            <p class="text-xl font-bold text-white tracking-wider">
              Loading...
            </p>
            <loader :dark="true"></loader>
          </div>
        </div>

        <transition name="slide-fade">
          <div v-if="!showForm" class="lg:w-96 xl:w-96 md:lg:w-96 z-0">
            <router-link
              to="/"
              :style="{ filter: loadingPost ? 'blur(8px)' : '' }"
            >
              <p
                class="text-4xl xl:text-5xl lg:text-5xl text-white"
                :class="{ 'opacity-40': loadingPost }"
              >
                አዲስ ጨዋታ
              </p>
            </router-link>
            <button
              style="opacity: 12px"
              @click="animateForm"
              class="rounded-lg mt-5 w-full font-semibold bg-amber-700 text-white p-16 xl:text-2xl lg:text-2xl text-xl"
            >
              <p
                :style="{ filter: loadingPost ? 'blur(8px)' : '' }"
                :class="{ 'opacity-40': loadingPost }"
              >
                Meme / Story
              </p>
            </button>
            <button
              class="w-full bg-teal-700 rounded-lg mt-3 font-normal text-white px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl"
              @click="animateForm"
            >
              <p
                :style="{ filter: loadingPost ? 'blur(8px)' : '' }"
                :class="{ 'opacity-40': loadingPost }"
              >
                Question
              </p>
            </button>
            <button
              class="w-full bg-cyan-600 rounded-lg mt-3 font-normal text-white px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl"
              @click="animateForm"
            >
              <p
                :style="{ filter: loadingPost ? 'blur(8px)' : '' }"
                :class="{ 'opacity-40': loadingPost }"
              >
                Random
              </p>
            </button>
          </div>
        </transition>
        <transition name="slide-form">
          <div
            v-if="showFormx"
            class="w-full relative"
            :style="{ filter: loadingPost ? 'blur(2px)' : '' }"
            :class="{ 'opacity-70': loadingPost }"
          >
            <p class="text-4xl xl:text-5xl lg:text-5xl text-white">Post Here</p>

            <textarea
              class="form-control rounded-b-none block w-full h-44 resize-none border-none px-3 mt-5 text-xl py-1.5 font-normal bg-white bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-gray-50 focus:border-blue-600 focus:outline-none"
              id="exampleFormControlTextarea1"
              rows="3"
              v-model="content"
              placeholder="Your post starts here ..."
            ></textarea>
            <input
              type="text"
              name=""
              v-model="tags"
              placeholder="Tags (Love, Joke, Story, Meme, etc.)"
              class="mt-2 form-control rounded-b-none block w-full resize-none border-none px-3 text-lg py-1.5 font-normal bg-white bg-clip-padding transition ease-in-out m-0 focus:text-gray-700 focus:bg-gray-50 focus:border-blue-600 focus:outline-none"
            />
            <div
              class="w-full rounded-b-md bg-gray-500 flex flex-row justify-between p-2 text-white"
            >
              <input
                type="file"
                @change="uploaded"
                class="hidden"
                ref="file"
                accept="image/png, image/gif, image/jpeg"
              />
              <p>5000</p>
              <button @click="clickFileRef">
                <span v-if="!filename">Attach Img/Gif</span>
                <span v-else>{{ filename }}</span>
              </button>
            </div>
            <button
              @click="post"
              class="bg-green-700 rounded-lg mt-3 text-gray-100 w-full px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl"
            >
              <p>Post</p>
            </button>
            <button
              @click="cancelPost"
              class="bg-red-400 rounded-lg mt-3 text-gray-100 w-full px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl"
            >
              <p>Cancel</p>
            </button>
          </div>
        </transition>
      </div>
    </dialog-modal>
    <div class="flex flex-row justify-center gap-10 mt-16 sm:mt-20">
      <div
        v-if="$store.state.loggedIn"
        class="w-1/5 mt-2 hidden lg:block xl:block md:block"
      >
        <sidebar-items></sidebar-items>
        <!-- <h1 class="text-gray-500 text-2xl font-semibold tracking-widest">
            Welcome to Chewata
          </h1>
          <p class="font-normal text-gray-400 text-lg">
            you can start posting by clicking the ball icon and just go around and
            like and enjoy.
          </p> -->
      </div>
      <div class="w-1/6 mt-2 hidden lg:block xl:block md:block" v-else>
        <h1 class="text-gray-500 text-2xl font-semibold tracking-widest">
          Join Chewata
        </h1>

        <p class="font-normal text-gray-400 text-lg">
          Do all the things like ++ or -- posts, post your own posts, comment on
          others' posts and just have fun.
        </p>
        <button
          class="rounded-xl tracking-widest border-2 mt-2 p-2"
          @click="$store.commit('SET_LOGIN_POP', true)"
        >
          Sign Up
        </button>
      </div>
      <div class="w-full md:w-2/3 lg:w-2/5 xl:w-2/5 p-2">
        <div class="flex flex-row justify-between">
          <p
            class="text-xl bg-green-50 p-2 font-semibold tracking-wider text-green-700"
          >
            #{{ $route.params.tag }}
          </p>
          <div class="flex gap-3 text-gray-500 text-lg font-light">
            <button
              :class="{ 'font-bold text-green-600': it.selected }"
              class="hover:text-green-500"
              v-for="(it, ix) in filterTypes"
              :key="ix"
              @click="feedFilterSelected(it)"
            >
              {{ it.label }}
            </button>
          </div>
        </div>

        <div v-if="loadingFeed" class="flex justify-center items-center mt-28">
          <loader></loader>
        </div>

        <div v-for="(post, ix) in posts" :key="ix" class="mt-4">
          <post-tile
            :compKey="post.postId"
            :post="post"
            @clicked="clicked(post)"
          ></post-tile>
          <div class="border-t border-gray-100 w-full"></div>
        </div>
        <div v-if="loadComplete" class="text-center pb-32 pt-10">
          <p class="text-lg text-gray-400 font-semibold">No More Posts</p>
        </div>
        <div
          class="flex justify-center my-10"
          v-else-if="loadingFeed && posts.length"
        >
          <loader></loader>
        </div>
      </div>
      <div class="w-1/6 mt-2 hidden lg:block xl:block">
        <div class="flex flex-col">
          <h1 class="text-gray-500 pb-3 text-2xl font-normal tracking-widest">
            Top Tags
          </h1>
          <div class="flex flex-row gap-2 flex-wrap flex-grow">
            <div v-for="(tg, ix) in topTags" :key="ix" @click="tagSelected(tg)">
              <span
                class="hover:border-green-600 text-gray-400 text-center text-sm hover:text-green-600 cursor-pointer duration-100 transition ease-in-out delay-75 chip-items"
              >
                {{ tg.tagName }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ground-meda
      @ballClicked="menuClicked"
      v-if="!loadingFeed"
      class="block sm:hidden"
    />
  </div>
</template>

<script lang="ts">
// import { ref } from "@vue/reactivity";
import { defineComponent } from "vue";
import DialogModal from "../components/DialogModal.vue";
import FeedTile from "../components/FeedTile.vue";
import GroundMeda from "../components/GroundMeda.vue";
import Navbar from "../components/Navbar.vue";
import axios from "axios";
import Loader from "../components/Loader.vue";
import LoginPopup from "../components/LoginPopup.vue";
import AccountPopup from "../components/AccountPopup.vue";
import InfiniteScroll from "infinite-loading-vue3";
import PostTile from "../components/PostTile.vue";
import { ADD_POST, GET_POSTS, TAG_POSTS, TOP_TAGS } from "../queries";
import SuggestedGames from "../components/SuggestedGames.vue";
import SidebarItems from "../components/SidebarItems.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    Navbar,
    GroundMeda,
    FeedTile,
    DialogModal,
    Loader,
    LoginPopup,
    AccountPopup,
    InfiniteScroll,
    PostTile,
    SuggestedGames,
    SidebarItems,
  },
  data: () => ({
    tags: "",
    topTags: [] as Array<any>,
    loadingFeed: false,
    showModal: false,
    loginPopup: false,
    content: "",
    message: "",
    uploadedUrl: null,
    noResult: false,
    page: 1,
    filter: null,
    progress: 0,
    formData: null as any,
    totalCount: 0,
    invalidImage: false,
    showMainDialog: false,
    showForm: false,
    loadingPost: false,
    showFormx: false,
    loadComplete: false,
    limit: 10,
    preset: "c4o7elzd",
    loaded: false,
    filename: null as any,
    file: null as any,
    pagination: {
      page: 1,
      pageSize: 25,
    },
    currentTag: null as any,
    filterTypes: [
      { label: "Algo", value: null, selected: true },
      { label: "Recent", value: "recent", selected: false },
      { label: "Top", value: "top", selected: false },
    ],
    posts: [] as Array<any>,
    lastSnapshot: null as any,
  }),
  metaInfo: {
    title: "Chewata Home",
    htmlAttrs: { lang: "en" },
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Bringing vibrant communities together",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: "https://chewata.fun/",
      },
      {
        property: "og:title",
        content: "Chewata - Vibrant Community",
      },
      {
        property: "og:description",
        content:
          "An awesome place to talk connect and have fun without censorship",
      },
      {
        property: "og:image",
        content:
          "https://res.cloudinary.com/dtabnh5py/image/upload/v1664052836/sblzopyfvapvij9adk9t.png",
      },
      {
        property: "twitter:card",
        content: "summary_large_image",
      },
      {
        property: "twitter:url",
        content: "https://chewata.fun/",
      },
      {
        property: "twitter:title",
        content: "Chewata - Vibrant Community",
      },
      {
        property: "twitter:description",
        content:
          "An awesome place to talk connect and have fun without censorship",
      },
      {
        property: "twitter:image",
        content:
          "https://res.cloudinary.com/dtabnh5py/image/upload/v1664052836/sblzopyfvapvij9adk9t.png",
      },
    ],
  },
  async mounted() {
    this.currentTag = this.$route.params.tag;
    await this.loadFeed();
    await this.loadTags();
    // handle infintie scroll
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    async loadTags() {
      const {
        data: { topTags },
      } = await this.$apollo.query({
        query: TOP_TAGS,
        fetchPolicy: "network-only",
      });
      this.topTags = topTags;
    },
    async tagSelected(tg: any) {
      this.$router.replace({
        path: `/tag/${tg.tagName}`,
        params: { tag: tg.tagName },
      });
      this.currentTag = tg.tagName;
      this.page = 1;
      this.pagination.page = 1;
      this.posts = [];
      await this.loadFeed();
    },
    prepareFormData() {
      this.formData = new FormData();
      this.formData.append("upload_preset", this.preset);
      this.formData.append("file", this.file);
    },
    async handleScroll(e: any) {
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 50
      ) {
        if (this.totalCount) {
          this.pagination.page++;
          const totalCount = await this.loadFeed();
          console.log("load more", totalCount);
        }
      }
    },
    menuClicked() {
      if (this.$store.state.loggedIn) {
        this.$router.push("/post");
      } else {
        this.$router.push("/login");
      }
    },
    async loadMoreFeed() {
      this.page++;
      console.log(this.page);
      await this.loadFeed();
    },
    async loadFeed() {
      this.loadingFeed = true;
      const {
        data: {
          tagPostFilter: { data, total },
        },
      } = await this.$apollo
        .query({
          query: TAG_POSTS,
          fetchPolicy: "network-only",
          variables: {
            input: this.pagination,
            tag: this.currentTag,
          },
        })
        .finally(() => {
          this.loadingFeed = false;
        });
      this.totalCount = data.length;
      const posts = JSON.parse(JSON.stringify(data));
      posts.forEach((p: any) => {
        this.posts.push(p);
      });
    },
    async feedFilterSelected(it: any) {
      this.filterTypes.forEach((e) => {
        if (e.label != it.label) {
          e.selected = false;
        }
      });
      it.selected = true;
      this.filter = it.value;
      this.posts = [];
      await this.loadFeed();
    },
    clickFileRef() {
      (this.$refs.file as any).click();
    },
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
    uploaded(e: any) {
      const { txt, error }: any = this.checkFile(e);
      if (error) {
        alert(txt);
        return;
      }
      this.file = e.target.files[0];
      this.filename = e.target.files[0].name;
      this.prepareFormData();
    },
    cancelPost() {
      this.showFormx = false;
      setTimeout(() => {
        this.showForm = false;
      }, 250);
    },
    closeDialog() {
      this.showForm = false;
      this.showFormx = false;
      this.$store.commit("SET_MAIN_POP", false);
    },
    animateForm() {
      this.showForm = true;
      setTimeout(() => {
        this.showFormx = true;
      }, 250);
    },
    clicked(post: any) {
      this.$router.push({ path: `/game/${post.postId}` });
    },
    async savePost() {
      const tags = this.tags.split(",").map((e) => e.trim());
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
          this.posts.unshift(addPost);
        })
        .finally(() => {
          this.loadingPost = false;
          this.closeDialog();
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
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(174, 240, 174, 0.356);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.chips-wrapper {
}
.chip-items {
  border-radius: 5px;
  border-width: 2px;
  padding: 3px;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-from-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.slide-fade-enter-active {
  transition: all 0.1s;
}
.slide-fade-leave-active {
  transition: all 0.29s cubic-bezier(0, 0, 0.97, 1);
}
.slide-fade-enter-from, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-220px);
  opacity: 0;
}

.slide-form-enter-active {
  transition: all 0.1s;
}
.slide-form-leave-active {
  transition: all 0.23s cubic-bezier(0, 0, 0.97, 1);
}
.slide-form-enter-from, .slide-form-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(220px);
  opacity: 0;
}
</style>
