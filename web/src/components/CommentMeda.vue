<template>
  <div class="pb-10">
    <button
      @click="$emit('ballClicked')"
      v-if="!hideBall"
      class="ball bg-green-200 shadow-xl"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 p-2 ml-1 text-green-600 bg-gray-200 rounded-full"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    hide: Boolean,
  },
  data: () => ({
    hideBall: false,
  }),
});
</script>
<style scoped>
.ball {
  position: fixed;
  width: 70px;
  height: 70px;
  bottom: 32px;
  right: 50%;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  border-radius: 50px;
  text-align: center;
}
</style>
