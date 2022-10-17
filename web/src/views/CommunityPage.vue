<template>
  <div class="w-full" style="background: #f8fdfa">
    <dialog-modal
      :persistent="!true"
      @close="showBannerEditor = false"
      :show="showBannerEditor"
    >
      <div>
        <BannerEditor
          src="https://styles.redditmedia.com/t5_2rd9v/styles/bannerBackgroundImage_d6bghfs9mz311.jpg?width=4000&format=pjpg&s=980db63b3967e1be6fa14018b6a48bc62ab8e43f"
        />
      </div>
    </dialog-modal>

    <login-popup
      @loggedin="$store.commit('SET_LOGIN_POP', false)"
      @close="$store.commit('SET_LOGIN_POP', false)"
      :loginPopup="$store.state.loginPopup"
    ></login-popup>
    <div class="mt-14 w-full relative backdrop-blur-sm" v-if="community">
      <div
        class="absolute top-0 m-3 sm:m-10 right-0"
        v-if="stat.stat == 'admin' && !community.cover"
      >
        <button
          @click="clickFileRef"
          class="bg-green-300 p-1 rounded-full border-4 border-green-800 shadow-2xl hover:bg-green-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
            />
          </svg>
        </button>
      </div>
      <input
        type="file"
        @change="uploadedProfile"
        class="hidden"
        ref="profile"
        accept="image/png, image/gif, image/jpeg"
      />

      <input
        type="file"
        @change="uploaded"
        class="hidden"
        ref="file"
        accept="image/png, image/gif, image/jpeg"
      />

      <div v-if="community.cover || dataUrl" class="relative">
        <vue-load-image>
          <template v-slot:image>
            <img
              class="bg-repeat w-full max-h-32 object-cover sm:max-h-64"
              :class="{ 'loading-darken': loadingCoverUpload }"
              :src="dataUrl ?? community.cover"
            />
          </template>
          <template v-slot:preloader>
            <div class="py-16">
              <loader></loader>
            </div>
          </template>
        </vue-load-image>

        <div
          class="absolute top-0 left-0 right-0 mt-7"
          v-if="loadingCoverUpload"
        >
          <loader></loader>
        </div>
        <div
          class="absolute top-0 m-3 sm:m-10 right-0"
          v-if="stat.stat == 'admin'"
        >
          <button
            @click="clickFileRef"
            class="bg-green-300 p-1 rounded-full border-4 border-green-800 shadow-2xl hover:bg-green-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        v-else
        class="h-20 w-full"
        style="background: rgb(229, 246, 238)"
      ></div>
      <!-- {{ community }} dud -->

      <div class="relative">
        <!--  community header section -->
        <div
          class="flex justify-start h-16 sm:pt-4 end-items profile-name-section"
          style="background: #e5f6ee"
        >
          <div class="flex px-2" v-if="stat">
            <p
              class="text-lg font-sans text-gray-700 sm:text-2xl font-bold sm:px-0 sm:pt-0 pt-4 whitespace-nowrap"
            >
              {{ community.name }}
            </p>
            <button
              v-if="!stat.stat"
              @click="joinCommunity()"
              type="button"
              style="background: rgb(18 78 74)"
              class="sm:mx-3 mx-2 px-7 sm:mb-3 text-white sm:my-0 my-3 text-lg font-medium focus:outline-none bg-green-200 rounded-3xl hover:bg-green-300 focus:z-10 focus:ring-4 focus:ring-green-200"
            >
              Join
            </button>
            <button
              v-else-if="stat.stat != 'admin'"
              @click="leaveCommunity()"
              type="button"
              class="sm:mx-3 mx-2 px-7 sm:mb-3 border-green-600 border-2 text-gray-500 sm:my-0 my-3 text-lg font-medium focus:outline-none bg-green-200 rounded-3xl hover:bg-green-300 focus:z-10 focus:ring-4 focus:ring-green-200"
            >
              Leave
            </button>
          </div>
        </div>
      </div>
      <div class="absolute community-profile left-0 com-header">
        <div class="relative">
          <img
            class="h-20 w-20 rounded-full object-cover border-4"
            style="border-color: #e5f6ee"
            :src="
              community.logo
                ? community.logo
                : 'https://res.cloudinary.com/dtabnh5py/image/upload/v1665875009/favicon_z0elvl.png'
            "
          />
          <button
            v-if="stat.stat == 'admin'"
            @click="uploadProfilePic"
            class="absolute border-green-600 border-2 text-center h-6 w-6 bottom-0 right-0 bg-white rounded-full flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-4 text-green-500"
            >
              <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
              <path
                fill-rule="evenodd"
                d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex flex-row justify-start gap-10 mt-4">
        <div class="w-1/5 mt-2 lg:block hidden"></div>
        <div class="w-full md:w-5/6 lg:w-2/5 xl:w-2/5 p-2">
          <div class="flex flex-row justify-between">
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

          <div v-if="posts.length">
            <div v-for="(post, ix) in posts" :key="ix" class="mt-4">
              <post-tile
                :compKey="post.postId"
                :post="post"
                @clicked="clicked(post)"
              ></post-tile>
              <div class="border-t border-gray-100 w-full"></div>
            </div>
          </div>
          <div
            v-else-if="loadingFeed"
            class="flex justify-center items-center mt-28"
          >
            <loader></loader>
          </div>

          <div v-else class="flex justify-center items-center flex-col">
            <p>No posts yet</p>
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
        <div class="w-1/5 mt-6 hidden lg:block xl:block" v-if="community">
          <CommunityInfoSection
            @updatedDesc="loadCommunity"
            :data="community"
            :stat="stat"
          ></CommunityInfoSection>
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
import VueLoadImage from "vue-load-image";
import LoginPopup from "../components/LoginPopup.vue";
import AccountPopup from "../components/AccountPopup.vue";
import InfiniteScroll from "infinite-loading-vue3";
import PostTile from "../components/PostTile.vue";
import {
  COMMUNITY,
  COMMUNITY_POSTS,
  JOIN_COMMUNITY,
  LEAVE_COMMUNITY,
  TOP_TAGS,
  UPDATE_COVER,
  UPDATE_LOGO,
} from "../queries";
import SuggestedGames from "../components/SuggestedGames.vue";
import SidebarItems from "../components/SidebarItems.vue";
import CommunityInfoSection from "../components/CommunityInfoSection.vue";
import { VueCropper } from "vue-cropper";
import BannerEditor from "../components/BannerEditor.vue";

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
    VueCropper,
    VueLoadImage,
    InfiniteScroll,
    PostTile,
    SuggestedGames,
    SidebarItems,
    CommunityInfoSection,
    BannerEditor,
  },
  data: () => ({
    tags: "",
    topTags: [] as Array<any>,
    loadingFeed: false,
    showModal: false,
    loginPopup: false,
    content: "",
    message: "",
    loadingProfileUpload: false,
    loadingCoverUpload: false,
    uploadedUrl: null,
    uploadedPUrl: null,
    noResult: false,
    page: 1,
    filter: null,
    progress: 0,
    pformData: null as any,
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
    showBannerEditor: false,
    filename: null as any,
    file: null as any,
    pfile: null as any,
    pagination: {
      page: 1,
      pageSize: 25,
    },
    pDataUrl: null as any,
    dataUrl: null as any,
    filterTypes: [
      // { label: "Algo", value: null, selected: true },
      // { label: "Recent", value: "recent", selected: false },
      // { label: "Top", value: "top", selected: false },
    ],
    posts: [] as Array<any>,
    lastSnapshot: null as any,
    community: null as any,
    stat: null as any,
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
    await this.loadCommunity();
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
    // handle infintie scroll
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    prepareFormData() {
      this.formData = new FormData();
      this.formData.append("upload_preset", this.preset);
      this.formData.append("file", this.file);
    },
    prepareProfileFormData() {
      this.pformData = new FormData();
      this.pformData.append("upload_preset", this.preset);
      this.pformData.append("file", this.pfile);
    },
    uploadProfilePic() {
      this.$refs.profile.click();
    },
    leaveCommunity() {
      if (this.$store.state.loggedIn) {
        this.$apollo
          .mutate({
            mutation: LEAVE_COMMUNITY,
            variables: {
              input: this.community.communityId,
            },
          })
          .then(async ({ data }) => {
            if (data) {
              await this.loadCommunity();
              alert("Left");
            }
          })
          .catch((e) => {
            alert("Failed to join");
          });
      } else {
        this.$router.push("/login");
      }
    },
    joinCommunity() {
      if (this.$store.state.loggedIn) {
        this.$apollo
          .mutate({
            mutation: JOIN_COMMUNITY,
            variables: {
              input: this.community.communityId,
            },
          })
          .then(async ({ data }) => {
            if (data) {
              await this.loadCommunity();
              alert("Joined");
            }
          })
          .catch((e) => {
            alert("Failed to join");
          });
      } else {
        this.$router.push("/login");
      }
    },
    async loadCommunity() {
      const { data } = await this.$apollo.query({
        query: COMMUNITY,
        fetchPolicy: "no-cache",
        variables: {
          title: this.$route.params.community,
        },
      });
      if (data.community) {
        this.community = data.community.community;
        this.stat = data.community.stat;
      } else {
        this.$router.push("/page-err");
      }
    },
    async loadTags() {
      const {
        data: { topTags },
      } = await this.$apollo.query({
        query: TOP_TAGS,
        fetchPolicy: "network-only",
      });
      this.topTags = topTags;
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
          communityPosts: { data, total },
        },
      } = await this.$apollo
        .query({
          query: COMMUNITY_POSTS,
          fetchPolicy: "network-only",
          variables: {
            title: this.$route.params.community,
            pagination: this.pagination,
          },
        })
        .finally(() => {
          this.loadingFeed = false;
        });
      this.totalCount = data.length;
      const posts = JSON.parse(JSON.stringify(data));
      console.log(posts, "POSTATSS");
      posts.forEach((p: any) => {
        this.posts.push(p);
      });
    },
    async feedFilterSelected(it: any) {
      this.filterTypes.forEach((e: any) => {
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
    uploadedProfile(e: any) {
      const { txt, error }: any = this.checkFile(e);
      if (error) {
        alert(txt);
        return;
      }
      this.pfile = e.target.files[0];
      this.prepareProfileFormData();
      // const reader = new FileReader();

      // reader.addEventListener(
      //   "load",
      //   () => {
      //     this.pDataUrl = reader.result;
      //   },
      //   false
      // );
      // reader.readAsDataURL(this.file);
      if (this.pfile) {
        this.loadingProfileUpload = true;
        const url = "https://api.cloudinary.com/v1_1/dtabnh5py/image/upload";
        axios({
          url,
          method: "POST",
          data: this.pformData,
          onUploadProgress: (e) => {
            this.progress = Math.round((e.loaded * 100) / e.total);
          },
        })
          .then(({ data }) => {
            this.uploadedPUrl = data.secure_url;
            this.saveCommunityLogo();
          })
          .catch((e) => {
            this.loadingProfileUpload = false;
          });
      }
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
      if (this.file) {
        this.loadingCoverUpload = true;
        const url = "https://api.cloudinary.com/v1_1/dtabnh5py/image/upload";
        axios({
          url,
          method: "POST",
          data: this.formData,
          onUploadProgress: (e) => {
            this.progress = Math.round((e.loaded * 100) / e.total);
          },
        })
          .then(({ data }) => {
            this.uploadedUrl = data.secure_url;
            this.saveCommunityCover();
          })
          .catch((e) => {
            this.loadingCoverUpload = false;
          });
      }
    },

    saveCommunityLogo() {
      this.$apollo
        .mutate({
          mutation: UPDATE_LOGO,
          variables: {
            cover: this.uploadedPUrl,
            input: this.community.communityId,
          },
        })
        .then(async () => {
          await this.loadCommunity();
        })
        .finally(() => (this.loadingProfileUpload = false));
    },
    saveCommunityCover() {
      this.$apollo
        .mutate({
          mutation: UPDATE_COVER,
          variables: {
            cover: this.uploadedUrl,
            input: this.community.communityId,
          },
        })
        .then(async () => {
          await this.loadCommunity();
        })
        .finally(() => (this.loadingCoverUpload = false));
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
.loading-darken {
  filter: brightness(0.5);
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
