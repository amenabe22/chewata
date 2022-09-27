<template>
  <main>
    <metainfo>
      <template v-slot:title="{ content }">{{
        content ? `${content} | SITE_NAME` : `SITE_NAME`
      }}</template>
    </metainfo>
    <login-popup
      @loggedin="$store.commit('SET_LOGIN_POP', false)"
      @close="$store.commit('SET_LOGIN_POP', false)"
      :loginPopup="$store.state.loginPopup"
    ></login-popup>
    <account-popup
      @logout="logout"
      @showpost="showPostDialog"
      @close="$store.commit('SET_PROFILE_POP', false)"
      :profileClicked="$store.state.profilePopup"
    ></account-popup>

    <navbar
      @clickedLogin="$store.commit('SET_LOGIN_POP', true)"
      @profileClicked="$store.commit('SET_PROFILE_POP', true)"
    ></navbar>
    <router-view />
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import LoginPopup from "./components/LoginPopup.vue";
import Navbar from "./components/Navbar.vue";
import AccountPopup from "./components/AccountPopup.vue";
import { Head, useHead } from "@vueuse/head";
import { getAuth, signOut } from "@firebase/auth";
import { LOGOUT, SOCIAL_LOGIN } from "./queries";
import { getMessaging, onMessage } from "@firebase/messaging";

export default defineComponent({
  components: { LoginPopup, Navbar, AccountPopup, Head },
  data: () => ({
    loginPopup: false,
    profileClicked: false,
  }),
  mounted() {
    const messaging = getMessaging();
    onMessage(messaging, (payload: any) => {
      console.log("Message received. ", payload);
      // show notification here
      alert(payload.notification.body);
      // ...
    });
  },
  methods: {
    menuClicked() {
      if (this.$store.state.loggedIn) {
        this.$store.commit("SET_MAIN_POP", true);
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
    cleanStates() {
      this.$store.commit("SET_LOGGEDIN", false);
      this.$store.commit("SET_USER", null);
      this.$store.commit("SET_PROFILE_POP", false);
      this.$store.commit("SET_LOGIN_POP", false);
      this.$store.commit("SET_MAIN_POP", false);
    },
    showPostDialog() {
      this.$store.commit("SET_PROFILE_POP", false);
      this.$store.commit("SET_LOGIN_POP", false);
      this.menuClicked();
      this.$router.push("/");
    },
    async logout() {
      this.cleanStates();
      const auth = getAuth();
      await this.$apollo.mutate({ mutation: LOGOUT });
      signOut(auth)
        .then(() => {
          window.location.assign("/");
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    },
  },
});
</script>
