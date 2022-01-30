<template>
  <div>
    <button
      @click="$emit('ballClicked')"
      v-if="!hideBall"
      style="
        position: fixed;
        height: 60px;
        bottom: 50px;
        right: 50%;
        color: #fff;
        text-align: center;
      "
      class="
        shadow-2xl
        xl:block
        lg:block
        md:block
        hidden
        bg-gray-500
        hover:bg-gray-600
        text-white
        font-bold
        py-2
        px-4
        rounded-xl
        text-xl
      "
    >
      <div class="flex flex-row">
        <p class="pt-1">Comment</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </button>
    <nav
      class="bg-gradient-to-t from-green-400 to-tranparent text-white"
      style="
        position: fixed;
        width: 100%;
        height: 60px;
        bottom: 1px;
        color: #fff;
        text-align: center;
      "
    ></nav>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    hide: Boolean,
  },
});
</script>