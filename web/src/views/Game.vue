<template>
  <div>
    <dialog-modal :show="sharePop" @close="sharePop = false">
      <share-list :post="post"></share-list>
      <button
        type="button"
        class="bg-gray-500 rounded-full text-gray-100 mt-4"
        @click="sharePop = false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-8 h-8 p-2"
        >
          <path
            fill-rule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </dialog-modal>
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
    <div class="h-1/2 w-full mt-14 sm:mt-20 game-content">
      <div
        class="text-white p-2 relative font-semibold xl:text-4xl lg:text-4xl md:text-3xl text-2xl xl:tracking-wider lg:tracking-wider md:tracking-wider tracking-normal font-sans flex xl:mx-52 md:mx-10"
      >
        <div class="flex flex-row gap-4" v-if="post">
          <vote-clickers
            :voted="voteData.voted"
            @upvoted="upvoted"
            @downvoted="downvoted"
            :vote="voteData.vote == 1 ?? false"
            :large="!false"
            :count="post.likes"
            :dark="true"
            color="#92daac"
            class="mt-5"
          />
          <div class="flex flex-row justify-start items-start">
            <div class="flex flex-col gap-4 w-full px-2">
              <p class="pt-5">{{ post.user.fullName }}</p>
              <div
                class="prose text-white text-lg font-normal font-sans"
                v-html="post.content"
              ></div>
              <div class="mr-3 mb-3">
                <vue-load-image>
                  <template v-slot:image>
                    <img :src="post.cover" v-if="post.cover" />
                  </template>
                  <template v-slot:preloader>
                    <game-loader></game-loader>
                  </template>
                </vue-load-image>
              </div>
            </div>
            <div class="absolute right-0 mr-5 mt-5 flex gap-3">
              <div v-if="$store.state.loggedIn">
                <button
                  @click="deletePost"
                  style="background: #bbf7d0"
                  class="rounded-full"
                  v-if="$store.state.user.userId == post.user.userId"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-10 text-green-800 h-10 p-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <button
                  @click="sharePost"
                  class="rounded-full"
                  style="background: #bbf7d0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-10 text-green-800 h-10 p-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <game-loader v-else></game-loader>
      </div>
    </div>
    <div class="grid grid-cols-7 xl:mx-52 lg:mx-0 m-3">
      <div class="w-full mt-2 hidden lg:block xl:block md:block col-span-2">
        <div class="flex flex-row" v-if="post && post.user">
          <div v-if="$store.state.loggedIn">
            <user-avatar
              :path="
                $store.state.user.userId == post.user.userId
                  ? '/user'
                  : `/user/${post.user.userId}`
              "
              :img="post.user.photo"
              :user="post.user"
            />
          </div>
          <user-avatar
            v-else
            :path="'/'"
            :img="post.user.photo"
            :user="post.user"
          />
          <div>
            <p
              class="text-xl text-gray-500 px-2 pt-1 font-semibold tracking-wider font-sans"
            >
              {{ post.user.fullName }}
            </p>
            <div class="mx-2">
              <span
                class="px-1 rounded-md text-white text-sm"
                style="background: #5fd49f"
              >
                {{ post.user.totalLikes }}
              </span>
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
      <div class="w-full mb-20 col-span-7 md:col-span-6 xl:col-span-5">
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
            v-for="(com, ix) in comments"
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
import axios from "axios";
import { defineComponent } from "vue";
import CommentMeda from "../components/CommentMeda.vue";
import CommentTile from "../components/CommentTile.vue";
import LightGallery from "../components/LightGallery.vue";
import RelatedItems from "../components/RelatedItems.vue";
import UserAvatar from "../components/UserAvatar.vue";
import VoteClickers from "../components/VoteClickers.vue";
import DialogModal from "../components/DialogModal.vue";
import VueLoadImage from "vue-load-image";
import Loader from "../components/Loader.vue";
import GameLoader from "../components/GameLoader.vue";
import { Head } from "@vueuse/head";
import {
  ADD_COMMENT,
  GET_POST_VOTES,
  POST,
  POST_COMMENTS,
  SET_VOTE,
  DELETE_POST,
} from "../queries";
import ShareList from "../components/ShareList.vue";

export default defineComponent({
  components: {
    VoteClickers,
    CommentTile,
    UserAvatar,
    RelatedItems,
    LightGallery,
    CommentMeda,
    DialogModal,
    GameLoader,
    Loader,
    Head,
    "vue-load-image": VueLoadImage,
    ShareList,
  },
  metaInfo() {
    const ptitle = this.post ? this.post.content : "";
    return {
      title: ptitle.substr(0, 15),
      htmlAttrs: { lang: "en", amp: true },
      meta: [{ vmid: "description", name: "description", content: "foo" }],
    };
  },
  async mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.loading = true;
    console.log(this.$store.state);
    if (this.$store.state.loggedIn) {
      await this.getPostVote();
    }
    const {
      data: { getPost },
    } = await this.$apollo
      .query({
        query: POST,
        fetchPolicy: "network-only",
        variables: { post: this.$route.params.id },
      })
      .finally(() => {
        this.loading = true;
      });
    // const postObj = getPost
    const voteFlag = this.voteData.vote == 1 ?? false;
    this.post = JSON.parse(JSON.stringify(getPost));
    // this.initialVote = getPost.likes;
    if (this.voteData.voted && voteFlag) {
      this.initialVote = getPost.likes - 1;
    } else if (this.voteData.voted && !voteFlag) {
      this.initialVote = getPost.likes + 1;
    } else {
      this.initialVote = getPost.likes;
    }
    this.loading = false;
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data: () => ({
    comments: [] as any,
    sharePop: false,
    loadingPost: false,
    filename: "",
    content: "",
    uploadedUrl: null as any,
    invalidImage: false,
    loading: false,
    initialVote: 0,
    preset: "c4o7elzd",
    formData: null as any,
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
    totalCount: 0,
    pagination: { page: 1, pageSize: 30 },
    voteData: { vote: null, voted: null } as any,
  }),
  methods: {
    async handleScroll(e: any) {
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 50
      ) {
        if (this.totalCount) {
          this.pagination.page++;
          const totalCount = await this.loadComments();
          console.log("load more", totalCount);
        }
      }
    },
    getCover() {
      const defualtcover = "http://yourwebsite.com/images/default-banner.png";
      return this.post.cover ? this.post.cover : defualtcover;
    },
    replyComment(com: any) {
      if (this.$store.state.loggedIn) {
        this.showCommentForm = true;
        this.replyTarget = com;
        this.content = `@${this.replyTarget.user.fullName}`;
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
      if (this.file && this.formData) {
        const url = "https://api.cloudinary.com/v1_1/dtabnh5py/image/upload";
        const { data } = await axios({
          url,
          method: "POST",
          data: this.formData,
        });
        this.uploadedUrl = data.secure_url;
      }
      await this.saveComment();
    },
    ballClicked() {
      if (this.$store.state.loggedIn) {
        this.showCommentForm = true;
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
    async loadComments() {
      this.loadingComments = true;
      const {
        data: {
          getPostComments: { data },
        },
      } = await this.$apollo
        .query({
          query: POST_COMMENTS,
          fetchPolicy: "network-only",
          variables: {
            post: this.$route.params.id,
            pagination: this.pagination,
          },
        })
        .finally(() => {
          this.loadingComments = false;
        });
      const comments = JSON.parse(JSON.stringify(data));
      this.totalCount = comments.length;
      this.comments.push(...comments);
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
      this.file = e.target.files[0];
      this.filename = e.target.files[0].name.substring(0, 20);
      this.prepareFormData();
    },
    prepareFormData() {
      this.formData = new FormData();
      this.formData.append("upload_preset", this.preset);
      this.formData.append("file", this.file);
    },
    async saveComment() {
      await this.$apollo
        .mutate({
          mutation: ADD_COMMENT,
          variables: {
            input: {
              message: this.content,
              cover: this.uploadedUrl,
              replyTo: this.replyTarget ? this.replyTarget.user.userId : "",
              post: this.$route.params.id,
            },
          },
        })
        .then(({ data: { addComment } }) => {
          this.comments.push(addComment);
        })
        .finally(() => {
          this.loadingPost = false;
          this.showCommentForm = false;
        });
    },
    async setVote(vote: any) {
      await this.$apollo.mutate({
        mutation: SET_VOTE,
        variables: {
          input: {
            vote: vote,
            type: "post",
            entityId: this.$route.params.id,
          },
        },
      });
      // update post like

      if (vote == 1) {
        this.post.likes = this.initialVote + 1;
      } else if (vote == -1) {
        this.post.likes = this.initialVote - 1;
      } else {
        this.post.likes = this.initialVote;
      }
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
    async getPostVote() {
      const {
        data: { getPostVote },
      } = await this.$apollo.query({
        query: GET_POST_VOTES,
        variables: { post: this.$route.params.id },
        fetchPolicy: "network-only",
      });
      this.voteData = {
        vote: getPostVote.vote,
        voted: getPostVote.voted,
      };
    },
    async sharePost() {
      this.sharePop = true;
    },
    async deletePost() {
      const confirmDelte = confirm(
        "Are you sure you want to do delete this post? "
      );
      if (confirmDelte) {
        await this.$apollo
          .mutate({
            mutation: DELETE_POST,
            variables: {
              post: this.$route.params.id,
            },
          })
          .finally(() => {
            this.$router.push("/");
          });
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
<style scoped>
.prose ::v-deep h1 {
  padding-top: 0px;
  margin: 0px;
  padding-bottom: 0px;
  font-weight: normal;
  font-size: 20px;
  color: #ffffff;
}

.prose ::v-deep h2 {
  padding-top: 0px;
  margin: 0px;
  padding-bottom: 0px;
  font-weight: normal;
  font-size: 16px;
  color: #ffffff;
}

.prose ::v-deep p {
  padding-top: 0px;
  margin: 0px;
  padding-bottom: 0px;
  font-size: 18px;
  font-family: sans-serif;
  font-weight: normal;
  color: #ffffff;
  line-height: 25px;
}
.prose ::v-deep li {
  padding-top: 0px;
  padding-bottom: 0px;
  margin: 0px;
  font-size: 15px;
  font-weight: normal;
  color: #ffffff;
}

.prose ::v-deep strong {
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 20px;
  font-family: sans-serif;
  font-weight: 600;
  color: #ffffff;
}
.prose ::v-deep b {
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 20px;
  font-family: sans-serif;
  font-weight: 600;
  color: #ffffff;
}
.prose ::v-deep a {
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 20px;
  font-family: sans-serif;
  font-weight: normal;
  color: #ffffff;
}
.game-content {
  background: linear-gradient(360deg, rgb(117, 191, 159), rgb(165 222 197));
}
@media (min-width: 768px) {
  .prose ::v-deep h2 {
    padding-top: 0px;
    margin: 0px;
    padding-bottom: 0px;
    font-weight: normal;
    font-size: 30px;
    color: #ffffff;
  }
  .prose ::v-deep h1 {
    padding-top: 0px;
    margin: 0px;
    padding-bottom: 0px;
    font-weight: normal;
    font-size: 29px;
    color: #ffffff;
  }
  .prose ::v-deep p {
    padding-top: 0px;
    padding-bottom: 0px;
    margin: 0px;
    font-size: 20px;
    font-family: sans-serif;
    font-weight: normal;
    color: #ffffff;
    line-height: 28px;
  }
}
</style>
