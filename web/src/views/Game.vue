<template>
  <div>
    <dialog-modal :show="showCommentForm" @close="showCommentForm = false">
      <div class="relative">
        <div class="w-full z-0">
          <div
            v-if="loadingPost"
            class="h-full bg-gray-500 top-0 left-0 right-0 w-full opacity-60 absolute z-50"
          >
            <div class="flex flex-col mt-32 justify-center items-center w-full">
              <p class="text-xl font-black text-white tracking-wider w-full">
                Loading...
              </p>
              <game-loader></game-loader>
            </div>
          </div>
          <router-link to="/">
            <p class="text-4xl xl:text-5xl lg:text-5xl text-white">Comment</p>
          </router-link>
          <transition name="slide-fade">
            <div
              class="w-full relative"
              :style="{ filter: loadingPost ? 'blur(2px)' : '' }"
              :class="{ 'opacity-70': loadingPost }"
            >
              <textarea
                class="form-control p-3 rounded-b-none block h-44 resize-none border-none mt-5 text-xl font-normal bg-white bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-gray-50 focus:border-blue-600 focus:outline-none"
                id="exampleFormControlTextarea1"
                rows="3"
                v-model="content"
                placeholder="Type it in..."
              ></textarea>
              <div
                class="w-full rounded-b-md bg-gray-500 flex flex-row justify-between p-2 text-white"
              >
                <input
                  type="file"
                  @change="uploaded"
                  accept="image/png, image/gif, image/jpeg"
                  class="hidden"
                  ref="file"
                />
                <p>5000</p>
                <button @click="clickFileRef">
                  <span v-if="!filename">Attach Img/Gif</span>
                  <span v-else>{{ filename }}</span>
                </button>
              </div>
              <button
                @click="postComment()"
                class="bg-green-600 rounded-lg mt-3 font-black text-white w-full px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl"
              >
                <p>Post</p>
              </button>
            </div>
          </transition>
        </div>
      </div>
    </dialog-modal>
    <div class="h-1/2 w-full" style="background: #5fe18c">
      <div
        class="text-white p-2 font-semibold xl:text-4xl lg:text-4xl md:text-3xl text-2xl xl:tracking-wider lg:tracking-wider md:tracking-wider tracking-normal font-sans flex xl:mx-52 md:mx-10 pt-20"
      >
        <div class="flex flex-row gap-4" v-if="post">
          <vote-clickers
            :voted="post.voted"
            @upvoted="upvoted"
            @downvoted="downvoted"
            :vote="post.vote"
            :large="true"
            :count="post.p.likes"
            :dark="true"
            color="#92daac"
            class="mt-5"
          />
          <div class="flex flex-col gap-4 w-full px-2">
            <p class="pt-5" v-if="post.user">{{ post.user.name }}</p>
            <p class="pt-2 text-xl xl:text-2xl lg:text-2xl font-normal">
              {{ post.p.content }}
            </p>
            <div class="mr-3 mb-3">
              <vue-load-image>
                <template v-slot:image>
                  <img :src="post.p.cover" v-if="post.p.cover" />
                </template>
                <template v-slot:preloader>
                  <game-loader></game-loader>
                </template>
              </vue-load-image>
            </div>
          </div>
        </div>
        <game-loader v-else></game-loader>
      </div>
    </div>
    <!-- <div class="flex flex-row justify-center p-2 gap-2 mt-2"> -->
    <div class="grid grid-cols-7 xl:mx-52 lg:mx-0 m-3">
      <div class="w-full mt-2 hidden lg:block xl:block md:block col-span-2">
        <div class="flex flex-row" v-if="post && post.user">
          <user-avatar :img="post.user.photoURL" />
          <div>
            <p
              class="text-xl text-gray-500 px-2 pt-1 font-semibold tracking-wider font-sans"
            >
              {{ post.user.name }}
            </p>
            <div
              class="mx-2 w-1/2 text-center font-black text-sm rounded-md text-white bg-green-500"
            >
              1099
            </div>
          </div>
        </div>
        <div class="pt-2 text-gray-400">
          <p class="text-xl font-semibold text-gray-500">Welcome To Chewata</p>
          <p class="pr-12">
            Start commenting and upvoting posts and express yourself!
          </p>
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
      <div class="w-full bg-white mb-20 col-span-7 md:col-span-6 xl:col-span-5">
        <div class="flex items-start justify-start" v-if="loadingComments">
          <loader></loader>
        </div>
        <p
          class="text-xl pt-5 font-semibold tracking-wider text-gray-400"
          v-else
        >
          Comments
        </p>
        <div v-if="comments.length">
          <comment-tile
            @replyClicked="replyComment(com)"
            v-for="(com, ix) in sortedArray()"
            :key="ix"
            :comment="com"
          />
        </div>
      </div>
    </div>
    <comment-meda
      @ballClicked="ballClicked"
      v-if="post"
      :hide="false"
    ></comment-meda>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CommentMeda from "../components/CommentMeda.vue";
import CommentTile from "../components/CommentTile.vue";
import LightGallery from "../components/LightGallery.vue";
import Navbar from "../components/Navbar.vue";
import RelatedItems from "../components/RelatedItems.vue";
import UserAvatar from "../components/UserAvatar.vue";
import VoteClickers from "../components/VoteClickers.vue";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import DialogModal from "../components/DialogModal.vue";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "@firebase/storage";
import { uuid } from "vue-uuid";
import VueLoadImage from "vue-load-image";
import Loader from "../components/Loader.vue";
import GameLoader from "../components/GameLoader.vue";

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
    DialogModal,
    GameLoader,
    Loader,
    "vue-load-image": VueLoadImage,
  },
  async mounted() {
    this.loading = true;
    const q = query(
      collection(db, "posts"),
      where("id", "==", this.$route.params.id)
    );
    const querySnapshot = await getDocs(q);
    let user: any;
    let likes: any;
    if (querySnapshot.docs.length) {
      const post = querySnapshot.docs[0].data();
      const uq = query(
        collection(db, "users"),
        where("id", "==", post["user"])
      );
      if (post.user && this.$store.state.loggedIn) {
        const vote = false;
        const voteQuery = query(
          collection(db, "likes"),
          where("user", "==", this.$store.state.user.uid),
          where("type", "==", "post"),
          where("objectId", "==", this.$route.params.id)
        );
        likes = await getDocs(voteQuery);
      }
      user = await getDocs(uq);
      // this.comments.push({ comment: comment, user: user.docs[0].data() });
      // console.log(likes.docs[0].data(), "likes!");
      if (this.$store.state.loggedIn) this.postRef = querySnapshot.docs[0].ref;
      this.initialVote = post.likes;
      // alert(this.initialVote)
      if (this.$store.state.loggedIn) {
        const voted = likes.docs.length ? likes.docs[0].data().voted : null;
        const vote = likes.docs.length ? likes.docs[0].data().vote : null;
        this.post = {
          p: post,
          user: user ? user.docs[0].data() : null,
          vote,
          voted,
        };
        if (voted && vote) {
          this.initialVote = post.likes - 1;
        } else if (voted && !vote) {
          this.initialVote = post.likes + 1;
        }
      } else {
        this.post = {
          p: post,
          user: user ? user.docs[0].data() : null,
          vote: null,
          voted: null,
        };
      }
      console.log(this.post, " POST LOADED ");
    }
    this.loading = false;
  },
  data: () => ({
    comments: [] as any,
    loadingPost: false,
    filename: "",
    content: "",
    invalidImage: false,
    loading: false,
    initialVote: 0,
    postRef: null as any,
    lastIncremented: null as any,
    lastDecremented: null as any,
    file: null as any,
    post: null as any,
    loadingComments: false,
    showCommentForm: false,
    showModal: false,
    replyTarget: null as any,
    showSide: true,
  }),
  methods: {
    replyComment(com: any) {
      if (this.$store.state.loggedIn) {
        this.showCommentForm = true;
        this.replyTarget = com;
        this.content = `@${this.replyTarget.user.name}`;
        this.showCommentForm = true;
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
    async postComment() {
      if (this.content == "") {
        alert("Message can't be empty");
        return;
      }

      if (this.invalidImage) {
        alert("Invalid file size and format: make sure it's below 2mb");
        return;
      }

      this.loadingPost = true;
      if (this.file) {
        const storage = getStorage();
        const storageRef = ref(storage, this.filename);

        // 'file' comes from the Blob or File API
        await uploadBytes(storageRef, this.file[0]).then(async (snapshot) => {
          const url = await getDownloadURL(snapshot.ref);
          await this.saveComment(url);
          console.log("Uploaded a blob or file!", url);
        });
        return;
      }
      await this.saveComment(null);
    },
    ballClicked() {
      if (this.$store.state.loggedIn) {
        this.showCommentForm = true;
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
    sortedArray: function () {
      function compare(a: any, b: any) {
        if (new Date(a.comment.createdAt) < new Date(b.comment.createdAt))
          return -1;
        if (new Date(a.comment.createdAt) > new Date(b.comment.createdAt))
          return 1;
        return 0;
      }
      // .sort(function (x: any, y: any) {
      //     // console.log(new Date(x.comment.createdAt) < new Date(y.comment.createdAt));
      //     return new Date(x.comment.createdAt) > new Date(y.comment.createdAt);
      //   });

      return this.comments.sort(compare);
    },
    async loadComments() {
      this.loadingComments = true;
      this.comments = [];
      const q = query(
        collection(db, "comments"),
        where("post", "==", this.$route.params.id),
        orderBy("createdAt", "asc")
      );
      const snapshotData = await getDocs(q);
      snapshotData.forEach(async (c) => {
        const comment = c.data();
        const uq = query(
          collection(db, "users"),
          where("id", "==", comment["user"])
        );
        const user = await getDocs(uq);
        await this.comments.push({
          comment: comment,
          user: user.docs[0].data(),
        });
      });
      this.loadingComments = false;
    },
    clickFileRef() {
      (this.$refs.file as any).click();
    },
    checkFile(e: any) {
      /// get list of files
      var file_list = e.target.files;
      let txt = "";
      let error = false;
      /// go through the list of files
      const file = file_list[0];
      var sFileName = file.name;
      var sFileExtension = sFileName
        .split(".")
        [sFileName.split(".").length - 1].toLowerCase();
      var iFileSize = file.size;
      var iConvert = (file.size / 1048576).toFixed(2);

      /// OR together the accepted extensions and NOT it. Then OR the size cond.
      /// It's easier to see this way, but just a suggestion - no requirement.
      const allowed = ["webp", "jpg", "jpeg", "png", "gif"];
      if (!allowed.includes(sFileExtension) || iFileSize > 2485760) {
        /// 10 mb
        txt +=
          "Please make sure your file is in image format and less than 2 MB.\n\n";
        error = true;
        this.invalidImage = true;
      }
      return { txt, error };
    },
    uploaded(e: any) {
      const { txt, error }: any = this.checkFile(e);
      if (error) {
        alert(txt);
        return;
      }
      this.file = e.target.files;
      this.filename = e.target.files[0].name;
    },
    async saveComment(cover: any = "") {
      const commentRef = doc(collection(db, "comments"));
      await setDoc(commentRef, {
        id: uuid.v4(),
        message: this.content,
        cover: cover,
        replyTo: this.replyTarget ? this.replyTarget.user.id : "",
        post: this.$route.params.id,
        user: this.$store.state.user.uid,
        createdAt: new Date().toISOString(),
        likes: 0,
      }).finally(() => {
        this.loadingPost = false;
        this.showCommentForm = false;
      });
      await this.loadComments();
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
      if (vote) {
        console.log(this.initialVote, "init");
        this.post.p.likes = this.initialVote + 1;
        updateDoc(this.postRef, {
          likes: this.post.p.likes,
        });
        if (this.lastIncremented == null) this.lastIncremented = true;
      } else {
        this.post.p.likes = this.initialVote - 1;

        updateDoc(this.postRef, {
          likes: this.post.p.likes,
        });
        if (this.lastDecremented == null) this.lastDecremented = true;
      }
    },
    async removeVote(vote: any) {
      // retain initial vote when user removes theirs
      this.post.p.likes = this.initialVote;
      updateDoc(this.postRef, {
        likes: this.initialVote,
      });
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
      if (this.$store.state.user) {
        console.log("up", this.post);
        console.log(this.post.vote, "dawg");
        if (this.post.vote == true) {
          this.removeVote(true);
          return;
        } else {
          this.post.voted = true;
          this.post.vote = true;
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
        console.log(this.post.vote, "vote");
        if (this.post.vote == false) {
          this.removeVote(false);
        } else {
          this.post.voted = true;
          this.post.vote = false;
          this.setVote(false);
        }
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
  },
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
