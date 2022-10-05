<template>
  <div>
    <div class="flex flex-row mt-4 gap-3 hover:bg-gray-50 p-2">
      <vote-clickers
        :voted="voteData.voted"
        @upvoted="upvoted"
        :readonly="readonly"
        @downvoted="downvoted"
        :vote="voteData.vote == 1 ?? false"
        :large="false"
        :count="comment.likes"
      />
      <div>
        <div class="flex flex-row mt-2">
          <div v-if="$store.state.loggedIn">
            <user-avatar
              :img="comment.user.photo"
              :path="
                $store.state.user.userId == comment.user.userId
                  ? '/user'
                  : `/user/${comment.user.userId}`
              "
              :user="comment.user"
            />
          </div>
          <user-avatar
            :img="comment.user.photo"
            :path="'/'"
            :user="comment.user"
            v-else
          />
          <div></div>
          <div v-if="comment.user">
            <p
              class="text-sm text-gray-500 px-2 pt-1 font-semibold tracking-wider font-sans"
            >
              {{ comment.user.fullName }}
            </p>
            <div class="mx-2">
              <span
                class="px-1 rounded-md text-white text-sm"
                style="background: #5fd49f"
              >
                {{ comment.user.totalLikes }}
              </span>
            </div>
          </div>
        </div>
        <p
          class="pt-2 tracking-wide text-gray-600 text-lg"
          v-text="comment.message"
        ></p>
        <div v-if="$store.state.user">
          <button
            v-if="$store.state.user.uid != comment.user.id"
            class="font-semibold text-sm text-gray-400"
            @click="$emit('replyClicked')"
          >
            Reply
          </button>
        </div>
        <button
          v-else
          class="font-semibold text-sm text-gray-400"
          @click="$emit('replyClicked')"
        >
          Reply
        </button>

        <vue-load-image>
          <template v-slot:image>
            <img
              v-if="comment.user.profile"
              :src="comment.user.profile"
              alt=""
              style="object-fit: contain"
            />
          </template>
          <template v-slot:preloader>
            <loader></loader>
          </template>
        </vue-load-image>
      </div>
    </div>
    <img
      v-if="comment.cover"
      :src="comment.cover"
      alt=""
      style="object-fit: contain"
    />
    <hr class="mt-2" />
  </div>
</template>
<script lang="ts">
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "@firebase/firestore";
import { defineComponent } from "vue";
import { uuid } from "vue-uuid";
import { db } from "../firebase.config";
import { GET_COMMENT_VOTES, SET_VOTE } from "../queries";
import UserAvatar from "./UserAvatar.vue";
import VoteClickers from "./VoteClickers.vue";

export default defineComponent({
  components: { VoteClickers, UserAvatar },
  data: () => ({
    initialVote: 0,
    commentRef: null as any,
    voteData: { vote: null, voted: null } as any,
  }),
  props: ["comment", "readonly"],
  async created() {
    if (this.$store.state.loggedIn) {
      this.fetchVotes();
    }
  },
  methods: {
    async fetchVotes() {
      const {
        data: { getCommentVote },
      } = await this.$apollo.query({
        query: GET_COMMENT_VOTES,
        variables: { comment: this.comment.commentId },
      });
      this.voteData = {
        vote: getCommentVote.vote,
        voted: getCommentVote.voted,
      };

      const voteFlag = this.voteData.vote == 1 ?? false;

      if (this.voteData.voted && voteFlag) {
        this.initialVote = this.comment.likes - 1;
      } else if (this.voteData.voted && !voteFlag) {
        this.initialVote = this.comment.likes + 1;
      } else {
        this.initialVote = this.comment.likes;
      } // await this.setRef();
      console.log(this.comment.likes);
    },
    async setRef() {
      const q = query(
        collection(db, "comments"),
        where("id", "==", this.comment.id)
      );
      const querySnapshot = await getDocs(q);
      this.commentRef = querySnapshot.docs[0].ref;
    },
    async setVote(vote: any) {
      await this.$apollo.mutate({
        mutation: SET_VOTE,
        variables: {
          input: {
            vote: vote,
            type: "comment",
            entityId: this.comment.commentId,
          },
        },
      });

      if (vote == 1) {
        this.comment.likes = this.initialVote + 1;
      } else if (vote == -1) {
        this.comment.likes = this.initialVote - 1;
      } else {
        this.comment.likes = this.initialVote;
      }
    },
    async removeVote() {
      console.log("Remove me");
      // retain initial vote when user removes theirs
      this.comment.likes = this.initialVote;
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
    async downvoted() {
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
