<template>
  <div class="my-2">
    <!-- {{ voted }} | {{ vote }} -->
    <div
      v-if="!readonly"
      @click="$emit('upvoted')"
      :class="{
        'hover:bg-green-500': !color,
        'w-7 h-6 text-lg': !large,
        'bg-green-200 text-green-400': !vote && voted,
        'bg-green-400 text-white': vote && voted,
        'bg-green-100 text-green-400': !voted && !vote,
        'w-10 h-8 text-xl p-1': large,
      }"
      class="duration-300 transition ease-in-out delay-75 font-semibold text-center cursor-pointer rounded-t-full"
    >
      ++
    </div>
    <div
      v-else
      :class="{
        'hover:bg-green-500': !color,
        'w-7 h-6 text-lg': !large,
        'bg-green-200 text-green-400': !vote && voted,
        'bg-green-300 text-white': vote && voted,
        'bg-green-100 text-green-400': !voted && !vote,
        'w-6 h-6 text-xl p-1': large,
      }"
      class="duration-300 transition ease-in-out delay-75 font-semibold text-center cursor-pointer rounded-t-full"
    >
      ++
    </div>
    <p
      class="text-center text-lg"
      :class="{
        'text-gray-300': $store.state.darkMode,
        'text-gray-600': !$store.state.darkMode,
        'py-1': large,
      }"
    >
      {{ count }}
    </p>
    <div
      v-if="!readonly"
      @click="$emit('downvoted')"
      :class="{
        'hover:bg-green-500': !color,
        'w-7 h-6 text-lg': !large,
        'bg-green-400 text-green-200': !vote && voted,
        'bg-green-200 text-green-400': vote && voted,
        'bg-green-100 text-green-400': !voted && !vote,
        'w-10 h-8 text-xl p-1': large,
      }"
      class="duration-300 text-xl transition ease-in-out delay-75 font-semibold text-center cursor-pointer rounded-b-full"
    >
      --
    </div>

    <div
      v-else
      :class="{
        'hover:bg-green-500': !color,
        'w-7 h-6 text-lg': !large,
        'bg-green-500 text-green-200': !vote && voted,
        'bg-green-200 text-green-400': vote && voted,
        'bg-green-100 text-green-400': !voted && !vote,
        'w-7 h-8 text-xl p-1': large,
      }"
      class="duration-300 text-xl transition ease-in-out delay-75 font-semibold text-center cursor-pointer rounded-b-full"
    >
      --
    </div>
  </div>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  setup() {},
  props: ["count", "vote", "voted", "large", "color", "readonly"],
});
</script>
