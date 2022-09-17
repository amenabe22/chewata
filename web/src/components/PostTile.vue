<template>
  <router-link
    :to="`/game/${post.id}`"
    class="flex flex-row mt-4 hover:bg-gray-50 cursor-pointer relative"
  >
    <vote-clickers
      :voted="voteData.voted"
      @upvoted="upvoted"
      @downvoted="downvoted"
      :vote="voteData.vote"
      :large="true"
      :count="post.likes"
      color="#92daac"
      class="mt-5"
    />
    <div class="mx-3 pt-2">
      <p
        class="py-2 tracking-wide text-gray-600 text-lg"
        v-text="post.content"
      ></p>
      <vue-load-image>
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
    </div>
  </router-link>
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

export default defineComponent({
  components: { VoteClickers, "vue-load-image": VueLoadImage, Loader },
  data: () => ({ voteData: { vote: null, voted: null } }),
  props: ["post", "count"],
  async created() {
    this.fetchVotes(this.post);
  },
  methods: {
    async fetchVotes(post: any) {
      const voteQuery = query(
        collection(db, "likes"),
        where("user", "==", this.$store.state.user.uid),
        where("type", "==", "post"),
        where("objectId", "==", post.id)
      );
      const likes = await getDocs(voteQuery);
      const vote = likes.docs.length ? likes.docs[0].data().vote : null;
      const voted = likes.docs.length ? likes.docs[0].data().voted : null;
      this.voteData.vote = vote;
      this.voteData.voted = voted;
      console.log({ vote, voted });
      return { vote, voted } as any;
    },
    async setVote(vote: any) {
      const likesRef = doc(collection(db, "likes"));
      const lq = query(
        collection(db, "likes"),
        where("user", "==", this.$store.state.user.uid),
        where("type", "==", "post"),
        where("objectId", "==", this.$route.params.id)
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
          objectId: this.$route.params.id,
          type: "post",
          vote: vote,
          voted: true,
          user: this.$store.state.user.uid,
        });
      }
    },
    async removeVote() {
      this.post.voted = null;
      this.post.vote = null;
      const lq = query(
        collection(db, "likes"),
        where("user", "==", this.$store.state.user.uid),
        where("type", "==", "post"),
        where("objectId", "==", this.$route.params.id)
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
      console.log("up", this.post);
      console.log(this.post.vote, "dawg");
      if (this.post.vote == true) {
        this.removeVote();
      } else {
        this.post.voted = true;
        this.post.vote = true;
        this.setVote(true);
      }
    },
    async downvoted() {
      console.log("down");
      console.log(this.post.vote, "vote");
      if (this.post.vote == false) {
        this.removeVote();
      } else {
        this.post.voted = true;
        this.post.vote = false;
        this.setVote(false);
      }
    },
  },
});
</script>
