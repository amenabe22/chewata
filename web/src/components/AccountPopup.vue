<template>
  <dialog-modal :show="profileClicked" @close="$emit('close')">
    <div class="flex flex-col w-full gap-3">
      <router-link to="/">
        <p class="text-4xl xl:text-5xl lg:text-5xl text-white">More</p>
      </router-link>
      <button
        @click="$emit('showpost')"
        style="opacity: 12px"
        class="rounded-lg w-full font-semibold hover:bg-green-700 text-white p-3 xl:text-xl lg:text-md text-xl"
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
        @click="$emit('logout')"
        style="opacity: 12px"
        class="rounded-lg w-full font-semibold hover:bg-green-700 text-white p-3 xl:text-xl lg:text-md text-xl"
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
import DialogModal from "./DialogModal.vue";

export default defineComponent({
  components: { DialogModal },
  props: { profileClicked: Boolean },
});
</script>
