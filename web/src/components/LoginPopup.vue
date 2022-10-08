<template>
  <dialog-modal :show="loginPopup" @close="$emit('close')">
    <transition name="slide-fade">
      <div class="lg:w-96 xl:w-96 md:lg:w-96 z-0">
        <router-link to="/">
          <p class="text-4xl xl:text-5xl lg:text-5xl text-white">
            Login / Register
          </p>
          <div class="flex flex-col justify-center items-center gap-3 pt-4">
            <button
              @click="loginFb"
              type="button"
              class="text-white rounded-full flex items-center justify-center gap-3 w-full bg-gradient-to-r from-blue-300 via-blue-600 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium py-2.5 text-center mr-2 mb-2"
            >
              <fa :icon="['fab', 'fa-facebook']" class="text-3xl"></fa>
              <p>Sign in with Facebook</p>
            </button>
            <button
              @click="loginG"
              type="button"
              class="text-white rounded-full flex items-center justify-center gap-3 w-full bg-gradient-to-r from-red-500 via-red-600 to-red-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium py-2.5 text-center mr-2 mb-2"
            >
              <fa :icon="['fab', 'fa-google']" class="text-3xl"></fa>
              <p>Sign in with Google</p>
            </button>
          </div>
        </router-link>
      </div>
    </transition>
  </dialog-modal>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DialogModal from "./DialogModal.vue";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "@firebase/firestore";
import { db } from "../firebase.config";
import { SOCIAL_LOGIN } from "../queries";

export default defineComponent({
  components: { DialogModal },
  props: { loginPopup: Boolean },
  data: () => ({ loadingAuth: false }),
  // created() {
  //   const auth = getAuth();
  //   auth.onAuthStateChanged((result: any) => {
  //     this.loadingAuth = true;
  //     if (result) {
  //       console.log("Result", result);
  //       if (!this.$store.state.loggedIn) {

  //       }
  //     }
  //   });
  // },
  methods: {
    async loginFb() {
      const auth = getAuth();
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider)
        .then(async (result: any) => {
          this.$apollo
            .mutate({
              mutation: SOCIAL_LOGIN,
              variables: {
                input: result.user.accessToken,
              },
            })
            .then(({ data: { socialMediaLoginGoogle } }) => {
              console.log("Logged In", socialMediaLoginGoogle);
              this.$store.commit("SET_LOGGEDIN", true);
              this.$store.commit("SET_USER", socialMediaLoginGoogle.user);

              this.$emit("loggedin");
            })
            .finally(() => {
              this.$store.state.loading = false;
              this.loadingAuth = false;
              this.$store.commit("SET_LOGIN_POP", false);
              this.$store.commit("SET_MAIN_POP", false);
            });
        })
        .catch((error) => {
          // TODO: handle social auth erros here
          console.warn(error);
        });
    },
    async loginG() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider)
        .then(async (result: any) => {
          console.log("Result", result);
          this.$apollo
            .mutate({
              mutation: SOCIAL_LOGIN,
              variables: {
                input: result.user.accessToken,
              },
            })
            .then(({ data: { socialMediaLoginGoogle } }) => {
              this.$store.commit("SET_LOGGEDIN", true);
              this.$store.commit("SET_CTK", socialMediaLoginGoogle.token);
              this.$store.commit("SET_USER", socialMediaLoginGoogle.user);
              this.$emit("loggedin");
            })
            .finally(() => {
              this.$store.state.loading = false;
              this.loadingAuth = false;
              this.$store.commit("SET_LOGIN_POP", false);
              this.$store.commit("SET_MAIN_POP", false);
            });
        })
        .catch((error) => {
          // TODO: handle social auth erros here
          console.warn(error);
        });
    },
  },
});
</script>
