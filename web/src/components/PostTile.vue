<template>
  <div
    class="flex flex-row mt-4 hover:bg-gray-50 relative xl:p-2 lg:p-2 md:p-2"
  >
    <vote-clickers
      :readonly="readonly"
      :voted="voteData.voted"
      @upvoted="upvoted"
      @downvoted="downvoted"
      :vote="voteData.vote"
      :large="false"
      :count="post.likes"
      color="#92daac"
      class="mt-5"
    />
    <div class="mx-3 pt-2 cursor-pointer w-full" @click="$emit('clicked')">
      <p
        class="px-2 tracking-wide text-gray-600 text-lg"
        :class="{ 'py-2': post.cover, 'pt-5': !post.cover }"
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

export default defineComponent({
  components: { VoteClickers, "vue-load-image": VueLoadImage, Loader },
  data: () => ({
    voteData: { vote: null, voted: null } as any,
    initialVote: 0,
    postRef: null as any,
  }),
  props: ["post", "count", "readonly"],
  async created() {
    this.initialVote = this.post.likes;
    if (this.$store.state.loggedIn) {
      this.fetchVotes();
    }
    // ignore
    await this.setRef();
  },
  methods: {
    async fetchVotes() {
      const voteQuery = query(
        collection(db, "likes"),
        where("user", "==", this.$store.state.user.uid),
        where("type", "==", "post"),
        where("objectId", "==", this.post.id)
      );
      let vote = null;
      let voted = null;
      const likes = await getDocs(voteQuery);
      if (!likes.empty) {
        const likesData = likes.docs[0].data();
        vote = likes.docs.length ? likesData.vote : null;
        voted = likes.docs.length ? likesData.voted : null;
        this.voteData.vote = vote;
        this.voteData.voted = voted;
      }

      if (voted && vote) {
        this.initialVote = this.post.likes - 1;
      } else if (voted && !vote) {
        this.initialVote = this.post.likes + 1;
      }

      return { vote, voted } as any;
    },
    async setVote(vote: any) {
      const likesRef = doc(collection(db, "likes"));
      const lq = query(
        collection(db, "likes"),
        where("user", "==", this.$store.state.user.uid),
        where("type", "==", "post"),
        where("objectId", "==", this.post.id)
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
          objectId: this.post.id,
          type: "post",
          vote: vote,
          voted: true,
          user: this.$store.state.user.uid,
        });
      }
      // update post like
      await this.updateTotalLikeCount();
      if (vote) {
        this.post.likes = this.initialVote + 1;
      } else {
        this.post.likes = this.initialVote - 1;
      }
    },
    async updateTotalLikeCount() {
      const lq = query(
        collection(db, "likes"),
        where("type", "==", "post"),
        where("objectId", "==", this.post.id)
      );
      let total = 0;
      const likes = await getDocs(lq);
      const calculated = likes.docs.map((e) => {
        const data = e.data();
        const voteNumeric =
          data.vote === true ? 1 : data.vote === false ? -1 : 0;
        return {
          data,
          voteNumeric,
        };
      });
      calculated.forEach((e) => (total += e.voteNumeric));
      updateDoc(this.postRef, {
        likes: total,
      });
    },
    async setRef() {
      const q = query(collection(db, "posts"), where("id", "==", this.post.id));
      const querySnapshot = await getDocs(q);
      this.postRef = querySnapshot.docs[0].ref;
    },
    async removeVote(vote: any) {
      // retain initial vote when user removes theirs
      this.post.likes = this.initialVote;
      updateDoc(this.postRef, {
        likes: this.initialVote,
      });
      this.voteData.voted = null;
      this.voteData.vote = null;
      const lq = query(
        collection(db, "likes"),
        where("user", "==", this.$store.state.user.uid),
        where("type", "==", "post"),
        where("objectId", "==", this.post.id)
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
        console.log("up", this.post);
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