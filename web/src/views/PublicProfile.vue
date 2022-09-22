<template>
  <div>
    <navbar
      @clickedLogin="$store.commit('SET_LOGIN_POP', true)"
      @profileClicked="$store.commit('SET_PROFILE_POP', true)"
    ></navbar>

    <div
      class="mt-16 h-3/4 w-full"
      style="
          background: #5fe18c
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        "
    >
      <div
        v-if="user"
        class="text-white font-semibold xl:text-4xl lg:text-4xl md:text-3xl text-2xl xl:tracking-wider lg:tracking-wider md:tracking-wider tracking-normal font-sans flex xl:mx-52 md:mx-10 pt-20"
      >
        <div class="flex flex-col gap-4 w-full items-start px-2">
          <p class="pt-5">{{ user.fullName }}</p>
          <p class="pb-20 pt-2 text-xl xl:text-2xl lg:text-2xl font-normal">
            If you treat me like an option, I’ll leave you like a choice.
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
            <div
              class="mx-2 w-1/2 text-center font-black text-sm rounded-md text-white bg-green-500"
            >
              {{ user.totalLikes }}
            </div>
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
            :postRef="postRef"
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
          <div
            class="flex justify-center my-10"
            v-if="posts.length && !loading && !loadComplete"
          >
            <button
              class="mb-44 flex gap-2 bg-green-200 px-4 py-3 ring-2 ring-green-400 hover:bg-green-300 hover:scale-110 delay-75 rounded-full"
              @click="fetchUserPosts"
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
        </div>
        <div v-else>
          <comment-tile
            :readonly="false"
            v-for="(com, ix) in sortedArray()"
            :key="ix"
            :comment="com"
            class="cursor-pointer"
            @click="$router.push(`/game/${com.comment.post}`)"
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
          <div
            class="flex justify-center my-10"
            v-if="posts.length && !loading && !loadComplete"
          >
            <button
              class="mb-44 flex gap-2 bg-green-200 px-4 py-3 ring-2 ring-green-400 hover:bg-green-300 hover:scale-110 delay-75 rounded-full"
              @click="loadComments()"
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
import { USER_PUBLIC } from "../queries";

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
    comments: [] as any,
    posts: [] as any,
    limit: 10,
  }),
  async created() {
    await this.loadUserData();
    // await this.fetchUserPosts();
    // await this.loadComments();
  },
  methods: {
    setTab(tab: any) {
      this.activeTab = tab;
    },
    clicked(post: any) {
      this.$router.push({ path: `/game/${post.id}` });
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
      let q = query(
        collection(db, "comments"),
        where("user", "==", this.$route.params.uid),
        limit(this.limit)
      );
      if (this.lastCommentSnapshot) {
        q = query(
          collection(db, "comments"),
          where("user", "==", this.$route.params.uid),
          startAfter(this.lastCommentSnapshot),
          limit(this.limit)
        );
      }
      const snapshotData = await getDocs(q);
      this.lastCommentSnapshot =
        snapshotData.docs[snapshotData.docs.length - 1];
      snapshotData.forEach(async (c) => {
        const comment = c.data();
        let uq = query(
          collection(db, "users"),
          where("id", "==", comment["user"])
        );
        const user = await getDocs(uq);
        await this.comments.push({
          comment: comment,
          user: user.docs[0].data(),
        });
      });
      this.loading = false;
    },
    sortedArray: function () {
      function compare(a: any, b: any) {
        if (new Date(a.comment.createdAt) < new Date(b.comment.createdAt))
          return -1;
        if (new Date(a.comment.createdAt) > new Date(b.comment.createdAt))
          return 1;
        return 0;
      }
      return this.comments.sort(compare);
    },
    async fetchUserPosts() {
      this.loading = true;
      let postQ = query(
        collection(db, "posts"),
        where("user", "==", this.$route.params.uid),
        limit(this.limit)
      );

      if (this.lastSnapshot)
        postQ = query(
          collection(db, "posts"),
          where("user", "==", this.$route.params.uid),
          startAfter(this.lastSnapshot),
          limit(this.limit)
        );

      const querySnapshot = await getDocs(postQ);
      this.lastSnapshot = querySnapshot.docs[querySnapshot.docs.length - 1];
      let result = querySnapshot.docs.map((p) => p.data());
      this.posts.push(...result);
      this.loading = false;
      if (!result.length) this.loadComplete = true;
      return result.length;
    },
  },
});
</script>
