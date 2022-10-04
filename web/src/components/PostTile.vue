<template>
  <div
    class="flex flex-row mt-4 hover:bg-gray-50 relative xl:p-2 lg:p-2 md:p-2 mb-3"
  >
    <vote-clickers
      :readonly="readonly"
      :voted="voteData.voted"
      @upvoted="upvoted"
      @downvoted="downvoted"
      :vote="voteData.vote == 1 ?? false"
      :large="false"
      :count="post.likes"
      color="#92daac"
    />
    <div
      class="mx-3 pb-2 cursor-pointer w-full relative"
      @click="$emit('clicked')"
    >
      <p
        class="px-2 tracking-wide text-gray-600 text-lg"
        :class="{ 'py-2': post.cover, 'pt-5': !post.cover }"
        v-text="post.content"
      ></p>
      <vue-load-image :key="compKey">
        <template v-slot:image>
          <img
            v-if="post.cover"
            :src="post.cover"
            alt=""
            style="object-fit: contain"
          />
        </template>
        <template v-slot:preloader>
          <loader></loader>
        </template>
      </vue-load-image>
      <div class="flex items-end justify-between mb-1 mt-3">
        <div class="grid grid-cols-4 sm:grid-cols-4 gap-2">
          <button
            @click.stop="tagClicked(tag)"
            v-for="(tag, ix) in post.tags"
            :key="ix"
          >
            <div
              class="border-2 rounded-lg p-1 text-gray-400 border-green-100 hover:border-green-200 hover:text-green-400"
            >
              {{ tag.tagName }}
            </div>
          </button>
        </div>
        <button>
          <div class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-green-400 mt-1"
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
            <p class="text-green-400 text-lg px-1">{{ post.comments }}</p>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import VoteClickers from "./VoteClickers.vue";
import VueLoadImage from "vue-load-image";
import Loader from "./Loader.vue";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "@firebase/firestore";
import { db } from "../firebase.config";
import { uuid } from "vue-uuid";
import { GET_POST_VOTES, SET_VOTE } from "../queries";

export default defineComponent({
  components: { VoteClickers, "vue-load-image": VueLoadImage, Loader },
  data: () => ({
    voteData: { vote: null, voted: null } as any,
    initialVote: 0,
    postRef: null as any,
  }),
  props: ["post", "count", "readonly", "compKey"],
  async created() {
    this.initialVote = this.post.likes;
    if (this.$store.state.loggedIn) {
      await this.fetchVotes();
    }
  },
  methods: {
    async fetchVotes() {
      const {
        data: { getPostVote },
      } = await this.$apollo.query({
        query: GET_POST_VOTES,
        fetchPolicy: "network-only",
        variables: { post: this.post.postId },
      });
      this.voteData = {
        vote: getPostVote.vote,
        voted: getPostVote.voted,
      };
      const voteFlag = this.voteData.vote == 1 ?? false;

      if (this.voteData.voted && voteFlag) {
        this.initialVote = this.post.likes - 1;
      } else if (this.voteData.voted && !voteFlag) {
        this.initialVote = this.post.likes + 1;
      } else {
        this.initialVote = this.post.likes;
      }
    },
    async setVote(vote: any) {
      await this.$apollo.mutate({
        mutation: SET_VOTE,
        variables: {
          input: {
            vote: vote,
            type: "post",
            entityId: this.post.postId,
          },
        },
      });

      if (vote == 1) {
        this.post.likes = this.initialVote + 1;
      } else if (vote == -1) {
        this.post.likes = this.initialVote - 1;
      } else {
        this.post.likes = this.initialVote;
      }
    },
    async setRef() {
      const q = query(collection(db, "posts"), where("id", "==", this.post.id));
      const querySnapshot = await getDocs(q);
      this.postRef = querySnapshot.docs[0].ref;
    },
    async removeVote() {
      // retain initial vote when user removes theirs
      this.post.likes = this.initialVote;
      this.voteData.voted = false;
      this.voteData.vote = 0;
      this.setVote(0);
    },
    async upvoted() {
      if (this.$store.state.user) {
        if (this.voteData.vote == 1) {
          this.removeVote();
          return;
        } else {
          this.voteData.voted = true;
          this.voteData.vote = 1;
          this.setVote(1);
          return;
        }
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
    tagClicked(tag: any) {
      this.$router.push(`/tag/${tag.tagName}`);
    },
    async downvoted() {
      console.log("downvoted");
      if (this.$store.state.user) {
        if (this.voteData.vote == -1) {
          this.removeVote();
        } else {
          this.voteData.voted = true;
          this.voteData.vote = -1;
          this.setVote(-1);
        }
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
  },
});
</script>
