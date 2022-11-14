<template>
  <div
    class="bg-brand-100 dark:bg-brand-dark-900"
    :class="{ dark: $store.state.darkMode }"
  >
    <metainfo>
      <template v-slot:title="{ content }">{{
        content ? `${content} | Chewata` : `Chewata`
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
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import LoginPopup from "./components/LoginPopup.vue";
import Navbar from "./components/Navbar.vue";
import AccountPopup from "./components/AccountPopup.vue";
import { Head } from "@vueuse/head";
import { getAuth, signOut } from "@firebase/auth";
import { LOGOUT, NOTIFICATION_LISTENER } from "./queries";

export default defineComponent({
  components: { LoginPopup, Navbar, AccountPopup, Head },
  mounted() {
    let bg = "#f8fdfa";
    const current = this.$store.state.darkMode;
    if (current == true) {
      bg = "#383952";
      document.querySelector("html").classList.add("dark");
    }
    document.body.style.setProperty("--global-bg", bg);
    document.body.style.setProperty(
      "--toolbar-item-bg",
      this.$store.state.darkMode ? "#54556e" : "white"
    );
    document.body.style.setProperty(
      "--toolbar-item-stroke",
      this.$store.state.darkMode ? "white" : "#54556e"
    );
    document.body.style.setProperty(
      "--toolbar-item-bg-hover",
      this.$store.state.darkMode ? "#17a34a" : "#a5dec5"
    );
    document.body.style.setProperty(
      "--toolbar-select-hover",
      this.$store.state.darkMode ? "#444459" : "#eee"
    );
  },
  apollo: {
    $subscribe: {
      notificationListener: {
        query: NOTIFICATION_LISTENER,
        result({ data: { notificationAdded } }) {
          console.clear();
          console.log(notificationAdded.notification);
          const notif = notificationAdded.notification;
          // update notification count
          this.$store.commit(
            "SET_NOTIFICATION",
            this.$store.state.notifications + 1
          );
          // alert(notif.message);
        },
      },
    },
  },
  data: () => ({
    loginPopup: false,
    profileClicked: false,
  }),
  methods: {
    menuClicked() {
      if (this.$store.state.loggedIn) {
        this.$store.commit("SET_MAIN_POP", true);
      } else {
        this.$router.push("/login");
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
<style lang="scss">
body {
  background: var(--global-bg);
}
</style>
