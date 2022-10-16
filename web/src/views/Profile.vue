<template>
  <div>
    <dialog-modal :show="editPopup" @close="editPopup = false">
      <div class="relative">
        <div class="w-full z-0">
          <div
            v-if="loading"
            class="h-full bg-gray-500 top-0 left-0 right-0 w-full opacity-60 absolute z-50"
          >
            <div class="flex flex-col mt-32 justify-center items-center w-full">
              <p class="text-xl font-black text-white tracking-wider w-full">
                Loading...
              </p>
              <game-loader></game-loader>
            </div>
          </div>
          <p class="text-4xl xl:text-5xl lg:text-5xl text-white">
            Edit Profile
          </p>
          <form class="w-72 sm:w-80 mt-10" @submit.prevent="submitForm">
            <div class="w-full mt-3 flex flex-col">
              <input
                required
                type="text"
                v-model="name"
                @input="checkDuplicate"
                placeholder="Your Name"
                id="large-input"
                class="block outline-none p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500"
              />
              <small
                v-if="dupError"
                class="text-left gap-1 pt-1 text-red-300 flex"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clip-rule="evenodd"
                  />
                </svg>
                This username is already taken</small
              >
            </div>
            <div class="pt-3 w-full">
              <textarea
                v-model="bio"
                id="message"
                rows="7"
                class="block outline-none p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Bio..."
              ></textarea>
            </div>
            <div class="mt-2">
              <button
                class="bg-green-200 w-full p-2 text-gray-700 rounded-lg"
                type="submit"
              >
                Save
              </button>
            </div>
            <button
              type="button"
              class="bg-gray-500 rounded-full text-gray-100 mt-4"
              @click="editPopup = false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-8 h-8 p-2"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </dialog-modal>
    <navbar
      @clickedLogin="$store.commit('SET_LOGIN_POP', true)"
      @profileClicked="$store.commit('SET_PROFILE_POP', true)"
    ></navbar>

    <div
      class="mt-14 h-3/4 w-full relative"
      style="
        background: #A5DEC4
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      "
    >
      <div
        class="text-white font-semibold xl:text-4xl lg:text-4xl md:text-3xl text-2xl xl:tracking-wider lg:tracking-wider md:tracking-wider tracking-normal font-sans flex xl:mx-52 md:mx-10 pt-20"
      >
        <div class="flex flex-col w-full items-start px-2">
          <div class="flex">
            <div class="pt-5 flex flex-col">
              <p>{{ $store.state.user.fullName }}</p>
            </div>

            <button
              @click="editPopup = true"
              class="mx-2 rounded-full mt-6 h-8 w-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-9 text-green-700 py-1 px-2"
              >
                <path
                  d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
                />
                <path
                  d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
                />
              </svg>
            </button>
          </div>
          <div class="pb-4 pt-2">
            <p
              class="text-xl text-center font-normal rounded-xl px-2"
              style="background: #14532d2e"
            >
              +{{ $store.state.user.totalLikes }}
            </p>
          </div>

          <p class="pb-20 pt-2 text-xl xl:text-2xl lg:text-2xl font-normal">
            {{ $store.state.user.bio }}
          </p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-7 xl:mx-52 lg:mx-0 m-3">
      <div
        class="w-full mt-2 hidden lg:block xl:block md:block col-span-2"
        v-if="!$store.state.loggedIn"
      >
        <button
          class="rounded-xl tracking-widest border-2 mt-10 p-2"
          @click="showModal = true"
        >
          Sign Up
        </button>
      </div>
      <!-- comments section -->
      <div
        class="col-span-7 lg:col-span-3 sm::col-span-4 md::col-span-4 xl:col-span-4 w-full"
      >
        <div class="flex flex-row pt-3">
          <button
            @click="setTab('posts')"
            :class="{
              'text-green-600 text-xl': activeTab == 'posts',
              'text-gray-400': activeTab == 'comments',
            }"
            class="px-2 font-semibold tracking-wider"
          >
            Posts
          </button>
          <button
            @click="setTab('comments')"
            :class="{
              'text-gray-400': activeTab == 'posts',
              'text-green-600 text-lg': activeTab == 'comments',
            }"
            class="px-2 font-semibold tracking-wider"
          >
            Comments
          </button>
        </div>

        <div v-if="activeTab == 'posts'">
          <post-tile
            :readonly="true"
            v-for="(post, ix) in posts"
            :post="post"
            :key="ix"
            @clicked="clicked(post)"
          ></post-tile>
          <div
            v-if="loading"
            class="flex items-start justify-start flex-col mt-10"
          >
            <loader class="mt-20"></loader>
          </div>
          <div v-if="loadComplete" class="text-center pb-32 pt-10">
            <p class="text-lg text-gray-400 font-semibold">No More Posts</p>
          </div>
        </div>
        <div v-else>
          <comment-tile
            :readonly="true"
            v-for="(com, ix) in comments"
            :key="ix"
            :comment="com"
          />

          <div
            v-if="loading"
            class="flex items-start justify-start flex-col mt-10"
          >
            <loader class="mt-20"></loader>
          </div>
          <div v-if="loadComplete" class="text-center pb-32 pt-10">
            <p class="text-lg text-gray-400 font-semibold">No More Posts</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CommentTile from "../components/CommentTile.vue";
import FeedTile from "../components/FeedTile.vue";
import Navbar from "../components/Navbar.vue";
import UserAvatar from "../components/UserAvatar.vue";
import PostTile from "../components/PostTile.vue";
import Loader from "../components/Loader.vue";
import {
  IS_DUPLICATE,
  ME,
  UPDATE_PROFILE,
  USER_COMMENTS,
  USER_POSTS,
} from "../queries";
import DialogModal from "../components/DialogModal.vue";

export default defineComponent({
  components: {
    Navbar,
    UserAvatar,
    CommentTile,
    FeedTile,
    PostTile,
    Loader,
    DialogModal,
  },
  setup() {},
  data: () => ({
    name: "",
    bio: "",
    loading: false,
    lastCommentSnapshot: null as any,
    lastSnapshot: null as any,
    loadComplete: false,
    activeTab: "posts",
    showModal: false,
    editPopup: false,
    dupError: false,
    totalCountPost: 0,
    totalCountComments: 0,
    paginationP: {
      page: 1,
      pageSize: 25,
    },
    paginationC: {
      page: 1,
      pageSize: 25,
    },
    comments: [] as any,
    posts: [] as any,
    limit: 2,
  }),
  async created() {
    this.$store.commit("SET_PROFILE_POP", false);
    this.$store.commit("SET_MAIN_POP", false);
    await this.persistUserData();
    await this.fetchUserPosts();
    await this.loadComments();
    this.name = this.$store.state.user.fullName;
    this.bio = this.$store.state.user.bio;
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    async persistUserData() {
      const {
        data: { me },
      } = await this.$apollo.query({
        query: ME,
        fetchPolicy: "network-only",
      });
      if (me) {
        this.$store.commit("SET_USER", me.user);
        this.$store.commit("SET_NOTIFICATION", me.notificationsCount);
        this.$emit("loggedin");
      }
    },
    submitForm() {
      if (this.dupError) {
        alert("this username is already taken");
        return;
      }
      this.$apollo
        .mutate({
          mutation: UPDATE_PROFILE,
          variables: {
            name: this.name,
            bio: this.bio,
          },
        })
        .then(() => {
          let userData = JSON.parse(JSON.stringify(this.$store.state.user));
          userData.bio = this.bio;
          userData.fullName = this.name;
          console.log(userData, "Data");
          this.$store.commit("SET_USER", userData);
          alert("updated successfully");
          this.editPopup = false;
        });
    },
    deletePost() {},
    async handleScroll(e: any) {
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 50
      ) {
        if (this.totalCountPost) {
          this.paginationP.page++;
          await this.fetchUserPosts();
        } else if (this.totalCountComments) {
          this.paginationC.page++;
          const totalCount = await this.loadComments();
          console.log("load more", totalCount);
        }
      }
    },
    setTab(tab: any) {
      this.activeTab = tab;
    },
    clicked(post: any) {
      this.$router.push({ path: `/game/${post.postId}` });
    },
    async checkDuplicate() {
      const {
        data: { isNameDuplicate },
      } = await this.$apollo.mutate({
        mutation: IS_DUPLICATE,
        variables: { name: this.name },
      });
      this.dupError = isNameDuplicate;
      // if (isNameDuplicate) this.error = true;
    },
    async loadComments() {
      this.loading = true;
      const {
        data: {
          userComments: { data, total },
        },
      } = await this.$apollo
        .query({
          query: USER_COMMENTS,
          variables: {
            pagination: this.paginationC,
          },
        })
        .finally(() => {
          this.loading = false;
        });
      const comments = JSON.parse(JSON.stringify(data));
      this.totalCountComments = this.comments.length;
      this.comments.push(...comments);
    },
    async fetchUserPosts() {
      this.loading = true;
      const {
        data: {
          userPosts: { data },
        },
      } = await this.$apollo
        .query({
          query: USER_POSTS,
          fetchPolicy: "network-only",
          variables: {
            pagination: this.paginationP,
          },
        })
        .finally(() => {
          this.loading = false;
        });
      const post = JSON.parse(JSON.stringify(data));
      this.totalCountPost = post.length;
      this.posts.push(...post);
    },
  },
});
</script>
