<template>
  <div class="my-10">
    <div class="flex flex-row">
      <user-avatar />
      <div class="flex flex-row">
        <div>
          <p class="text-gray-500 font-semibold px-2 pt-2">AmenAbe</p>
          <p class="px-2 font-normal text-gray-500">Small excerpt...</p>
        </div>
        <div class="flex float-right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-400 mt-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
            />
            <path
              d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
            /></svg
          ><span class="font-semibold text-md text-gray-400 pt-1">12</span>
        </div>
      </div>
    </div>
    <img
      src="https://img.devrant.com/devrant/rant/r_438038_pnhMu.jpg"
      alt=""
      class="flex w-full h-2/6 mt-4"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import UserAvatar from "./UserAvatar.vue";

export default defineComponent({
  components: { UserAvatar },
  setup() {},
});
</script>
