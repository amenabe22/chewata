<template>
  <div class="my-2">
    <div
      :class="{ 'hover:bg-green-500': !color }"
      :style="{ 'background-color': color ?? '' }"
      class="
        duration-300
        transition
        ease-in-out
        delay-100
        font-black
        text-2xl text-white
        cursor-pointer
        bg-gray-400
        rounded-t-full
        px-2
        mx-5
      "
    >
      ++
    </div>
    <p class="text-center py-1 font-black" :class="{'text-white': dark}">10</p>
    <div
      :style="{ 'background-color': color ?? '' }"
      class="
        duration-300
        transition
        ease-in-out
        delay-100
        font-black
        text-2xl text-white
        hover:bg-green-500
        cursor-pointer
        bg-gray-400
        rounded-b-full
        px-2
        mx-5
      "
    >
      - -
    </div>
  </div>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  setup() {},
  props: {
    color: String,
    dark: Boolean
  },
});
</script>
