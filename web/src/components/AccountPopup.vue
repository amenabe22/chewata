<template>
  <dialog-modal :show="profileClicked" @close="$emit('close')">
    <div class="flex flex-col items-center justify-center w-full gap-3">
      <router-link to="/user">
        <p class="text-4xl xl:text-5xl lg:text-5xl text-white">Me</p>
      </router-link>
      <button
        @click="$router.push('/post')"
        style="opacity: 12px"
        class="rounded-lg w-full font-semibold hover:bg-gray-600 text-white p-3 xl:text-xl lg:text-md text-xl text-center"
      >
        <div class="flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>
          <span> Meme/ Story</span>
        </div>
      </button>
      <button
        @click="changeTheme"
        style="opacity: 12px"
        class="rounded-lg w-full font-semibold hover:bg-gray-600 text-white p-3 xl:text-xl lg:text-md text-xl"
      >
        <div class="flex gap-4 text-center justify-center items-center">
          <svg
            v-if="$store.state.darkMode"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
          <p v-if="$store.state.darkMode">ቦጋለ</p>
          <p v-else>ጨለማ</p>
        </div>
      </button>
      <button
        @click="$emit('logout')"
        style="opacity: 12px"
        class="rounded-lg w-full font-semibold hover:bg-gray-600 text-white p-3 xl:text-xl lg:text-md text-xl"
      >
        <div class="flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>

          <span>Logout</span>
        </div>
      </button>
    </div>
  </dialog-modal>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { store } from "../store";
import DialogModal from "./DialogModal.vue";

export default defineComponent({
  components: { DialogModal },
  props: { profileClicked: Boolean },
  methods: {
    changeTheme() {
      const current = this.$store.state.darkMode;
      let bg = "#f8fdfa";
      if (current == true) {
        document.querySelector("html").classList.remove("dark");
      } else {
        bg = "#383952";
        document.querySelector("html").classList.add("dark");
      }
      store.commit("SET_DARK_MODE", !current);
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
        "--toolbar-selector-bg",
        this.$store.state.darkMode ? "#54556e" : "#fffff"
      );
      document.body.style.setProperty(
        "--toolbar-select-hover",
        this.$store.state.darkMode ? "#444459" : "#eee"
      );
      this.$emit("close");
    },
  },
});
</script>
