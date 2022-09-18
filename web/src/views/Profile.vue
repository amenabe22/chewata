<template>
  <div>
    <navbar />
    <div
      class="mt-16 bg-green-400 h-3/4 w-full"
      style="
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      "
      :class="{
        'bg-[url()]': true,
      }"
    >
      <div
        class="text-white font-semibold xl:text-4xl lg:text-4xl md:text-3xl text-2xl xl:tracking-wider lg:tracking-wider md:tracking-wider tracking-normal font-sans flex xl:mx-52 md:mx-10 pt-20"
      >
        <div class="flex flex-col gap-4 w-full items-start px-2">
          <p class="pt-5">Cool Dude</p>
          <p class="pb-20 pt-2 text-xl xl:text-2xl lg:text-2xl font-normal">
            If you treat me like an option, I’ll leave you like a choice.
          </p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-7 xl:mx-52 lg:mx-0 m-3">
      <div class="w-full mt-2 hidden lg:block xl:block md:block col-span-2">
        <div class="flex flex-row" v-if="$store.state.loggedIn">
          <user-avatar :img="$store.state.user.photoURL" />
          <div>
            <p
              class="text-xl text-gray-500 px-2 pt-1 font-semibold tracking-wider font-sans"
            >
              {{ $store.state.user.displayName }}
            </p>
            <div
              class="mx-2 w-1/2 text-center font-black text-sm rounded-md text-white bg-green-500"
            >
              1099
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
      <div class="bg-white col-span-5">
        <div class="flex flex-row pt-3">
          <button
            class="text-2xl px-2 font-semibold tracking-wider text-gray-400"
          >
            Posts
          </button>
          <button
            class="text-2xl px-2 font-semibold tracking-wider text-gray-400"
          >
            Comments
          </button>
          <button
            class="text-2xl px-2 font-semibold tracking-wider text-gray-400"
          >
            Favourites
          </button>
        </div>
        <div>
          <!-- {{ posts }} -->
          <post-tile
            :readonly="true"
            v-for="(post, ix) in posts"
            :postRef="postRef"
            :post="post"
            :key="ix"
            @clicked="clicked(post)"
          ></post-tile>
        </div>
        <!-- <feed-tile
          pic="https://img.devrant.com/devrant/rant/r_4913002_e2Y73.jpg"
          text="From the window of my new office I see a lot of chicks."
        />
        <feed-tile
          text="
All jobs required experience in stuff I never seen/heard before (back then I didn’t know most job listings were copy pasted by people who knew less than me)."
          v-for="x in 3"
          :key="x"
        /> -->
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
  where,
} from "@firebase/firestore";
import { defineComponent } from "vue";
import CommentTile from "../components/CommentTile.vue";
import FeedTile from "../components/FeedTile.vue";
import Navbar from "../components/Navbar.vue";
import UserAvatar from "../components/UserAvatar.vue";
import { db } from "../firebase.config";
import PostTile from "../components/PostTile.vue";

export default defineComponent({
  components: { Navbar, UserAvatar, CommentTile, FeedTile, PostTile },
  setup() {},
  data: () => ({
    showModal: false,
    posts: [] as any,
    limit: 10,
  }),
  async created() {
    await this.fetchUserPosts();
  },
  methods: {
    async fetchUserPosts() {
      console.log();
      let postQ = query(
        collection(db, "posts"),
        where("user", "==", this.$store.state.user.uid),
        limit(this.limit)
      );
      const querySnapshot = await getDocs(postQ);
      let result = querySnapshot.docs.map((p) => p.data());
      this.posts.push(...result);
    },
  },
});
</script>
