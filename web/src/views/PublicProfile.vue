<template>
  <div>
    <navbar
      @clickedLogin="$store.commit('SET_LOGIN_POP', true)"
      @profileClicked="$store.commit('SET_PROFILE_POP', true)"
    ></navbar>

    <div
      class="mt-16 h-3/4 w-full"
      style="
        background: #a5dec4;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      "
    >
      <div
        v-if="user"
        class="text-white font-semibold xl:text-4xl lg:text-4xl md:text-3xl text-2xl xl:tracking-wider lg:tracking-wider md:tracking-wider tracking-normal font-sans flex xl:mx-52 md:mx-10 pt-20"
      >
        <div class="flex flex-col w-full items-start px-2">
          <p class="pt-5">{{ user.fullName }}</p>
          <div class="pb-4 pt-2">
            <p
              class="text-xl text-center font-normal rounded-xl px-2"
              style="background: #14532d73"
            >
              +{{ user.totalLikes }}
            </p>
          </div>

          <p class="pb-20 pt-2 text-xl xl:text-2xl lg:text-2xl font-normal">
            {{ user.bio }}
          </p>
        </div>
      </div>
      <div v-else class="flex items-center justify-center">
        <game-loader></game-loader>
      </div>
    </div>
    <div class="grid grid-cols-7 xl:mx-52 lg:mx-0 m-3">
      <div class="w-full mt-2 hidden lg:block xl:block md:block col-span-2">
        <div class="flex flex-row" v-if="$store.state.loggedIn && user">
          <user-avatar :img="user.photo" />
          <div>
            <p
              class="text-xl text-gray-500 px-2 pt-1 font-semibold tracking-wider font-sans"
            >
              {{ user.fullName }}
            </p>
          </div>
        </div>
        <button
          class="rounded-xl tracking-widest border-2 mt-10 p-2"
          v-if="!$store.state.loggedIn"
          @click="showModal = true"
        >
          Sign Up
        </button>
      </div>
      <!-- comments section -->
      <div
        class="bg-white col-span-7 lg:col-span-3 sm::col-span-4 md::col-span-4 xl:col-span-4 w-full"
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
            :readonly="false"
            v-for="(com, ix) in comments"
            :key="ix"
            :comment="com"
            @click="$router.push(`/game/${com.post.postId}`)"
            class="cursor-pointer"
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
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "@firebase/firestore";
import { defineComponent } from "vue";
import CommentTile from "../components/CommentTile.vue";
import FeedTile from "../components/FeedTile.vue";
import Navbar from "../components/Navbar.vue";
import UserAvatar from "../components/UserAvatar.vue";
import { db } from "../firebase.config";
import PostTile from "../components/PostTile.vue";
import Loader from "../components/Loader.vue";
import GameLoader from "../components/GameLoader.vue";
import {
  USER_PUBLIC,
  USER_PUBLIC_COMMENTS,
  USER_PUBLIC_POSTS,
} from "../queries";

export default defineComponent({
  components: {
    Navbar,
    UserAvatar,
    CommentTile,
    FeedTile,
    PostTile,
    Loader,
    GameLoader,
  },
  setup() {},
  data: () => ({
    loading: false,
    lastCommentSnapshot: null as any,
    lastSnapshot: null as any,
    loadComplete: false,
    activeTab: "posts",
    showModal: false,
    user: null as any,
    totalCountPost: 0,
    totalCountComments: 0,
    paginationP: {
      page: 1,
      pageSize: 2,
    },
    paginationC: {
      page: 1,
      pageSize: 4,
    },
    comments: [] as any,
    posts: [] as any,
    limit: 10,
  }),
  async created() {
    await this.loadUserData();
    await this.fetchUserPosts();
    await this.loadComments();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    async handleScroll(e: any) {
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 50
      ) {
        console.log("there");
        if (this.totalCountPost) {
          this.paginationP.page++;
          await this.fetchUserPosts();
          console.log("load more");
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
    async loadUserData() {
      const {
        data: { userPublic },
      } = await this.$apollo.query({
        query: USER_PUBLIC,
        fetchPolicy: "network-only",
        variables: { user: this.$route.params.uid },
      });
      this.user = userPublic;
    },
    async loadComments() {
      this.loading = true;
      const {
        data: {
          userPublicComments: { data, total },
        },
      } = await this.$apollo
        .query({
          query: USER_PUBLIC_COMMENTS,
          variables: {
            pagination: this.paginationC,
            user: this.$route.params.uid,
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
          userPublicPosts: { data },
        },
      } = await this.$apollo
        .query({
          query: USER_PUBLIC_POSTS,
          fetchPolicy: "network-only",
          variables: {
            pagination: this.paginationP,
            user: this.$route.params.uid,
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
