<template>
  <div clas>
    <light-gallery :showModal="showModal" @close="showModal = false" />
    <div class="bg-green-400 h-1/2 w-full">
      <div
        class="text-white p-2 font-semibold xl:text-4xl lg:text-4xl md:text-3xl text-2xl xl:tracking-wider lg:tracking-wider md:tracking-wider tracking-normal font-sans flex  xl:mx-52 md:mx-10 pt-20"
      >
        <div class="flex flex-row ga-4" v-if="post">
          <vote-clickers :dark="true" color="#92daac" class="mt-5" />
          <div class="flex flex-col gap-4 w-full px-2">
            <p class="pt-5">Karlson</p>
            <p class="pt-2 text-xl xl:text-2xl lg:text-2xl font-normal">
              {{ post.content }}
            </p>
            <div class="mr-3 mb-3">
              <img :src="post.cover" v-if="post.cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-center p-2 gap-2 mt-2">
      <div class="w-1/5 mt-2 hidden lg:block xl:block md:block mr-5">
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

        <h1 class="text-gray-500 text-2xl font-semibold tracking-wide mt-3">
          Support Us
        </h1>
        <p class="font-normal text-gray-400 text-lg">
          Do all the things like ++ or -- rants, post your own rants, comment on
          others' rants and build your customized dev avatar
        </p>
        <button
          class="rounded-xl tracking-widest border-2 mt-2 p-2"
          @click="showModal = true"
        >
          Sign Up
        </button>
      </div>
      <!-- comments section -->
      <div class="md:w-2/3 sm:w-full lg:w-1/2 w-full xl:w-2/6 bg-white mb-20">
        <p class="text-2xl pt-5 font-semibold tracking-wider text-gray-500">
          Comments
        </p>
        <div v-if="comments.length">
          <comment-tile
            text="Dont know when devRant became NatGeo Wild Trivia ..."
            v-for="(com, ix) in comments"
            :key="ix"
            :comment="com"
          />
        </div>
      </div>
      <!-- comments section end -->
      <div
        style="width: 13%"
        class="xl:block md:block flex-row justify-center gap-10 mt-2 mx-2 hidden md:hidden"
      >
        <div class="mt-2 hidden lg:block xl:block md:block">
          <h1 class="text-gray-500 text-2xl font-semibold tracking-widest pb-2">
            Related Chewata
          </h1>
          <related-items v-for="x in 2" :key="x" />
        </div>
      </div>
    </div>
    <comment-meda :hide="false" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import CommentMeda from "../components/CommentMeda.vue";
import CommentTile from "../components/CommentTile.vue";
import LightGallery from "../components/LightGallery.vue";
import Navbar from "../components/Navbar.vue";
import RelatedItems from "../components/RelatedItems.vue";
import UserAvatar from "../components/UserAvatar.vue";
import VoteClickers from "../components/VoteClickers.vue";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";

export default defineComponent({
  components: {
    Navbar,
    // GroundMeda,
    VoteClickers,
    CommentTile,
    UserAvatar,
    RelatedItems,
    LightGallery,
    CommentMeda,
  },
  async mounted() {
    this.loading = true;
    const q = query(
      collection(db, "posts"),
      where("id", "==", this.$route.params.id)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length) {
      this.post = querySnapshot.docs[0].data();
    }
    this.loading = false;
  },
  methods: {
    async loadComments() {
      const q = query(
        collection(db, "comments"),
        where("post", "==", this.$route.params.id)
      );
      const snapshotData = await getDocs(q);
      snapshotData.forEach(async (c) => {
        const comment = c.data();
        const uq = query(
          collection(db, "users"),
          where("id", "==", comment["user"])
        );
        const user = await getDocs(uq);
        this.comments.push({ comment: comment, user: user.docs[0].data() });
      });
    },
  },
  data: () => ({
    comments: [] as any,
    loading: false,
    post: null as any,
    showModal: false,
    showSide: true,
  }),
  async created() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
    await this.loadComments();
  },
  computed: {
    windowWidth(): any {
      return this.windowWidth;
    },
  },
});
</script>
