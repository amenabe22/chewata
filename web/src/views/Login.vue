<template>
  <div class="flex flex-row h-full bg-green-50">
    <div class="w-full sm:block hidden">
      <img
        class="h-screen object-cover"
        src="https://cdn.dribbble.com/users/5349290/screenshots/16218240/media/dd3f03302cef3b447b21ee27226c744b.png"
      />
    </div>
    <div class="mt-3 sm:mt-24 w-full">
      <form
        class="p-4 flex flex-col gap-3 justify-between"
        @submit.prevent="saveLogin"
      >
        <div class="w-full">
          <p class="text-4xl">Log In</p>
          <p class="py-5">
            By continuing, you agree to our User Agreement and
            <a href="/privacy" class="text-green-600">Privacy Policy</a>.
          </p>
          <div class="flex justify-start items-start w-40">
            <Loader v-if="loading"></Loader>
          </div>
          <div class="z-0 mb-6 w-full cursor-pointer" @click="loginG">
            <div
              class="border border-green-700 rounded-md sm:w-60 bg-white p-2 flex gap-6 hover:bg-green-100"
            >
              <img
                class="w-7"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
              <p class="font-semibold text-green-800">Sign in with Google</p>
            </div>
          </div>
          <div class="z-0 mb-6 w-full cursor-pointer">
            <div
              class="border border-green-700 rounded-md sm:w-60 bg-white p-2 flex gap-6 hover:bg-green-100"
            >
              <img
                class="w-7"
                src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/1920px-Facebook_f_logo_%282021%29.svg.png?20210818083032"
              />
              <p class="font-semibold text-green-800">Sign in with Facebook</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
} from "@firebase/auth";
import { defineComponent } from "vue";
import DropDown from "../components/DropDown.vue";
import { SOCIAL_LOGIN } from "../queries";
import Loader from "../components/Loader.vue";

export default defineComponent({
  components: { DropDown, Loader },
  data: () => ({
    name: "",
    public: false,
    private: false,
    loading: true,
    category: "",
    description: "",
    categories: [] as any,
    selected: null as any,
  }),
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        console.log("State User", user);
        this.$apollo
          .mutate({
            mutation: SOCIAL_LOGIN,
            variables: {
              input: user.accessToken,
            },
          })
          .then(({ data: { socialMediaLoginGoogle } }) => {
            this.$store.commit("SET_LOGGEDIN", true);
            this.$store.commit("SET_CTK", socialMediaLoginGoogle.token);
            this.$store.commit("SET_USER", socialMediaLoginGoogle.user);
            console.log(socialMediaLoginGoogle, "UDATA");
            window.location.assign("/");
          })
          .finally(() => {
            this.$store.state.loading = false;
            this.loading = false;
            this.$store.commit("SET_LOGIN_POP", false);
            this.$store.commit("SET_MAIN_POP", false);
          })
          .catch((e) => {
            console.error(e);
          });
      } else {
        this.loading = false;
      }
    });
  },
  methods: {
    saveLogin() {},
    async loginG() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    },
  },
});
</script>
<style lang="scss" scoped>
button {
  width: 200px;
}
</style>
