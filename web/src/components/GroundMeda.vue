<template>
  <div>
    <button
      @click="$emit('ballClicked')"
      v-if="!hideBall"
      style="
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 42px;
        right: 50%;
        background-color: #0c9;
        color: #fff;
        border-radius: 50px;
        text-align: center;
      "
      class="shadow-2xl hover:animate-bounce hidden xl:block lg:block md:block"
    >
      <img class="shadow-2xl" src="../assets/soccer-ball.png" alt="" />
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
    hideBall: Boolean,
  },
});
</script>