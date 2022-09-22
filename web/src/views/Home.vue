<template>
  <div class="w-full" ref="scrollComponent">
    <!-- <Head>
      <title>Chewata | Fun | Freedom</title>
      <meta name="description" content="This page is awesome" />


      <meta property="og:title" content="Hello Title" />
      <meta property="og:description" content="This page is awesome" />
      <meta property="og:image" content="https://picsum.photos/1200/675" />


      <meta name="twitter:title" content="Hello Title" />
      <meta name="twitter:description" content="This page is awesome" />
      <meta name="twitter:image" content="https://picsum.photos/1200/675" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head> -->

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
              class="bg-green-600 rounded-lg mt-5 w-full font-bold text-white p-16 xl:text-2xl lg:text-2xl text-xl"
            >
              <p
                :style="{ filter: loadingPost ? 'blur(8px)' : '' }"
                :class="{ 'opacity-40': loadingPost }"
              >
                Meme / Story
              </p>
            </button>
            <button
              class="w-full bg-yellow-600 rounded-lg mt-3 font-bold text-white px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl"
            >
              <p
                :style="{ filter: loadingPost ? 'blur(8px)' : '' }"
                :class="{ 'opacity-40': loadingPost }"
              >
                Sport Rant
              </p>
            </button>
            <button
              class="w-full bg-red-600 rounded-lg mt-3 font-bold text-white px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl"
            >
              <p
                :style="{ filter: loadingPost ? 'blur(8px)' : '' }"
                :class="{ 'opacity-40': loadingPost }"
              >
                Random Shit
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
              <button @click="openUploadModal">
                <span v-if="!filename">Attach Img/Gif</span>
                <span v-else>{{ filename }}</span>
              </button>
            </div>
            <button
              @click="post"
              class="bg-green-600 rounded-lg mt-3 font-bold text-white w-full px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl"
            >
              <p>Post</p>
            </button>
            <button
              @click="cancelPost"
              class="bg-red-600 rounded-lg mt-3 font-bold text-white w-full px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl"
            >
              <p>Cancel</p>
            </button>
          </div>
        </transition>
      </div>
    </dialog-modal>
    <div class="flex flex-row justify-center gap-10 mt-24">
      <div
        v-if="$store.state.loggedIn"
        class="w-1/6 mt-2 hidden lg:block xl:block md:block"
      >
        <h1 class="text-gray-500 text-2xl font-semibold tracking-widest">
          Welcome to Chewata
        </h1>
        <p class="font-normal text-gray-400 text-lg">
          you can start posting by clicking the ball icon and just go around and
          like and enjoy.
        </p>
      </div>
      <div class="w-1/6 mt-2 hidden lg:block xl:block md:block" v-else>
        <h1 class="text-gray-500 text-2xl font-semibold tracking-widest">
          Join Chewata
        </h1>

        <p class="font-normal text-gray-400 text-lg">
          Do all the things like ++ or -- rants, post your own rants, comment on
          others' rants and just have fun.
        </p>
        <button
          class="rounded-xl tracking-widest border-2 mt-2 p-2"
          @click="$store.commit('SET_LOGIN_POP', true)"
        >
          Sign Up
        </button>
      </div>
      <div class="w-full md:w-2/3 lg:w-2/5 xl:w-2/5 bg-white p-2">
        <p class="text-2xl font-semibold tracking-wider text-gray-500">Feed</p>

        <div v-if="loadingFeed" class="flex justify-center items-center mt-28">
          <loader></loader>
        </div>
        <div v-for="(post, ix) in posts" :key="ix" class="mt-4">
          <post-tile :post="post" @clicked="clicked(post)"></post-tile>
          <div class="mb-3 flex flex-row justify-end">
            <button class="px-2 mx-2">
              <div class="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-7 w-7 text-green-500 mt-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
                  />
                  <path
                    d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
                  />
                </svg>
                <p class="text-green-500 mt-1 text-xl">2</p>
              </div>
            </button>
          </div>
          <div class="border-t border-gray-200 w-full"></div>
        </div>
        <div v-if="loadComplete" class="text-center pb-32 pt-10">
          <p class="text-lg text-gray-400 font-semibold">No More Posts</p>
        </div>
        <div
          class="flex justify-center my-10"
          v-if="posts.length && !loadingFeed && !loadComplete"
        >
          <button
            class="mb-44 flex gap-2 bg-green-200 px-4 py-3 ring-2 ring-green-400 hover:bg-green-300 hover:scale-110 delay-75 rounded-full"
            @click="loadFeed"
          >
            <span>Load More</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 font-bold"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex justify-center my-10"
          v-else-if="loadingFeed && posts.length"
        >
          <loader></loader>
        </div>
      </div>
      <div class="w-1/6 mt-2 hidden lg:block xl:block">
        <h1
          class="text-gray-500 px-2 pb-4 text-2xl font-semibold tracking-widest"
        >
          Top Tags
        </h1>
        <div class="grid xl:grid-cols-4 lg:grid-cols-3 gap-1">
          <div
            v-for="x in 13"
            :key="x"
            class="rounded-md border-2 px-1 hover:border-green-500 duration-300 transition ease-in-out delay-75"
          >
            <p
              class="text-gray-500 text-center text-sm hover:text-green-600 cursor-pointer duration-300 transition ease-in-out delay-75"
            >
              Soccer
            </p>
          </div>
        </div>
      </div>
    </div>
    <ground-meda @ballClicked="menuClicked" v-if="!loadingFeed" />
  </div>
</template>

<script lang="ts">
// import { ref } from "@vue/reactivity";
import { defineComponent } from "vue";
import DialogModal from "../components/DialogModal.vue";
import FeedTile from "../components/FeedTile.vue";
import GroundMeda from "../components/GroundMeda.vue";
import Navbar from "../components/Navbar.vue";
import { db } from "../firebase.config";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  limit,
  setDoc,
  startAfter,
  limitToLast,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Loader from "../components/Loader.vue";
import { uuid } from "vue-uuid";
import LoginPopup from "../components/LoginPopup.vue";
import AccountPopup from "../components/AccountPopup.vue";
import InfiniteScroll from "infinite-loading-vue3";
import PostTile from "../components/PostTile.vue";
import { getToken, getMessaging, onMessage } from "@firebase/messaging";
import { messaging } from "../firebase.config";
import { ADD_POST, GET_POSTS } from "../queries";

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
    // Head,
  },
  data: () => ({
    loadingFeed: false,
    showModal: false,
    loginPopup: false,
    content: "",
    message: "",
    uploadedUrl: null,
    noResult: false,
    page: 1,
    invalidImage: false,
    showMainDialog: false,
    showForm: false,
    loadingPost: false,
    showFormx: false,
    loadComplete: false,
    limit: 10,
    loaded: false,
    filename: null as any,
    file: null as any,
    pagination: {
      page: 1,
      pageSize: 10,
    },
    posts: [] as Array<any>,
    lastSnapshot: null as any,
  }),
  async mounted() {
    // const currentToken = await getToken(messaging, {
    //   vapidKey:
    //     "BBWn7Fkrmhrj0BkeKLiYcD5VhagQg4zlrW-QtpC0VpuPGiPVTK6nleZMNrmo4U0qUSgM48esnt_hAv1vOSivkUk",
    // });
    // console.log("TOKEN", currentToken);
    console.log("Test");
    try {
      onMessage(messaging, (payload: any) => {
        console.info("Message received : ", payload);
        // console.log(payload.message);
      });
    } catch (e) {
      console.error("Error : ", e);
    }

    await this.loadFeed();
    // handle infintie scroll
    // window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    // window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    openUploadModal() {
      window.cloudinary
        .openUploadWidget(
          {
            cloud_name: "dtabnh5py",
            upload_preset: "c4o7elzd",
            sources: [
              "local",
              "camera",
              "image_search",
              "google_drive",
              "facebook",
              "instagram",
              "dropbox",
            ],
            multiple: false,
            defaultSource: "local",
            styles: {
              palette: {
                window: "#F5F5F5",
                sourceBg: "#FFFFFF",
                windowBorder: "#90a0b3",
                tabIcon: "#0094c7",
                inactiveTabIcon: "#69778A",
                menuIcons: "#0094C7",
                link: "#53ad9d",
                action: "#8F5DA5",
                inProgress: "#0194c7",
                complete: "#53ad9d",
                error: "#c43737",
                textDark: "#000000",
                textLight: "#FFFFFF",
              },
              fonts: {
                default: null,
                "sans-serif": {
                  url: null,
                  active: true,
                },
              },
            },
          },
          (error, result) => {
            console.log(error, "DAWg");
            if (!error && result && result.event === "success") {
              this.filename = result.info.original_filename;
              this.uploadedUrl = result.info.secure_url;

              console.log("Done uploading..: ", result.info);
            }
          }
        )
        .open();
    },
    async handleScroll(e: any) {
      let element = this.$refs.scrollComponent as any;
      if (!this.loadComplete) {
        if (
          Math.round(element.getBoundingClientRect().bottom) <=
          window.innerHeight
        ) {
          const newItems: any = await this.loadFeed();
          console.log(newItems, "ss");
          if (!newItems) {
            this.noResult = true;
            this.message = "No result found";
            this.loadComplete = true;
            console.log("loadded them all");
            return;
          }
        }
      }
    },
    menuClicked() {
      if (this.$store.state.loggedIn) {
        this.$store.commit("SET_MAIN_POP", true);
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
    async loadFeed() {
      this.loadingFeed = true;
      const {
        data: {
          getPosts: { data },
        },
      } = await this.$apollo
        .query({
          query: GET_POSTS,
          fetchPolicy: "network-only",
          variables: {
            input: this.pagination,
          },
        })
        .finally(() => {
          this.loadingFeed = false;
        });
      this.posts = JSON.parse(JSON.stringify(data));
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
      this.file = e.target.files;
      this.filename = e.target.files[0].name;
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
    async savePost(cover: any = null) {
      await this.$apollo
        .mutate({
          mutation: ADD_POST,
          variables: {
            input: {
              content: this.content,
              cover: cover,
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
      // if (this.file) {
      //   const storage = getStorage();
      //   const storageRef = ref(storage, this.filename);

      //   // 'file' comes from the Blob or File API
      //   await uploadBytes(storageRef, this.file[0]).then(async (snapshot) => {
      //     const url = await getDownloadURL(snapshot.ref);
      //     await this.savePost(url);
      //   });
      //   return;
      // }
      await this.savePost(this.uploadedUrl);
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

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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
