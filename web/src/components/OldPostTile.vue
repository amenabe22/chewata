<template>
  <div class="tile-wrapper flex flex-col justify-end items-center">
    <div class="flex justify-start tile-inner">
      <div class="flex flex-col items-center relative gap-2">
        <div
          class="vote-clicker-inner rounded-full text-white flex justify-center items-center text-center text-3xl"
        >
          <span class="counter-item">+</span>
        </div>
        <p>{{ post.likes }}</p>
        <div
          class="vote-clicker-inner rounded-full text-white flex justify-center items-center text-center text-3xl"
        >
          <span class="counter-item">-</span>
        </div>
      </div>
      <div class="flex flex-col items-start justify-center gap-8">
        <div class="flex items-start post-small-header">
          <div class="flex flex-col items-start">
            <div class="post-title-wrapper">
              <p class="post-tile-title">{{ post.user.fullName }}</p>
            </div>
            <div class="likes-count-box">
              <p class="likes-count">202</p>
            </div>
          </div>
          <div class="flex flex-col cursor-alias post-left-options">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <p>30m</p>
          </div>
        </div>
        <div class="post-content-wrapper flex items-start">
          <p class="post-content">
            {{ post.content }}
          </p>
        </div>
        <div v-if="post.cover">
          <img :src="post.cover" class="rounded-2xl" alt="" />
        </div>
      </div>
    </div>
    <!-- {{ post }} -->
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
              this.$router.push("/login");;
      }
    },
    tagClicked(tag: any) {
      alert(tag.tagName);
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
              this.$router.push("/login");;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Inconsolata|Oswald");
.tile-wrapper {
  padding: 20.6725px;
  gap: 33.08px;
  background: #d2eee1;
  border-radius: 31.0087px;
}

.tile-inner {
  gap: 11px;
}
.vote-clicker {
  width: 39.33px;
  height: 39.33px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: -11.0009px 0px;
}
.vote-clicker-inner {
  background: #2f7046;
  width: 39.33px;
  height: 39.33px;
}
.counter-item {
  padding-bottom: 4px;
}
.post-small-header {
  gap: 235.42px;
  width: 100%;
}
.post-title-wrapper {
  padding: 0px 10.3362px 0px 0px;
}
.post-tile-title {
  font-family: "Nunito", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 35px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #000000;
}
.likes-count-box {
  box-sizing: border-box;
  padding: 4.40038px 11.0009px;
  gap: 22px;
  width: 51px;
  height: 30.8px;
  border: 2.20019px solid rgba(47, 112, 70, 0.5);
  border-radius: 5px;
}
.likes-count {
  font-family: "Nunito", sans-serif;
  font-style: normal;
  padding-bottom: 5px;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #000000;
}
.post-left-options {
  padding: 8.26898px 0px 0px;
  gap: 12px;
}
.post-content-wrapper {
  gap: 20.67px;
}
.post-content {
  font-family: "Nunito", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;

  color: #000000;
}
</style>
