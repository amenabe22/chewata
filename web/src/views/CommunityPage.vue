<template>
  <div class="w-full" style="background: #f8fdfa">
    <login-popup
      @loggedin="$store.commit('SET_LOGIN_POP', false)"
      @close="$store.commit('SET_LOGIN_POP', false)"
      :loginPopup="$store.state.loginPopup"
    ></login-popup>
    <div class="mt-16 w-full relative backdrop-blur-sm">
      <img
        class="sm:object-cover h-full w-full"
        src="https://styles.redditmedia.com/t5_2xd5g/styles/bannerBackgroundImage_xke9ikfe78051.jpg?width=4000&format=pjpg&s=6f8b92ba577468de58f3ca09f1f8b9882790c5c3"
      />
      <div class="relative">
        <!--  community header section -->
        <div
          class="flex justify-start h-16 sm:pt-4 end-items profile-name-section"
          style="background: #e5f6ee"
        >
          <div class="flex px-2">
            <p
              class="text-lg font-sans text-gray-700 sm:text-2xl font-bold sm:px-0 sm:pt-0 pt-4 whitespace-nowrap"
            >
              Kendrick Lamar
            </p>
            <button
              @click="$emit('clickedLogin')"
              type="button"
              style="background: rgb(18 78 74)"
              class="sm:mx-3 mx-2 px-7 sm:mb-3 text-white sm:my-0 my-3 text-lg font-medium focus:outline-none bg-green-200 rounded-3xl hover:bg-green-300 focus:z-10 focus:ring-4 focus:ring-green-200"
            >
              Join
            </button>
          </div>
        </div>
      </div>
      <div class="absolute community-profile left-0 com-header">
        <img
          class="h-20 w-20 rounded-full object-cover border-4"
          style="border-color: #e5f6ee"
          src="https://styles.redditmedia.com/t5_2xd5g/styles/communityIcon_r1ozfu3scgy71.jpg?width=256&format=pjpg&s=db7240145654fa4dfc787634e0ef0f2be944e429"
        />
      </div>
      <div class="flex flex-row justify-start gap-10 mt-10">
        <div class="w-1/5 mt-2 lg:block hidden"></div>
        <div class="w-full md:w-5/6 lg:w-2/5 xl:w-2/5 p-2">
          <div class="flex flex-row justify-between">
            <p class="text-2xl font-semibold tracking-wider text-gray-500">
              Kendrick Lamar
            </p>
            <div class="flex gap-3 text-gray-500 text-lg font-light">
              <button
                :class="{
                  'font-bold text-gray-500 border border-green-300':
                    it.selected,
                }"
                class="hover:text-green-600 rounded-xl px-2"
                style="background: #e5f6ee"
                v-for="(it, ix) in filterTypes"
                :key="ix"
                @click="feedFilterSelected(it)"
              >
                {{ it.label }}
              </button>
            </div>
          </div>

          <div
            v-if="loadingFeed"
            class="flex justify-center items-center mt-28"
          >
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
        <div class="w-1/5 mt-2 hidden lg:block xl:block">
          <CommunityInfoSection></CommunityInfoSection>
          <!-- suggested chewata -->
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
import { useMeta } from "vue-meta";
import PostTile from "../components/PostTile.vue";
import { ADD_POST, GET_POSTS, TOP_TAGS } from "../queries";
import SuggestedGames from "../components/SuggestedGames.vue";
import SidebarItems from "../components/SidebarItems.vue";
import CommunityInfoSection from "../components/CommunityInfoSection.vue";

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
    CommunityInfoSection,
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
    filterTypes: [
      { label: "Algo", value: null, selected: true },
      { label: "Recent", value: "recent", selected: false },
      { label: "Top", value: "top", selected: false },
    ],
    posts: [] as Array<any>,
    lastSnapshot: null as any,
  }),
  metaInfo: {
    title: "Home",
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
    const filterParam: any = this.$route.query.f;
    if (filterParam) {
      this.filterTypes.forEach((e) => {
        if (e.value != filterParam) {
          e.selected = false;
        } else {
          e.selected = true;
        }
      });

      this.filter = filterParam;
    }

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
        this.$store.commit("SET_LOGIN_POP", true);
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
          getPosts: { data, total },
        },
      } = await this.$apollo
        .query({
          query: GET_POSTS,
          fetchPolicy: "network-only",
          variables: {
            input: this.pagination,
            filter: this.filter,
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
      this.$router.replace({
        path: "/",
        query: { f: this.filter },
      });
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
.community-profile {
  margin-top: -70px;
}
.com-header {
  margin-left: 3%;
}
.end-items {
  padding-right: 5%;
}
.community-content {
  background: url(https://images.unsplash.com/photo-1487147264018-f937fba0c817?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80);
  background-repeat: no-repeat;
  background-size: cover;
  backdrop-filter: blur(10px);
}
.profile-name-section {
  /* mobile */
  padding-left: 15.5%;
}
@media (min-width: 300px) {
  .profile-name-section {
    /* mobile */
    padding-left: 20.5%;
  }
  .com-header {
    margin-left: 1%;
  }
}
/* tablet */
@media (min-width: 768px) {
  .profile-name-section {
    padding-left: 20%;
  }
  .end-items {
    padding-right: 12%;
  }
  .com-header {
    margin-left: 8%;
  }
}

@media (min-width: 1024px) {
  /* laptop */
  .profile-name-section {
    padding-left: 28%;
  }
  .end-items {
    padding-right: 14%;
  }
  .com-header {
    margin-left: 21%;
  }
  @media (min-width: 1045px) {
    .com-header {
      margin-left: 22%;
    }
  }
}
</style>
