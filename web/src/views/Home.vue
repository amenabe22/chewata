<template>
  <div class="w-full">
    <login-popup
      @loggedin="$store.commit('SET_LOGIN_POP', false)"
      @close="$store.commit('SET_LOGIN_POP', false)"
      :loginPopup="$store.state.loginPopup"
    ></login-popup>
    <dialog-modal :show="$store.state.showMainDialog" @close="closeDialog">
      <div class="mx-2 relative">
        <div
          v-if="loadingPost"
          class="h-full bg-gray-500 top-0 left-0 right-0 w-full opacity-60 absolute z-50"
        >
          <div class="flex flex-col mt-32 justify-center items-center">
            <p class="text-xl font-black text-white tracking-wider">
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
              class="bg-green-600 rounded-lg mt-5 w-full font-black text-white p-16 xl:text-2xl lg:text-2xl text-xl"
            >
              <p
                :style="{ filter: loadingPost ? 'blur(8px)' : '' }"
                :class="{ 'opacity-40': loadingPost }"
              >
                Meme / Story
              </p>
            </button>
            <button
              class="w-full bg-yellow-600 rounded-lg mt-3 font-black text-white px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl"
            >
              <p
                :style="{ filter: loadingPost ? 'blur(8px)' : '' }"
                :class="{ 'opacity-40': loadingPost }"
              >
                Sport Rant
              </p>
            </button>
            <button
              class="w-full bg-red-600 rounded-lg mt-3 font-black text-white px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl"
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
            class="lg:w-96 xl:w-96 md:lg:w-96 relative"
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
              <input type="file" @change="uploaded" class="hidden" ref="file" />
              <p>5000</p>
              <button @click="clickFileRef">
                <span v-if="!filename">Attach Img/Gif</span>
                <span v-else>{{ filename }}</span>
              </button>
            </div>
            <button
              @click="post"
              class="bg-green-600 rounded-lg mt-3 font-black text-white w-full px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl"
            >
              <p>Post</p>
            </button>
            <button
              @click="cancelPost"
              class="bg-red-600 rounded-lg mt-3 font-black text-white w-full px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl"
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
      <div class="md:w-2/3 lg:w-2/5 xl:w-2/5 bg-white p-2">
        <p class="text-2xl font-semibold tracking-wider text-gray-500">
          Feed
        </p>
        <div v-if="loadingFeed" class="flex justify-center items-center mt-28">
          <loader></loader>
        </div>
        <div
          v-else
          v-for="(post, ix) in posts"
          :key="ix"
          class="mt-4 cursor-pointer"
          @click="clicked(post)"
        >
          <feed-tile :post="post" />
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
        <div class="mb-32"></div>
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
    <ground-meda @ballClicked="menuClicked" />
  </div>
</template>

<script lang="ts">
// import { ref } from "@vue/reactivity";
import { defineComponent } from "vue";
import DialogModal from "../components/DialogModal.vue";
import FeedTile from "../components/FeedTile.vue";
import GroundMeda from "../components/GroundMeda.vue";
import Navbar from "../components/Navbar.vue";
import VoteClickers from "../components/VoteClickers.vue";
import { db } from "../firebase.config";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Loader from "../components/Loader.vue";
import { uuid } from "vue-uuid";
import LoginPopup from "../components/LoginPopup.vue";
import AccountPopup from "../components/AccountPopup.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    Navbar,
    GroundMeda,
    VoteClickers,
    FeedTile,
    DialogModal,
    Loader,
    LoginPopup,
    AccountPopup,
  },
  data: () => ({
    loadingFeed: false,
    showModal: false,
    loginPopup: false,
    content: "",
    showMainDialog: false,
    showForm: false,
    loadingPost: false,
    showFormx: false,
    filename: null as any,
    file: null as any,
    posts: [] as Array<any>,
  }),
  async mounted() {
    await this.loadFeed();
  },
  methods: {
    menuClicked() {
      console.log(this.$store.state.loggedIn, "Dawg");
      if (this.$store.state.loggedIn) {
        this.$store.commit("SET_MAIN_POP", true);
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
    async loadFeed() {
      this.posts = [];
      this.loadingFeed = true;
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.posts.push(doc.data());
      });
      this.loadingFeed = false;
    },
    clickFileRef() {
      (this.$refs.file as any).click();
    },
    uploaded(e: any) {
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
      this.$router.push({ path: `/game/${post.id}` });
    },

    async savePost(cover: any = null) {
      console.log("Cover", cover);
      const postsRef = doc(collection(db, "posts"));
      await setDoc(postsRef, {
        id: uuid.v4(),
        content: this.content,
        cover: cover,
        user: this.$store.state.user.uid,
        createdAt: new Date().toISOString(),
        likes: 0,
      }).finally(() => {
        this.loadingPost = false;
        this.$store.commit("SET_MAIN_POP", false);
      });
      await this.loadFeed();
    },
    async post() {
      this.loadingPost = true;
      if (this.file) {
        const storage = getStorage();
        const storageRef = ref(storage, this.filename);

        // 'file' comes from the Blob or File API
        await uploadBytes(storageRef, this.file[0]).then(async (snapshot) => {
          const url = await getDownloadURL(snapshot.ref);
          await this.savePost(url);
          console.log("Uploaded a blob or file!", url);
        });
        return;
      }
      await this.savePost(null);
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
