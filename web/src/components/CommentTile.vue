<template>
  <div>
    <div class="flex flex-row mt-4 gap-3 hover:bg-gray-50">
      <vote-clickers
        :voted="voteData.voted"
        @upvoted="upvoted"
        @downvoted="downvoted"
        :vote="voteData.vote"
        :large="false"
        :count="comment.comment.likes"
      />
      <div>
        <div class="flex flex-row mt-2">
          <user-avatar :img="comment.user.photoURL" />
          <div></div>
          <div v-if="comment.user">
            <p
              class="text-sm text-gray-500 px-2 pt-1 font-semibold tracking-wider font-sans"
            >
              {{ comment.user.name }}
            </p>
            <div
              class="mx-2 w-1/2 text-center font-black text-sm rounded-md text-white bg-green-500"
            >
              {{ comment.user.totalLikes }}
            </div>
          </div>
        </div>
        <p
          class="py-2 mb-2 tracking-wide text-gray-600 text-lg"
          v-text="comment.comment.message"
        ></p>

        <img
          v-if="comment.user.profile"
          :src="comment.user.profile"
          alt=""
          style="object-fit: contain"
        />
      </div>
    </div>
    <img
      v-if="comment.comment.cover"
      :src="comment.comment.cover"
      alt=""
      style="object-fit: contain"
    />
    <div v-if="$store.state.user">
      <button
        href=""
        v-if="$store.state.user.uid != comment.user.id"
        class="px-20 font-black text-gray-400"
        @click="$emit('replyClicked')"
      >
        Reply
      </button>
    </div>
    <button
      href=""
      v-else
      class="px-20 font-black text-gray-400"
      @click="$emit('replyClicked')"
    >
      Reply
    </button>
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
import UserAvatar from "./UserAvatar.vue";
import VoteClickers from "./VoteClickers.vue";

export default defineComponent({
  components: { VoteClickers, UserAvatar },
  data: () => ({
    initialVote: 0,
    commentRef: null as any,
    voteData: { vote: null, voted: null } as any,
  }),
  props: ["comment"],
  async created() {
    if (this.$store.state.loggedIn) {
      this.fetchVotes();
    }
    this.initialVote = this.comment.comment.likes;
    await this.setRef();
  },
  methods: {
    async fetchVotes() {
      const voteQuery = query(
        collection(db, "likes"),
        where("user", "==", this.$store.state.user.uid),
        where("type", "==", "comment"),
        where("objectId", "==", this.comment.comment.id)
      );
      const likes = await getDocs(voteQuery);
      let vote;
      let voted;
      if (!likes.empty) {
        const likesData = likes.docs[0].data();
        vote = likes.docs.length ? likesData.vote : null;
        voted = likes.docs.length ? likesData.voted : null;
        this.voteData.vote = vote;
        this.voteData.voted = voted;
        if (voted && vote) {
          this.initialVote = this.comment.comment.likes - 1;
        } else if (voted && !vote) {
          this.initialVote = this.comment.comment.likes + 1;
        }
      }
      console.log({ vote, voted });
      return { vote, voted } as any;
    },
    async setRef() {
      const q = query(
        collection(db, "comments"),
        where("id", "==", this.comment.comment.id)
      );
      const querySnapshot = await getDocs(q);
      this.commentRef = querySnapshot.docs[0].ref;
    },
    async setVote(vote: any) {
      const likesRef = doc(collection(db, "likes"));
      const lq = query(
        collection(db, "likes"),
        where("user", "==", this.$store.state.user.uid),
        where("type", "==", "comment"),
        where("objectId", "==", this.comment.comment.id)
      );
      const likes = await getDocs(lq);
      if (likes.docs.length) {
        likes.forEach((like) =>
          updateDoc(like.ref, {
            vote: vote,
            voted: true,
          })
        );
      } else {
        await setDoc(likesRef, {
          id: uuid.v4(),
          createdAt: new Date().toISOString(),
          objectId: this.comment.comment.id,
          type: "comment",
          vote: vote,
          voted: true,
          user: this.$store.state.user.uid,
        });
      }
      if (vote) {
        this.comment.comment.likes = this.initialVote + 1;
        updateDoc(this.commentRef, {
          likes: this.comment.comment.likes,
        });
      } else {
        this.comment.comment.likes = this.initialVote - 1;

        updateDoc(this.commentRef, {
          likes: this.comment.comment.likes,
        });
      }
    },
    async removeVote(vote: any) {
      // retain initial vote when user removes theirs
      this.comment.comment.likes = this.initialVote;
      updateDoc(this.commentRef, {
        likes: this.initialVote,
      });
      this.voteData.voted = null;
      this.voteData.vote = null;
      const lq = query(
        collection(db, "likes"),
        where("user", "==", this.$store.state.user.uid),
        where("type", "==", "comment"),
        where("objectId", "==", this.comment.comment.id)
      );
      const likes = await getDocs(lq);
      if (likes.docs.length) {
        likes.forEach((like) =>
          updateDoc(like.ref, {
            vote: null,
            voted: null,
          })
        );
      }
    },
    async upvoted() {
      if (this.$store.state.user) {
        console.log("up", this.comment);
        console.log(this.voteData.vote, "dawg");
        if (this.voteData.vote == true) {
          this.removeVote(true);
          return;
        } else {
          this.voteData.voted = true;
          this.voteData.vote = true;
          this.setVote(true);
          return;
        }
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
    async downvoted() {
      if (this.$store.state.user) {
        console.log("down");
        console.log(this.voteData.vote, "vote");
        if (this.voteData.vote == false) {
          this.removeVote(false);
        } else {
          this.voteData.voted = true;
          this.voteData.vote = false;
          this.setVote(false);
        }
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
  },
});
</script>
