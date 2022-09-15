<template>
  <div class="my-2">
    <div
      :class="{ 'hover:bg-green-500': !color }"
      :style="{ 'background-color': color ?? '' }"
      class="duration-300 transition w-8 h-6 ease-in-out delay-100 font-semibold text-lg text-center text-white cursor-pointer bg-gray-400 rounded-t-full"
    >
      ++
    </div>
    <p class="text-center py-1 text-lg" :class="{ 'text-white': dark }">10</p>
    <div
      :style="{ 'background-color': color ?? '' }"
      class="duration-300 transition w-8 h-6 ease-in-out delay-100 font-semibold text-lg text-center text-white hover:bg-green-500 cursor-pointer bg-gray-400 rounded-b-full"
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
    dark: Boolean,
  },
});
</script>
